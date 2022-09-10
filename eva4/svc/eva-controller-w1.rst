1-Wire (OWFS) controller
************************

.. contents::

Allows to communicate with 1-Wire equipment via `OWFS <https://owfs.org>`_
(built-in). Supports both OWFS servers and direct 1-Wire bus access.


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-w1.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-w1.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.w1_1 /opt/eva4/share/svc-tpl/svc-tpl-controller-w1.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.w1___action:

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

.. _eva4_eva.controller.w1___kill:

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

.. _eva4_eva.controller.w1___terminate:

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

.. _eva4_eva.controller.w1___w1.get:

w1.get
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get 1-Wire attribute*
   * - Parameters
     - required
   * - Returns
     - Attribute value

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **path**
     - String
     - dev.path/attr
     - **yes**
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no

.. _eva4_eva.controller.w1___w1.info:

w1.info
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get 1-Wire device info*
   * - Parameters
     - required
   * - Returns
     - Device info struct

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **path**
     - String
     - device path
     - **yes**
   * - **timeout**
     - f64
     - Max operation timeout
     - no


*Return payload example:*

.. code:: json

  {
      "attrs": [
          "address",
          "alias",
          "crc8",
          "family",
          "id",
          "latesttemp",
          "locator",
          "power",
          "r_address",
          "r_id",
          "r_locator",
          "scratchpad",
          "temperature",
          "temphigh",
          "templow",
          "type"
      ],
      "family": 10,
      "path": "10.67C6697351FF",
      "type": "DS18S20"
  }
  

.. _eva4_eva.controller.w1___w1.scan:

w1.scan
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Scan 1-Wire bus*
   * - Parameters
     - required
   * - Returns
     - Scan result (list)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **types**
     - String/Vec<String>
     - filter by device type(s)
     - no
   * - **attrs_any**
     - String/Vec<String>
     - filter by device attrs(s), match any
     - no
   * - **attrs_all**
     - String/Vec<String>
     - filter by device attrs(s), match all
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **full**
     - bool
     - return extended info (attributes)
     - no


*Return payload example:*

.. code:: json

  [
      {
          "family": 10,
          "path": "10.67C6697351FF",
          "type": "DS18S20"
      },
      {
          "family": 5,
          "path": "05.4AEC29CDBAAB",
          "type": "DS2405"
      },
      {
          "family": 29,
          "path": "29.F2FBE3467CC2",
          "type": "DS2408"
      }
  ]
  

.. _eva4_eva.controller.w1___w1.set:

w1.set
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set 1-Wire attribute*
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
     - dev.path/attr
     - **yes**
   * - **value**
     - Any
     - value to set
     - **yes**
   * - **verify**
     - bool
     - Read the attribute back and verify its value
     - no
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **retries**
     - u8
     - Retry attempts
     - no
