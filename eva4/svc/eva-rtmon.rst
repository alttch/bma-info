Real-time monitor
*****************

.. contents::

**Requires** :doc:`../enterprise`.

See also :doc:`../realtime`.


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-rtmon.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-rtmon.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.svc.rtmon /opt/eva4/share/svc-tpl/svc-tpl-rtmon.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.svc.rtmon__task.list:

task.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists the core and service tasks*
   * - Parameters
     - *none*
   * - Returns
     - List of tasks


*Return payload example:*

.. code:: json

  [
      {
          "cpu": 31,
          "cpu_usage": 0.0,
          "memory_usage": 15863808,
          "name": "eva-node",
          "pid": 16468,
          "point": "main",
          "priority": 99,
          "sched": "FIFO",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 0,
          "cpu_usage": 0.0,
          "memory_usage": 15863808,
          "name": "EVAsysinfo",
          "pid": 16469,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 1,
          "cpu_usage": 0.0,
          "memory_usage": 15863808,
          "name": "EvaBusAlloc",
          "pid": 16471,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 30,
          "cpu_usage": 0.0,
          "memory_usage": 15863808,
          "name": "tokio-runtime-w",
          "pid": 16473,
          "point": "main",
          "priority": 99,
          "sched": "FIFO",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 31,
          "cpu_usage": 0.0,
          "memory_usage": 15863808,
          "name": "async-io",
          "pid": 16478,
          "point": "main",
          "priority": 99,
          "sched": "FIFO",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 0,
          "cpu_usage": 3.004694938659668,
          "memory_usage": 7581696,
          "name": "eva-rtmon",
          "pid": 16475,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 1,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16476,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 2,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "async-io",
          "pid": 16477,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 0,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16479,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "R",
          "svc_id": "eva.core"
      },
      {
          "cpu": 1,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16480,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 0,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16481,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 3,
          "cpu_usage": 1.0015649795532227,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16482,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 2,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16483,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.core"
      },
      {
          "cpu": 0,
          "cpu_usage": 3.004694938659668,
          "memory_usage": 7581696,
          "name": "eva-rtmon",
          "pid": 16475,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.svc.rtmon"
      },
      {
          "cpu": 1,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16476,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.svc.rtmon"
      },
      {
          "cpu": 2,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "async-io",
          "pid": 16477,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.svc.rtmon"
      },
      {
          "cpu": 0,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16479,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "R",
          "svc_id": "eva.svc.rtmon"
      },
      {
          "cpu": 1,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16480,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.svc.rtmon"
      },
      {
          "cpu": 0,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16481,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.svc.rtmon"
      },
      {
          "cpu": 3,
          "cpu_usage": 1.0015649795532227,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16482,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.svc.rtmon"
      },
      {
          "cpu": 2,
          "cpu_usage": 0.0,
          "memory_usage": 7581696,
          "name": "tokio-runtime-w",
          "pid": 16483,
          "point": "main",
          "priority": 0,
          "sched": "OTHER",
          "state": "S",
          "svc_id": "eva.svc.rtmon"
      }
  ]
