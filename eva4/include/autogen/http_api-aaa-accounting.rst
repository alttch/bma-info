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

..
  Request example (JSON RPC 2.0):
  POST /jrpc HTTP/1.1
  accept: application/json
  content-type: application/json
  host: localhost:7727

  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "query",
    "params": {
      "filter": {
        "node": "mws1",
        "subj": "login"
      },
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 1216
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": [
        {
          "code": 0,
          "data": null,
          "err": null,
          "id": [
              207,
              214,
              106,
              1,
              143,
              123,
              76,
              205,
              159,
              165,
              103,
              26,
              81,
              30,
              20,
              201
          ],
          "node": "mws1",
          "note": null,
          "oid": null,
          "src": "127.0.0.1",
          "subj": "login",
          "svc": "eva.hmi.default",
          "t": 1706309851.0001848,
          "u": "admin"
        },
        {
          "code": 0,
          "data": null,
          "err": null,
          "id": [
              170,
              82,
              141,
              89,
              160,
              254,
              66,
              37,
              150,
              19,
              130,
              241,
              140,
              246,
              140,
              214
          ],
          "node": "mws1",
          "note": null,
          "oid": null,
          "src": "127.0.0.1",
          "subj": "login",
          "svc": "eva.hmi.default",
          "t": 1706309888.0001206,
          "u": "opx"
        }
      ]
  }



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

..
  Request example (JSON RPC 2.0):
  POST /jrpc HTTP/1.1
  accept: application/json
  content-type: application/json
  host: localhost:7727

  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "query.count",
    "params": {
      "filter": {
        "node": "mws1",
        "subj": "login"
      },
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 78
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": {
        "count": 2
      }
  }



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

..
  Request example (JSON RPC 2.0):
  POST /jrpc HTTP/1.1
  accept: application/json
  content-type: application/json
  host: localhost:7727

  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "query.field_aggregated",
    "params": {
      "filter": {
        "field": "subj"
      },
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 98
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": [
        "started",
        "terminating"
      ]
  }



..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-aaa-accounting/query.field_aggregated.req
    :response: ../../http_api_examples/eva-aaa-accounting/query.field_aggregated.resp


