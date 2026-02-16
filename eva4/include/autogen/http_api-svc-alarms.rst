.. _eva4_svc_alarm__ack:

ack
---

.. list-table::
   :header-rows: 0

   * - Description
     - *Acknowledge an alarm*
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
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **i**
     - String
     - Alarm OID
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
    "method": "ack",
    "params": {
      "i": "lvar:alarm/default/mws1/20/test/AL001",
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 58
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": null
  }



..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/ack.req
    :response: ../../http_api_examples/eva-svc-alarms/ack.resp


.. _eva4_svc_alarm__history:

history
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get alarm history*
   * - Parameters
     - required
   * - Returns
     - Alarm history

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
     - History filter structure (see :ref:`eva4_eva.alarm.__alarm.history`)
     - Alarm history filter
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
    "method": "history",
    "params": {
      "filter": {
        "node": "mws1"
      },
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 905
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": [
        {
            "ack": false,
            "group": "test",
            "id": "AL001",
            "level": 20,
            "node": "mws1",
            "latch": false,
            "lo": "TT",
            "los": "",
            "losk": "P",
            "oid": "lvar:alarm/default/mws1/20/test/AL001",
            "oos": false,
            "sbd": false,
            "shelv": false,
            "t": 1715732660.061618,
            "trig": true
        },
        {
            "ack": false,
            "group": "test",
            "id": "AL001",
            "level": 20,
            "node": "mws1",
            "latch": false,
            "lo": "CC",
            "los": "",
            "losk": "P",
            "oid": "lvar:alarm/default/mws1/20/test/AL001",
            "oos": false,
            "sbd": false,
            "shelv": false,
            "t": 1715732890.977563,
            "trig": false
        }
    ]
  }



..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/history.req
    :response: ../../http_api_examples/eva-svc-alarms/history.resp


.. _eva4_svc_alarm__shelv:

shelv
-----

.. list-table::
   :header-rows: 0

   * - Description
     - *Shelve an alarm*
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
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **i**
     - String
     - Alarm OID
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
    "method": "shelv",
    "params": {
      "i": "lvar:alarm/default/mws1/20/test/AL001",
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 58
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": null
  }



..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/shelv.req
    :response: ../../http_api_examples/eva-svc-alarms/shelv.resp


.. _eva4_svc_alarm__state:

state
-----

.. list-table::
   :header-rows: 0

   * - Description
     - *Get alarm states (all)*
   * - Parameters
     - required
   * - Returns
     - List of alarm states

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
     - State filter structure (see :ref:`eva4_eva.alarm.__alarm.state`)
     - Alarm state filter
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
    "method": "state",
    "params": {
      "filter": {
        "node": "mws1"
      },
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 781
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": [
        {
            "active": false,
            "current": "CC",
            "description": "test alarm",
            "group": "test",
            "id": "AL001",
            "level": 20,
            "node": "mws1",
            "oid": "lvar:alarm/default/mws1/20/test/AL001",
            "subscribed_email": [
              "TT",
              "TL",
              "OS"
            ]
        },
        {
            "active": true,
            "current": "TL",
            "description": null,
            "group": "test",
            "id": "AL002",
            "level": 20,
            "node": "mws1",
            "oid": "lvar:alarm/default/mws1/20/test/AL002",
            "subscribed_email": [
              "TT",
              "TL",
              "OS"
            ]
        }
    ]
  }



..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/state.req
    :response: ../../http_api_examples/eva-svc-alarms/state.resp


.. _eva4_svc_alarm__subscribe:

subscribe
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Subscribe a user to alarm state changes*
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
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **oid_mask**
     - String/Vec<String>
     - Alarm OID mask
     - **yes**
   * - **nk**
     - String
     - Notification kind
     - **yes**
   * - **op**
     - String/Vec<String>
     - Alarm operation code
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
    "method": "subscribe",
    "params": {
      "k": "secretkey",
      "nk": "M",
      "oid_mask": "lvar:alarm/default/mws1/20/test/AL001",
      "op": [
        "TT",
        "TL",
        "OS"
      ]
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 67
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
      "ok": true
    }
  }


..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/subscribe.req
    :response: ../../http_api_examples/eva-svc-alarms/subscribe.resp


.. _eva4_svc_alarm__summary:

summary
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get alarm summary*
   * - Parameters
     - required
   * - Returns
     - Alarm summary

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

..
  Request example (JSON RPC 2.0):
  POST /jrpc HTTP/1.1
  accept: application/json
  content-type: application/json
  host: localhost:7727

  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "summary",
    "params": {
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 132
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": {
        "active": 1,
        "active_by_node": {
            "mws1": 1
        }
    }
  }



..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/summary.req
    :response: ../../http_api_examples/eva-svc-alarms/summary.resp


.. _eva4_svc_alarm__unshelv:

unshelv
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Unshelve an alarm*
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
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **i**
     - String
     - Alarm OID
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
    "method": "unshelv",
    "params": {
      "i": "lvar:alarm/default/mws1/20/test/AL001",
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 58
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": null
  }



..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/unshelv.req
    :response: ../../http_api_examples/eva-svc-alarms/unshelv.resp


.. _eva4_svc_alarm__unsubscribe:

unsubscribe
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Unsubscribe a user from alarm state changes*
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
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **oid_mask**
     - String/Vec<String>
     - Alarm OID mask
     - **yes**
   * - **nk**
     - String
     - Notification kind
     - **yes**
   * - **op**
     - String/Vec<String>
     - Alarm operation code
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
    "method": "unsubscribe",
    "params": {
      "k": "secretkey",
      "nk": "M",
      "oid_mask": "lvar:alarm/default/mws1/20/test/AL001",
      "op": [
        "TT",
        "TL",
        "OS"
      ]
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 67
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
      "ok": true
    }
  }


..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/unsubscribe.req
    :response: ../../http_api_examples/eva-svc-alarms/unsubscribe.resp


