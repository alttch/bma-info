Persistent state
****************

RoboPLC provides a helper module to save and load the program persistent state.
The state can be shared between program instances on restart/reload events.

The state is saved into `/var/roboplc/data` folder, so it is purged on `purge`
manager command.

If the state file extension is `.json`, the state is saved in JSON format.
Otherwise, the state is saved in MessagePack.

.. contents::

Required features and 3rd party crates
======================================

* To enable JSON support, enable `json` feature of `roboplc` crate.

* To enable MessagePack support, enable `msgpack` feature of `roboplc` crate.

* Both serialization formats require `serde::Serialize` and
  `serde::Deserialize` traits to be implemented for the persistent state
  structure. Add `serde` crate to the dependencies:


.. code:: shell

   cargo add serde --features derive

Example
=======

Here is an example of a program which saves and loads the persistent state. In
case if the state is not found or failed to load, the default state is used.

.. literalinclude:: ./examples/state.rs
   :language: rust

Real-time safety
================

State load/save I/O operations may block the program execution if a mutex is
held. Consider testing the configuration before deploying it to the production.
The operation time depends on the number / size of variables and on the disk
device I/O speed.

Here are several ways to mitigate the issue:

* Use high-quality SSD, SD card or eMMC module with fast I/O speed.

* Minimize the number of variables in the persistent state.

* Clone the state before saving it to the disk.

* Serialize the state into a temporary `serde_json::Value` before calling
  `roboplc::state:save`.

* Use a custom `save` function which releases the mutex right after the data is
  serialized but before writing it to the disk.
