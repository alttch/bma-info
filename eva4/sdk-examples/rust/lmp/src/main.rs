use eva_common::actions::LmacroParams;
use eva_common::err_logger;
use eva_common::prelude::*;
use eva_sdk::controller::LmacroProcessor;
use eva_sdk::prelude::*;
use serde::Deserialize;

err_logger!();

const AUTHOR: &str = "Bohemia Automation";
const VERSION: &str = env!("CARGO_PKG_VERSION");
const DESCRIPTION: &str = "Lmacro processor demo";

#[cfg(not(feature = "std-alloc"))]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

struct Handlers {
    info: ServiceInfo,
    lmp: LmacroProcessor,
}

#[async_trait::async_trait]
impl RpcHandlers for Handlers {
    async fn handle_call(&self, event: RpcEvent) -> RpcResult {
        svc_rpc_need_ready!();
        let method = event.parse_method()?;
        #[allow(clippy::single_match, clippy::match_single_binding)]
        match method {
            "run" => {
                let action = unpack(event.payload())?;
                let lmp = self.lmp.clone();
                tokio::spawn(async move {
                    lmp.execute(action).await;
                });
                Ok(None)
            }
            _ => svc_handle_default_rpc(method, &self.info),
        }
    }
    async fn handle_frame(&self, _frame: Frame) {
        svc_need_ready!();
    }
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct Config {}

async fn lmacro_hello(params: LmacroParams) -> EResult<Value> {
    let Some(name) = params.kwargs.and_then(|mut kw| kw.remove("name")) else {
        return Err(Error::invalid_params("missing 'name' kwarg"));
    };
    Ok(to_value(format!("Hello, {}!", name))?)
}

#[svc_main]
async fn main(mut initial: Initial) -> EResult<()> {
    let _config: Config = Config::deserialize(
        initial
            .take_config()
            .ok_or_else(|| Error::invalid_data("config not specified"))?,
    )?;
    let info = ServiceInfo::new(AUTHOR, VERSION, DESCRIPTION);
    let mut lmp_builder = LmacroProcessor::builder();
    lmp_builder.register(
        "lmacro:test/noreply".parse().unwrap(),
        move |_| async move { Ok(Value::Unit) },
    );
    lmp_builder.register("lmacro:test/ping".parse().unwrap(), move |_| async move {
        Ok(to_value("pong")?)
    });
    lmp_builder.register("lmacro:test/hello".parse().unwrap(), lmacro_hello);
    let handlers = Handlers {
        info,
        lmp: lmp_builder.build(),
    };
    eapi_bus::init(&initial, handlers).await?;
    initial.drop_privileges()?;
    eapi_bus::init_logs(&initial)?;
    svc_start_signal_handlers();
    eapi_bus::mark_ready().await?;
    info!("{} started ({})", DESCRIPTION, initial.id());
    eapi_bus::block().await;
    eapi_bus::mark_terminating().await?;
    Ok(())
}
