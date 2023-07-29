PLC programs
************

.. contents::

PLC programs are threads which perform data processing.

Defining
========

One PLC can have as many programs as required. The programs automatically run
periodically, with the specified intervals.

.. code:: rust

    use rplc::prelude::*;

    #[plc_program(loop = "500ms")]
    fn p1() {
        // do something
    }

    #[plc_program(loop = "100ms")]
    fn p2() {
        // do something
    }

When defining a loop, use "s" for seconds, "ms" for milliseconds, "us" for
microseconds.

.. note::

   PLC program name (function name) can not be longer than 14 symbols.

Shifting
========

If PLC programs interfere each other, their loops can be shifted:

.. code:: rust

    use rplc::prelude::*;

    #[plc_program(loop = "500ms")]
    fn p1() {
        // do something
    }

    #[plc_program(loop = "500ms", shift = "200ms")]
    fn p2() {
        // do something
    }

In the above example, program *p2* loop is spawned after 200ms delay.

Spawning
========

PLC program threads must be spawned manually after PLC initialization. The
proc-macro attribute *plc_program* automatically defines a function
*<program_name>_spawn*, which spawns the program loop:

.. code:: rust

    fn main() {
        init_plc!();
        p1_spawn();
        p2_spawn();
        run_plc!();
    }

If a program is not spawned, it is ignored by PLC.

Thread names
============

PLC programs have their thread names prefixed with *P*. E.g. *p1 = Pp1*.
