Migration from EVA ICS JS Framework
***********************************

EVA ICS WebEngine is fully compatible with EVA ICS JS Framework except the
following:

* WebEngine is distributed as a ES/UMD modules only (with TypeScript
  definitions)

* EVA ICS v3 is no longer supported

* The primary class has been renamed from "EVA" to "Eva"

* the default "Eva"-class object can be registered in web browsers with
  manually calling "register\_legacy\_globals()" method of the main class

* Web socket mode is now turned on by default

* *eva.interval* has been renamed to *eva.set_interval*

* *eva.log_level* has been renamed to *eva.set_log_level*

* *eva.debug* turns debug logs however to see messages in the JS console, its
  log level must be additionally set to "Verbose". Despite of that, it is not
  recommended to enable debug mode in production as it causes CPU load

* "fetch" is no longer bundled as it is present in the majority of
  environments. For older environments consider manually importing a polyfill
  (e.g. "node-fetch") and setting it to *eva.external.fetch*.

* "WebSocket" is no longer bundled by default. If working in environment with
  no native websocket support, consider either setting "eva.ws\_mode" to false
  or using an external module (e.g. "ws") and setting it to
  *eva.external.WebSocket*.

* QRious is no longer bundled by default. If QR codes are required, consider
  manually importing "QRious" module and setting it to *eva.external.QRious*.

* EVA ICS HMI WASM extension is already compatible with the new module,
  consider asking your support engineer for upgrade.

* It is no longer necessary to restart the engine when *state_updates* property
  is changed - consider using *set_state_updates* method to modify state update
  policy in runtime (requires EVA ICS v4 build 2023061801 or later).
