External BUS/RT services
************************

.. contents::

Sometimes a program can not be built as EVA ICS service. However such programs
can still connect to EVA ICS bus and have all benefits as regular services
except having their processes managed by 3rd party software.

A clear example of such approach can be :doc:`rPLC <../../../rplc/index>`
instances or external Windows services which e.g. provide technologies
available on Microsoft Windows platform only.

External programs/services usually do not use EVA ICS SDK but use *eva_common*
and *busrt* directly.

Let us review a quick example of an external service launched on a Microsoft
Windows machine.

The task
========

The article provides a very basic external service example. External BUS/RT
connections are not visible in "eva svc list" however other bus members can
still call their RPC methods and receive bus events.

Let us create a service which handles two RPC methods.

Preparation
===========

To allow external connections to EVA ICS node, open BUS/RT port by editing
:ref:`eva4_config_bus`:

.. code:: shell

   eva edit config/bus

Add "- 0.0.0.0:7777" line to sockets array (as there is no strong
authentication in BUS/RT, in production it is highly recommended to use an
external IP of a private dedicated network only). Do not forget to restart EVA
ICS node after the bus configuration is modified.

Source code
===========

Cargo.toml
----------

.. literalinclude:: ../../sdk-examples/rust/external1/Cargo.toml
   :language: toml

main.rs
-------

.. literalinclude:: ../../sdk-examples/rust/external1/src/main.rs
   :language: rust

Registering the service in Windows
==================================

.. code:: shell

    SC create EVA.my.external.svc1 binPath=path\to\file.exe

Start/stop/manage the service using CLI or Windows service manager.

Calling RPC methods
===================

The service handles the following RPC methods:

* **test** returns an empty successful response

* **hello** returns "hi there" string

.. code:: shell

    # external svc methods can be still called with "svc call"
    eva svc call my.external.svc1 hello
