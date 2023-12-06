FFI (foreign-function-interface) service launcher executes services, compiled
as shared libraries.

The approach is very useful as it allows to combine power of Rust and Tokio
asynchronous runtime with any compiled programming language, which can output
shared libraries for Linux and supports a standard C-style ABI.

.. note::

   The provided FFI service build is compiled dynamically and does not work
   on MUSL-based Linux systems (e.g. Alpine). Consider either building the
   service from source code or contact the product vendor for support.

Command-line arguments
======================

Unlike other services, the launcher is configured with command-line arguments.
This is because "config" field of the service parameters payload is passed to
the loaded shared library.

The arguments are:

* **<LIBRARY_PATH>** path to the shared library (absolute or relative to EVA
  ICS directory), mandatory

* **\--command-queue-size <NUMBER>** size of the bus command queue (default:
  8192). Should be raised for services which have temporary load peaks. If the
  queue is full, commands coming from the service library are dropped with an
  error.

* **\--blocking-fp** turns on blocking frame processing. By default pub/sub bus
  frames are processed in background, which causes random processing ordering.
  If the ordering is important (e.g. a service watches state of an item,
  managed by another one), the option must be turned on. In this case frames
  are processed one-by-one and **svc_on_frame** method blocks the bus
  connection until finished.
