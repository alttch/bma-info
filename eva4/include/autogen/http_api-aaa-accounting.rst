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
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-aaa-accounting/query.req
    :response: ../../http_api_examples/eva-aaa-accounting/query.resp


