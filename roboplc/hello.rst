Quick start: Hello world
************************

.. contents::

Let us create a simple program which contains a single worker. The worker has
got a 1-ms cycle and prints a number of cycles elapsed every 10k cycles.

Creating a new Rust project
===========================

If Rust is not installed yet, install it using instructions from
https://www.rust-lang.org/tools/install

Then install RoboPLC CLI:

.. code:: shell

   cargo install roboplc-cli

And create a new RoboPLC project:

.. code:: shell

   robo new hello

The Rust project is ready. Its *Cargo.toml* should look like:

.. code:: toml

   [package]
   name = "hello"
   version = "0.1.0"
   edition = "2021"

   [dependencies]
   roboplc = "0.1"
   tracing = { version = "0.1", features = ["log"] }

The *tracing* crate is added by default for logging. It is not a mandatory
thing, the logging can be done in any other preferred way.

Program code
============

The file *src/main.rs* contains the default code for the new project. Modify
the function *run* of the *Worker1* to look like:

.. code:: rust

    fn run(&mut self, _context: &Context<(), ()>) -> WResult {
        for (cycles, _) in roboplc::time::interval(Duration::from_millis(1)).enumerate() {
            if cycles % 10_000 == 0 {
                tracing::info!(cycles, worker = self.worker_name(), "stats");
            }
        }
        Ok(())
    }

The full code should look like:

.. literalinclude:: ./examples/hello.rs
   :language: rust

Configuring the remote
======================

How we need to prepare the remote (a board, an industrial computer etc.) to run
the program. To do this, see :doc:`config` section.

Flashing
========

RoboPLC provides a very easy way to flash the program to the remote. Install
**roboplc-cli** tool:

Modify the file *robo.toml* in the project root directory with the following
content:

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
