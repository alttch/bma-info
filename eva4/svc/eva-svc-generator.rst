Data generator
**************

.. contents::

.. include:: ../include/generator.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-generator.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-generator.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.generator.default /opt/eva4/share/svc-tpl/svc-tpl-generator.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.generator.default__source.apply:

source.apply
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Apply source to archive data*
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
   * - **source**
     - struct
     - Source
     - **yes**
   * - **t_start**
     - String/f64
     - Starting time/timestamp
     - **yes**
   * - **t_end**
     - String/f64
     - Ending time/timestamp (def: now)
     - no
   * - **targets**
     - Vec<String>
     - target item OIDs
     - no

.. _eva4_eva.generator.default__source.deploy:

source.deploy
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploy sources*
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
   * - **generator_sources**
     - Vec<struct>
     - Sources
     - **yes**

.. _eva4_eva.generator.default__source.destroy:

source.destroy
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroy a single source*
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
     - Source name
     - **yes**

.. _eva4_eva.generator.default__source.get_config:

source.get_config
-----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get configuration of a single source*
   * - Parameters
     - required
   * - Returns
     - Source configuration

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Source name
     - **yes**


*Return payload example:*

.. code:: json

  {
      "kind": "wave",
      "name": "v1",
      "params": {
          "formula": "sin(x/2)*10+10"
      },
      "sampling": 1,
      "targets": [
          "sensor:tests/voltage"
      ]
  }
  

.. _eva4_eva.generator.default__source.list:

source.list
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *List generator sources*
   * - Parameters
     - *none*
   * - Returns
     - List of sources (struct)


*Return payload example:*

.. code:: json

  [
      {
          "active": true,
          "kind": "wave",
          "name": "v1"
      }
  ]
  

.. _eva4_eva.generator.default__source.plan:

source.plan
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Plan a source*
   * - Parameters
     - required
   * - Returns
     - Source output

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **source**
     - struct
     - Source
     - **yes**
   * - **duration**
     - f64
     - planning duration
     - no
   * - **fill**
     - String
     - Fill (nS/T/H/D/W e.g. 10T for 10-minute)
     - no


*Return payload example:*

.. code:: json

  [
      {
          "t": 0.0,
          "value": 10.0
      },
      {
          "t": 1.0,
          "value": 17.071067811865476
      },
      {
          "t": 2.0,
          "value": 20.0
      },
      {
          "t": 3.0,
          "value": 17.071067811865476
      },
      {
          "t": 4.0,
          "value": 10.000000000000002
      },
      {
          "t": 5.0,
          "value": 2.9289321881345254
      }
  ]
  

.. _eva4_eva.generator.default__source.undeploy:

source.undeploy
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploy sources*
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
   * - **generator_sources**
     - Vec<struct/String>
     - Sources or a list of source names
     - **yes**
