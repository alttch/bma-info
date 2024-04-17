// Importing all the necessary stuff for the Modbus communication
use roboplc::io::modbus::prelude::*;
// Importing all the necessary stuff for the controller
use roboplc::prelude::*;
// The interval component is used to create interval loops
use roboplc::time::interval;
// Logging macros from tracing crate
use tracing::{error, info};

// Define the timeout for the Modbus communication
const MODBUS_TIMEOUT: Duration = Duration::from_secs(1);

// Define the timeout for the shutdown. In RoboPLC the shutdown timeout is very important, after
// the program is forcibly terminated with SIGKILL.
const SHUTDOWN_TIMEOUT: Duration = Duration::from_secs(1);

// Message class, to exchange data via the controller's hub
#[derive(DataPolicy, Clone)]
enum Message {
    // The is only one event class: temperature. RoboPLC channels can work as traditional channels
    // but also allow to apply different delivery policies if necessary. Here delivery policy is
    // single, which means that only the last value is delivered in case if a receiver is unable to
    // process the data in time.
    #[data_delivery(single)]
    Temperature(f32),
}

// Let us define a shared variables type. In this example it is not used, however still required
// for the controller and workers.
type Variables = ();

// In RoboPLC the majority of data communication is performed with structures, which are
// encoded/decoded using [`binrw`] crate. The crate is re-exported by the RoboPLC. For Modbus, the
// data is automatically encoded/decoded in big-endian format.
#[binrw]
struct Sensor {
    temperature: f32,
}

// The relay structure, contains a single coil. As [`binrw`] can not work with booleans, coils and
// inputs must be specified as bytes.
#[binrw]
struct Relay {
    state: u8,
}

// Modbus puller worker. The derive macro `WorkerOpts` automatically implements the required
// `WorkerOptions` trait, which provides the worker name, CPU, scheduling, priority and other
// options.
#[derive(WorkerOpts)]
// This worker is assigned to CPU 1, with FIFO scheduling, priority 50. The worker name is not
// specified, so it will be automatically generated from the structure name.
#[worker_opts(cpu = 1, scheduling = "fifo", priority = 50)]
struct Puller {
    // Modbus register mapping
    sensor_mapping: ModbusMapping,
}

// Worker implementation
impl Worker<Message, Variables> for Puller {
    // The method `run` is mandatory for each worker.
    fn run(&mut self, context: &Context<Message, Variables>) -> WResult {
        let hub = context.hub();
        // let us pull the sensor every 500ms and send the temperature via the hub
        for _ in interval(Duration::from_millis(500)) {
            match self.sensor_mapping.read::<Sensor>() {
                Ok(v) => hub.send(Message::Temperature(v.temperature)),
                Err(e) => {
                    error!(worker=self.worker_name(), err=%e, "Modbus pull error");
                }
            }
            // Stop the worker in case if the controller goes to `stopping` state (got SIGTERM or
            // SIGINT or terminated in any other way).
            if !context.is_online() {
                break;
            }
        }
        Ok(())
    }
}

// The worker which analyzes the temperature and controls the fan. The worker is also assigned to
// CPU 1, with the same real-time parameters.
//
// `blocking = true` means that the worker is blocking and the controller must not wait for it to
// finish, as the worker continously reads the hub's channel. If such workers need to be shut down
// gracefully, consider introducing a special shutdown message event, but it will be overhead for
// the current example.
#[derive(WorkerOpts)]
#[worker_opts(cpu = 1, scheduling = "fifo", priority = 50, blocking = true)]
struct FanControl {
    fan_mapping: ModbusMapping,
}

impl Worker<Message, Variables> for FanControl {
    fn run(&mut self, context: &Context<Message, Variables>) -> WResult {
        let hub = context.hub();
        // Register a receiver in the hub, with a condition to receive temperature messages only.
        let hc = hub.register(self.worker_name(), event_matches!(Message::Temperature(_)))?;
        for msg in hc {
            match msg {
                Message::Temperature(temp) => {
                    // Process the logic
                    info!(temp);
                    let state = if temp > 30.0 {
                        Some(1)
                    } else if temp < 25.0 {
                        Some(0)
                    } else {
                        None
                    };
                    // In case if a relay command is required, send it to the Modbus
                    if let Some(state) = state {
                        let relay_state = Relay { state };
                        if let Err(e) = self.fan_mapping.write(&relay_state) {
                            error!(worker=self.worker_name(), err=%e, "Modbus send error");
                        }
                    }
                }
            }
        }
        Ok(())
    }
}

// The main function of the program
fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Setup the panic handler. RoboPLC provides a custom panic handler, which immediately kills
    // the process with SIGKILL, no matter in which thread the panic occurs.
    roboplc::setup_panic();
    // Configure the logger. RoboPLC automatically configures the logger to log messages to
    // stdout, with no timestamp if started by systemd.
    roboplc::configure_logger(roboplc::LevelFilter::Info);
    // RoboPLC considers the mode as "production" if the program is started by systemd.
    if !roboplc::is_production() {
        // The method sets "simulated" mode, which means all real-time settings such as scheduling,
        // CPU affinity and etc. are ignored. It is useful for debugging and testing the program on
        // a local machine.
        roboplc::thread_rt::set_simulated();
    }
    // The controller instance
    let mut controller: Controller<Message, Variables> = Controller::new();
    // Create a TCP client for the Modbus communication. RoboPLC provides own types for TCP and
    // serial communication, which automatically handle reconnection if required. The types also
    // provide API for thread-safe socket sharing and locking it exclusively.
    let modbus_tcp_client = roboplc::comm::tcp::connect("10.90.34.111:5505", MODBUS_TIMEOUT)?;
    // Create a Modbus mapping for the sensor: unit 1, holding register 0, 2 registers.
    let sensor_mapping = ModbusMapping::create(&modbus_tcp_client, 1, "h0", 2)?;
    // Create and spawn the puller worker
    let puller_worker = Puller { sensor_mapping };
    controller.spawn_worker(puller_worker)?;
    // Create a Modbus mapping for the fan: unit 2, coil 0
    let fan_mapping = ModbusMapping::create(&modbus_tcp_client, 2, "c0", 1)?;
    // Create and spawn the fan control worker
    let fan_control_worker = FanControl { fan_mapping };
    controller.spawn_worker(fan_control_worker)?;
    // Register SIGINT and SIGTERM handlers with the maximum shutdown timeout
    controller.register_signals(SHUTDOWN_TIMEOUT)?;
    // Block the main thread until the controller is stopped
    controller.block();
    Ok(())
}
