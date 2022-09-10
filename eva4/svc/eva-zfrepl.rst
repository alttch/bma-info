Zero-failure replication service
********************************

.. contents::

**Requires** :doc:`../enterprise`.

.. include:: ../svc_doc/zfrepl.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-zfrepl.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-zfrepl.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.zfrepl.N.collector|replicator /opt/eva4/share/svc-tpl/svc-tpl-zfrepl.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.zfrepl.N.collector|replicator__client.start:

client.start
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *[replicator] Trigger mailbox client startup*
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
     - Mailbox name
     - **yes**

.. _eva4_eva.zfrepl.N.collector|replicator__disable:

disable
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *[replicator] Disable replication and kill all running tasks*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.zfrepl.N.collector|replicator__enable:

enable
------

.. list-table::
   :header-rows: 0

   * - Description
     - *[replicator] Enable replication*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.zfrepl.N.collector|replicator__mailbox.delete_block:

mailbox.delete_block
--------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *[collector] Delete a block*
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
     - Mailbox name
     - **yes**
   * - **block_id**
     - String
     - block ID
     - **yes**

.. _eva4_eva.zfrepl.N.collector|replicator__mailbox.fill:

mailbox.fill
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *[collector] Fill blocks from a local database service*
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
     - Mailbox name
     - **yes**
   * - **db_svc**
     - String
     - Database service name
     - **yes**
   * - **t_start**
     - f64
     - Starting timestamp (default: last 24 hours)
     - no
   * - **t_end**
     - f64
     - Ending timestamp (default: now)
     - no
   * - **xopts**
     - Map<String,Any>
     - extra options, passed to the database service as-is
     - no

.. _eva4_eva.zfrepl.N.collector|replicator__mailbox.get_block:

mailbox.get_block
-----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *[collector] Get ready-to-replicate-block*
   * - Parameters
     - required
   * - Returns
     - Block or nothing

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Mailbox name
     - **yes**


*Return payload example:*

.. code:: json

  {
      "block_id": "mbb_1656445625",
      "last": false,
      "path": "/opt/eva4/runtime/zfrepl/spool/rtest1/mbb_1656445625"
  }
  

.. _eva4_eva.zfrepl.N.collector|replicator__mailbox.list_blocks:

mailbox.list_blocks
-------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *[collector] List ready-to-replicate blocks*
   * - Parameters
     - required
   * - Returns
     - Block list

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Mailbox name
     - **yes**


*Return payload example:*

.. code:: json

  [
      {
          "block_id": "mbb_1656445625",
          "path": "/opt/eva4/runtime/zfrepl/spool/rtest1/mbb_1656445625",
          "size": 2983121
      },
      {
          "block_id": "mbb_1656445635",
          "path": "/opt/eva4/runtime/zfrepl/spool/rtest1/mbb_1656445635",
          "size": 2916
      }
  ]
  

.. _eva4_eva.zfrepl.N.collector|replicator__mailbox.rotate:

mailbox.rotate
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *[collector] Delete all blocks in the mailbox*
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
     - Mailbox name
     - **yes**

.. _eva4_eva.zfrepl.N.collector|replicator__process_dir:

process_dir
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *[replicator/standalone] Process blocks from a local dir*
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
   * - **path**
     - String
     - Local path
     - **yes**
   * - **node**
     - String
     - Source node name (any if not important)
     - **yes**
   * - **delete**
     - bool
     - Delete processed blocks (r/w permissions required)
     - no

.. _eva4_eva.zfrepl.N.collector|replicator__status:

status
------

.. list-table::
   :header-rows: 0

   * - Description
     - *[replicator] Replication status*
   * - Parameters
     - *none*
   * - Returns
     - Status payload


*Return payload example:*

.. code:: json

  {
      "active_clients": ["node1"],
      "enabled": true
  }
