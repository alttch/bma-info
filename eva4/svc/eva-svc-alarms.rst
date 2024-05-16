Alarm service
*************

.. contents::

**Requires** :doc:`../enterprise`.

.. include:: ../include/alarms.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-alarms.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-alarms.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.alarm.1 /opt/eva4/share/svc-tpl/svc-tpl-alarms.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.alarm.__alarm.deploy:

alarm.deploy
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploy managed alarms*
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
   * - **alarms**
     - Vec<struct>
     - Alarm configurations
     - **yes**

.. _eva4_eva.alarm.__alarm.destroy:

alarm.destroy
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroy a managed alarm*
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
     - Alarm LVar OID
     - **yes**

.. _eva4_eva.alarm.__alarm.get_config:

alarm.get_config
----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get managed alarm configuration*
   * - Parameters
     - required
   * - Returns
     - Alarm configuration

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Alarm LVar OID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "config": {
          "delay": {
              "oos": 1.0,
              "trig": 1.0
          },
          "rules": [
              {
                  "bit": null,
                  "break": false,
                  "condition": {
                      "max": null,
                      "max_eq": false,
                      "min": 30.0,
                      "min_eq": true
                  },
                  "initial": "process",
                  "oid": "sensor:env/temp",
                  "op": "TT",
                  "prop": "value"
              },
              {
                  "bit": null,
                  "break": false,
                  "condition": {
                      "max": 25.0,
                      "max_eq": false,
                      "min": null,
                      "min_eq": false
                  },
                  "initial": "process",
                  "oid": "sensor:env/temp",
                  "op": "CC",
                  "prop": "value"
              }
          ]
      },
      "group": "test",
      "id": "AL001",
      "level": 20
  }
  

.. _eva4_eva.alarm.__alarm.history:

alarm.history
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get alarm history*
   * - Parameters
     - required
   * - Returns
     - Alarm history

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Alarm LVar OID
     - no
   * - **t_start**
     - String/u64
     - Start time
     - no
   * - **t_end**
     - String/u64
     - End time
     - no
   * - **node**
     - String
     - Alarm node
     - no
   * - **level_min**
     - u8
     - Minimum alarm level
     - no
   * - **level_max**
     - u8
     - Maximum alarm level
     - no
   * - **group**
     - String
     - Alarm group
     - no
   * - **id**
     - String
     - Alarm ID
     - no
   * - **ack**
     - bool
     - Acknowledged alarms only
     - no
   * - **latch**
     - bool
     - Latched alarms only
     - no
   * - **oos**
     - bool
     - Out-of-service alarms only
     - no
   * - **sbd**
     - bool
     - Suspended-by-design alarms only
     - no
   * - **shelv**
     - bool
     - Shelved alarms only
     - no
   * - **trig**
     - bool
     - Triggered alarms only
     - no
   * - **lo**
     - String
     - Filter by alarm operation
     - no
   * - **losk**
     - String
     - Filter by alarm operation source kind
     - no
   * - **los**
     - String
     - Filter by alarm operation source
     - no


*Return payload example:*

.. code:: json

  [
      {
          "ack": false,
          "alarm_group": "test",
          "alarm_id": "AL001",
          "alarm_level": 20,
          "alarm_node": "mws1",
          "latch": false,
          "lo": "TT",
          "los": "",
          "losk": "P",
          "oid": "lvar:alarm/default/mws1/20/test/AL001",
          "oos": false,
          "sbd": false,
          "shelv": false,
          "t": 1715732660.061618,
          "trig": true
      },
      {
          "ack": false,
          "alarm_group": "test",
          "alarm_id": "AL001",
          "alarm_level": 20,
          "alarm_node": "mws1",
          "latch": false,
          "lo": "CC",
          "los": "",
          "losk": "P",
          "oid": "lvar:alarm/default/mws1/20/test/AL001",
          "oos": false,
          "sbd": false,
          "shelv": false,
          "t": 1715732890.977563,
          "trig": false
      }
  ]
  

