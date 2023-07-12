Virtual Modbus sensor
*********************

.. contents::

**sim-modbus-sensor** service simulates a Modbus sensor which can accept read
register commands.

Features provided
=================

The service provides a single (or multiple for data types longer than 16 bit)
holding or input register (*h@0* or *i@0*).

Using the *source/kind* field in the configuration, the service can modify the
register in the following way:

* **none** no modification. The register(s) can accept external write commands

* **random** a random value, changed once a second

* **timestamp** server timestamp, changed once a second

* **udp** gets values from UDP port (the value must be sent as raw bytes)

With *udp* source the sensor can read data from any external generator e.g.
from `Matlab Simulink <https://www.mathworks.com/products/simulink.html>`_. The
default Simulink UDP sink sends IEEE-754 64-bit floats only, set *long_float*
source parameter to *true* to automatically convert incoming numbers to the
desired data type.

Deployment
==========

.. include:: ../include/modbus-common.rst

.. code:: shell

   eva svc create sim.modbus1.sensor1 /opt/eva4/sim/svc-tpl-sim-modbus-sensor.yml

where the service configuration template is:

.. literalinclude:: ../svc-tpl/svc-tpl-sim-modbus-sensor.yml
    :language: yaml

EAPI methods
============

The following methods can be called via the local bus (see :doc:`../../eva4/eapi`):

.. include:: ../include/autogen/modbus_sensor.rst
