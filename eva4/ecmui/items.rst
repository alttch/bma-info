Items
*****

The page monitors EVA ICS :doc:`items <../items>`.

.. contents::

Displaying items
================

By default, the monitoring table is empty, as the node may contain millions of
items. Enter item OID or mask (MQTT-style wildcard, e.g. sensor:group/#) in the
filter field and reload the table (or wait for the auto-reload).

.. figure:: ss/items_filter.png
    :scale: 30%

.. note::

    For heavy-loaded nodes it is highly recommended to stop auto-reload before
    entering the mask

Unit actions
============

To start a :ref:`eva4_unit` action, right-click a unit in the monitoring table
and select "Action" or "Action toggle".

.. figure:: ss/action.png
    :scale: 30%

If the value check-box is not checked, the action is executed with status
parameter only.

Running lmacros
===============

To run a :ref:`eva4_lmacro`, right click a lmacro in the monitoring table and
select "Run".

.. figure:: ss/run.png
    :scale: 30%

Lvar operations
===============

.. figure:: ss/lvar_ops.png
    :scale: 20%

Lvar set
--------

To set a :ref:`eva4_lvar` value, right-click lvar in the monitoring table and
select "Lvar ops -> Set"

.. figure:: ss/lvar_set.png
    :scale: 30%

Other lvar operations
---------------------

Lvar operations "reset", "clear", "toggle", "increment" and "decrement" are
performed on all lvars selected in the monitoring table.

Watching item states
====================

Right-click on an item with state (:ref:`eva4_unit`, :ref:`eva4_sensor` or
:ref:`eva4_lvar`) and select "Watch".

.. figure:: ss/item_watch.png
    :scale: 30%

An item watch dialog will be opened. The application can watch multiple items
at once as well.

Watching item state is useful when performing setup tasks, monitoring the
system stability.

Opening the same item on multiple nodes allows to monitor :doc:`node
replication <../svc/eva-repl>`.
