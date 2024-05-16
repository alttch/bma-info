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

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-alarms/unsubscribe.req
    :response: ../../http_api_examples/eva-svc-alarms/unsubscribe.resp


