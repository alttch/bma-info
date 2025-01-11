use roboplc::controller::prelude::*;
use roboplc::prelude::*;
use rtsc::pi::Mutex;
use rtsc::time::interval;
use serde::{Deserialize, Serialize};

const SHUTDOWN_TIMEOUT: Duration = Duration::from_secs(5);
const STATE_FILE: &str = "current.json";

type Message = ();

#[derive(Default)]
struct Variables {
    // This is a persistent data that is saved to disk
    persistent_data: Mutex<Data>,
    // This is a runtime data that is not saved to disk
    _runtime_data: u32,
}

// The persistent data structure
#[derive(Serialize, Deserialize, Default)]
struct Data {
    value1: u32,
    value2: u32,
}

// This worker automatically saves the persistent data to disk every 10 seconds
#[derive(WorkerOpts)]
#[worker_opts(cpu = 0, priority = 50, scheduling = "fifo", blocking = true)]
struct StateSaver {}

impl Worker<Message, Variables> for StateSaver {
    fn run(&mut self, context: &Context<Message, Variables>) -> WResult {
        for _ in interval(Duration::from_secs(10)).take_while(|_| context.is_online()) {
            roboplc::state::save(STATE_FILE, &*context.variables().persistent_data.lock())?;
        }
        Ok(())
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    roboplc::setup_panic();
    roboplc::configure_logger(roboplc::LevelFilter::Info);
    if !roboplc::is_production() {
        roboplc::set_simulated();
    }
    roboplc::thread_rt::prealloc_heap(10_000_000)?;
    let vars = Variables {
        // Load the persistent data from disk or use the default value
        persistent_data: Mutex::new(roboplc::state::load(STATE_FILE).unwrap_or_default()),
        ..Variables::default()
    };
    let mut controller = Controller::<Message, Variables>::new_with_variables(vars);
    controller.spawn_worker(StateSaver {})?;
    controller.register_signals(SHUTDOWN_TIMEOUT)?;
    controller.block();
    // Save the persistent data to disk before exiting
    roboplc::state::save(STATE_FILE, &*controller.variables().persistent_data.lock())?;
    Ok(())
}
