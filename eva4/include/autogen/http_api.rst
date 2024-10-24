.. _eva4_hmi_http__action:

action
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes a unit action*
   * - Parameters
     - required
   * - Returns
     - Current result payload

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
     - Unit OID
     - **yes**
   * - **value**
     - Any
     - Desired unit value
     - **yes**
   * - **priority**
     - u8
     - Action priority
     - no
   * - **wait**
     - f64
     - Wait max seconds to finish
     - no
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/action.req
    :response: ../../http_api_examples/action.resp


.. _eva4_hmi_http__action.kill:

action.kill
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Attempts to terminate/cancel all scheduled/running actions for the specified item*
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
     - Item OID
     - **yes**
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/action.kill.req
    :response: ../../http_api_examples/action.kill.resp


.. _eva4_hmi_http__action.result:

action.result
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets current action result*
   * - Parameters
     - required
   * - Returns
     - Current result payload

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
   * - **u**
     - String
     - Action UUID
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/action.result.req
    :response: ../../http_api_examples/action.result.resp


.. _eva4_hmi_http__action.terminate:

action.terminate
----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Attempts to terminate/cancel an action*
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
   * - **u**
     - String
     - Action UUID
     - **yes**
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/action.terminate.req
    :response: ../../http_api_examples/action.terminate.resp


.. _eva4_hmi_http__action.toggle:

action.toggle
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes a unit status-toggle action*
   * - Parameters
     - required
   * - Returns
     - Current result payload

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
     - Unit OID
     - **yes**
   * - **priority**
     - u8
     - Action priority
     - no
   * - **wait**
     - f64
     - Wait max seconds to finish
     - no
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/action.toggle.req
    :response: ../../http_api_examples/action.toggle.resp


.. _eva4_hmi_http__api_log.get:

api_log.get
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets log of recent API calls (requires ACL op "moderator")*
   * - Parameters
     - required
   * - Returns
     - List of recent API calls

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
   * - **t_start**
     - String/i64
     - Start time
     - no
   * - **t_end**
     - String/i64
     - End time
     - no
   * - **user**
     - String
     - Filter by user (requires admin access)
     - no
   * - **acl**
     - String
     - Filter by ACL ID
     - no
   * - **method**
     - String
     - Filter by method
     - no
   * - **source**
     - String
     - Filter by source
     - no
   * - **code**
     - i64
     - Filter by code
     - no
   * - **success**
     - bool
     - Filter by success/failed
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/api_log.get.req
    :response: ../../http_api_examples/api_log.get.resp


.. _eva4_hmi_http__bus__TARGET_SVC__METHOD:

bus::<TARGET_SVC>::<METHOD>
---------------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Calls any bus method (requires admin ACL)*
   * - Parameters
     - Sent as-is to the target service, except "k"
   * - Returns
     - The target service reply as-is

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
    :request: ../../http_api_examples/bus__TARGET_SVC__METHOD.req
    :response: ../../http_api_examples/bus__TARGET_SVC__METHOD.resp


.. _eva4_hmi_http__call:

call
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Call any HMI method using a string query*
   * - Parameters
     - required
   * - Returns
     - The result of the target method

Allows to call any HTTP method using a string query

E.g.

.. code::

  item.state_history sensor:tests/temp fill=10T xopts.retention=daily

The first unnamed parameter goes to "i". If an array is required, a value
must be comma-separated, e.g. key=1,2,3 (for 1-item array key=1,). Keys
with dots are formatted as maps (max one level allowed).

The method should be used in human-interactive environments only.


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
   * - **q**
     - String
     - Call query
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/call.req
    :response: ../../http_api_examples/call.resp


.. _eva4_hmi_http__db.list:

db.list
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get available databases*
   * - Parameters
     - required
   * - Returns
     - List of available databases

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
    :request: ../../http_api_examples/db.list.req
    :response: ../../http_api_examples/db.list.resp


.. _eva4_hmi_http__dobj.generate_struct_code:

dobj.generate_struct_code
-------------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Generate data object structure code*
   * - Parameters
     - required
   * - Returns
     - Data object structure code

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
     - String/Vec<String>
     - Data object name(s)
     - **yes**
   * - **lang**
     - String
     - Language ("rust", "c")
     - **yes**
   * - **config**
     - Any
     - A specific language generator configuration
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/dobj.generate_struct_code.req
    :response: ../../http_api_examples/dobj.generate_struct_code.resp