.. _eva4_eva.alarm.__alarm.list:

alarm.list
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *List managed alarms*
   * - Parameters
     - required
   * - Returns
     - List of managed alarms

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **level**
     - u8
     - Alarm level
     - no
   * - **group**
     - String
     - Alarm group
     - no
   * - **id**
     - String
     - Alarm ID
     - no


*Return payload example:*

.. code:: json

  [
      {
          "group": "test",
          "id": "AL001",
          "level": 20,
          "oid": "lvar:alarm/default/mws1/20/test/AL001"
      },
      {
          "group": "test",
          "id": "AL002",
          "level": 20,
          "oid": "lvar:alarm/default/mws1/20/test/AL002"
      }
  ]
  

.. _eva4_eva.alarm.__alarm.set:

alarm.set
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set alarm state*
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
     - Alarm LVar OID
     - **yes**
   * - **op**
     - String
     - Alarm operation code
     - **yes**
   * - **source_kind**
     - String
     - Source kind (U/P/R)
     - **yes**
   * - **source**
     - String
     - Source
     - **yes**

.. _eva4_eva.alarm.__alarm.state:

alarm.state
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get alarm states (all)*
   * - Parameters
     - required
   * - Returns
     - List of alarm states

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **node**
     - String
     - Alarm node
     - no
   * - **level**
     - u8
     - Alarm level
     - no
   * - **group**
     - String
     - Alarm group
     - no
   * - **id**
     - String
     - Alarm ID
     - no
   * - **u**
     - String
     - View alarm state as a user (including subscriptions)
     - no


*Return payload example:*

.. code:: json

  [
      {
          "active": false,
          "current": "CC",
          "group": "test",
          "id": "AL001",
          "level": 20,
          "node": "mws1",
          "oid": "lvar:alarm/default/mws1/20/test/AL001",
          "subscribed_email": [
            "TT",
            "TL",
            "OS"
          ]
      },
      {
          "active": true,
          "current": "TL",
          "group": "test",
          "id": "AL002",
          "level": 20,
          "node": "mws1",
          "oid": "lvar:alarm/default/mws1/20/test/AL002",
          "subscribed_email": [
            "TT",
            "TL",
            "OS"
          ]
      }
  ]
  

.. _eva4_eva.alarm.__alarm.subscribe:

alarm.subscribe
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Subscribe a user to alarm state changes*
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
   * - **u**
     - String
     - User account
     - **yes**
   * - **oid_mask**
     - String/Vec<String>
     - Alarm OID mask
     - **yes**
   * - **nk**
     - String
     - Notification kind
     - **yes**
   * - **op**
     - String/Vec<String>
     - Alarm operation code
     - **yes**

.. _eva4_eva.alarm.__alarm.summary:

alarm.summary
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get alarm summary*
   * - Parameters
     - *none*
   * - Returns
     - Alarm summary


*Return payload example:*

.. code:: json

  {
      "active": 1,
      "active_by_node": {
          "mws1": 1
      }
  }
  

.. _eva4_eva.alarm.__alarm.undeploy:

alarm.undeploy
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploy managed alarms*
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
   * - **alarms**
     - Vec<struct>
     - Alarm configurations
     - **yes**

.. _eva4_eva.alarm.__alarm.unsubscribe:

alarm.unsubscribe
-----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Unsubscribe a user from alarm state changes*
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
   * - **u**
     - String
     - User account
     - **yes**
   * - **oid_mask**
     - String/Vec<String>
     - Alarm OID mask
     - **yes**
   * - **nk**
     - String
     - Notification kind
     - **yes**
   * - **op**
     - String/Vec<String>
     - Alarm operation code
     - **yes**

HTTP API
========

The service provides certain methods via
:ref:`extra calls<eva4_hmi_http__x__TARGET_SVC__METHOD>` (the methods must
be called e.g. as *x::eva.alarm.default::summary*)

To use HTTP API methods, a user must have read or write access to alarm
lvars.

.. include:: ../include/autogen/http_api-svc-alarms.rst

