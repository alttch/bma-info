.. _eva4_mlsrv__Citem.state_history:

Citem.state_history
-------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get item state history (cursor), prepares data as a stream of CSV strings*
   * - Parameters
     - required
   * - Returns
     - BUS/RT cursor (u=cursor UUID)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **oid_map**
     - OID processing maps (list)
     - Maps for server-side OID processing
     - **yes**
   * - **fill**
     - String
     - Fill (nS/T/H/D/W e.g. 10T for 10-minute) + optional [:precision]
     - **yes**
   * - **t_start**
     - f64/String
     - Beginning timestamp (default: last 24 hours)
     - no
   * - **t_end**
     - f64/String
     - Ending timestamp (default: now)
     - no
   * - **limit**
     - u32
     - Limit records to
     - no
   * - **time_format**
     - String
     - Time format: raw (UNIX TIMESTAMP, default), rfc3399 or no (no time colum required)
     - no

.. _eva4_mlsrv__N:

N
-

.. list-table::
   :header-rows: 0

   * - Description
     - *Get a next record of the cursor*
   * - Parameters
     - required
   * - Returns
     - Next record if available

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **u**
     - UUID
     - BUS/RT cursor UUID
     - **yes**

.. _eva4_mlsrv__NB:

NB
--

.. list-table::
   :header-rows: 0

   * - Description
     - *Get next records of the cursor in bulk*
   * - Parameters
     - required
   * - Returns
     - Array of next records if available

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **u**
     - UUID
     - BUS/RT cursor UUID
     - **yes**
   * - **c**
     - u32
     - Max number of records
     - no

