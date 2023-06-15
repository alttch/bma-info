Replication service
*******************

.. contents::

.. include:: ../include/repl.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-replication.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-replication.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.repl.1 /opt/eva4/share/svc-tpl/svc-tpl-replication.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.repl.__bus__SVC_ID__METHOD:

bus::<SVC_ID>::<METHOD>
-----------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Calls any remote method (requires management access)*
   * - Parameters
     - required
   * - Returns
     - RPC result as-is

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **node**
     - String
     - Remote node ID
     - **yes**

.. _eva4_eva.repl.__node.append:

node.append
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Appends remote node with the default configuration*
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
     - Node name
     - **yes**

.. _eva4_eva.repl.__node.deploy:

node.deploy
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploys remote nodes and their configuration*
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
   * - **nodes**
     - Vec<struct>
     - Node configurations (same as got in *node.export*)
     - no

.. _eva4_eva.repl.__node.export:

node.export
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Exports node deployment configurations*
   * - Parameters
     - required
   * - Returns
     - Node deploy config

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Node ID (accepts wildcards)
     - **yes**


*Return payload example:*

.. code:: json

  {
      "nodes": [
          {
              "admin_key_id": "admin",
              "compress": true,
              "enabled": true,
              "key_id": "default",
              "name": "rtest1",
              "ping_interval": 1.0,
              "reload_interval": 60.0,
              "timeout": 30.0
          }
      ]
  }
  

.. _eva4_eva.repl.__node.get:

node.get
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets state of a single remote node*
   * - Parameters
     - required
   * - Returns
     - Node state (struct)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Node name
     - **yes**


*Return payload example:*

.. code:: json

  {
      "build": 2022050902,
      "compress": true,
      "enabled": true,
      "link_uptime": 183.26962651,
      "managed": true,
      "name": "rtest1",
      "online": true,
      "ping_interval": 1.0,
      "reload_interval": 60.0,
      "static": true,
      "timeout": 30.0,
      "version": "4.0.0"
  }
  

.. _eva4_eva.repl.__node.get_config:

node.get_config
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets configuration of a single node*
   * - Parameters
     - required
   * - Returns
     - Node config (struct)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Node ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "admin_key_id": "admin",
      "compress": true,
      "enabled": true,
      "key_id": "default",
      "name": "rtest1",
      "ping_interval": 1.0,
      "reload_interval": 60.0,
      "timeout": 30.0
  }
  

.. _eva4_eva.repl.__node.list:

node.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists remote nodes*
   * - Parameters
     - *none*
   * - Returns
     - List (struct)


*Return payload example:*

.. code:: json

  [
      {
          "build": 2022050902,
          "compress": true,
          "enabled": true,
          "link_uptime": 85.004101572,
          "managed": true,
          "name": "rtest1",
          "online": true,
          "ping_interval": 1.0,
          "reload_interval": 60.0,
          "static": true,
          "timeout": 30.0,
          "version": "4.0.0"
      },
      {
          "build": 2022050902,
          "compress": true,
          "enabled": true,
          "link_uptime": 122.0092,
          "managed": true,
          "name": "rtest2",
          "online": true,
          "ping_interval": 1.0,
          "reload_interval": 60.0,
          "static": true,
          "timeout": 30.0,
          "version": "4.0.0"
      }
  ]
  

.. _eva4_eva.repl.__node.mtest:

node.mtest
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Tests management call to a remote node*
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
     - Node ID
     - **yes**

.. _eva4_eva.repl.__node.reload:

node.reload
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Forces reload of a remote node*
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
     - Node ID
     - **yes**

.. _eva4_eva.repl.__node.remove:

node.remove
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Removes a single node*
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
     - Node ID
     - **yes**

.. _eva4_eva.repl.__node.test:

node.test
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Tests connection to a remote node*
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
     - Node ID
     - **yes**

.. _eva4_eva.repl.__node.undeploy:

node.undeploy
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploys remote nodes and their configuration*
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
   * - **nodes**
     - Vec<struct/String>
     - Node configurations or IDs
     - no
