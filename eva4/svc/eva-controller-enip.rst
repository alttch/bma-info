Ethernet/IP PLC controller gateway
**********************************

.. contents::

Allows to communicate with Ethernet/IP-powered PLCs and other equipment.

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-enip.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-enip.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.enip1 /opt/eva4/share/svc-tpl/svc-tpl-controller-enip.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.enip__action:

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

.. _eva4_eva.controller.enip__kill:

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

.. _eva4_eva.controller.enip__terminate:

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

.. _eva4_eva.controller.enip__var.get:

var.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get En/IP tag from PLC*
   * - Parameters
     - required
   * - Returns
     - Tag value, single or list

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - PLC tag
     - **yes**
   * - **type**
     - String
     - Data type (e.g. DINT)
     - **yes**
   * - **size**
     - u32
     - Type size helper
     - no
   * - **count**
     - u32
     - Count of data blocks (e.g. for arrays)
     - no
   * - **bit**
     - u32
     - Get an individual bit
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no

.. _eva4_eva.controller.enip__var.set:

var.set
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set En/IP tag on PLC*
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
     - PLC tag
     - **yes**
   * - **value**
     - Any
     - value to set
     - **yes**
   * - **type**
     - String
     - Data type (e.g. DINT)
     - **yes**
   * - **bit**
     - u32
     - Set an individual bit
     - no
   * - **verify**
     - bool
     - Read the tag back and verify its value
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no
