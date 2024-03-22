EAPI methods
============

See :doc:`eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.core__action:

action
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes a unit action*
   * - Parameters
     - required
   * - Returns
     - action result payload (final or current one), the UUID field is returned as Vec<u8;16>

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Unit OID
     - **yes**
   * - **params/value**
     - Any
     - Desired unit value
     - **yes**
   * - **priority**
     - u8
     - Action priority
     - no
   * - **wait**
     - f64
     - max seconds to wait for the final result
     - no
   * - **u**
     - Vec<u8; 16>
     - Action UUID
     - no


*Return payload example:*

.. code:: json

  {
      "err": null,
      "exitcode": 0,
      "finished": true,
      "node": "mws1",
      "oid": "unit:modbus/relay1",
      "out": null,
      "params": {
          "status": 0,
          "value": 252
      },
      "priority": 100,
      "status": "completed",
      "svc": "eva.controller.m1",
      "time": {
          "accepted": 1651786320.177963,
          "completed": 1651786320.1834776,
          "created": 1651786320.176336,
          "pending": 1651786320.1780024,
          "running": 1651786320.1780891
      },
      "uuid": []
  }
  

.. _eva4_eva.core__action.kill:

action.kill
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Attempts to terminate/cancel all scheduled/running actions for the specified item*
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
     - OID
     - **yes**

.. _eva4_eva.core__action.list:

action.list
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists results of recently scheduled/executed actions*
   * - Parameters
     - required
   * - Returns
     - list of action result payloads, the UUID fields are returned as Vec<u8;16>

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Item OID or OID mask
     - no
   * - **sq**
     - String
     - Item status query filter (waiting/running/completed/failed/finished)
     - no
   * - **time**
     - u32
     - get records only newer than CURRENT_TIMESTAMP-N
     - no
   * - **limit**
     - u32
     - limit number of records
     - no


*Return payload example:*

.. code:: json

  [
    {
        "err": null,
        "exitcode": 0,
        "finished": true,
        "node": "mws1",
        "oid": "unit:modbus/relay1",
        "out": null,
        "params": {
            "status": 0,
            "value": 252
        },
        "priority": 100,
        "status": "completed",
        "svc": "eva.controller.m1",
        "time": {
            "accepted": 1651786320.177963,
            "completed": 1651786320.1834776,
            "created": 1651786320.176336,
            "pending": 1651786320.1780024,
            "running": 1651786320.1780891
        },
        "uuid": []
    }
  ]
  

.. _eva4_eva.core__action.result:

action.result
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets the result of previously executed action*
   * - Parameters
     - required
   * - Returns
     - action result payload (final or current one), the UUID field is returned as Vec<u8;16>

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **u**
     - Vec<u8; 16>
     - Action UUID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "err": null,
      "exitcode": 0,
      "finished": true,
      "node": "mws1",
      "oid": "unit:modbus/relay1",
      "out": null,
      "params": {
          "status": 0,
          "value": 252
      },
      "priority": 100,
      "status": "completed",
      "svc": "eva.controller.m1",
      "time": {
          "accepted": 1651786320.177963,
          "completed": 1651786320.1834776,
          "created": 1651786320.176336,
          "pending": 1651786320.1780024,
          "running": 1651786320.1780891
      },
      "uuid": []
  }
  

.. _eva4_eva.core__action.terminate:

action.terminate
----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Attempts to terminate/cancel a scheduled/running action*
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
     - Vec<u8; 16>
     - Action UUID
     - **yes**

.. _eva4_eva.core__action.toggle:

action.toggle
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes a unit action to toggle its status (between 0/1)*
   * - Parameters
     - required
   * - Returns
     - unit action result payload (final or current one), the UUID field is returned as Vec<u8;16>

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Unit OID
     - **yes**
   * - **priority**
     - u8
     - Action priority
     - no
   * - **wait**
     - f64
     - max seconds to wait for the final result
     - no
   * - **u**
     - Vec<u8; 16>
     - Action UUID
     - no


*Return payload example:*

.. code:: json

  {
      "err": null,
      "exitcode": 0,
      "finished": true,
      "node": "mws1",
      "oid": "unit:modbus/relay1",
      "out": null,
      "params": {
          "status": 0,
          "value": 252
      },
      "priority": 100,
      "status": "completed",
      "svc": "eva.controller.m1",
      "time": {
          "accepted": 1651786320.177963,
          "completed": 1651786320.1834776,
          "created": 1651786320.176336,
          "pending": 1651786320.1780024,
          "running": 1651786320.1780891
      },
      "uuid": []
  }
  

.. _eva4_eva.core__bus.publish:

bus.publish
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Publish a bus event via RPC (useful for bus calls via HMI)*
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
   * - **topic**
     - String
     - Event topic
     - **yes**
   * - **message**
     - Any
     - Event message
     - **yes**

.. _eva4_eva.core__core.shutdown:

core.shutdown
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Shuts down the core (will be usually auto-restarted)*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.core__core.sysinfo:

core.sysinfo
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get machine system info*
   * - Parameters
     - *none*
   * - Returns
     - System info payload (la = load averages, disk usage = for EVA ICS dir)


*Return payload example:*

.. code:: json

  {
      "disk_usage": 22.581110721748498,
      "la1": 3.15,
      "la15": 2.54,
      "la5": 3.21,
      "ram_usage": 65.57377548639009
  }
  

.. _eva4_eva.core__dobj.deploy:

dobj.deploy
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploys data objects*
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
   * - **data_objects**
     - Vec<struct>
     - Data object parameters
     - no

.. _eva4_eva.core__dobj.get_config:

dobj.get_config
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get data object configuration*
   * - Parameters
     - required
   * - Returns
     - Data object configuration

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Data object name
     - **yes**


*Return payload example:*

.. code:: json

  fields:
  - name: temp
    oid: sensor:env/temp
    type: f64
  - name: hum
    oid: sensor:env/hum
    type: f64
  - name: pressure
    oid: sensor:env/pressure
    type: f64
  name: Env
  

.. _eva4_eva.core__dobj.list:

dobj.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *List data objects*
   * - Parameters
     - *none*
   * - Returns
     - List of data objects


*Return payload example:*

.. code:: json

  [
      {
          "name": "test",
          "size": 10
      },
      {
          "name": "test2",
          "size": 548
      }
  ]
  

.. _eva4_eva.core__dobj.push:

dobj.push
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Push buffer to data object*
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
     - Data object name
     - **yes**
   * - **d**
     - Vec<u8>
     - Data buffer
     - **yes**
   * - **e**
     - String
     - Endianess (big/little), the default is little
     - no

.. _eva4_eva.core__dobj.undeploy:

dobj.undeploy
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploys data objects*
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
   * - **data_objects**
     - Vec<struct/String>
     - Data object parameters or a list of data object names
     - no

.. _eva4_eva.core__dobj.validate:

dobj.validate
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Validate node data objects*
   * - Parameters
     - *none*
   * - Returns
     - Validation result

.. _eva4_eva.core__item.announce:

item.announce
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Forces bus state announcements for selected items*
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
     - Item OID or OID mask
     - no
   * - **node (alias: src)**
     - String
     - filter items by node (use .local as an alias for the local one)
     - no

.. _eva4_eva.core__item.create:

item.create
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Creates a local item with empty config*
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
     - OID
     - **yes**

.. _eva4_eva.core__item.deploy:

item.deploy
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploys local items*
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
   * - **items**
     - Vec<struct>
     - :doc:`item<items>` configuration
     - **yes**

.. _eva4_eva.core__item.destroy:

item.destroy
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroys a local item*
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
     - OID
     - **yes**

.. _eva4_eva.core__item.disable:

item.disable
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Disables local item(s)*
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
     - Item OID or OID mask
     - no

.. _eva4_eva.core__item.enable:

item.enable
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Enables local item(s)*
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
     - Item OID or OID mask
     - no

.. _eva4_eva.core__item.get_config:

item.get_config
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets config for an individual item*
   * - Parameters
     - required
   * - Returns
     - item configuration (struct)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - OID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "action": {
          "svc": "eva.controller.virtual"
      },
      "enabled": true,
      "oid": "unit:tests/door"
  }
  

.. _eva4_eva.core__item.list:

item.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets filtered list of items*
   * - Parameters
     - required
   * - Returns
     - list of items

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - Vec<String>/String
     - Item OID(s) or OID mask(s)
     - no
   * - **node (alias: src)**
     - String
     - filter items by node (use .local as an alias for the local one)
     - no
   * - **include**
     - Vec<String>
     - List of additional masks to include
     - no
   * - **exclude**
     - Vec<String>
     - List of additional masks to exclude
     - no


*Return payload example:*

.. code:: json

  [
      {
          "connected": true,
          "enabled": true,
          "ieid": null,
          "node": "mws1",
          "oid": "lmacro:m1",
          "t": null
      },
      {
          "connected": true,
          "enabled": true,
          "ieid": null,
          "node": "mws1",
          "oid": "lmacro:m2",
          "t": null
      }
  ]
  

.. _eva4_eva.core__item.state:

item.state
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets filtered list of item states*
   * - Parameters
     - required
   * - Returns
     - list of item states

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - Vec<String>/String
     - Item OID(s) or OID mask(s)
     - no
   * - **include**
     - Vec<String>
     - List of additional masks to include
     - no
   * - **exclude**
     - Vec<String>
     - List of additional masks to exclude
     - no
   * - **full**
     - bool
     - Return full item state (include meta and enabled fields)
     - no


*Return payload example:*

.. code:: json

  [
      {
          "connected": true,
          "ieid": [
              1923,
              728478328325649
          ],
          "node": "mws1",
          "oid": "lvar:repl/rtest1/online",
          "status": 1,
          "t": 1650246289.5193255,
          "value": 1
      },
      {
          "connected": true,
          "ieid": [
              1648,
              135594146656848
          ],
          "node": "mws1",
          "oid": "lvar:x/x",
          "status": 0,
          "t": 1648772592.8681087,
          "value": -4
      }
  ]
  

.. _eva4_eva.core__item.summary:

item.summary
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets local/remote item summary*
   * - Parameters
     - *none*
   * - Returns
     - item summary


*Return payload example:*

.. code:: json

  {
      "items": 22,
      "sources": {
          ".local": 20,
          "rtest1": 2
      }
  }
  

.. _eva4_eva.core__item.undeploy:

item.undeploy
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploys local items*
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
   * - **items**
     - Vec<struct/String>
     - item configuration or a list of OIDs
     - no

.. _eva4_eva.core__log.get:

log.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets memory log records*
   * - Parameters
     - required
   * - Returns
     - memory log records (list)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **level**
     - u8/String
     - log level (0=trace, 10=debug, 20=info, 30=warn, 40=error)
     - no
   * - **time**
     - u32
     - get records only newer than CURRENT_TIMESTAMP-N
     - no
   * - **limit**
     - u32
     - limit number of records
     - no
   * - **module**
     - String
     - filter log records by a module name
     - no
   * - **rx**
     - String
     - message filter regular expression
     - no
   * - **msg**
     - String
     - message filter substring
     - no


*Return payload example:*

.. code:: json

  [
    {
        "dt": "2022-05-05T22:08:50.425+02:00",
        "h": "mws1",
        "l": 20,
        "lvl": "info",
        "mod": "eva::svc",
        "msg": "eva.controller.eip starting puller #2, interval: 1s",
        "t": 1651781330.425161,
        "th": null
    },
    {
        "dt": "2022-05-05T22:08:50.425+02:00",
        "h": "mws1",
        "l": 20,
        "lvl": "info",
        "mod": "eva::svc",
        "msg": "eva.controller.eip starting puller #1, interval: 1s",
        "t": 1651781330.425518,
        "th": null
    }
  ]
  

.. _eva4_eva.core__log.purge:

log.purge
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Purges memory log records*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.core__lvar.clear:

lvar.clear
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Sets Lvar status to 0*
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
     - Lvar OID
     - **yes**

.. _eva4_eva.core__lvar.decr:

lvar.decr
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Decrements Lvar value by 1*
   * - Parameters
     - required
   * - Returns
     - new Lvar value (i64)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Lvar OID
     - **yes**

.. _eva4_eva.core__lvar.incr:

lvar.incr
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Increments Lvar value by 1*
   * - Parameters
     - required
   * - Returns
     - new Lvar value (i64)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Lvar OID
     - **yes**

.. _eva4_eva.core__lvar.reset:

lvar.reset
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Sets Lvar status to 1*
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
     - Lvar OID
     - **yes**

.. _eva4_eva.core__lvar.set:

lvar.set
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Sets Lvar status/value*
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
     - Lvar OID
     - **yes**
   * - **status**
     - i16
     - Lvar status
     - no
   * - **value**
     - Any
     - Lvar value
     - no

.. _eva4_eva.core__lvar.toggle:

lvar.toggle
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Toggles Lvar status between 0/1*
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
     - Lvar OID
     - **yes**

.. _eva4_eva.core__node.get:

node.get
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets local/remote node info*
   * - Parameters
     - required
   * - Returns
     - node info (struct)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - ID/name
     - **yes**


*Return payload example:*

.. code:: json

  {
      "info": {
          "build": 2022050502,
          "version": "4.0.0"
      },
      "online": true,
      "svc": "eva.repl.default"
  }
  

.. _eva4_eva.core__node.list:

node.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists local/registered remote nodes*
   * - Parameters
     - *none*
   * - Returns
     - node info (list)


*Return payload example:*

.. code:: json

  [
      {
          "info": {
              "build": 2022050503,
              "version": "4.0.0"
          },
          "name": "mws1",
          "online": true,
          "remote": false,
          "svc": null
      },
      {
          "info": {
              "build": 2022050502,
              "version": "4.0.0"
          },
          "name": "rtest1",
          "online": true,
          "remote": true,
          "svc": "eva.repl.default"
      }
  ]
  

.. _eva4_eva.core__run:

run
---

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes lmacro*
   * - Parameters
     - required
   * - Returns
     - macro action result payload (final or current one), the UUID field is returned as Vec<u8;16>

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Lmacro OID
     - **yes**
   * - **params/args**
     - Vec<Any>
     - execution arguments
     - no
   * - **params/kwargs**
     - Map<String, Any>
     - execution keyword arguments
     - no
   * - **priority**
     - u8
     - Action priority
     - no
   * - **wait**
     - f64
     - max seconds to wait for the final result
     - no
   * - **u**
     - Vec<u8; 16>
     - Action UUID
     - no


*Return payload example:*

.. code:: json

  {
      "err": null,
      "exitcode": 0,
      "finished": true,
      "node": "mws1",
      "oid": "lmacro:m1",
      "out": "I am finished successfully",
      "params": {
          "args": [
              1
          ],
          "kwargs": {
              "a": 5
          }
      },
      "priority": 100,
      "status": "completed",
      "svc": "eva.controller.py",
      "time": {
          "accepted": 1651786507.8852181,
          "completed": 1651786507.8854232,
          "created": 1651786507.8839648,
          "pending": 1651786507.8853166,
          "running": 1651786507.885348
      },
      "uuid": []
  }
  

.. _eva4_eva.core__save:

save
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Saves item states if instant-save is off*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.core__spoint.list:

spoint.list
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *List connected secondary points*
   * - Parameters
     - *none*
   * - Returns
     - S-Point info (list)


*Return payload example:*

.. code:: json

  [
      {
          "build": 2022062202,
          "name": "eva.spoint.m1",
          "port": "192.168.22.77:7777",
          "source": "192.168.22.71:55643",
          "version": "4.0.0"
      },
      {
          "build": 2022062202,
          "name": "eva.spoint.m2",
          "port": "192.168.22.77:7777",
          "source": "192.168.22.72:55641",
          "version": "4.0.0"
      }
  ]
  

.. _eva4_eva.core__svc.deploy:

svc.deploy
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploys local services*
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
   * - **svcs**
     - Vec<struct>
     - Service parameters
     - no

.. _eva4_eva.core__svc.get:

svc.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets status of an individual service*
   * - Parameters
     - required
   * - Returns
     - service status

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Service ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "id": "eva.controller.modbus11",
      "launcher": "eva.launcher.main",
      "pid": 2305314,
      "status": "online"
  }
  

.. _eva4_eva.core__svc.get_params:

svc.get_params
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets parameters for an individual service*
   * - Parameters
     - required
   * - Returns
     - service parameters and configuration (struct)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Service ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "bus": {
          "buf_size": 8192,
          "buf_ttl": 10,
          "path": "var/bus.ipc",
          "ping_interval": 1.0,
          "queue_size": 8192,
          "timeout": null,
          "type": "native"
      },
      "command": "target/debug/eva-svc-modbus-slave",
      "config": {
          "listen": [
              {
                  "keep_alive_timeout": 180,
                  "path": "127.0.0.1:5503",
                  "protocol": "tcp",
                  "timeout": 5,
                  "unit": 1
              }
          ],
          "persistent": true
      },
      "prepare_command": null,
      "react_to_fail": false,
      "timeout": {
          "default": null,
          "shutdown": null,
          "startup": null
      },
      "user": null,
      "workers": 1
  }
  

.. _eva4_eva.core__svc.list:

svc.list
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets status for all local services*
   * - Parameters
     - *none*
   * - Returns
     - list of services and their status


*Return payload example:*

.. code:: json

  [
    {
        "id": "eva.aaa.acl",
        "launcher": "eva.launcher.main",
        "pid": 2305311,
        "status": "online"
    }
    {
        "id": "eva.aaa.localauth",
        "launcher": "eva.launcher.main",
        "pid": 2305312,
        "status": "online"
    }
    {
        "id": "eva.controller.modbus11",
        "launcher": "eva.launcher.main",
        "pid": 2305314,
        "status": "online"
    }
  ]
  

.. _eva4_eva.core__svc.purge:

svc.purge
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploys local services and purge their data*
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
   * - **svc**
     - Vec<struct/String>
     - Service parameters or a list of service IDs
     - no

.. _eva4_eva.core__svc.restart:

svc.restart
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Restarts a local service*
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
     - Service ID
     - **yes**

.. _eva4_eva.core__svc.undeploy:

svc.undeploy
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploys local services*
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
   * - **svc**
     - Vec<struct/String>
     - Service parameters or a list of service IDs
     - no

.. _eva4_eva.core__test:

test
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Tests the core and gets system info*
   * - Parameters
     - *none*
   * - Returns
     - system and core information (struct)


*Return payload example:*

.. code:: json

  {
      "active": true,
      "boot_id": 2217,
      "build": 2022050503,
      "eapi_version": 1,
      "instant_save": true,
      "pid": 2305238,
      "product_code": "eva4node",
      "product_name": "EVA ICS node server",
      "system_name": "mws1",
      "time": 1651781334.3509862,
      "uptime": 5.059754863,
      "version": "4.0.0",
      "workers": 4
  }
  

.. _eva4_eva.core__update:

update
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Updates the node*
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
   * - **version**
     - String
     - Try to update to the specified version
     - **yes**
   * - **build**
     - u64
     - Try to update to the specified build
     - **yes**
   * - **yes**
     - bool
     - update confirmation (must be set to true)
     - **yes**
   * - **url**
     - String
     - alternative repository URL
     - no
   * - **test**
     - bool
     - allow updating to test builds
     - no

