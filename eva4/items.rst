Items
*****

.. contents::

EVA ICS v4 has four types of items: "unit", "sensor", "lvar" and "lmacro".
External services can have more types, e.g.  ACLs, users, API keys, cycles and
rules, but "eva.core" and replication services operate only with the listed
ones.

EVA ICS v4 has the very minimal core logic for items. This allows to process
dozens million items on a single node without additional overhead.

Item types
==========

EVA ICS has the following item types, which are processed by :doc:`cores of
nodes<core>`. States of these items can be replicated (except stateless) and
actions can be called from any node in the cloud if allowed.

==================  =======  =======  ===========================================================
type                state    actions  purpose
==================  =======  =======  ===========================================================
:ref:`eva4_sensor`  **yes**  *no*     a hardware sensor or read-only PLC register
:ref:`eva4_unit`    **yes**  **yes**  a hardware unit (e.g. a relay) or PLC register
:ref:`eva4_lvar`    **yes**  *no*     a logical variable, not connected to equipment
:ref:`eva4_lmacro`  *no*     **yes**  a scenario (program/function), executed by PLC or a service
==================  =======  =======  ===========================================================

.. _eva4_sensor:

sensor
------

An item, which is usually mapped to some external equipment register or state.
Sensors are used for monitoring only and can not execute actions.

Sensor items have no additional fields.

.. _eva4_unit:

unit
----

An item, which is usually mapped to some external equipment register or state
and can accept actions (e.g. turn on, off etc.).

To execute actions, a unit must have "action" property in the format:

.. code:: yaml

    action:
      svc: service.id # a service, responsible for actions for this item
      timeout: N # float number, overrides the default core timeout
      config: null # optional property with parameters for the service

.. _eva4_lvar:

lvar
----

A logical variable, which has no direct mapping to hardware equipment and is
used by logical controllers / in interface logic.

lvars have no additional properties.

flags
~~~~~

If "lvar.reset" / "lvar.clear" bus RPC or HTTP API functions are called, its
state is changed correspondingly to 1 or 0. "lvar.toggle" method toggles lvar
state from 1 to 0 and vice-versa.

Any available lvar becomes a flag and can handle boolean logic, as soon as one
of the above methods is called.

timers
~~~~~~

In EVA ICS v4 items have no expiration time properties, however lvars can be
used as timers with the provided "expiration" service.

* as soon as "lvar.reset" is called, the timer is reset and countdown starts.
* as soon as a timer is expired, its status is set to -1
* "lvar.clear" method sets lvar status to 0 and stops the timer

If the timer progress needs to be shown in external applications or UI, it is
recommended to set meta/expires field to the timer value:

.. code:: yaml

  meta:
    expires: 5.0 # expires in 5 seconds

After, time before the expiration can be calculated with the formula:

    meta.expires + t - now

Where now = current time (timestamp) and t = item state set time.

.. _eva4_lmacro:

lmacro
------

lmacro items are various scenarios, which can be executed by logical
controllers. lmacro items have no states.

In EVA ICS v4 lmacro items can be scenarios, written in any language / format,
accepted by the assigned action service (see the chosen action service
documentation for more details, e.g. :doc:`svc/eva4-svc-controller-py`).

To execute actions, a lmacro must have "action" property in the same format as
units:

.. code:: yaml

    action:
      svc: service.id # a service, responsible for actions for this item
      timeout: N # float number, overrides the default core timeout
      config: null # optional property with parameters for the service

Creating and managing items
===========================

Items can be either created (e.g. with :ref:`eva4_eva-shell` command "item
create") or deployed (e.g. with eva-shell command "item deploy").

To change item properties, it needs to be re-deployed from scratch, if the item
has state, it is kept until the item is deleted.

The local deployment format for :ref:`eva4_eva-shell` is a list of items with
their properties:

.. code:: yaml

    - oid: unit:tests/door
      action:
        svc: eva.controller.virtual
        timeout: 5.0
      enabled: true
    - oid: unit:tests/u1
      enabled: true
    - oid: sensor:tests/temp
      enabled: true
    - oid: lvar:c1
      enabled: true
    - oid: lmacro:test/m1
      action:
        svc: eva.controller.py
        timeout: 5.0
      enabled: true

units, sensors and lvars can have "status" and "value" properties in the
deployment payload to set their initial states.

.. _eva4_state:

Item states
===========

Units, sensors and lvars have states, which are available as the read-only item
properties:

* **status** item status (int16), the default error status is -1

* **value** in EVA ICS v4, the value can contain any serializable type (number,
  string, boolean, list or object), however it is recommended to use only
  basics (number/string) to let values be correctly processed by standard
  logical controllers and database services

* **ieid** incremental event replication ID, a pair of 64-bit unsigned
  integers: the node boot counter and node monotonic time at the moment the
  item state has been changed. The field is used by the core and by various
  replication and HMI services

* **t** contains the state UNIX timestamp (float)

* **act** a read-only property, available only for units, which contains the
  number of pending/running actions.

Unlike v3, item status 0 does not mean that the item is disabled (all items
have got "enabled" property instead), however if an lvar has status=0, its
state can not be updated from raw bus events, unless forced.

Common item properties
======================

.. _eva4_oid:

OID
---

All items have "oid" (object id) property, which has the format:

    kind:group/subgroup/id

where kind is unit, sensor, lvar or lmacro. In EVA ICS v4 groups and subgroups
are optional. When transmuted to path (e.g. in pub/sub server topics), the
double-dot symbol is replaced with slash.

To select multiple items in various bus and HTTP API calls, use MQTT-style
wildcards:

* **+:group1/id1** - group1/id1 item of any kind
* **+:group1/+** all items in group1
* **+:group1/#** all items in group1 and its subgroups
* **sensor:#** all sensors
* **#** - all available items

meta
----

In EVA ICS v4 items have no fields such as "description", "location", etc.,
however there is a field "meta", which can contain any serializable value,
including structures with sub-fields.

enabled
-------

If set to false, items can not update their states from raw bus events, unit
and lmacro actions are disabled.

logic
-----

If set, contains the value logical range. If the item receives an event with an
out-of-range value, it is considered as failed and its status is set to -1,
until a valid value is received.

The property format:

.. code:: yaml

    logic:
      min: null # float or null, optional
      max: null # float or null, optional
      min_eq: true # if true, the range is greater or equal to "min", otherwise if greater
      max_eq: true # if true, the range is less or equal to "max", otherwise if less

as lmacro items have no states, they have no "logic" property as well.

connected
---------

A read-only property, for remote items, contains true if the remote node is
accessible for the replication service, which synchronizes the item. Local
items always have "connected=true".

node
----

A read-only property, contains the node name, where item is replicated from.
For local items, node name is always equal to the local system name.
