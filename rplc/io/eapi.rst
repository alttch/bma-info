EVA ICS v4 EAPI
***************

.. contents::

rPLC can be connected to :doc:`EVA ICS v4 <../../eva4/index>` via native BUS/RT
and use API to accept actions and synchronize variables with EVA ICS
:doc:`items <../../eva4/items>`.

.. note::

   The described functionality requires **eva** crate feature.

Action pool size
================

The default action pool size is 1, meaning there can be only a single action
running. Despite context actions are atomic (they only set context variables to
specified values), the pool can be increased with the top-level field in PLC
YAML configuration:

.. code:: yaml

    eapi:
      action_pool_size: 4

Block configuration
===================

EAPI I/O should be defined in PLC config YAML as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: eapi
      input:
        # input block configurations (array)
      output:
        # output block configurations (array)

rPLC process can be connected only to one EVA ICS node so the only one I/O
block should be used.

Input blocks
============

Input blocks (actions) should be defined as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: eapi
      input:
        - action_map:
          - oid: unit:tests/u1
            status: st1 # a 16-bit integer variable
          - oid: unit:tests/u2
            status: st2 # a 16-bit integer variable
            value: u2_val
      output:
        # ....

The variables are set as soon as the PLC process receives an action from the
connected EVA ICS node.

.. note::

   Actions do not synchronize variables/items with EVA ICS automatically. To
   synchronize a variable it must be present in an output block.

Output blocks
=============

Output blocks should be defined as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: opcua
      config:
        # .....
      input:
        # .....
      output:
        - oid_map:
          - oid: sensor:tests/outvar1
            value: outvar1
          - oid: sensor:tests/outvar2
            value: outvar2
          sync: 500ms
        - oid_map:
          - oid: unit:tests/u1
            status: st1
          - oid: unit:tests/u2
            status: st2
            value: u2_val
          sync: 1s
          cache: 30s


The field *sync* is mandatory and specifies how frequently the block must be
synchronized.

The field *cache* is optional. If an output variable is cached, its state is
not synchronized with EVA ICS node until the cache expires.

Real-time
=========

EAPI threads usually do not require to be set as :doc:`real-time
<../realtime>`-ones.

Connecting to EVA ICS node
==========================

EVA ICS node connection settings are not compiled into rPLC process as this
configuration may be changed in production from time to time.

To connect a process to EVA ICS node, launch it with *PLC_EAPI* environment
variable set:

.. code:: shell

    PLC_EAPI=192.168.1.11:7777 ./myplc

The variable also may contain additional parameters:

.. code:: shell

    # the buf_ttl is in microseconds
    PLC_EAPI=192.168.1.11:7777,timeout=5,buf_size=8192,queue_size=8192,buf_ttl=10 ./myplc

EVA ICS node must accept EAPI TCP connections. To allow it, edit
:ref:`eva4_config_bus` EVA ICS node configuration key, e.g. with
:ref:`eva4_eva-shell`:

.. code:: shell

   eva edit config/bus

Accessing PLC instance from EVA ICS
===================================

Basics
------

The processes are connected to EVA ICS node bus as:

.. code::

    fieldbus.HOSTNAME.plc.PROCESSNAME

The connected processes can be listed with e.g. :ref:`eva4_eva-shell`:

.. code:: shell

    eva broker client.list -x fieldbus

.. note::

   The connected PLC processes are not native EVA ICS services so they are not
   listed in the node service list.

Unit actions
------------

To use rPLC as an action handler for EVA ICS :ref:`units <eva4_unit>`, set the
unit action handler as:

.. code:: shell

    eva item edit unit:tests/u1

.. code:: yaml

   action:
       svc: fieldbus.HOSTNAME.plc.PROCESSNAME

API calls
---------

rPLC internal :doc:`API <../api>` methods can be accessed via EAPI as well:

.. code:: shell

   eva svc call fieldbus.mws1.plc.all info
