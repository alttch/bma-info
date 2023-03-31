OID Processing map
------------------

The map is used to process EVA ICS item OIDs on the server side:

.. list-table:: Fields
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **status**
     - bool/String
     - Include (and assign a name) item status
     - no
   * - **value**
     - bool/String
     - Include (and assign a name) item value
     - no
   * - **database**
     - String
     - Get the item state history from a custom db service
     - no
   * - **xopts**
     - Map<String, Any>
     - Extra database query options
     - no
