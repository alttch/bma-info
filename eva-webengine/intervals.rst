Worker intervals
****************

Intervals are set with *interval* method, e.g.:

.. code:: typescript

   import { IntervalKind } from "@eva-ics/webengine"

   eva.set_interval(IntervalKind.Reload, 5);

the value means seconds. Available intervals:

* **IntervalKind.ActionWatch** action result watcher interval

* **IntervalKind.AjaxReload** reload item states when working in AJAX mode

* **IntervalKind.AjaxLogReload** reload server log records when working in AJAX
  mode

* **IntervalKind.Heartbeat** server heartbeat interval

* **IntervalKind.Reload** force reload items when working in web socket mode.

* **IntervalKind.Restart** the interval between automatic restart attempts.

* **IntervalKind.WsBufTtl** asks the server to group WebSocket events in
  buffers with a desired TTL (sec)
