Modbus master controller
************************

.. contents::

Allows to communicate with Modbus-powered PLCs and other equipment.

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-modbus.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-modbus.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.modbus1 /opt/eva4/share/svc-tpl/svc-tpl-controller-modbus.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.modbus__action:

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

.. _eva4_eva.controller.modbus__kill:

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

.. _eva4_eva.controller.modbus__reg.get:

reg.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get Modbus slave register*
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
   * - **unit**
     - u8
     - Modbus unit ID
     - **yes**
   * - **reg**
     - String
     - Register (h/i/d/c e.g. h100 for holding #100)
     - **yes**
   * - **type**
     - String
     - Data type (e.g. DINT)
     - no
   * - **bit**
     - u8
     - Get an individual bit
     - no
   * - **count**
     - u32
     - Count of bits/registers
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no

.. _eva4_eva.controller.modbus__reg.set:

reg.set
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set Modbus slave register*
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
   * - **unit**
     - u8
     - Modbus unit ID
     - **yes**
   * - **reg**
     - String
     - Register (h/i/d/c e.g. h100 for holding #100)
     - **yes**
   * - **value**
     - Any
     - value to set
     - **yes**
   * - **type**
     - String
     - Data type (e.g. DINT)
     - no
   * - **bit**
     - u8
     - Get an individual bit
     - no
   * - **verify**
     - bool
     - Read the register back and verify its value
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no

.. _eva4_eva.controller.modbus__terminate:

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
