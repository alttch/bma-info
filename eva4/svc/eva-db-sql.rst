SQL databases state history
***************************

.. contents::

Allows to store item states history in SQL databases. Supported:

* `SQLite <https://www.sqlite.org/>`_ (serverless)
* `MySQL <https://www.mysql.com>`_
* `PostgreSQL <https://www.postgresql.org>`_
* Microsoft SQL Server (alpha)

Dataframe filling requires tsdb extension (ts_extension configuration
parameter) installed and chosen. The following extensions are supported:

* `Timescale <https://www.timescale.com>`_ (PostgreSQL)

The service provides unified database EAPI.

For a dedicated TimescaleDB connector, see :doc:`eva-db-timescale`.

.. include:: ../include/common/timeframe-fill.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-db-sql.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-db-sql.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.db.s1 /opt/eva4/share/svc-tpl/svc-tpl-db-sql.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.db.s__state_history:

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
     - Fill (nS/T/H/D/W e.g. 10T for 10-minute, requires ts_extension)
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
     - Extra: vfn=fn for value grouping: mean/sum (d: mean)
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
  

.. _eva4_eva.db.s__state_log:

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
   * - **xopts**
     - Map<String, String>
     - Extra: offset=N for query offset
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
  

.. _eva4_eva.db.s__state_push:

state_push
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *push item states into db, (payload: single item state or list)*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*
