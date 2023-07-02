Virtual controller
******************

.. contents::

The virtual controller service allows to define virtual units and sensors,
which can be used for automation tests, demos and other related purposes.


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-virtual.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-virtual.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.virt1 /opt/eva4/share/svc-tpl/svc-tpl-controller-virtual.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.virt__action:

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

.. _eva4_eva.controller.virt__get:

get
---

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets controller state of a virtual item*
   * - Parameters
     - required
   * - Returns
     - Item state struct

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


*Return payload example:*

.. code:: json

  {
      "oid": "sensor:tests/voltage",
      "status": 1,
      "value": 25.43
  }
  

.. _eva4_eva.controller.virt__list:

list
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists virtual items and their states*
   * - Parameters
     - *none*
   * - Returns
     - List (struct)


*Return payload example:*

.. code:: json

  [
      {
          "oid": "unit:tests/door",
          "status": 0,
          "value": null
      },
      {
          "oid": "sensor:tests/temp",
          "status": 1,
          "value": 42.37
      },
      {
          "oid": "sensor:tests/voltage",
          "status": 1,
          "value": 25.43
      }
  ]
  

.. _eva4_eva.controller.virt__set:

set
---

.. list-table::
   :header-rows: 0

   * - Description
     - *Sets controller state of a virtual item*
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
     - Item OID
     - **yes**
   * - **status**
     - u16
     - Item status
     - no
   * - **value**
     - Any
     - Item state value
     - no

.. _eva4_eva.controller.virt__var.destroy:

var.destroy
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroy virtual variable*
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
     - Variable ID
     - **yes**

.. _eva4_eva.controller.virt__var.get:

var.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get virtual variable value*
   * - Parameters
     - required
   * - Returns
     - value, single or list

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Variable ID
     - **yes**

.. _eva4_eva.controller.virt__var.list:

var.list
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *List virtual variables*
   * - Parameters
     - required
   * - Returns
     - Virtual variables and their values

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **full**
     - bool
     - Full output (id/value)
     - no


*Return payload example:*

.. code:: json

  [
      {
          "id": "some.var1"
      },
      {
          "id": "some.var2"
      },
      {
          "id": "some.var3"
      }
  ]
  

.. _eva4_eva.controller.virt__var.set:

var.set
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set virtual variable value*
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
     - Variable ID
     - **yes**
   * - **value**
     - Any
     - value to set
     - **yes**

.. _eva4_eva.controller.virt__var.set_bulk:

var.set_bulk
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set virtual variable values in bulk*
   * - Parameters
     - required
   * - Returns
     - Operation status: failed-to-set vars list or an empty dict

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - Vec<String>
     - variable IDs
     - **yes**
   * - **values**
     - Vec<Any>
     - values to set
     - **yes**


*Return payload example:*

.. code:: json

  {
    "failed": [ "var1" ]
  }

.. include:: ../include/controller_virtual.rst

