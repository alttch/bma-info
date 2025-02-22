Handling engine events
**********************

.. contents::

Pub/Sub model
=============

Starting from the version *0.9.11*, the engine uses a pub/sub model for event
handling.

The pub/sub model is more flexible and allows to easily write custom
state-machines for authentication, state processing and other tasks.

Example:

.. code:: typescript

    const eva = new Eva();
    eva.subscribe_event_topic(
      `${EventTopic.ItemState}/#`,
      (topic: string, data: any) => {
        // handle item state change
      }
    );
    eva.subscribe_event_topic(EventTopic.WeSession, (topic: string, data: any) => {
        // handle web engine session events
    });
    eva.subscribe_event_topic(EventTopic.Server, (topic: string, data: any) => {
        // handle server info data
    });

For advanced usage examples, see :doc:`../eva-webengine-react/redux`.

Topics
------

Subscription for topics is performed using MQTT-like wildcards: "#" means any
topic after the prefix, "+" means any single level.

The following topics are available to subscribe.

==================================  =============================  =====================================================
Enum value                          String                         Description
==================================  =============================  =====================================================
EventTopic.ItemState                "ST"                           State subscriptions
`${EventTopic.ItemState}/...`       "ST/<OID-as-path>"             Item states (e.g. "ST/sensor/env/temp")
EventTopic.Server                   "SERVER"                       Server info ("ServerInfo" type)
`${EventTopic.Server}/RELOAD`       "SERVER/RELOAD"                Server reload event (gets "true")
`${EventTopic.Server}/<event>`      "SERVER/<event>"               Other server events (lowercase e.g. "SERVER/restart")
`${EventTopic.Supervisor}/<event>`  "SUPERVISOR/<event>"           Supervisor events (e.g. "SUPERVISOR/lock")
EventTopic.WeSession                "WE/SESSION"                   WebEngine session events ("SessionState" type)
`${EventTopic.WeItemState/...`      "WE/ST/<BLOCK>"                Internal block events (subscriptions, deletions)
`${EventTopic.WeItemState/...`      "WE/ST/<BLOCK>/<OID-as-path>"  Internal states per block, useful for debugging
==================================  =============================  =====================================================

* In case if a state topic (global or per-block) receives item state with
  *null* status field, it means the item has been deleted from the web engine
  state.

* In case if a block topic receives *null* value, it means the block has been
  deleted.

WebAssembly support
-------------------

For :doc:`../eva4/enterprise` customers, pub/sub support is available starting
from EVA WebEngine WASM build 341 and later.

State replication example
-------------------------

Generic hooks
=============

Event handlers are set by *on(event: EventKind | string, func)* and fired on:

* **LoginSuccess** successful login

* **LoginFailed** login failure

* **LoginOTPRequired** OTP code is required for login

* **LoginOTPInvalid** OTP code is provided but invalid

* **LoginOTPSetup** OTP setup is required, the parameter contains OTP secret

* **WsEvent** WebSocket event. If handler return false, event is skipped by
  engine.

* **ServerReload** server asked clients to reload UI

* **ServerRestart** server is being restarted

* **HeartbeatSuccess** successful heartbeat

* **HeartbeatError** heartbeat error (default: *eva.restart*)

* **LogRecord** new log record to toss

* **LogPostprocess** log processing is finished (e.g. scroll viewer down)

The following events are handled using a string-type event kind:

* **server.EVENT** other server events

* **supervisor.EVENT** supervisor events (message, lock, unlock)

The following events are handled as the following: if the handler throws an
exception, the execution is stopped:

* **WASMError** :ref:`WebAssembly extension <eva4_webengine_wasm>` load error
  (WebEngine 0.9.3+)

Each event can have only one handler.

Example:

.. code:: javascript

   import { EventKind } from "@eva-ics/webengine";

   eva.on(EventKind.LoginSuccess, () => {
     // hide the login window and display UI page
   });

For OTP examples, see :doc:`../eva4/2fa`.
