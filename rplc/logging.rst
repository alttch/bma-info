Logging
*******

.. contents::

Logging messages
================

rPLC automatically re-exports logging macros of `log
<https://crates.io/crates/log>`_ crate, which can be called directly:

.. code:: rust

    use rplc::prelude::*;

    fn main() {
        trace!("test");
        debug!("test");
        info!("test");
        warn!("test");
        error!("test");
    }

.. note::

    It is not recommended to log messages in high-frequency-called PLC
    programs.

Logging stats
=============

The library has got a method which can log thread statistical data (iterations,
jitters etc.) with the specified time interval:

.. code:: rust

    use rplc::prelude::*;
    use std::time::Duration;

    fn main() {
        init_plc!();
        rplc::tasks::spawn_stats_log(Duration::from_secs(5));
        run_plc!();
    }

Verbose logging
===============

By default the log level is "INFO" and below. Trace/debug logging can be
activated with setting the system environment variable "VERBOSE" to 1:

.. code:: shell

    VERBOSE=1 ./myplc

Syslog logging
==============

By default log messages are output to the standard output. The messages can be
redirected to syslog with setting the system environment variable "SYSLOG" to
1:

.. code:: shell

    SYSLOG=1 ./myplc

