Logic manager
*************

.. contents::

.. include:: ../include/lm.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-lm.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-lm.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.lm1 /opt/eva4/share/svc-tpl/svc-tpl-controller-lm.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.lm__action:

action
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes an opener unit action*
   * - Parameters
     - See :ref:`eva4_unit_action`
   * - Returns
     - See :ref:`eva4_unit_action`

.. _eva4_eva.controller.lm__cycle.get:

cycle.get
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets stats for a cycle*
   * - Parameters
     - required
   * - Returns
     - Cycle info and stats (u64 counters)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Cycle ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "id": "cycle1",
      "interval": 1.0,
      "iters_err": 0,
      "iters_ok": 71,
      "status": "running",
      "timed_out": 0
  }
  

.. _eva4_eva.controller.lm__cycle.list:

cycle.list
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists cycles and their stats*
   * - Parameters
     - *none*
   * - Returns
     - List of cycles info and stats (u64 counters)


*Return payload example:*

.. code:: json

  [
      {
          "id": "cycle1",
          "interval": 1.0,
          "iters_err": 0,
          "iters_ok": 71,
          "status": "running",
          "timed_out": 0
      },
      {
          "id": "cycle2",
          "interval": 1.0,
          "iters_err": 0,
          "iters_ok": 92,
          "status": "stopped",
          "timed_out": 0
      }
  ]
  

.. _eva4_eva.controller.lm__cycle.reset:

cycle.reset
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Resets a cycle*
   * - Parameters
     - required
   * - Returns
     - *nothing*

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Cycle ID
     - **yes**

.. _eva4_eva.controller.lm__cycle.start:

cycle.start
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Starts a cycle*
   * - Parameters
     - required
   * - Returns
     - *nothing*

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Cycle ID
     - **yes**

.. _eva4_eva.controller.lm__cycle.stop:

cycle.stop
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Stops a cycle*
   * - Parameters
     - required
   * - Returns
     - *nothing*

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Cycle ID
     - **yes**

.. _eva4_eva.controller.lm__job.get:

job.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets a scheduled job*
   * - Parameters
     - required
   * - Returns
     - Scheduled job info

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Job ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "id": "job2",
      "next_launch": "2022-05-22 22:38:50 +02:00",
      "run": "lmacro:tests/job2_handler"
  }
  

.. _eva4_eva.controller.lm__job.list:

job.list
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists scheduled jobs*
   * - Parameters
     - *none*
   * - Returns
     - List of scheduled jobs infos


*Return payload example:*

.. code:: json

  [
      {
          "id": "job1",
          "next_launch": "2022-05-22 21:38:50 +02:00",
          "run": "lmacro:tests/job1_handler"
      }
      {
          "id": "job2",
          "next_launch": "2022-05-22 22:38:50 +02:00",
          "run": "lmacro:tests/job2_handler"
      }
  ]
  

.. _eva4_eva.controller.lm__kill:

kill
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Attempts to terinate/cancel all actions for an opener unit*
   * - Parameters
     - See :ref:`eva4_unit_action`
   * - Returns
     - See :ref:`eva4_unit_action`

.. _eva4_eva.controller.lm__rule.get:

rule.get
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets a rule*
   * - Parameters
     - required
   * - Returns
     - Rule info

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Rule ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "chillout_event_pending": false,
      "chillout_remaining": null,
      "chillout_time": null,
      "id": "rule1",
      "run": "lmacro:tests/temp_handler"
  }
  

.. _eva4_eva.controller.lm__rule.list:

rule.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists rules*
   * - Parameters
     - *none*
   * - Returns
     - List of rules and their info


*Return payload example:*

.. code:: json

  [
      {
          "chillout_event_pending": false,
          "chillout_remaining": null,
          "chillout_time": null,
          "id": "rule1",
          "run": "lmacro:tests/temp_handler"
      },
      {
          "chillout_event_pending": false,
          "chillout_remaining": null,
          "chillout_time": 10.0,
          "id": "rule2",
          "run": "lmacro:tests/on_action"
      }
  ]
  

.. _eva4_eva.controller.lm__terminate:

terminate
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Attempts to terminate/cancel an opener unit action*
   * - Parameters
     - See :ref:`eva4_unit_action`
   * - Returns
     - See :ref:`eva4_unit_action`
