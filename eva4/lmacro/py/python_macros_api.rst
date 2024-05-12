Built-in functions
==================


.. _eva4_py_macro_api_cat_general:

General functions
=================



.. _eva4_py_macro_api_bus_publish:

bus_publish - publishes a message to a bus topic
------------------------------------------------



.. code-block:: python

    bus_publish('SOME/TOPIC', 'Hello, World!')

Parameters:

* **topic** topic name
* **payload** message payload
* **qos** QoS level (default: 0)


.. _eva4_py_macro_api_date:

date - date/time
----------------



.. code-block:: python

    r = date()

Returns:

Serialized date/time object (dict)

.. code-block:: json

    {
        "day": 14,
        "hour": 0,
        "minute": 47,
        "month": 5,
        "second": 16,
        "timestamp": 1557787636.680612,
        "weekday": 1,
        "year": 2019
    }


.. _eva4_py_macro_api_decrement_shared:

decrement_shared - decrements value of the shared variable
----------------------------------------------------------

Decrements value of the variable, shared between controller macros. Initial value must be number

.. code-block:: python

    decrement_shared('counter1')

Parameters:

* **name** variable name


.. _eva4_py_macro_api_exit:

exit - finishes macro execution
-------------------------------



.. code-block:: python

    exit(1)

Parameters:

* **code** macro exit code (default: 0, no errors)


.. _eva4_py_macro_api_get_directory:

get_directory - gets path to EVA ICS directory
----------------------------------------------



Parameters:

* **tp** directory type: eva, runtime, svc_data, venv or xc

Raises:

* **LookupError** if the directory type is invalid


.. _eva4_py_macro_api_increment_shared:

increment_shared - increments value of the shared variable
----------------------------------------------------------

Increments value of the variable, shared between controller macros. Initial value must be number

.. code-block:: python

    increment_shared('counter1')

Parameters:

* **name** variable name


.. _eva4_py_macro_api_instant:

instant - system monotonic timer value
--------------------------------------

Alias for time.perf_counter

.. code-block:: python

    r = instant()
    print(r)

    522.5493


.. _eva4_py_macro_api_ls:

ls - lists files in directory
-----------------------------

If recursive is true, the pattern "**" will match any files and zero or more directories and subdirectories.

.. code-block:: python

    r = ls('/opt/i/*.jpg')

Parameters:

* **mask** path and mask (e.g. /opt/data/\*.jpg)
* **recursive** if True, perform a recursive search

Returns:

dict with fields 'name' 'file', 'size' and 'time' { 'c': created, 'm': modified }

.. code-block:: json

    [
        {
            "file": "/opt/i/20170926_004347.jpg",
            "name": "20170926_004347.jpg",
            "size": 6464873,
            "time": {
                "c": 1553460493.280853,
                "m": 1506379536.0
            }
        },
        {
            "file": "/opt/i/20171017_095941.jpg",
            "name": "20171017_095941.jpg",
            "size": 1650389,
            "time": {
                "c": 1553460493.2968528,
                "m": 1510695841.0
            }
        },
        {
            "file": "/opt/i/20171029_194029.jpg",
            "name": "20171029_194029.jpg",
            "size": 3440296,
            "time": {
                "c": 1553460493.324853,
                "m": 1510695762.0
            }
        },
        {
            "file": "/opt/i/20170926_004334.jpg",
            "name": "20170926_004334.jpg",
            "size": 6523001,
            "time": {
                "c": 1553460493.1648533,
                "m": 1506379526.0
            }
        }
    ]


.. _eva4_py_macro_api_mail:

mail - sends email message
--------------------------

Requires mailer svc to be set in the controller config

.. code-block:: python

    mail(subject='we have a problem', text='sensor 5 is down')

Optionally:

* **subject** email subject
* **text** email text
* **rcp** email recipient or array of the recipients
* **i** user login recipient or array of the recipients

Raises:

* **FunctionFailed** mail is not sent


.. _eva4_py_macro_api_ping:

