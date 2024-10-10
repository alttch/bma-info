A simple service in Rust
************************

.. contents::

As EVA ICS itself is written in Rust, the primary and recommended SDK is the
Rust one.

The task
========

Let us create a simple monitoring service, which monitors temperature sensors
and sends email notifications when temperature is above a threshold.

Creating a project
==================

Install `eva-lsl <https://crates.io/crates/eva-lsl>`_:

.. code:: shell

    cargo install eva-lsl

Create a new project:

.. code:: shell

    eva-lsl new svc-example-temp

The command will automatically create a new project with the service template
and add required dependencies. Alternatively, a new project can be created with
the regular `cargo` command:

.. code:: shell

    cargo new svc-example-temp

The service requires two EVA ICS crates:

* `eva-sdk <https://crates.io/crates/eva-sdk>`_ - provides the primary service
  SDK methods and structures

* `eva-common <https://crates.io/crates/eva-common>`_ - the common crate, used
  both in EVA ICS and 3rd party services

and few additional:

.. literalinclude:: ../../sdk-examples/rust/svc-example-temp/Cargo.toml
   :language: toml

Open *src/main.rs* and let us continue.

Preparing the system
====================

* Deploy an instance of :doc:`../../svc/eva-svc-mailer`
* Create a couple of sensors with :ref:`eva4_eva-shell`:

.. code:: shell

    eva item create sensor:sdktest/temp1
    eva item create sensor:sdktest/temp2

In this example, the sensors are not mapped to real equipment, but their state
values can be changed with :ref:`eva4_eva-shell` manually, as the following:

.. code:: shell

    eva item set sensor:sdktest/temp1 1 -v20

Service code
============

Here is the service code, guided with comments:

.. literalinclude:: ../../sdk-examples/rust/svc-example-temp/src/main.rs
   :language: rust

Service template
================

The following template can be used to quickly create a service instance with
:ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create my.svc.alarm_temp svc-tpl.yml

.. literalinclude:: ../../sdk-examples/rust/svc-example-temp/svc-tpl.yml
   :language: yaml

Testing the service
===================

Temporarily disable the service instance, executed by the node launcher:

.. code:: shell

    eva svc disable my.svc.alarm_temp

After the service code is ready and the configuration is deployed, the service
can be tested locally using `eva-lsl <https://crates.io/crates/eva-lsl>`_:

.. code:: shell

    eva-lsl run my.svc.alarm_temp

If the EVA ICS node is on a remote machine, append `-b` (`--bus`) parameter and
make sure the node bus accepts remote connections (`eva edit config/bus`).
