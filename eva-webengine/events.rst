Handling engine events
**********************

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

Each event can have only one handler.

Example:

.. code:: javascript

   import { EventKind } from "@eva-ics/webengine";

   eva.on(EventKind.LoginSuccess, () => {
     // hide the login window and display UI page
   });

For OTP examples, see :doc:`../eva4/2fa`.
