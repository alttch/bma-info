Worker intervals
****************

Intervals are set with *interval* method, e.g.:

.. code:: javascript

   import { IntervalKind } from "@eva-ics/webengine"

   eva.set_interval(IntervalKind.Reload, 5);

the value means seconds. Available intervals:

* **action_watch** action result watcher interval

* **ajax_reload** reload item states when working in AJAX mode

* **ajax_log_reload** reload server log records when working in AJAX mode

* **heartbeat** server heartbeat interval

* **reload** force reload items when working in web socket mode.

* **restart** the interval between automatic restart attempts.

* **ws_buf_ttl** asks the server to group WebSocket events in buffers with the
  desired TTL (sec)
