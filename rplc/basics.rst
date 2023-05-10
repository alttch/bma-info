Basics
******

.. contents::

Function "main"
===============

The main function should look like

.. code:: rust

    use rplc::prelude::*;

    fn main() {
        init_plc!();
        // spawn programs
        p1_spawn();
        p2_spawn();
        // spawn custom I/O
        run_plc!();
    }

PLC status
==========

When spawned, I/O and program threads do not start to run tasks in interval
loops instantly, the tasks are waiting for the specific PLC status.

The current PLC status can be obtained with a method:

.. code:: rust

    let status = rplc::tasks::status();

There is also a method to obtain is PLC active or not:

.. code:: rust

   // equal to rplc::tasks::status() == rplc::tasks::Status::Active
   let active = rplc::tasks::is_active(); 

===========  ====  =============================================================
Status       Code  Description 
===========  ====  =============================================================
INACTIVE     0     PLC is launched
STARTING     1     run_plc!() is called
SYNCING      2     Input threads start running
PREPARING    3     Program threads start running
ACTIVE       100   All I/O threads and programs are active
STOPPING     -1    PLC is shutting down, all input and program threads must quit
STOPSYNCING  -2    All outputs must be executed once and quit
STOPPED      -100  All threads are stopped
===========  ====  =============================================================

.. note::

    After PLC goes to SYNCING state, no new I/O or program threads can be
    spawned.

Shutdown
========

Timeout
-------

By default, PLC process has 30 seconds to stop. After the PLC process forcibly
terminates itself. This timeout can be modified in PLC build config (e.g.)
*plc.yml*:

.. code:: yaml

    version: 1
    core:
      stop_timeout: 60 # prolong the timeout to 60 seconds

Custom shutdown function
------------------------

A custom shutdown function can be defined. The function is called when PLC goes
to STOPPING state. The function can modify the context, e.g. turn off the
equipment. After the function call is finished, PLC ensures all output tasks
are executed at least once to synchronize modified context variables with
external equipment.

.. code:: rust

    fn shutdown() {
        warn!("shutting down");
        let mut ctx = plc_context_mut!();
        ctx.fan = false;
        ctx.fan2 = false;
        ctx.fan3 = false;
        ctx.fan4 = false;
        warn!("shutdown program completed");
    }

    fn main() {
        init_plc!();
        rplc::tasks::on_shutdown(shutdown);
        // ......
    }


Building PLC context and I/O
============================

To automatically generate Rust code for PLC context and input/output
operations, create a file named *build.rs* and put it into the project's root
directory:

.. code:: rust

    fn main() {
        rplc::builder::generate("plc.yml").unwrap();
    }

Control files
=============

When started, the process creates a "pid" file *processname.pid* and API socket
*processname.plcsock* in the system temporary directory or in the directory
specified in *PLC_VAR_DIR* system environment variable.

Error handling
==============

* Program and custom I/O tasks MUST NOT panic

* Custom I/O launchers and the main function can panic on errors

* rPLC panic handler immediately stops the whole process if any tread goes to
  panic