ping - pings a remote host
--------------------------

Requires fping tool

Parameters:

* **host** host name or IP to ping
* **timeout** ping timeout in milliseconds (default: 1000)
* **count** number of packets to send (default: 1)

Returns:

True if host is alive, False if not


.. _eva4_py_macro_api_rpc_call:

rpc_call - performs a bus RPC call
----------------------------------

The method parameters are specified in kwargs

.. code-block:: python

    r = rpc_call('item.state', i='unit:tests/door')

Parameters:

* **method** method

Optionally:

* **_target** target service (default: eva.core)
* **_timeout** call timeout

Returns:

the bus call result

.. code-block:: json

    {
        "act": 0,
        "connected": true,
        "ieid": [
            2225,
            24731566246084
        ],
        "node": "mws1",
        "oid": "unit:tests/door",
        "status": 1,
        "t": 1651971627.58268,
        "value": null
    }


.. _eva4_py_macro_api_run:

run - executes another lmacro
-----------------------------

Args and kwargs are passed to the target lmacro as-is, except listed below.

.. code-block:: python

    r = run('lmacro:tests/test1', v1='test', v2=999, _wait=2)

Parameters:

* **_oid** lmacro OID

Optionally:

* **_wait** wait for the completion for the specified number of seconds
* **_priority** queue priority (default is 100, lower is better)

Returns:

Serialized macro action object (dict)

.. code-block:: json

    {
        "err": null,
        "exitcode": 0,
        "finished": true,
        "node": "mws1",
        "oid": "lmacro:tests/test1",
        "out": "all is fine",
        "params": {
          "kwargs": {
            "v1": "test",
            "v2": 999
          }
        },
        "priority": 100,
        "status": "completed",
        "svc": "eva.controller.py",
        "time": {
            "accepted": 1651971891.772146,
            "completed": 1651971891.772503,
            "created": 1651971891.7694325,
            "pending": 1651971891.7723224,
            "running": 1651971891.7723744
        },
        "uuid": "3c291d89-9f25-4a2c-ad88-699867a8ce6b"
      }

Raises:

* **ResourceNotFound** macro not found


.. _eva4_py_macro_api_service:

service - get the service object for the direct access
------------------------------------------------------

e.g. service.bus: direct access to BUS/RT, service.rpc: direct access to BUS/RT RPC

Returns:

the service object


.. _eva4_py_macro_api_set_alarm:

set_alarm - sets alarm state
----------------------------

Requires alarm svc to be set in the controller config

.. code-block:: python

    set_alarm('lvar:alarm/default/mws1/20/test/AL001', 'TL')

Parameters:

* **oid** alarm OID
* **op** alarm operation

Optionally:

* **source** alarm source (default: lmacro)

Raises:

* **FunctionFailed** failed to set alarm state


.. _eva4_py_macro_api_set_shared:

set_shared - sets value of the shared variable
----------------------------------------------

Sets value of the variable, shared between controller macros

.. code-block:: python

    set_shared('var1', 777)

Parameters:

* **name** variable name

Optionally:

* **value** value to set. If empty, the variable is deleted


.. _eva4_py_macro_api_sha256sum:

sha256sum - calculates SHA256 sum
---------------------------------



Parameters:

* **value** value to calculate
* **hexdigest** return binary digest or hex (True, default)

Returns:

sha256 digest


.. _eva4_py_macro_api_shared:

shared - gets value of the shared variable
------------------------------------------

Gets value of the variable, shared between controller macros

.. code-block:: python

    r = shared('var1')
    print(r)

    777

Parameters:

* **name** variable name

Optionally:

* **default** value if variable doesn't exist

Returns:

variable value, None (or default) if variable doesn't exist


.. _eva4_py_macro_api_sleep:

sleep - sleep(seconds)
----------------------

Delay execution for a given number of seconds.  The argument may be a floating point number for subsecond precision.

.. code-block:: python

    sleep(0.1)


.. _eva4_py_macro_api_system:

system - execute the command in a subshell
------------------------------------------

