Virtual Modbus generic context
******************************

.. contents::

**sim-modbus-generic** service simulates a generic Modbus slave device which
can accept read and write register commands.

Features provided
=================

A standard Modbus context with 10 000 registers of all types (coils, discretes,
inputs and holdings).

The service itself does not modify Modbus registers in any way.

Deployment
==========

.. include:: ../include/modbus-common.rst

.. code:: shell

   eva svc create sim.modbus.generic /opt/eva4/sim/svc-tpl-sim-modbus-generic.yml

where the service configuration template is:

.. literalinclude:: ../svc-tpl/svc-tpl-sim-modbus-generic.yml
    :language: yaml

EAPI methods
============

The following methods can be called via the local bus (see :doc:`../../eva4/eapi`):

.. include:: ../include/autogen/modbus_generic.rst
