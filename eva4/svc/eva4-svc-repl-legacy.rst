Legacy (V3) replication service
*******************************

.. contents::

.. include:: ../repl/repl_v3legacy.rst


Installing/updating
===================

Legacy (V3) replication service is not included into EVA ICS distribution. To install/update it,
either edit "eva/config/python-venv" :doc:`registry<../registry>` key, specify
the desired version in "extra" section (e.g. *eva4-repl-legacy>=0.0.1*) and rebuild the
Python virtual environment (*/opt/eva4/sbin/venvmgr build*). Or execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr add eva4-repl-legacy
    # or 
    /opt/eva4/sbin/venvmgr add eva4-repl-legacy==N # where N = version number

The latest eva-shell version number can be obtained from
https://pypi.org/project/eva4-repl-legacy/

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-replication-legacy.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-replication-legacy.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.repl.legacy1 /opt/eva4/share/svc-tpl/svc-tpl-replication-legacy.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.repl.legacy__node.list:

node.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *List V3 nodes and their states*
   * - Parameters
     - *none*
   * - Returns
     - List (struct)


*Return payload example:*

.. code:: json

  [
      {
          "build": 2022042901,
          "controllers": [
              "uc",
              "lm"
          ],
          "id": "plant1",
          "key": "default-v3",
          "key_legacy": "default",
          "online": true,
          "reload_interval": 10,
          "timeout": 5,
          "version": "3.4.2"
      },
      {
          "build": null,
          "controllers": [
              "uc",
              "lm"
          ],
          "id": "plant2",
          "key": "default-v3",
          "key_legacy": "default",
          "online": false,
          "reload_interval": 10,
          "timeout": 5,
          "version": null
      }
  ]
  

.. _eva4_eva.repl.legacy__node.reload:

node.reload
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Force reload a node*
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