Alias for os.system

.. code-block:: python

    r = system('touch /tmp/1.dat')
    print(r)

    0

Returns:

shell exit code (0 - no error)


.. _eva4_py_macro_api_system_name:

system_name - get the system name
---------------------------------



.. code-block:: python

    r = system_name()
    print(r)

    myhost

Returns:

system name


.. _eva4_py_macro_api_time:

time - current time in seconds since Epoch
------------------------------------------

Return the current time in seconds since the Epoch. Fractions of a second may be present if the system clock provides them.

.. code-block:: python

    r = time()
    print(r)

    1553461581.549374



.. _eva4_py_macro_api_cat_item:

Item functions
==============



.. _eva4_py_macro_api_state:

state - gets item state
-----------------------



.. code-block:: python

    r = state('unit:tests/door')

Parameters:

* **oid** item OID or mask

Returns:

item status/value dict or list for mask

.. code-block:: json

    {
        "act": 0,
        "connected": true,
        "ieid": [
            2225,
            24731566246084
        ],
        "node": "mws1",
        "oid": "unit:tests/door",
        "status": 1,
        "t": 1651971627.58268,
        "value": null
    }

Raises:

* **ResourceNotFound** item not found


.. _eva4_py_macro_api_status:

status - gets item status
-------------------------



.. code-block:: python

    r = status('unit:tests/unit1')
    print(r)

    0

Parameters:

* **oid** item OID

Returns:

item status (integer)

Raises:

* **ResourceNotFound** item not found


.. _eva4_py_macro_api_update_state:

update_state - updates item state
---------------------------------



.. code-block:: python

    update_state('sensor:tests/temp', dict(value=20))
    update_state('sensor:tests/failed', dict(status=-1))

Parameters:

* **oid** item OID
* **state** new state (may contain status/value fields)


.. _eva4_py_macro_api_value:

value - gets item value
-----------------------



.. code-block:: python

    r = value('sensor:env/temp_test')
    print(r)

    191.0

Parameters:

* **i** item OID

Optionally:

* **default** value if null (default is empty string)

Returns:

item value

Raises:

* **ResourceNotFound** item not found



.. _eva4_py_macro_api_cat_lvar:

LVar functions
==============



.. _eva4_py_macro_api_clear:

clear - clears lvar status
--------------------------

Set lvar status to 0 or stop timer lvar (set timer status to 0)

.. code-block:: python

    clear('lvar:tests/test1')

Parameters:

* **oid** lvar OID

Raises:

* **FunctionFailed** lvar value set error
* **ResourceNotFound** lvar not found


.. _eva4_py_macro_api_decrement:

decrement - decrements lvar value
---------------------------------



.. code-block:: python

    decrement('lvar:tests/test1')

Parameters:

* **oid** lvar OID

Raises:

* **FunctionFailed** lvar value decrement error
* **ResourceNotFound** lvar not found


.. _eva4_py_macro_api_increment:

increment - increments lvar value
---------------------------------



.. code-block:: python

    increment('lvar:tests/test1')

Parameters:

* **lvar_id** lvar OID

Raises:

* **FunctionFailed** lvar value increment error
* **ResourceNotFound** lvar not found


.. _eva4_py_macro_api_is_expired:

is_expired - checks is lvar (timer) or item state expired/error
---------------------------------------------------------------



.. code-block:: python

    r = is_expired('lvar:nogroup/timer1')
    print(r)

    True

Parameters:

* **oid** item OID

Returns:

True if the timer has been expired

Raises:

* **ResourceNotFound** item not found


.. _eva4_py_macro_api_reset:

reset - resets lvar status
--------------------------

Set lvar status to 1 or start lvar timer

.. code-block:: python

    reset('lvar:tests/test1')

Parameters:

* **oid** lvar OID

Raises:

* **FunctionFailed** lvar value set error
* **ResourceNotFound** lvar not found


.. _eva4_py_macro_api_set:

set - sets lvar value
---------------------



