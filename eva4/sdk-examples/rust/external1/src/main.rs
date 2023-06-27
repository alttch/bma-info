use busrt::rpc::{Rpc, RpcClient, RpcError, RpcEvent, RpcHandlers, RpcResult};
use busrt::{async_trait, Frame};
use eva_common::payload::pack;
use eva_common::prelude::*;
use log::{error, info};
use std::ffi::OsString;
use std::sync::atomic;
use std::time::Duration;
use windows_service::service::{
    ServiceControl, ServiceControlAccept, ServiceExitCode, ServiceState, ServiceStatus, ServiceType,
};
use windows_service::service_control_handler::{self, ServiceControlHandlerResult};
use windows_service::{define_windows_service, service_dispatcher};

const SLEEP_STEP: Duration = Duration::from_secs(1);

static ACTIVE: atomic::AtomicBool = atomic::AtomicBool::new(true);

const SVC_NAME: &str = "my.external.svc1";
const BUS_PATH: &str = "172.16.54.1:7777";

struct MyHandlers {}

// RPC implementation
#[async_trait]
impl RpcHandlers for MyHandlers {
    async fn handle_call(&self, event: RpcEvent) -> RpcResult {
        match event.parse_method()? {
            "test" => Ok(None),
            "hello" => Ok(Some(pack("hi there")?)),
            _ => Err(RpcError::method(None)),
        }
    }
    async fn handle_notification(&self, _event: RpcEvent) {}
    async fn handle_frame(&self, _frame: Frame) {}
}

// connects to the bus and blocks while the service is active
async fn xsvc() -> EResult<()> {
    let config = busrt::ipc::Config::new(BUS_PATH, SVC_NAME);
    let client = busrt::ipc::Client::connect(&config).await?;
    let handlers = MyHandlers {};
    let rpc = RpcClient::new(client, handlers);
    info!("{} connected", SVC_NAME);
    while rpc.is_connected() && ACTIVE.load(atomic::Ordering::Relaxed) {
        tokio::time::sleep(SLEEP_STEP).await;
    }
    Ok(())
}

define_windows_service!(ffi_service_main, service_main);

// windows service, see https://crates.io/crates/windows-service
fn service_main(_arguments: Vec<OsString>) -> Result<(), windows_service::Error> {
    let event_handler = move |control_event| -> ServiceControlHandlerResult {
        match control_event {
            ServiceControl::Stop => {
                ACTIVE.store(false, atomic::Ordering::Relaxed);
                ServiceControlHandlerResult::NoError
            }
            ServiceControl::Interrogate => ServiceControlHandlerResult::NoError,
            _ => ServiceControlHandlerResult::NotImplemented,
        }
    };
    let status_handle =
        service_control_handler::register(format!("EVA.{}", SVC_NAME), event_handler)?;
    let mut next_status = ServiceStatus {
        service_type: ServiceType::OWN_PROCESS,
        current_state: ServiceState::Running,
        controls_accepted: ServiceControlAccept::STOP,
        exit_code: ServiceExitCode::Win32(0),
        checkpoint: 0,
        wait_hint: Duration::default(),
        process_id: None,
    };
    status_handle.set_service_status(next_status.clone())?;
    let rt = tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap();
    rt.block_on(async move {
        while ACTIVE.load(atomic::Ordering::Relaxed) {
            if let Err(e) = xsvc().await {
                error!("{}", e);
            }
            if ACTIVE.load(atomic::Ordering::Relaxed) {
                tokio::time::sleep(SLEEP_STEP).await;
            }
        }
    });
    next_status.current_state = ServiceState::Stopped;
    status_handle.set_service_status(next_status)?;
    Ok(())
}

fn main() -> Result<(), windows_service::Error> {
    let log_name = format!("EVA.{}", SVC_NAME);
    eventlog::register(&log_name).unwrap();
    eventlog::init(&log_name, log::Level::Info).unwrap();
    service_dispatcher::start(format!("EVA.{}", SVC_NAME), ffi_service_main)?;
    Ok(())
}