.. _eva4_hmi_http__dobj.get_struct:

dobj.get_struct
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get data object structure*
   * - Parameters
     - required
   * - Returns
     - Data object structure

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
     - Data object name
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/dobj.get_struct.req
    :response: ../../http_api_examples/dobj.get_struct.resp


.. _eva4_hmi_http__dobj.list:

dobj.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get list of data objects*
   * - Parameters
     - required
   * - Returns
     - List of data objects

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
    :request: ../../http_api_examples/dobj.list.req
    :response: ../../http_api_examples/dobj.list.resp


.. _eva4_hmi_http__item.check_access:

item.check_access
-----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Check read/write access for a single or multiple items*
   * - Parameters
     - required
   * - Returns
     - Map OID/access

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
     - Vec<String>/String
     - Item OID(s) or masks
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/item.check_access.req
    :response: ../../http_api_examples/item.check_access.resp


.. _eva4_hmi_http__item.state:

item.state
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets state of item(s)*
   * - Parameters
     - required
   * - Returns
     - List of item states

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
     - Vec<String>/String
     - Item OID(s) or masks
     - no
   * - **full**
     - bool
     - Full state (enabled + meta)
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/item.state.req
    :response: ../../http_api_examples/item.state.resp


.. _eva4_hmi_http__item.state_history:

item.state_history
------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets state history for item(s)*
   * - Parameters
     - required
   * - Returns
     - State history payload

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
     - Vec<String>/String
     - Item OID(s)
     - **yes**
   * - **t_start**
     - f64/String
     - Beginning timestamp (default: last 24 hours)
     - no
   * - **t_end**
     - f64/String
     - Ending timestamp (default: now)
     - no
   * - **fill**
     - String
     - Fill (nS/T/H/D/W e.g. 10T for 10-minute or nA for n records) + optional [:precision]
     - no
   * - **limit**
     - u32
     - Limit records to
     - no
   * - **prop**
     - String
     - Fetch the state property status or value only
     - no
   * - **xopts**
     - Map<String, String>
     - Extra options, depending on database type
     - no
   * - **database**
     - String
     - DB svc to get history from, w/o "eva.db." pfx (def: specified in default_db)
     - no
   * - **output_format**
     - String
     - "list" or "dict"
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/item.state_history.req
    :response: ../../http_api_examples/item.state_history.resp


.. _eva4_hmi_http__item.state_log:

item.state_log
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets state log for item(s)*
   * - Parameters
     - required
   * - Returns
     - State log payload

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
     - Item OID/Mask
     - **yes**
   * - **t_start**
     - f64/String
     - Beginning timestamp (default: last 24 hours)
     - no
   * - **t_end/String**
     - f64
     - Ending timestamp (default: now)
     - no
   * - **limit**
     - u32
     - Limit records to
     - no
   * - **xopts**
     - Map<String, String>
     - Extra options, depending on database type
     - no
   * - **database**
     - String
     - DB svc to get history from, w/o "eva.db." pfx (def: specified in default_db)
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/item.state_log.req
    :response: ../../http_api_examples/item.state_log.resp


.. _eva4_hmi_http__log.get:

log.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets memory logger log records, requires log allow in ACL*
   * - Parameters
     - required
   * - Returns
     - List of log records

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
   * - **level**
     - String/u8
     - Log level (trace, debug, info, warn, error)
     - no
   * - **time**
     - u32
     - Recent entries, N seconds before now
     - no
   * - **limit**
     - u32
     - Limit records to
     - no
   * - **module**
     - String
     - Filter by module
     - no
   * - **rx**
     - String
     - Filter by regex in message
     - no
   * - **msg**
     - String
     - message filter substring
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/log.get.req
    :response: ../../http_api_examples/log.get.resp


.. _eva4_hmi_http__login:

login
-----

.. list-table::
   :header-rows: 0

   * - Description
     - *Login and obtain session token (read-write)*
   * - Parameters
     - required
   * - Returns
     - Token information payload

* if no params are given, the method attempts to login user using basic
  auth or x-auth-key header

