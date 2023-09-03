Virtual ADS port
*****************

.. contents::

**sim-ads-port** service simulates ADS TCP ports. The ports are mapped to real
ones which means any equipment with ADS support can connect to the virtual
ADS and work with it the same way as with a real one.

A port is an entry point into virtual AMS. All AMS simulated devices are
assigned to a particular port service.

Deployment
==========

The virtual ADS port is a standard EVA ICS v4 service and can be created as:

.. code:: shell

   eva svc create sim.ads1.port /opt/eva4/sim/svc-tpl-sim-ads-port.yml

where the service configuration template is:

.. literalinclude:: ../svc-tpl/svc-tpl-sim-ads-port.yml
    :language: yaml

EAPI methods
============

The following methods can be called via the local bus (see
:doc:`../../eva4/eapi`):

.. include:: ../include/autogen/ads_port.rst