.. code-block:: python

    set('lvar:tests/test1', value=1)

Parameters:

* **oid** lvar OID

Optionally:

* **value** lvar value (if not specified, lvar is set to null)

Raises:

* **FunctionFailed** lvar value set error
* **ResourceNotFound** lvar not found


.. _eva4_py_macro_api_toggle:

toggle - toggles lvar status
----------------------------

Change lvar status to opposite boolean (0->1, 1->0)

.. code-block:: python

    toggle('lvar:tests/test1')

Parameters:

* **oid** lvar OID

Raises:

* **FunctionFailed** lvar value set error
* **ResourceNotFound** lvar not found



.. _eva4_py_macro_api_cat_unit:

Unit control
============



.. _eva4_py_macro_api_action:

action - executes unit control action
-------------------------------------



.. code-block:: python

    r = action('unit:tests/door', value=1, wait=5)

Parameters:

* **oid** unit OID
* **value** desired unit value

Optionally:

* **wait** wait for the completion for the specified number of seconds
* **priority** queue priority (default is 100, lower is better)

Returns:

Serialized action object (dict)

.. code-block:: json

    {
        "err": null,
        "exitcode": 0,
        "finished": true,
        "node": "mws1",
        "oid": "unit:tests/door",
        "out": null,
        "params": {
            "status": 1
        },
        "priority": 100,
        "status": "completed",
        "svc": "eva.controller.virtual",
        "time": {
            "accepted": 1651971627.5822825,
            "completed": 1651971627.5823474,
            "created": 1651971627.5794573
        },
        "uuid": "60202130-8c28-4632-a645-f840849ca144"
    }

Raises:

* **FunctionFailed** action failed to be executed
* **ResourceNotFound** unit not found


.. _eva4_py_macro_api_action_toggle:

action_toggle - executes an action to toggle unit status
--------------------------------------------------------

Creates a unit control action to toggle its status (1->0, 0->1)

.. code-block:: python

    r = action_toggle('unit:tests/door', wait=5)

Parameters:

* **oid** unit OID

Optionally:

* **value** desired unit value
* **wait** wait for the completion for the specified number of seconds
* **uuid** action UUID (will be auto generated if none specified)
* **priority** queue priority (default is 100, lower is better)

Returns:

Serialized action object (dict)

.. code-block:: json

    {
        "err": null,
        "exitcode": 0,
        "finished": true,
        "node": "mws1",
        "oid": "unit:tests/door",
        "out": null,
        "params": {
            "status": 1
        },
        "priority": 100,
        "status": "completed",
        "svc": "eva.controller.virtual",
        "time": {
            "accepted": 1651971627.5822825,
            "completed": 1651971627.5823474,
            "created": 1651971627.5794573
        },
        "uuid": "60202130-8c28-4632-a645-f840849ca144"
    }

Raises:

* **ResourceNotFound** unit not found


.. _eva4_py_macro_api_is_busy:

is_busy - checks is the unit busy
---------------------------------



.. code-block:: python

    r = is_busy('tests/unit1')
    print(r)

    False

Parameters:

* **oid** unit OID

Returns:

True if unit is busy (action is executed)

Raises:

* **ResourceNotFound** unit not found


.. _eva4_py_macro_api_kill:

kill - kills unit actions
-------------------------

Terminates the current action (if possible) and cancels all pending

.. code-block:: python

    kill('unit:tests/unit1')

Parameters:

* **oid** unit OID

Raises:

* **ResourceNotFound** unit not found


.. _eva4_py_macro_api_result:

result - gets action status
---------------------------

Checks the result of the action by its UUID or returns the actions for the specified unit

.. code-block:: python

    r = result('unit:tests/unit1')

Parameters:

* **oid** unit OID or
* **uuid** action uuid

Optionally:

* **sq** filter by action status: waiting, running, completed, failed or finished
* **limit** limit action list to N records

Returns:

list or single serialized action object

