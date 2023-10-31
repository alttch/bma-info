.. js:function:: Eva.action.exec(oid, params, wait)

    Call unit action

    :param oid: unit OID
    :type oid: string
    :param params: action params
    :type params: object
    :param wait: wait until the action is completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: Eva.action.kill(oid)

    Terminate all unit actions

    :param oid: unit OID
    :type oid: string
    :async: Async function/Promise

.. js:function:: Eva.action.run(oid, params, wait)

    Run lmacro

    :param oid: lmacro oid
    :type oid: string
    :param params: call params
    :type params: object
    :param wait: wait until completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: Eva.action.start(oid, wait)

    Call unit action with value=1

    :param oid: unit OID
    :type oid: string
    :param wait: wait until the action is completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: Eva.action.stop(oid, wait)

    Call unit action with value=0

    :param oid: unit OID
    :type oid: string
    :param wait: wait until the action is completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: Eva.action.terminate(uuid)

    Terminate a unit action

    :param uuid: action uuid
    :type uuid: string
    :async: Async function/Promise

.. js:function:: Eva.action.toggle(oid, wait)

    Call unit action to toggle its value

    :param oid: unit OID
    :type oid: string
    :param wait: wait until the action is completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: Eva.call(method, p1, p2)

    Call API function
    
    Calls any available SFA API function

    :param method: API method
    :type method: string
    :param p1: call parameters. if specified as a string/object, transformed to i=val
    :type p1: object
    :param p2: additional call parameters if p1 is a string
    :type p2: object
    :return: Promise object
    :async: Async function/Promise

.. js:function:: Eva.erase_token_cookie()

    Erase auth token cookie
    
    It is recommended to call this function when login form is displayed to
    prevent old token caching


.. js:function:: Eva.get_mode()

    Get engine mode

    :return: "js" or "wasm"

.. js:function:: Eva.load_config(config_path)

    Load JSON configuration

    :param config_path: config path (default: config.json)
    :type config_path: string
    :return: Promise object
    :async: Async function/Promise

.. js:function:: Eva.log_start(log_level)

    Start log processing
    
    Starts log processing. The engine must be already logged in.

    :param log_level: log processing level (optional)
    :type log_level: number

.. js:function:: Eva.lvar.clear(oid)

    Clear lvar (set status to 0)

    :param oid: lvar oid
    :type oid: string
    :async: Async function/Promise

.. js:function:: Eva.lvar.decr(oid)

    Decrement lvar value

    :param oid: lvar oid
    :type oid: string
    :return: the new value
    :async: Async function/Promise

.. js:function:: Eva.lvar.expires(lvar_oid)

    Get lvar expiration time left

    :param lvar_oid: lvar OID
    :type lvar_oid: string
    :return: seconds to expiration, -1 if expired, -2 if stopped

.. js:function:: Eva.lvar.incr(oid)

    Increment lvar value

    :param oid: lvar oid
    :type oid: string
    :return: the new value
    :async: Async function/Promise

.. js:function:: Eva.lvar.reset(oid)

    Reset lvar (set status to 1)

    :param oid: lvar oid
    :type oid: string
    :async: Async function/Promise

.. js:function:: Eva.lvar.set(oid, status, value)

    Set lvar state

    :param oid: lvar oid
    :type oid: string
    :param status: lvar status
    :type status: numberr
    :param value: lvar value
    :async: Async function/Promise

.. js:function:: Eva.lvar.set_status(oid, status)

    Set lvar status

    :param oid: lvar oid
    :type oid: string
    :param status: lvar status
    :type status: number
    :async: Async function/Promise

.. js:function:: Eva.lvar.set_value(oid, value)

    Set lvar value

    :param oid: lvar oid
    :type oid: string
    :param value: lvar value
    :async: Async function/Promise

.. js:function:: Eva.lvar.toggle(oid)

    Toggle lvar status

    :param oid: lvar oid
    :type oid: string
    :async: Async function/Promise

.. js:function:: Eva.on(event, func)

    Set event handler function
    
    A single kind of event can have a single handler only

    :param event: engine event kind
    :type event: EventKind
    :param func: function called on event
    :type func: function

