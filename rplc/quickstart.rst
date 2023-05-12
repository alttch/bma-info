Quick start
***********

.. contents::

The task
========

Consider there is a Modbus temperature sensor which outputs data as IEEE754
float. The data is stored in the holding registers 0-1.

There is also a fan, controlled with Modbus relay, which turns on when the coil
0 is 1.

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

   cargo add rplc --build --features modbus
   cargo add rplc --features modbus

The Rust project is ready. Its *Cargo.toml* should look like:

.. literalinclude:: ./samples/quickstart/Cargo.toml
   :language: toml

Creating PLC configuration
==========================

Create a file named *plc.yml* in the project's root directory:

.. literalinclude:: ./samples/quickstart/plc.yml
   :language: yaml

What does the config contain?

* The PLC context with variables *temperature* (REAL) and *fan* (BOOL). These
  IEC-61131 data types correspond to Rust f32 (32-bit float) and bool
  (boolean). When describing the context, both IEC-61131 and native Rust data
  type names can be used. The context can also contain structures, arrays and
  custom data types.

* The single I/O point named *modbus1* which contains a single input block for
  holding registers 0-1, mapped to the context variable *temperature* and a
  single output block for the context variable *fan*, mapped to the coil 0.
  Both blocks are synchronized with the same Modbus TCP slave device every 500
  milliseconds. Block mappings (both input and output) can contain multiple
  variables with different data offsets. In this example offsets are zero so
  they can be omitted. If we were using the data offsets, the full data mapping
  would have been looking as:

.. code:: yaml

    # ....
    map:
      - target: temperature
        offset: 0
    # ....

Building PLC context and I/O
============================

To automatically generate Rust code for PLC context and input/output
operations, create a file named *build.rs* and put it into the project's root
directory:

.. literalinclude:: ./samples/quickstart/build.rs
   :language: rust

What does it do?

* It tells the Rust compiler to call rPLC builder to automatically generate a
  module named *plc* in the project's source folder.

* The module is automatically re-generated if required every time our PLC
  program is compiled.

The module must be included into our PLC program, however its files and methods
should be neither edited manually nor called directly. The directory *src/plc*
can be also safely added into the project's *.gitignore*.

Creating our first PLC program
==============================

Open the program file *src/main.rs* and edit it as the following:

.. literalinclude:: ./samples/quickstart/src/main.rs
   :language: rust

What does it contain:

* It imports *rplc::prelude* methods and macros to init and run the PLC.

* It contains a single PLC program named *tempmon* which is executed every 200
  milliseconds. The attribute *plc_program* automatically generates a function
  *tempmon_spawn*, which must be called before running the PLC to register the
  PLC program. The function automatically spawns PLC program loop.

* According to the temperature, the program sets the fan either to *true* (on)
  or to *false* (off).

* The context variables *temperature* and *fan* are automatically synchronized
  with PLC I/O, according to the PLC config settings.

Let us run it:

.. code:: shell

   cargo run

Our first PLC program is ready and works. To stop it, either press Ctrl+C or
send SIGTERM signal to the process.

To compile the program for production, do not forget to add *release* option to
cargo:

.. code:: shell

   cargo build --release

The release binary will be available in *./target/release/* directory.

Program threads
===============

rPLC spawns dedicated threads for each PLC program and I/O block. This allows
to perform thread fine-tuning for CPU affinity and priority scheduling. The
sample program contains the threads named as:

* **Imodbus1_1** Modbus input thread, the prefix *I* stands for "input"
* **Omodbus1_1** Modbus output thread, the prefix *O* stands for "output"
* **Ptempmon** PLC program thread, the prefix *P* stands for "program"

There is also a thread named *quickstart* which is the primary thread of our
program. And several service threads, prefixed with *S*.

The full list of threads can be obtained either with the shell command:

.. code:: shell

    ps -T -o pid,psr,spid,comm,priority -p $(cat /tmp/quickstart.pid )

Or with *rplc* command-line tool:

.. code:: shell

    rplc stat quickstart

By default PLC programs create their *pid* and other files in the system
temporary directory. This behavior can be changed by setting *PLC_VAR_DIR*
system environment variable. If *rplc* CLI tool is used, the variable must be
set as well before calling it.

Going real-time
===============

Perform CPU isolation, as described in :doc:`realtime`.

After, assign PLC threads to CPU #7 and set their priorities:

.. note::

   This operation requires the process to be started under root.

.. code:: shell

   PLC_THREAD_AFFINITY_Imodbus1_1=7,50 \
       PLC_THREAD_AFFINITY_Omodbus1_1=7,50 \
       PLC_THREAD_AFFINITY_Ptempmon=7,50 ./quickstart

All the threads are automatically assigned to CPU #7 and share it using the
same priority.

This can be verified by calling

.. code:: shell

    rplc stat quickstart

The output should show all the threads assigned to CPU #7 and their priority
(50).

More samples
============

See https://github.com/eva-ics/rplc/tree/main/samples
