.. _eva4_sim.ads.port__list:

list
----

.. list-table::
   :header-rows: 0

   * - Description
     - *List ADS services*
   * - Parameters
     - *none*
   * - Returns
     - ADS Service list


*Return payload example:*

.. code:: json

  [
    "ams_addr": "127.0.0.1.1.1:200",
    "svc_id": "sim.ads.dev1.core",
    "ams_addr": "127.0.0.1.1.1:851",
    "svc_id": "sim.ads.dev1.plc1",
    "ams_addr": "127.0.0.1.1.1:852",
    "svc_id": "sim.ads.dev1.plc2"
  ]
  

