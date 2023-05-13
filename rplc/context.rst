PLC context
***********

.. contents::

PLC context is the single common variable space where PLC program threads and
I/O exchange data. 

The context is automatically generated and placed under a read-write lock.

Defining
========

The context is defined in the PLC configuration (e.g. *plc.yml*) as

.. code:: yaml

    context:
      fields:
        var1: REAL
        var2: DINT
        var3: BOOL

Data types
----------

The context may contain the following IEC-61131 data types, which are
automatically translated into Rust data types:

============  ======  =======================
IEC           Rust    Description
============  ======  =======================
BOOL          bool    Boolean
BYTE, USINT   u8      8-bit unsigned integer
WORD, UINT    u16     16-bit unsigned integer
DWORD, UDINT  u32     32-bit unsigned integer
LWORD, ULINT  u64     64-bit unsigned integer
SINT          i8      8-bit signed integer
INT           i16     16-bit signed integer
DINT          i32     32-bit signed integer
LINT          i64     64-bit signed integer
REAL          f32     32-bit float
LREAL         f64     64-bit float
============  ======  =======================

Rust data types can be used directly as well with no limitations.

Arrays
------

Arrays can be defined in both IEC-61131-way:

.. code:: yaml

    context:
      fields:
        vars: REAL[4]

or in a Rust way:

.. code:: yaml

    context:
      fields:
        vars: "[f32; 4]"

Structures
----------

If a context field as got sub-fields, they are automatically translated into a
structure:

.. code:: yaml

    context:
      fields:
        struct1:
          var1: BOOL
          var2: UINT

Arrays of structures
--------------------

Arrays of structures can be defined as:

.. code:: yaml

    context:
      fields:
        "struct1[10]":
          var1: BOOL
          var2: UINT

Custom types
------------

If custom types are required in the context, they must be placed into
*plc_types* crate module. If found, the module is automatically imported into
the context.

.. code:: yaml

    context: 
      fields:
        timer1: Duration # another way is use the full path: std::time::Duration
        data: MyStruct

*main.rs*:

.. code:: rust

    mod plc_types;

*plc_types.rs*:

.. code:: rust

    pub use std::time::Duration; // external data type re-export

    #[derive(Default)]
    struct MyStruct {
        var1: bool,
        var2: f32
    }

.. note::

    All custom types MUST implement the Default trait.

Accessing
=========

As already mentioned, the context is placed under a read-write lock
(*parking_lot::RwLock*). To prevent other threads, including I/O ones, getting
stuck, the context should always be unlocked for a minimal period of time,
especially if heavy calculations are planned.

With macros
-----------

.. code:: rust

    use rplc::prelude::*;

    mod plc;

    #[plc_program(loop = "500ms")]
    fn p1() {
        let mut var1 = {
            let ctx = plc_context!(); // context is read-locked
            ctx.var1
        } // context is freed
        // perform some heavy calculations
        {
            let mut ctx = plc_context_mut!(); // context is read-write-locked
            ctx.var1 = var1;
        } // context is freed
    }

Directly
--------

The context can be accessed directly as:

.. code:: rust

    use rplc::prelude::*;

    mod plc;

    use plc::context::CONTEXT;

    #[plc_program(loop = "500ms")]
    fn p1() {
        let var1 = { // context is read-locked
            let ctx = CONTEXT.read();
            ctx.var1
        } // context is freed
        // ....
    }

Serialization
=============

The context structures are created in C-representation (repr(C)) which allows
to send them to externally linked C or Structured Text methods as-is.

Additionally, the context can be declared as `Serde <https://serde.rs>`_
(de)serializable:

.. code:: yaml

    context:
      serialize: true
      fields:
        var1: BOOL
        var2: REAL

After, the context or its part can be e.g. loaded and saved using e.g.
MessagePack, JSON or any other data packer:

.. code:: rust

    use std::fs;

    fn main() {
        init_plc!();
        if let Ok(data) = fs::read("plc.dat") {
            info!("loading context");
            // pointer dereference is not required if a part is loaded
            *plc_context_mut!() = rmp_serde::from_slice(&data).unwrap();
        }
        run_plc!();
        fs::write(
            "plc.dat",
            // pointer reference-dereference is not required if a part is saved
            rmp_serde::to_vec_named(&*plc_context!()).unwrap(),
        )
        .unwrap();
    }

.. note::

   If custom types are used, all of them MUST implement serde::Serialize and
   serde::Deserialize.
