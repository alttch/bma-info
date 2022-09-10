.. _eva4_hmi_ws__bye:

bye
---

.. list-table::
   :header-rows: 0

   * - Description
     - *Closes the session*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_hmi_ws__ping:

ping
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Manually pings the server*
   * - Parameters
     - *none*
   * - Returns
     - {s:"pong"}

.. _eva4_hmi_ws__subscribe.log:

subscribe.log
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Subscribes to log events*
   * - Parameters
     - u8 (20 = info, 30 = warn, 40 = error)
   * - Returns
     - *nothing*

.. _eva4_hmi_ws__subscribe.state:

subscribe.state
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Subscribes to item state events*
   * - Parameters
     - Vec<OID/OIDMask(String)>
   * - Returns
     - *nothing*

