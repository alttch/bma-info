Virtual ADS service
*******************

.. contents::

**sim-ads-service** service simulates a generic ADS service. The service can be
bound to any AMS address/port.

Features provided
=================

A standard ADS context plus the majority of ADS API methods.

Deployment
==========

.. include:: ../include/ads-common.rst

.. code:: shell

   eva svc create sim.ads1.plc1 /opt/eva4/sim/svc-tpl-sim-ads-service.yml

where the service configuration template is:

.. literalinclude:: ../svc-tpl/svc-tpl-sim-ads-service.yml
    :language: yaml

EAPI methods
============

The following methods can be called via the local bus (see :doc:`../../eva4/eapi`):

.. include:: ../include/autogen/ads_service.rst
