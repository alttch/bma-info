InfluxDB state history
**********************

.. contents::

Allows to store item states history in `InfluxDB
<https://www.influxdata.com>`_, v1 and v2 protocols are supported.

The service provides unified database EAPI.


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-db-influx.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-db-influx.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.db.i1 /opt/eva4/share/svc-tpl/svc-tpl-db-influx.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.db.i__state_history:

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
   * - **fill**
     - String
     - Fill (nS/T/H/D/W e.g. 10T for 10-minute)
     - no
   * - **precision**
     - u32
     - Round values to digits after commma
     - no
   * - **limit**
     - u32
     - Limit records to
     - no
   * - **xopts**
     - Map<String, String>
     - Extra: vfn=fn for value grouping (d: mean), rp=X for retention policy
     - no
   * - **compact**
     - bool
     - Pack data in arrays according to type
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
          "value": 15
      },
      {
          "status": 1,
          "t": 1652059870.0452943,
          "value": 15
      },
      {
          "status": 1,
          "t": 1652059875.0443518,
          "value": 15
      }
  ]
  

.. _eva4_eva.db.i__state_log:

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
   * - **xopts**
     - Map<String, String>
     - Extra: rp=X for retention policy
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
          "value": 15
      },
      {
          "oid": "sensor:tests/temp",
          "status": 1,
          "t": 1652060185.0454304,
          "value": 15
      }
  ]

Retention policies
==================

In InfluxDB v1, retention policies can be created as the following:

.. code:: sql

  CREATE RETENTION POLICY "daily" ON "eva" DURATION 1D REPLICATION 1
  CREATE CONTINUOUS QUERY "downsampled_env_temp1_30m" ON "eva" BEGIN
    SELECT mode(status) as "status",mean(value) as value
    INTO "daily"."sensor:env/temp1"
    FROM "sensor:env/temp1"
    GROUP BY time(30m)
  END

To process all items with the same downsampled rate, set the continuous
query to:

.. code:: sql

  SELECT mode(status) as status, mean(value) as value
  INTO "daily".:MEASUREMENT
  FROM /.*/ WHERE time > now() - 1d
  GROUP BY time(30m);

