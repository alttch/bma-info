Custom I/O
**********

.. contents::

rPLC allows to spawn custom input and output tasks for
unsupported-out-of-the-box I/O protocols.

Let us review an example of a custom I/O which handles GPIO bus on Raspberry
Pi-compatible boards which simply routes GPIO #1 input signal to GPIO output #3
and GPIO #2 input to GPIO #4.

plc.yml
=======

.. literalinclude:: ../samples/custom_io_rpi_gpio/plc.yml
   :language: yaml

main.rs
=======

.. note::

    As well as program threads, I/O threads can not have names longer than 14
    symbols.

.. literalinclude:: ../samples/custom_io_rpi_gpio/src/main.rs
   :language: rust

Cargo.toml
==========

.. literalinclude:: ../samples/custom_io_rpi_gpio/Cargo.toml
   :language: toml

build.rs
========

.. literalinclude:: ../samples/custom_io_rpi_gpio/build.rs
   :language: rust
