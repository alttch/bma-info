Quick start
***********

.. contents::

The task
========

Consider there is a Modbus (unit 1) temperature sensor which outputs data as
IEEE754 float. The data is stored in the holding registers 0-1.

There is also a fan, controlled with Modbus relay (unit 2), which turns on when
the coil 0 is 1.

Let us create a monitoring program, which turns the fan on when the temperature
goes above 30 degrees and off when it goes below 25.

Creating a new Rust project
===========================

If Rust is not installed yet, install it using instructions from
https://www.rust-lang.org/tools/install

Then execute

.. code:: shell

   cargo new quickstart
   cd quickstart

   cargo add roboplc --features modbus
   cargo add tracing --features log

The Rust project is ready. Its *Cargo.toml* should look like:

.. code:: toml

   [package]
   name = "quickstart"
   version = "0.1.0"
   edition = "2021"

   [dependencies]
   roboplc = { version = "0.1", features = ["modbus"] }
   tracing = { version = "0.1", features = ["log"] }

The *tracing* crate will be used for logging. It is not a mandatory thing, the
logging can be done in any other preferred way.

Program code
============

Let us review the program code with comments included. A few notes:

* In RoboPLC data exchange between workers can be performed in both traditional
  way: using shared variables. And using a centralized `data hub
  <https://docs.rs/roboplc/latest/roboplc/hub/struct.Hub.html>`_ with real-time
  channels. The last one way is preferred, as it allows to perfectly
  synchronize workers, minimizes event latency and can be used not only in
  traditional industrial automation applications but also in real-time
  robotics.

* All workers are usually configured as real-time threads, assigned to specific
  CPU cores and have got real-time scheduling policies and priorities.

.. literalinclude:: ./examples/quickstart.rs
   :language: rust

Configuring the remote
======================

How we need to prepare the remote (a board, an industrial computer etc.) to run
the program. To do this, see :doc:`configuring` section.

Flashing
========

RoboPLC provides a very easy way to flash the program to the remote. Install
**roboplc-cli** tool:

.. code:: shell

   cargo install roboplc-cli

Create a file *robo.toml* in the project root directory with the following content:

.. code:: toml

   [remote]
   url = "http://IP:7700"
   key = "roboplc"

where *IP* is the remote IP address.

Then execute:

.. code:: shell

   robo flash --run

The tool will do all the necessary steps to build the program and to flash the
binary to the remote. The program on the remote machine will be started
automatically.

See more: :doc:`flashing`.
