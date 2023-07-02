Controller modes
================

The service works in two modes: Simple and PLC Simulation. The approach can be
mixed in the service configuration (part of items can be mapped to virtual PLC
variables while part can be mapped as simple virtual items).

Simple
------

If a simple configuration is used (no pull/action map), the service simulates
virtual items, which states can be set via bus calls or actions.

The virtual items are mapped to EVA ICS node core as-is.

PLC simulation
--------------

When *pull* / *action_map* configuration fields are set, the service starts
simulating fieldbus controller gateway behaviour, providing the same EAPI
methods as fieldbus controllers to get/set PLC variables. This approach is
useful when it is required to debug fieldbus mappings and events.

In PLC simulation mode item states/actions are mapped to virtual PLC variables.

The virtual variable table is stored in EVA ICS registry automatically at the
service instance shutdown.

PLC variables/tag IDs can be set in any format. The variables support array
indexing (*VAR[idx]* or *VAR[start-end]*) as well.

.. note::

   In PLC simulation mode the service still uses virtual item table. It is
   recommended to set *auto_create* configuration field to *true*.
