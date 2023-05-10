Custom building
***************

.. contents::

Config variables
================

PLC configuration YAML is pre-processed as `Tera template
<https://tera.netlify.app>`_ which means it can contain logic blocks and
variables.

E.g. let us define Modbus path with a variable in a Modbus I/O block:

.. code:: yaml

    # .....
    io:
      - id: modbus1
        kind: modbus
        config:
          proto: tcp
          path: "{{ modbus1_path }}"

Assigning the variables
=======================

If defined in PLC config, all the variables must be assigned otherwise the
builder stops with an error. To assign the variables, put the following code
into *build.rs*:

.. code:: rust

    fn main() {
        let mut builder = rplc::builder::Builder::new("plc.yml");
        builder.insert("modbus1_path", "192.168.1.100:503");
        builder.generate().unwrap();
    }
