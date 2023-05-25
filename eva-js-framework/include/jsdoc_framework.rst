.. js:function:: $eva.action.exec(oid, params, wait)

    Call unit action

    :param oid: unit OID
    :type oid: string
    :param params: action params
    :type params: object
    :param wait: wait until the action is completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: $eva.action.kill(oid)

    Terminate all unit actions

    :param oid: unit OID
    :type oid: string
    :async: Async function/Promise

.. js:function:: $eva.action.run(oid, params, wait)

    Run lmacro

    :param oid: lmacro oid
    :type oid: string
    :param params: call params
    :type params: object
    :param wait: wait until completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: $eva.action.start(oid, wait)

    Call unit action with status=1

    :param oid: unit OID
    :type oid: string
    :param wait: wait until the action is completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: $eva.action.stop(oid, wait)

    Call unit action with status=0

    :param oid: unit OID
    :type oid: string
    :param wait: wait until the action is completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: $eva.action.terminate(uuid)

    Terminate a unit action

    :param uuid: action uuid
    :type uuid: string
    :async: Async function/Promise

.. js:function:: $eva.action.toggle(oid, wait)

    Call unit action to toggle its status

    :param oid: unit OID
    :type oid: string
    :param wait: wait until the action is completed (default: true)
    :type wait: boolean
    :async: Async function/Promise

.. js:function:: $eva.call(func, p1, p2)

    Call API function
    
    Calls any available SFA API function

    :param arguments: item OID (if required), API call params
    :return: Promise object
    :async: Async function/Promise

.. js:function:: $eva.erase_token_cookie()

    Erase auth token cookie
    
    It is recommended to call this function when login form is displayed to
    prevent old token caching


.. js:function:: $eva.get_mode()

    Get framework engine mode

    :return: "js" or "wasm"

.. js:function:: $eva.interval(i, value)

    Set intervals

    :param i: interval, possible values:
           ajax_reload, heartbeat, log_reload, reload, restart
    :type i: string
    :param value: interval value (in seconds)
    :type value: number

.. js:function:: $eva.log_level(log_level)

    Change log processing level

    :param log_level: log processing level
    :type log_level: number

.. js:function:: $eva.log_start(log_level)

    Start log processing
    
    Starts log processing. Framework class must be already logged in.

    :param log_level: log processing level (optional)
    :type log_level: number

.. js:function:: $eva.lvar.clear(oid)

    Clear lvar (set status to 0)

    :param oid: lvar oid
    :type oid: string
    :async: Async function/Promise

.. js:function:: $eva.lvar.decr(oid)

    Decrement lvar value

    :param oid: lvar oid
    :type oid: string
    :return: the new value
    :async: Async function/Promise

.. js:function:: $eva.lvar.expires(lvar_oid)

    Get lvar expiration time left

    :param lvar_oid: lvar OID
    :type lvar_oid: string
    :return: seconds to expiration, -1 if expired, -2 if stopped

.. js:function:: $eva.lvar.incr(oid)

    Increment lvar value

    :param oid: lvar oid
    :type oid: string
    :return: the new value
    :async: Async function/Promise

.. js:function:: $eva.lvar.reset(oid)

    Reset lvar (set status to 1)

    :param oid: lvar oid
    :type oid: string
    :async: Async function/Promise

.. js:function:: $eva.lvar.set(oid, status, value)

    Set lvar state

    :param oid: lvar oid
    :type oid: string
    :param status: lvar status
    :type status: numberr
    :param value: lvar value
    :async: Async function/Promise

.. js:function:: $eva.lvar.set_status(oid, status)

    Set lvar status

    :param oid: lvar oid
    :type oid: string
    :param status: lvar status
    :type status: number
    :async: Async function/Promise

.. js:function:: $eva.lvar.set_value(oid, value)

    Set lvar value

    :param oid: lvar oid
    :type oid: string
    :param value: lvar value
    :async: Async function/Promise

.. js:function:: $eva.lvar.toggle(oid)

    Toggle lvar status

    :param oid: lvar oid
    :type oid: string
    :async: Async function/Promise

.. js:function:: $eva.on(event, func)

    Set event handler function
    
    A single kind of event can have a single handler only

    :param event: event, possible values:
          login.success, login.failed, ws.event, server.reload,
          server.restart, heartbeat.success, heartbeat.error, log.record,
          log.postprocess, login.otp_required, login.otp_invalid,
          login.otp_setup
    :type event: string
    :param func: function called on event
    :type func: function

.. js:function:: $eva.restart()

    Restart the Framework
    
    e.g. used on heartbeat error or if subscription parameters are changed


.. js:function:: $eva.set_normal(u, p, xopts)

    Ask server to return the token to normal mode
    
    (EVA ICS 3.3.2+)

    :param u: login
    :type u: string
    :param p: password
    :type p: string
    :param xopts: extra options (e.g. OTP)
    :type xopts: object
    :async: Async function/Promise

.. js:function:: $eva.set_readonly()

    Ask server to set the token read-only (e.g. after idle)
    
    (EVA ICS 3.3.2+)
    
    the current mode can be obtained from $eva.server_info.aci.token_mode

    :async: Async function/Promise

.. js:function:: $eva.sleep(sec)

    Sleep the number of seconds

    :param sec: seconds to sleep
    :type sec: number
    :async: Async function/Promise

.. js:function:: $eva.start()

    Start the Framework
    
    After calling the function authenticates user, opens a WebSocket (in
    case of WS mode) or schedule AJAXs refresh interval.


.. js:function:: $eva.state(oid)

    Get item state

    :param oid: item OID
    :type oid: string
    :return: state object or undefined if no item found

.. js:function:: $eva.status(oid)

    Get item status

    :param oid: item OID
    :type oid: string
    :return: item status(int) or undefined if no object found

.. js:function:: $eva.stop(keep_auth)

    Stop Framework
    
    After calling the function closes open WebSocket if available, stops all
    workers then tries to close the server session

    :param keep_auth: keep authentication cookies and token
    :type keep_auth: boolean
    :return: Promise object
    :async: Async function/Promise

.. js:function:: $eva.system_name()

    Get system name

    :return: the system name or null if the framework is not logged in

.. js:function:: $eva.unwatch(oid, func)

    Stop watching item state updates
    
    If item oid or function is not specified, all watching functions are
    removed for a single oid (mask) or for all the items watched.

    :param oid: item oid (e.g. sensor:env/temp1, or sensor:env/\*)
    :type oid: string
    :param func: function to be removed
    :type func: function

.. js:function:: $eva.value(oid)

    Get item value

    :param oid: item OID
    :type oid: string
    :return: item value or undefined if no item found

.. js:function:: $eva.watch(oid, func, ignore_initial)

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

.. js:function:: $eva.watch_action(uuid, func)

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

