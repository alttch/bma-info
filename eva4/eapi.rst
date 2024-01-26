EAPI commons
************

EAPI is the name of API/SDK, used in EVA ICS v4
:doc:`architecture<architecture>` by services and external software to
communicate with the node core and each other.

EAPI is based on :doc:`BUS/RT </busrt/index>` IPC bus and uses its default RPC
layer for procedure calls. The default encoding payload for all RPC calls
(except a few exclusions) is `MessagePack <https://msgpack.org/index.html>`_.

.. note::

    In EAPI Pub/Sub item OIDs are always used as paths: kind/group/id (":"
    between kind and group/id is replaced with "/").

.. contents::

Calling EAPI methods
====================

Service EAPI methods can be called either with bus clients or with included
CLI bus client (EVA_DIR/sbin/bus). Methods of individual services
(including internal ones) can be called as well with :ref:`eva4_eva-shell`,
using "svc call" command.

.. note::

    In the bus RPC, "no payload" and "null payload" have different meaning. In
    EVA ICS, "none" payload means that a method accepts no payload. If the
    method is called with "null" payload, it may return invalid parameters
    error.

    If RPC method requires parameters but all of them are optional, an empty
    struct (dict) MUST be specified as the parameters.

Type specifications
-------------------

The following type specifications are used in EVA ICS documentation:

* **uN** unsigned integer (e.g. u8 for 8-bit unsigned, u32 for 32-bit unsigned
  etc.)

* **iN** signed integer (e.g. i8 for 8-bit signed, i32 for 32-bit signed etc.)

* **fN** float-pointing number (f32 for 32-bit float, f64 for 64-bit float)

* **String** string value

* **bool** boolean (true/false)

* **Vec** vector (list/array)

* **struct** structure with particular fields (dictionary/object)

* **Map** key/value map with variable fields (dictionary/object)

* **Time** an internal time type, can be a number (parsed as a timestamp in
  seconds) or a string

When a parameter or a result field is a time value, it is usually specified as
f64-timestamp or f64-duration (some low-level methods may require durations as
micro- or nano-seconds).

.. _eva4_eapi_error_codes:

Error codes
-----------

* ERR_CODE_NOT_FOUND: -32001
* ERR_CODE_ACCESS_DENIED: -32002
* ERR_CODE_SYSTEM_ERROR: -32003
* ERR_CODE_OTHER: -32004
* ERR_CODE_NOT_READY: -32005
* ERR_CODE_UNSUPPORTED: -32006
* ERR_CODE_CORE_ERROR: -32007
* ERR_CODE_TIMEOUT: -32008
* ERR_CODE_INVALID_DATA: -32009
* ERR_CODE_FUNC_FAILED: -32010
* ERR_CODE_ABORTED: -32011
* ERR_CODE_ALREADY_EXISTS: -32012
* ERR_CODE_BUSY: -32013
* ERR_CODE_METHOD_NOT_IMPLEMENTED: -32014
* ERR_CODE_TOKEN_RESTRICTED: -32015
* ERR_CODE_IO: -32016
* ERR_CODE_REGISTRY: -32017
* ERR_CODE_EVAHI_AUTH_REQUIRED: -32018
* ERR_CODE_ACCESS_DENIED_MORE_DATA_REQUIRED: -32022

* ERR_CODE_PARSE: -32700
* ERR_CODE_INVALID_REQUEST: -32600
* ERR_CODE_METHOD_NOT_FOUND: -32601
* ERR_CODE_INVALID_PARAMS: -32602
* ERR_CODE_INTERNAL_RPC: -32603
* ERR_CODE_BUS_CLIENT_NOT_REGISTERED: -32113
* ERR_CODE_BUS_DATA: -32114
* ERR_CODE_BUS_IO: -32115
* ERR_CODE_BUS_OTHER: -32116
* ERR_CODE_BUS_NOT_SUPPORTED: -32117
* ERR_CODE_BUS_BUSY: -32118
* ERR_CODE_BUS_NOT_DELIVERED: -32119
* ERR_CODE_BUS_TIMEOUT: -32120

EAPI Basics
===========

All services must respond to "test" method (returns no payload) and to "info"
(returns the service meta data). The services, which fail to respond to "test",
are automatically considered as failed and are restarted.

A service must react to "stop" command. When called, it has shutdown_time to
stop, otherwise it is forcibly killed.

.. _eva4_eapi_metadata:

Metadata format
---------------

* author: service author
* description: service description
* version: service version
* methods: optional structure with info about provided methods

Method info structure
---------------------

The structure is a map and has the following format:

method=info

where info is a map with the mandatory fields:

description: method description
params: map of method parameters

Each parameter in "params" is a map, which has the following format:

* required: true/false