.. js:function:: Eva.register_globals()

    Registers the global object window.$eva


.. js:function:: Eva.register_legacy_globals()

    Registers global objects + legacy globals


.. js:function:: Eva.restart()

    Restart the engine
    
    e.g. used on heartbeat error or if subscription parameters are changed


.. js:function:: Eva.set_interval(interval_id, value)

    Set intervals

    :param interval_id: interval kind
    :type interval_id: IntervalKind
    :param value: interval value (in seconds)
    :type value: number

.. js:function:: Eva.set_log_level(log_level)

    Change log processing level

    :param log_level: log processing level
    :type log_level: number

.. js:function:: Eva.set_normal(user, password, xopts)

    Ask server to return the token to normal mode
    
    (Eva ICS 3.3.2+)

    :param u: login
    :type u: string
    :param p: password
    :type p: string
    :param xopts: extra options (e.g. OTP)
    :type xopts: object
    :async: Async function/Promise

.. js:function:: Eva.set_readonly()

    Ask server to set the token read-only (e.g. after idle)
    
    (Eva ICS 3.3.2+)
    
    the current mode can be obtained from $eva.server_info.aci.token_mode

    :async: Async function/Promise

.. js:function:: Eva.set_state_updates(state_updates, clear_existing)

    Set state updates without restart required

    :param state_updates: true/false or a string array
    :type state_updates: boolean
    :param clear_existing: clear existing states
    :type clear_existing: boolean
    :async: Async function/Promise

.. js:function:: Eva.sleep(sec)

    Sleep the number of seconds

    :param sec: seconds to sleep
    :type sec: number
    :async: Async function/Promise

.. js:function:: Eva.start()

    Start the engine
    
    After calling the function authenticates user, opens a WebSocket (in
    case of WS mode) or schedule AJAXs refresh interval.


.. js:function:: Eva.state(oid)

    Get item state

    :param oid: item OID
    :type oid: string
    :return: state object or undefined if no item found

.. js:function:: Eva.status(oid)

    Get item status

    :param oid: item OID
    :type oid: string
    :return: item status(int) or undefined if no object found

.. js:function:: Eva.stop(keep_auth)

    Stop the engine
    
    After calling the function closes open WebSocket if available, stops all
    workers then tries to close the server session

    :param keep_auth: keep authentication cookies and token
    :type keep_auth: boolean
    :return: Promise object
    :async: Async function/Promise

.. js:function:: Eva.system_name()

    Get system name

    :return: the system name or null if the engine is not logged in

.. js:function:: Eva.unwatch(oid, func)

    Stop watching item state updates
    
    If item oid or function is not specified, all watching functions are
    removed for a single oid (mask) or for all the items watched.

    :param oid: item oid (e.g. sensor:env/temp1, or sensor:env/\*)
    :type oid: string
    :param func: function to be removed
    :type func: function

.. js:function:: Eva.value(oid)

    Get item value

    :param oid: item OID
    :type oid: string
    :return: item value or undefined if no item found

.. js:function:: Eva.watch(oid, func, ignore_initial)

    Watch item state updates
    
    Registers the function to be called in case of state change event (or at
    first state load).
    
    If state is already loaded, function will be called immediately. One item
    (or item mask, set with "*") can have multiple watchers.

    :param oid: item oid (e.g. sensor:env/temp1, or sensor:env/\*)
    :type oid: string
    :param func: function to be called
    :type func: function
    :param ignore_initial: skip initial state callback
    :type ignore_initial: boolean

.. js:function:: Eva.watch_action(uuid, func)

    Watch action state by uuid
    
    Registers the function to be called in case of action status change
    event (or at first state load).
    
    If status is already loaded, function will be called immediately.
    Otherwise status is polled from the server with "action_watch" interval
    (default: 500ms).
    
    There is no unwatch function as watching is stopped as soon as the
    action is completed (or server error is occurred)

    :param uuid: action uuid
    :type uuid: string
    :param func: function to be called
    :type func: function

