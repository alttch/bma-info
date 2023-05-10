Modbus slave (server) I/O
*************************

.. contents::

Managing Modbus slave context is a bit more complicated as Modbus data can not
be sent directly from the PLC context due to different endianness (modern CPUs
generally use little-endian, while Modbus requires big-endian numbers) and
register layout.

.. note::

   The described functionality requires **modbus** crate feature.

Defining Modbus servers
=======================

The servers should be defined in PLC config YAML. One PLC can have unlimited
number of servers but all of them share the single Modbus context.

.. code:: yaml

    version: 1
    server:
      - kind: modbus
        config:
          proto: tcp # or rtu
          listen: host:port (e.g. 0.0.0.0:503)
          # for RTU e.g.
          #/dev/ttyS0:9600:8:N:1
          timeout: 1 # remote timeout
          maxconn: 5 # max connections

Thread names are auto-assigned and shared between all server connections. E.g.
the first defined Modbus server gets thread name *Ssrv1_modbus*. Modbus server
threads can be also assigned to dedicated CPUs (see :doc:`../realtime`) but all
threads of the same server share the same CPU and scheduler priority.

Defining Modbus context
=======================

In the context part of PLC config YAML, put the following:

.. code:: yaml

    # ....
    context:
      modbus:
        c: 1000
        d: 1000
        i: 1000
        h: 1000

This defines a context with 1000 coils, 1000 discretes, 1000 inputs and 1000
holding registers. The Modbus context is automatically available in :doc:`PLC
context <../context>` as *modbus* subfield.

PLC programs must read/write context data manually and parse/assign it to
another context variables if required. rPLC uses `rmodbus
<https://crates.io/crates/rmodbus>`_ as Modbus stack and Modbus context API
documentation can be found at
https://docs.rs/rmodbus/latest/rmodbus/server/context/struct.ModbusContext.html

Program example
===============

The :doc:`program <../programs>` uses the register *h0* as a 16-bit counter,
which is increased every time when coil #0 is set. 

.. code:: rust

    #[plc_program(loop = "500ms")]
    fn p1() {
      let mut ctx = plc_context_mut!();
      if ctx.modbus.get_coil(5).unwrap() { // get a coil
        let val = ctx.modbus.get_holding(0).unwrap();
        ctx.modbus.set_holding(0, val + 1).unwrap();
        ctx.modbus.set_coil(0, false).unwrap();
      }
    }

As the context size is strictly defined, it is usually safe to use unwraps
instead of checking context API calls for errors. However in production such
code should be precisely covered with tests to avoid PLC process panic.
