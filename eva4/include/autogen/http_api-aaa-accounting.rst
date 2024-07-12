.. _eva4_aaa_accounting_http__query:

query
-----

.. list-table::
   :header-rows: 0

   * - Description
     - *Query accunting events*
   * - Parameters
     - required
   * - Returns
     - Events matching the filter

* Requires *log* :ref:`eva4_acl` ops permission or an admin user


.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **filter**
     - Filter structure (see :ref:`eva4_eva.aaa.accounting__query`)
     - Record filter
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-aaa-accounting/query.req
    :response: ../../http_api_examples/eva-aaa-accounting/query.resp


.. _eva4_aaa_accounting_http__query.count:

query.count
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Count accunting events*
   * - Parameters
     - required
   * - Returns
     - Number of events matching the filter

* Requires *log* :ref:`eva4_acl` ops permission or an admin user


.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **filter**
     - Filter structure (see :ref:`eva4_eva.aaa.accounting__query`)
     - Record filter
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-aaa-accounting/query.count.req
    :response: ../../http_api_examples/eva-aaa-accounting/query.count.resp


.. _eva4_aaa_accounting_http__query.field_aggregated:

query.field_aggregated
----------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Query aggregated field values*
   * - Parameters
     - required
   * - Returns
     - Aggregated field values matching the filter

* Requires *log* :ref:`eva4_acl` ops permission or an admin user


.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **filter**
     - Filter structure (see :ref:`eva4_eva.aaa.accounting__query.field_aggregated`)
     - Record filter
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-aaa-accounting/query.field_aggregated.req
    :response: ../../http_api_examples/eva-aaa-accounting/query.field_aggregated.resp