* if k parameter is given, the method attempts to authenticate API key and
  create a temporary token for it. In ACI and API call logs requests are
  marked as user=.key_id

* if user and password are set, the method attempts to login user
  using the provided credentials

* if token is set, the method returns token information

* if both user, password and token are set, the method switches the token
  in read-write mode


.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **user**
     - String
     - User login
     - no
   * - **password**
     - String
     - User password (plain)
     - no
   * - **token**
     - String
     - User token
     - no
   * - **k**
     - String
     - API key
     - no
   * - **xopts**
     - Map<String, Any>
     - Extra auth ptions
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/login.req
    :response: ../../http_api_examples/login.resp


.. _eva4_hmi_http__logout:

logout
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Ends the user session and destroys the token*
   * - Parameters
     - required
   * - Returns
     - always no error, even if the token does not exist

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **token**
     - String
     - User token
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/logout.req
    :response: ../../http_api_examples/logout.resp


.. _eva4_hmi_http__lvar.clear:

lvar.clear
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Sets lvar status to 0*
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
     - Lvar OID
     - **yes**
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/lvar.clear.req
    :response: ../../http_api_examples/lvar.clear.resp


.. _eva4_hmi_http__lvar.decr:

lvar.decr
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Decrements lvar value by 1*
   * - Parameters
     - required
   * - Returns
     - New lvar value

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
     - Lvar OID
     - **yes**
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/lvar.decr.req
    :response: ../../http_api_examples/lvar.decr.resp


.. _eva4_hmi_http__lvar.incr:

lvar.incr
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Increments lvar value by 1*
   * - Parameters
     - required
   * - Returns
     - New lvar value

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
     - Lvar OID
     - **yes**
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/lvar.incr.req
    :response: ../../http_api_examples/lvar.incr.resp


.. _eva4_hmi_http__lvar.reset:

lvar.reset
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Sets lvar status to 1*
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
     - Lvar OID
     - **yes**
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/lvar.reset.req
    :response: ../../http_api_examples/lvar.reset.resp


.. _eva4_hmi_http__lvar.set:

lvar.set
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Sets lvar status/value*
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
     - Lvar OID
     - **yes**
   * - **status**
     - i16
     - Desired status
     - no
   * - **value**
     - Any
     - Desired value
     - no
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/lvar.set.req
    :response: ../../http_api_examples/lvar.set.resp


.. _eva4_hmi_http__lvar.toggle:

lvar.toggle
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Toggles lvar status between 0 and 1*
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
     - Lvar OID
     - **yes**
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/lvar.toggle.req
    :response: ../../http_api_examples/lvar.toggle.resp


.. _eva4_hmi_http__ping:

ping
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Pings the back-end, prolongs the session*
   * - Parameters
     - required
   * - Returns
     - Nothing

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
    :request: ../../http_api_examples/ping.req
    :response: ../../http_api_examples/ping.resp


.. _eva4_hmi_http__profile.get_field:

profile.get_field
-----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set user profile field*
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
   * - **field**
     - String
     - Field name (email)
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/profile.get_field.req
    :response: ../../http_api_examples/profile.get_field.resp


.. _eva4_hmi_http__profile.set_field:

profile.set_field
-----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set user profile field*
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
   * - **field**
     - String
     - Field name (email)
     - **yes**
   * - **value**
     - Any
     - Field value
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/profile.set_field.req
    :response: ../../http_api_examples/profile.set_field.resp


.. _eva4_hmi_http__pvt.get:

pvt.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get contents of a file in pvt (text)*
   * - Parameters
     - required
   * - Returns
     - File content

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
   * - **path**
     - String
     - Relative path
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/pvt.get.req
    :response: ../../http_api_examples/pvt.get.resp


.. _eva4_hmi_http__pvt.list:

pvt.list
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *List entries in pvt*
   * - Parameters
     - required
   * - Returns
     - List of available files and folders

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
   * - **path**
     - String
     - Relative path
     - **yes**
   * - **masks**
     - String/Vec<String>
     - file masks
     - no
   * - **kind**
     - String
     - file, dir or any
     - no
   * - **recursive**
     - bool
     - recursive listing
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/pvt.list.req
    :response: ../../http_api_examples/pvt.list.resp


