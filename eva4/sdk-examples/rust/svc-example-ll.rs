use std::time::Duration;

use atomic_timer::AtomicTimer;
use eva_common::err_logger;
use eva_common::prelude::*;
use eva_sdk::prelude::*;
use eva_sdk::service::EventKind;
use parking_lot_rt::Mutex;
use serde::Deserialize;

err_logger!();

const AUTHOR: &str = "Bohemia Automation";
const VERSION: &str = env!("CARGO_PKG_VERSION");
const DESCRIPTION: &str = "Logic Line demo controller";

#[cfg(not(feature = "std-alloc"))]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

struct Handlers {
    info: ServiceInfo,
    temp_sensor: OID,
    fan_unit: OID,
    logic_processor: Mutex<ll::Processor>,
    force_action_timer: AtomicTimer,
}

impl Handlers {
    // a function to process logic. asynchonos is required to get values from the local state
    // database.
    async fn process_logic(&self) -> EResult<()> {
        let Some(temp_state) = eva_sdk::state::get(&self.temp_sensor).await? else {
            warn!("No state for {}", self.temp_sensor);
            return Ok(());
        };
        let Some(fan_state) = eva_sdk::state::get(&self.fan_unit).await? else {
            warn!("No state for {}", self.fan_unit);
            return Ok(());
        };
        let mut fan_active = 0;
        let temp = (f64::try_from(temp_state.value())? * 10.).round() / 10.;
        let fan_current = u8::try_from(fan_state.value())?;
        // the logic line part. must be as fast as possible to prevent any blocking.
        {
            let mut processor = self.logic_processor.lock();
            processor
                .line("temp_high", temp)
                .then(ll::action!("temp_above_15", |t| (t > 15.0).then_some(())))
                .then(ll::action!("fan_on", |()| {
                    fan_active = 1;
                    Some(())
                }));
            processor
                .line("temp_ok", temp)
                .then(ll::action!("temp_below_12", |t| (t < 12.0).then_some(())))
                .then(ll::action!("fan_off", |()| {
                    fan_active = 0;
                    Some(())
                }));
            ll::ingress(&mut processor);
        }
        debug!("Temperature: {:.1}°C, Fan active: {}", temp, fan_active);

        // the condition is used to avoid spamming the node with actions when the fan state is not
        // changed, however launch an action when the timer is expired to make sure the fan is
        // physically set to the correct state.
        if fan_active != fan_current || self.force_action_timer.expired() {
            info!("Setting fan state to {}", fan_active);
            eapi_bus::unit_action(
                &self.fan_unit,
                &eapi_bus::ParamsUnitAction::new(Value::U8(fan_active)),
            )
            .await?;
            self.force_action_timer.reset();
        }
        Ok(())
    }
}

#[async_trait::async_trait]
impl RpcHandlers for Handlers {
    // RPC handler. All unsupported methods must go to the default handler in `ll` module.
    // In case if "x" method is overriden, its default must also go to the same default handler to
    // let the controller respond to HMI requests.
    async fn handle_call(&self, event: RpcEvent) -> RpcResult {
        svc_rpc_need_ready!();
        let method = event.parse_method()?;
        #[allow(clippy::single_match, clippy::match_single_binding)]
        match method {
            _ => ll::handle_default_rpc(event, &self.info),
        }
    }
    async fn handle_frame(&self, frame: Frame) {
        svc_need_ready!();
        // Send the frame to the state database for processing.
        eva_sdk::state::process_bus_frame(&frame).await.log_ef();
        // If frame contains no OID (not a state frame) - do nothing.
        let Some(oid) = frame.parse_oid() else {
            return;
        };
        // If the temperature sensor has been updated, process the logic.
        if oid == self.temp_sensor {
            self.process_logic().await.log_ef_with("logic");
        }
    }
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct Config {}

#[svc_main]
async fn main(mut initial: Initial) -> EResult<()> {
    ll::set_recording(true);
    let temp_sensor: OID = "sensor:env/temp".parse()?;
    let fan_unit: OID = "unit:tests/fan".parse()?;

    let _config: Config = Config::deserialize(
        initial
            .take_config()
            .ok_or_else(|| Error::invalid_data("config not specified"))?,
    )?;

    let info = ServiceInfo::new(AUTHOR, VERSION, DESCRIPTION);

    // This block allows the service to map certain logic line parts to specific OIDs. Required if
    // the service want to make certain data accessible only by users with specific access rights.
    let mut snapshot_acl_mapping = ll::SnapshotAclMapping::new();
    snapshot_acl_mapping.add("temp_high/temp_above_15", temp_sensor.clone());
    snapshot_acl_mapping.add("temp_ok/temp_below_12", temp_sensor.clone());
    ll::set_snapshot_acl_mapping(snapshot_acl_mapping)?;

    let force_action_timer = AtomicTimer::new(Duration::from_secs(5));
    force_action_timer.expire_now();

    let handlers = Handlers {
        info,
        temp_sensor: temp_sensor.clone(),
        fan_unit: fan_unit.clone(),
        logic_processor: ll::processor().into(),
        force_action_timer,
    };

    eapi_bus::init_blocking(&initial, handlers).await?;
    initial.drop_privileges()?;
    eapi_bus::init_logs(&initial)?;
    svc_start_signal_handlers();
    eapi_bus::mark_ready().await?;
    // subscribe to the temperature sensor and fan unit state events.
    eapi_bus::subscribe_oids(
        [&temp_sensor.clone().into(), &fan_unit.clone().into()],
        EventKind::Actual,
    )
    .await?;
    // requiest annouce for the initial state of the temperature sensor and fan unit.
    eapi_bus::request_announce([&temp_sensor.into(), &fan_unit.into()], EventKind::Actual).await?;
    info!("{} started ({})", DESCRIPTION, initial.id());
    eapi_bus::block().await;
    eapi_bus::mark_terminating().await?;
    Ok(())
}
