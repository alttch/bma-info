.. _eva4_sim.ads.service__handle.list:

handle.list
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *List allocated ADS handles*
   * - Parameters
     - *none*
   * - Returns
     - ADS handle list


*Return payload example:*

.. code:: json

  {
      "127.0.0.1:54391": [
          {
              "id": 1,
              "index_group": 16448,
              "index_offset": 0,
              "size": 4
          }
      ]
  }
  

.. _eva4_sim.ads.service__state.get:

state.get
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get current ADS device state*
   * - Parameters
     - *none*
   * - Returns
     - ADS state


*Return payload example:*

.. code:: json

  {
      "state": "run"
  }
  

.. _eva4_sim.ads.service__state.set:

state.set
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set ADS device state*
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
   * - **state**
     - String
     - ADS state
     - **yes**

.. _eva4_sim.ads.service__var.get:

var.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get symbol value*
   * - Parameters
     - required
   * - Returns
     - Symbol value

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Symbol name
     - **yes**

.. _eva4_sim.ads.service__var.list:

var.list
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *List symbols*
   * - Parameters
     - required
   * - Returns
     - Symbols and their values

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **full**
     - bool
     - Full output (name/value)
     - no


*Return payload example:*

.. code:: json

  [
      {
          "name": "MAIN.var1"
      },
      {
          "name": "MAIN.var2"
      },
      {
          "name": "MAIN.var3"
      }
  ]
  

.. _eva4_sim.ads.service__var.set:

var.set
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set symbol value*
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
     - Symbol name
     - **yes**
   * - **value**
     - Any
     - value to set
     - **yes**