.. _eva4_hmi_http__pvt.put:

pvt.put
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Puts contents of a file in pvt (text)*
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
   * - **path**
     - String
     - Relative path
     - **yes**
   * - **content**
     - String
     - File content
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/pvt.put.req
    :response: ../../http_api_examples/pvt.put.resp


.. _eva4_hmi_http__pvt.unlink:

pvt.unlink
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deletes a file in pvt*
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
   * - **path**
     - String
     - Relative path
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/pvt.unlink.req
    :response: ../../http_api_examples/pvt.unlink.resp


.. _eva4_hmi_http__run:

run
---

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes a lmacro action*
   * - Parameters
     - required
   * - Returns
     - Current result payload

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
     - Lmacro OID
     - **yes**
   * - **args**
     - Vec<Any>
     - Arguments
     - no
   * - **kwargs**
     - Map<String, Any>
     - Keyword arguments
     - no
   * - **priority**
     - u8
     - Action priority
     - no
   * - **wait**
     - f64
     - Wait max seconds to finish
     - no
   * - **note**
     - String
     - a custom note for accounting
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/run.req
    :response: ../../http_api_examples/run.resp


.. _eva4_hmi_http__session.list_neighbors:

session.list_neighbors
----------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *List all logged in users (if allowed)*
   * - Parameters
     - required
   * - Returns
     - List of logged in users

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
    :request: ../../http_api_examples/session.list_neighbors.req
    :response: ../../http_api_examples/session.list_neighbors.resp


.. _eva4_hmi_http__session.set_readonly:

session.set_readonly
--------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set the current session token read-only*
   * - Parameters
     - required
   * - Returns
     - *nothing*

To switch back to normal (read/write) session, either call "login" method
to create a new session, or call it with user+password+a params to keep the
current one.


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
    :request: ../../http_api_examples/session.set_readonly.req
    :response: ../../http_api_examples/session.set_readonly.resp


.. _eva4_hmi_http__set_password:

set_password
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Changes the current password (user must be logged in and session token used)*
   * - Parameters
     - required
   * - Returns
     - if the password has been changed, the session is dropped and the user must re-login

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
   * - **current_password**
     - String
     - Current user's password
     - **yes**
   * - **password**
     - String
     - New user's password
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/set_password.req
    :response: ../../http_api_examples/set_password.resp


.. _eva4_hmi_http__test:

test
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Tests the node and HMI svc, returns system info*
   * - Parameters
     - required
   * - Returns
     - System info (struct)

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
    :request: ../../http_api_examples/test.req
    :response: ../../http_api_examples/test.resp


.. _eva4_hmi_http__user_data.delete:

user_data.delete
----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Delete user data*
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
   * - **key**
     - String
     - field key
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/user_data.delete.req
    :response: ../../http_api_examples/user_data.delete.resp


.. _eva4_hmi_http__user_data.get:

user_data.get
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get user data*
   * - Parameters
     - required
   * - Returns
     - User data field value

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
   * - **key**
     - String
     - field key
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/user_data.get.req
    :response: ../../http_api_examples/user_data.get.resp


.. _eva4_hmi_http__user_data.set:

user_data.set
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Set user data*
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
   * - **key**
     - String
     - field key
     - **yes**
   * - **value**
     - any
     - field value
     - **yes**

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/user_data.set.req
    :response: ../../http_api_examples/user_data.set.resp


.. _eva4_hmi_http__x__TARGET_SVC__METHOD:

x::<TARGET_SVC>::<METHOD>
-------------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Calls "x" service method*
   * - Parameters
     - Sent as-is to the target service, except "k"
   * - Returns
     - *nothing*

Allows to extend HTTP API with custom functions.

Similar to the admin bus call, but does not check ACL/permissions. The
target service MUST implement "x" EAPI method and check ACL/permissions by
itself.

The target service gets the following parameters payload:

======  ======  =============================
Name    Type    Description
======  ======  =============================
method  String  sub-method 
params  Any     call params as-is, except "k"
aci     Struct  call ACI
acl     Struct  call ACL
======  ======  =============================


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
    :request: ../../http_api_examples/x__TARGET_SVC__METHOD.req
    :response: ../../http_api_examples/x__TARGET_SVC__METHOD.resp


