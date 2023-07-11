Virtual Modbus relay
********************

.. contents::

**sim-modbus-relay** service simulates 8-port Modbus relay.

Features provided
=================

The service provides either 8 coil registers (*c@0-7*) or a single holding
(*h@0*) register with bits mapped to relay ports.

Deployment
==========

.. include:: ../include/modbus-common.rst

.. code:: shell

   eva svc create sim.modbus1.relay1 /opt/eva4/sim/svc-tpl-sim-modbus-relay.yml

where the service configuration template is:

.. literalinclude:: ../svc-tpl/svc-tpl-sim-modbus-relay.yml
    :language: yaml

EAPI methods
============

The following methods can be called via the local bus (see :doc:`../../eva4/eapi`):

.. include:: ../include/autogen/modbus_relay.rst