Example
-------

Example meta data format (info+methods):

.. code:: json

    {
        "author": "Bohemia Automation",
        "description": "Virtual bus controller",
        "version": "4.0.0"
        "methods": {
            "get": {
                "description": "get oid register",
                "params": {
                    "i": {
                        "required": true
                    }
                }
            },
            "list": {
                "description": "list oid registers",
                "params": {}
            },
            "set": {
                "description": "set oid register",
                "params": {
                    "i": {
                        "required": true
                    },
                    "status": {
                        "required": false
                    },
                    "value": {
                        "required": false
                    }
                }
            }
        },
    }


Communications
==============

The core
--------

The core (eva.core) hosts bus broker (.broker), the registry (eva.registry)
and the main node launcher (eva.launcher.main). All these services are embedded
in a single OS process.

The core supports API methods to get / set / list items and API keys. Services
have to rather cache API keys for several seconds than to query them on each
call.

When the core and all services are started (or failed to start), the message
"status: ready" is being send to the topic SVC/ST

When the core is shutting down, the services receive "status: terminating"

ACL services
------------

There is one default ACL service included in EVA ICS distribution
"eva.aaa.acl". Custom ACL services can be developed for particular needs.

When ACL is created/modified/deleted, the service sends message to

AAA/ACL/ACL_ID (empty payload for the deleted key). This allows e.g. HMI and
replication services to drop login tokens and cached ACLs.

.. _eva4_eapi_core_events:

Core events
-----------

When eva.core processes an event and considers the state is changed, it sends a
message to the bus topic:

ST/<LOC|REM|RAR>/<OID>

where

* LOC - local state
* REM - remote replicated state
* RAR - remote replicated archive state

with the following payload fields:

* status: I16 - item status (-1 = generic error for units/sensors, other -
  custom)

* value (optional): any serializable

* t: f64 - state modification timestamp

* ieid: [u64, u64] - incremental event ID (replication marker)

The OID of the item is not present in the payload and should be obtained from
the event topic.

Raw events
----------

any service (e.g. a controller) can send raw event to "RAW/OID" with the
following payload:

* status: I16 - item status (-1 = generic error for units/sensors, other -
  custom)

* value (optional): any serializable value, including null (no value). If the
  field is absent, the item value is not modified.

A special field "force" can be used to forcibly set (when force=true) state of
disabled items. The field should be used only by admin interfaces or system
software.

Starting from the build 2023112801 the core also accepts raw bulk events sent
to "RAW" topic:

.. code:: json

    [
      {
        "oid": "sensor:t1",
        "status": 1,
        "value": 25.55
      },
      {
        "oid": "sensor:t2",
        "status": 1,
        "value": 35.99
      }
    ]

.. note::

    Producers should always minimize the number of bus events, especially blank
    ones.
   
Replication events
------------------

A replication service must submit and periodically refresh full list of items
to the bus topic:

RPL/INVENTORY/<SRC>

Source names must be different for all replication services.

When a replication service receives state event, it sends it to:

TOPIC: RPL/ST/<OID>

MSGPACK payload:

* t: set time // (float timestamp)
* ieid: XXXX // ieid
* status: i32 // status
* value: XXXX // value
* node: xxxxx // source node

If no item exist, the core creates a new one. If the item exists, the core
either updates its state (if the received state is newer) or sends replication
archive announcement.

The replication service must periodically mask a source online/offline, by
sending the frame to:

RPL/NODE/<SRC>

.. code:: json

    {
        "status": "online" // "offline", "removed"
    }

When the node is marked online, an additional field info (with subfields build:
u64 and version: string) can be present:

.. code:: json

    {
        "status": "online",
        "info": {
            "build": 2022041001,
            "version" "4.0.0"
        }
    }

Actions
-------

While the action is processed, its status is reported to "action/OID", the
action history is kept by the core.

Actions to remote services
~~~~~~~~~~~~~~~~~~~~~~~~~~

* The core does not keep history for local actions, however it keeps uuid-node
  records, which can be used to obtain results from the remotes

* Actions to remotes can have "wait" parameter, which obliges the replication
  service to call the remote action with it.

* Until v3 EOL, action.result parameters to replication services contain both
  uuid (u) and item oid(i), which is required to call either remote v3 UC or
  remote v3 LM PLC.

action.toggle
~~~~~~~~~~~~~

The toggle method is always transformed to a regular action at the node where
it is called.

Logs
----

All services can log to "LOG/IN/level" topic, which is processed by the core and
other optional services. All messages are in plain text

levels (lowercase): trace, debug, info, warn, error

if the core bus logger is enabled, the core sends aggregated log events to
LOG/EV/level bus topics.

Auth
----

Services authenticate users via RPC calls with the following methods:

