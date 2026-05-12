JSON databases state history
****************************

.. contents::

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-db-json.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-db-json.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.db.json1 /opt/eva4/share/svc-tpl/svc-tpl-db-json.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.db.json__state_announce:

state_announce
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Replays state log rows as state bus publishes (same query as state_log). Note: kind chooses ST/LOC (loc) or ST/RAR (rar); default rar.*
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
     - Item OID, supports ending masks (e.g. sensor:group/#)
     - **yes**
   * - **t_start**
     - f64
     - Beginning timestamp (default: last 24 hours) (alias: s)
     - no
   * - **t_end**
     - f64
     - Ending timestamp (default: now) (alias: e)
     - no
   * - **limit**
     - u32
     - Limit records to (alias: n)
     - no
   * - **xopts**
     - Map<String, String>
     - Extra: offset=N (alias: o)
     - no
   * - **kind**
     - String
     - loc | rar (default: rar): publish under local or remote-archive state topic prefix
     - no
   * - **publish_for**
     - String/Vec<String>
     - Required; bus client id(s); empty list sends nothing (alias: for)
     - **yes**

.. _eva4_eva.db.json__state_history:

state_history
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets item state history*
   * - Parameters
     - required
   * - Returns
     - State history payload

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Item OID
     - **yes**
   * - **t_start**
     - f64
     - Beginning timestamp (default: last 24 hours)
     - no
   * - **t_end**
     - f64
     - Ending timestamp (default: now)
     - no
   * - **limit**
     - u32
     - Limit records to
     - no
   * - **prop**
     - String
     - Property: status or value (default: both)
     - no
   * - **compact**
     - bool
     - Pack data in arrays according to type
     - no
   * - **xopts**
     - Map<String, String>
     - Extra: path=JSON path, e.g. $.value.temp[0]
     - no


*Return payload example:*

.. code:: json

  [
      {
          "status": 1,
          "t": 1652059860.0424938,
          "value": 15
      },
      {
          "status": 1,
          "t": 1652059865.045223,
          "value": "something"
      },
      {
          "status": 1,
          "t": 1652059870.0452943,
          "value": {"key": "value"}
      },
      {
          "status": 1,
          "t": 1652059875.0443518,
          "value": [1, 2, 3]
      }
  ]
  

.. _eva4_eva.db.json__state_log:

state_log
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets item state log*
   * - Parameters
     - required
   * - Returns
     - State log payload (includes OIDs, as other svcs may support get-by-mask)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Item OID, supports ending masks (e.g. sensor:group/#)
     - **yes**
   * - **t_start**
     - f64
     - Beginning timestamp (default: last 24 hours)
     - no
   * - **t_end**
     - f64
     - Ending timestamp (default: now)
     - no
   * - **limit**
     - u32
     - Limit records to
     - no


*Return payload example:*

.. code:: json

  [
      {
          "oid": "sensor:tests/temp",
          "status": 1,
          "t": 1652060175.0443184,
          "value": 15
      },
      {
          "oid": "sensor:tests/temp",
          "status": 1,
          "t": 1652060180.046056,
          "value": "something"
      },
      {
          "oid": "sensor:tests/temp",
          "status": 1,
          "t": 1652060185.0454304,
          "value": {"key": "value"}
      }
  ]
  

.. _eva4_eva.db.json__state_push:

state_push
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *push item states into db, (payload: single item state or list). skips existing states*
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
   * - **oid**
     - String
     - Item OID (alias: i)
     - **yes**
   * - **status**
     - i16
     - Item status (alias: s)
     - **yes**
   * - **value**
     - Any
     - Item value (alias: v)
     - no
   * - **t**
     - f64
     - Timestamp, seconds since epoch (required, no default; key must be 't', not 'set_time')
     - **yes**


*Return payload example:*

.. code:: json

  {"oid": "sensor:tests/temp", "status": 1, "value": 15.0, "t": 1652060175.044}
