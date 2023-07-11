Virtual Modbus port
*******************

.. contents::

**sim-modbus-port** service simulates Modbus TCP and RTU ports. The ports are
mapped to real ones which means any equipment with Modbus support can connect
to the virtual Modbus and work with it the same way as with a real one.

A port is an entry point into virtual Modbus. All Modbus simulated devices are
assigned to a particular port service.

Deployment
==========

The virtual Modbus port is a standard EVA ICS v4 service and can be created as:

.. code:: shell

   eva svc create sim.modbus1.port /opt/eva4/sim/svc-tpl-sim-modbus-port.yml

where the service configuration template is:

.. literalinclude:: ../svc-tpl/svc-tpl-sim-modbus-port.yml
    :language: yaml

If binding to serial ports, ensure the service user has access to devices.

A single port service can listen on multiple TCP/serial ports if required.

EAPI
====

The service does not provide any EAPI methods.