* auth.user(login, password, timeout)
* auth.key(key, timeout)

.. note::

    Authentication RPC calls may contain additional payload fields which can be
    ignored if not required but MUST be acceptable.

If succeed, the methods must return a corresponding ACL, which can be combined
from multiple ACLs if more than one is assigned to the user/key.

If an auth service manages users and user password/assigned ACL is modified,
the service sends message to the bus topic:

AAA/USER/LOGIN (empty payload for the deleted account)

API keys modification events are sent to AAA/KEY/KEY_ID

Key managers must also respond to "key.get" method, providing id/key fields for
replication and other services.

Authentication services may implement additional methods:

* user.set_password(i, password, check_policy)

* user.get_profile_field(i, field)

.. code:: json

   {
    "value": "fieldvalue",
    "readonly": false
   }

* user.set_profile_field(i, field, value)

where *i* stands for user login.

Service topics
--------------

Services may use own topics e.g. to communicate with related services on the
same bus. The topics MUST start with

SVE/<SVC_ID>

Security model and call ACLs
============================

As all calls via the local bus come from trusted services only, they have
zero-authentication strategy.

If a trusted service (e.g. HMI) allows untrusted clients to call bus methods
directly, such RPC calls have following format:

* method: "x"
* params: payload

where the payload is:

* method: NNN // an actual service method/function to be called
* params: XXXX // parameters for the actual method/function
* acl: ACL of the untrusted client

The call may have additional fields, e.g. the default HMI service includes
"aci" (API call info) field as well.

Initial payload
===============

when the service is started, it gets initial settings in MessagePack format to
STDIN:

.. code:: yaml

    version: 4 # number
    system_name: System name # string
    id: service id (you) # string
    command: service executable path and optional arguments # string
    prepare_command: prepare command, must be handled by service # string, optional
    data_path: path to the service directory (runtime/svc_data/NAME) # string
    timeout:
        startup: startup timeout # number, optional
        shutdown: shutdown timeout # number, optional
        default: the default timeout # number, optional
    core:
        build: core build # number
        version: core version # string
        eapi_version: EAPI version # number
        path: path to EVA ICS installation directory # string
        log_level: logging level # number
        active: is the node already active # boolean
    bus:
        type: "native" (always) # string
        path: path to the bus socket (required) # string
        timeout: bus timeout # number, optional
        buf_ttl: buffer ttl (seconds) # number, optional
        buf_size: buffer size (optional, not required for JS) # number, optional
        queue_size: queue size (optional, not required for Python) # number, optional
        ping_interval: ping interval, number, DEPRECATED
    config:
        SERVICE CONFIG # any, optional
    workers: number of worker threads # number, optional
    user: username to drop privileges to # string, optional
    react_to_fail: react-to-fail support # boolean, optional
    fail_mode: react-to-fail mode state (if the previous instance exited with error) # boolean, optional
    fips: FIPS-140 mode # boolean, optional
    call_tracing: call tracing enabled # boolean, optional
    

When the service is successfully started, it must report "status: ready"
payload to everyone, otherwise it will be not marked as "online".

When the service is stopping, it should report "status: terminating" payload to
everyone.

Controller service requirements
===============================

Events
------

Controllers are not pulled by the core, they must send events from its internal
registers to RAW/OID bus topic.

.. _eva4_unit_action:

Unit actions
------------

A controller can react to "action" rpc call command. the payload contains:

* uuid: uuid (array of u8;16)
* i: OID (String)
* timeout: timeout (microseconds, u64)
* priority: u8 // lower is higher
* params/value: value payload, if required
* config: optional config

The controller should react to "terminate" command, the payload contains uuid:
UUID

The controller should react to "kill" command, the payload contains i: OID

The controller reports action states to ACT/OID topic, where the payload
contains:

* uuid: UUID
* status: ACTION STATUS (1 byte)
* b0000\_0000 - created
* b0000\_0001 - accepted (no announce required)
* b0000\_0010 - pending (queued)
* b0000\_1000 - running
* b0000\_1111 - completed
* b1000\_0000 - failed
* b1000\_0001 - canceled
* b1000\_0010 - terminated
* out: output (optional)
* err: error output (optional)

.. _eva4_macro_action:

Macros actions
--------------

A macro is any kind of scenario or function, stored and processed by the
controller or external hardware PLC.

A controller can react to "run" rpc call command. the payload contains:

* uuid: uuid (array of u8;16)
* i: lmacro OID (String)
* timeout: timeout (microseconds, u64), optional
* params/args: [Any] - macro arguments, optional
* params/kwargs: Map<String, Any> - macro keyword arguments, optional
* config: optional config

The controller reports action states to ACT/OID topic, where the payload has
the same format as for unit actions.
