.. _eva4_sim.modbus.sensor__var.get:

var.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get the sensor value*
   * - Parameters
     - *none*
   * - Returns
     - The sensor value


*Return payload example:*

.. code:: json

  {
      "value": 25
  }
  

.. _eva4_sim.modbus.sensor__var.set:

var.set
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set the sensor value*
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
   * - **value**
     - Any
     - Sensor value
     - **yes**