.. code-block:: json

    {
        "err": null,
        "exitcode": 0,
        "finished": true,
        "node": "mws1",
        "oid": "unit:tests/door",
        "out": null,
        "params": {
            "status": 1
        },
        "priority": 100,
        "status": "completed",
        "svc": "eva.controller.virtual",
        "time": {
            "accepted": 1651971627.5822825,
            "completed": 1651971627.5823474,
            "created": 1651971627.5794573
        },
        "uuid": "60202130-8c28-4632-a645-f840849ca144"
    }

Raises:

* **ResourceNotFound** unit or action not found


.. _eva4_py_macro_api_start:

start - executes an action to a unit
------------------------------------

Creates unit control action to set its value to 1

.. code-block:: python

    r = start('unit:tests/unit1', wait=5)

Parameters:

* **oid** unit OID

Optionally:

* **wait** wait for the completion for the specified number of seconds
* **priority** queue priority (default is 100, lower is better)

Returns:

Serialized action object (dict)

Raises:

* **ResourceNotFound** unit not found


.. _eva4_py_macro_api_stop:

stop - executes an action to stop a unit
----------------------------------------

Creates unit control action to set its value to 0

.. code-block:: python

    r = stop('unit:tests/unit1', wait=5)

Parameters:

* **oid** unit OID

Optionally:

* **wait** wait for the completion for the specified number of seconds
* **priority** queue priority (default is 100, lower is better)

Returns:

Serialized action object (dict)

Raises:

* **ResourceNotFound** unit not found


.. _eva4_py_macro_api_terminate:

terminate - terminates action execution
---------------------------------------

Terminates or cancel the action if it is still queued

.. code-block:: python

    try:
    terminate('unit:tests/unit1')
    except ResourceNotFound:
    print('no action running')

Parameters:

* **uuid** action uuid

Raises:

* **ResourceNotFound** if action is not found or action is already finished



.. _eva4_py_macro_api_cat_lock:

Locking functions
=================



.. _eva4_py_macro_api_lock:

lock - acquires a lock
----------------------

Requires locker svc to be set in the controller config

.. code-block:: python

    lock('lock1', expires=1)

Parameters:

* **lock_id** lock id
* **expires** time after which the lock is automatically unlocked (sec)

Optionally:

* **timeout** max timeout to wait

Raises:

* **FunctionFailed** failed to acquire the lock
* **TimeoutException** timed out


.. _eva4_py_macro_api_unlock:

unlock - releases a lock
------------------------

Releases the previously acquired lock

.. code-block:: python

    unlock('lock1')

Parameters:

* **lock_id** lock id

Raises:

* **FunctionFailed** ffailed to release the lock



.. _eva4_py_macro_api_cat_log:

Logging
=======



.. _eva4_py_macro_api_debug:

debug - log debug message
-------------------------

Alias for logging.debug

.. code-block:: python

    debug('this is a test debug message')


.. _eva4_py_macro_api_info:

info - log info message
-----------------------

Alias for logging.info

.. note::

  In Python macros, the default "print" function is alias for logging.info as well.


.. code-block:: python

    info('this is a test debug message')


.. _eva4_py_macro_api_warning:

warning - log warning message
-----------------------------

Alias for logging.warning

.. code-block:: python

    info('this is a test debug message')


.. _eva4_py_macro_api_error:

error - log error message
-------------------------

Alias for logging.error

.. code-block:: python

    error('this is a test debug message')


.. _eva4_py_macro_api_critical:

critical - log critical message
-------------------------------

Alias for logging.critical

.. code-block:: python

    critical('this is a test debug message')


.. _eva4_py_macro_api_report_accounting_event:

report_accounting_event - reports an event into accounting system
-----------------------------------------------------------------



.. code-block:: python

    report_accounting_event(subj='test', note='all is fine')

Optionally:

* **u** user account name (string)
* **src** source (e.g. IP address)
* **svc** service ID (default: sender)
* **subj** event subject
* **oid** affected item OID
* **data** a structure with any additional information
* **note** a custom note (string)
* **code** error code (0 = success)
* **err** error message


