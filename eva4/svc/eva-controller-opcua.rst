OPC-UA controller gateway
*************************

.. contents::

Allows to communicate with OPC-UA servers.

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-opcua.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-opcua.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.opcua1 /opt/eva4/share/svc-tpl/svc-tpl-controller-opcua.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.opcua__action:

action
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes a mapped unit action*
   * - Parameters
     - See :ref:`eva4_unit_action`
   * - Returns
     - See :ref:`eva4_unit_action`

.. _eva4_eva.controller.opcua__kill:

kill
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Attempts to terinate/cancel all actions for a unit*
   * - Parameters
     - See :ref:`eva4_unit_action`
   * - Returns
     - See :ref:`eva4_unit_action`

.. _eva4_eva.controller.opcua__terminate:

terminate
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Attempts to terminate/cancel a unit action*
   * - Parameters
     - See :ref:`eva4_unit_action`
   * - Returns
     - See :ref:`eva4_unit_action`

.. _eva4_eva.controller.opcua__var.get:

var.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get node value from OPC-UA*
   * - Parameters
     - required
   * - Returns
     - Node value, single or list

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - node id
     - **yes**
   * - **range**
     - String
     - array range
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no

.. _eva4_eva.controller.opcua__var.set:

var.set
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set node value on OPC-UA*
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
     - node id
     - **yes**
   * - **value**
     - Any
     - value to set
     - **yes**
   * - **type**
     - String
     - Data type (e.g. DINT)
     - **yes**
   * - **range**
     - String
     - array range
     - no
   * - **dimensions**
     - Vec<u32>
     - array dimensions
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no

.. _eva4_eva.controller.opcua__var.set_bulk:

var.set_bulk
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set symbols on OPC-UA in bulk*
   * - Parameters
     - required
   * - Returns
     - Operation status: failed-to-set node list or an empty dict

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - Vec<String>
     - node ids
     - **yes**
   * - **values**
     - Vec<Any>
     - values to set
     - **yes**
   * - **types**
     - Vec<String>
     - Data types (e.g. DINT)
     - **yes**
   * - **ranges**
     - Vec<Option<String>>
     - array ranges
     - no
   * - **dimensions**
     - Vec<Option<u32>>
     - array dimensions
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no


*Return payload example:*

.. code:: json

  {
    "failed": [ "ns=2;s=vari32" ]
  }
