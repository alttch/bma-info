Handling Framework events
**************************

Event handlers are set by *on(event, func)* and fired on:

* **login.success** successful login

* **login.failed** login failure

* **login.otp_required** OTP code is required for login

* **login.otp_invalid** OTP code is provided but invalid

* **login.otp_setup** OTP setup is required, the parameter contains OTP secret

* **ws.event** WebSocket event. If handler return false, event is skipped by
  framework.

* **server.reload** server asked clients to reload UI

* **server.restart** server is being restarted

* **server.EVENT** other server events

* **supervisor.EVENT** supervisor events (message, lock, unlock)

* **heartbeat.success** successful heartbeat

* **heartbeat.error** heartbeat error (default: *$eva.restart*)

* **log.record** new log record to toss

* **log.postprocess** log processing is finished (e.g. scroll viewer down)

Each event can have only one handler.

Example:

.. code:: javascript

   $eva.on("login.success", () => {
     // hide the login window and display UI page
   });

For OTP examples, see :doc:`../eva4/2fa`.
