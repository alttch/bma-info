Quick start: A real task
************************

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

Make sure RoboPLC CLI is installed:

.. code:: shell

   cargo install roboplc-cli

And create a new RoboPLC project with *modbus* RoboPLC feature:

.. code:: shell

   robo new quickstart --features modbus

The Rust project is ready. Its *Cargo.toml* should look like:

.. code:: toml

   [package]
   name = "hello"
   version = "0.1.0"
   edition = "2021"

   [dependencies]
   roboplc = { version = "0.1", features = ["modbus"] }
   tracing = { version = "0.1", features = ["log"] }

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

