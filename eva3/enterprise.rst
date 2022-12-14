Enterprise extensions
*********************

.. contents::

EVA JS Framework WASM extension
===============================

`WASM <https://webassembly.org>`_ extension for `EVA JS Framework
<https://github.com/alttch/eva-js-framework/>`_ offloads state processing from
the web browser JavaScript engine to the WASM application, allowing SCADA HMI
to monitor hundreds of items without any client device overhead.

According to tests, EVA JS Framework with WASM extension is about 20x times
faster, than in regular mode.

Installation
------------

* Obtain WASM extension from a `Bohemia Automation representative
  <https://www.bohemia-automation.com/contacts/>`_.

* The extension requires EVA JS Framework version 0.3.25 or above.

* Unpack *evajw-XXXX.tgz* archive into the directory where EVA JS Framework is
  installed. E.g. if the framework is installed in */opt/eva/ui*, the module
  should be placed in */opt/eva/ui/evajw*.

* (Recommended). Make sure the system has *wasm* MIME type configured properly
  in */etc/mime.types*. If corrections were made, restart :doc:`sfa/sfa` with
  *eva sfa server restart* command. If using front-end web server, e.g. `NGINX
  <https://www.nginx.com>`_, make sure its MIME is also configured
  (*/etc/nginx/mime.types*):

.. code::
    
    application/wasm wasm

* Put the following code in your HMI, before starting the web-HMI application
  or EVA JS Framework:

.. code:: javascript

    $eva.wasm = true;

* The WASM module will be automatically loaded at framework start.

* If the module is not available, the error message will be displayed in the
  JavaScript development console, as well in the web browser and HMI will be
  stopped.

* If the module license is not valid for the current domain or expired, the
  error message is displayed in JavaScript development console plus an alert
  and the framework automatically switches itself to the regular mode.

* To make sure the WASM module works fine, enable debug mode in EVA JS
  Framework:

.. code:: javascript

    $eva.debug = true;

* When debug mode is enabled, events processed by the WASM extension are
  prefixed with "W" (e.g. *EVA::Wws state* instead of a regular *EVA::ws
  state*).

* Also, the method *get_mode* returns current framework mode:

.. code:: javascript

    $eva.get_mode(); // "js" for regular, "wasm" for WASM extension

Licensing
---------

* The WASM extension is licensed for the specified customers' domains and can
  not be used on others. If a user requires accessing web-HMI via IP address,
  it should be added in the license as well.

* The license is built-in into the copy of the WASM extension, owned by the
  customer.

* The license may have expiration time or be perpetual.

* To check the license expiration time manually, the following function can be
  used:

.. code:: javascript

    evajw.get_license_expiration(); // returns either null or the license
                                    // expiration timestamp

* The list of domains/IP addresses is encrypted and can not be read.

Limitations
-----------

* The WASM extension does not support calling the *unwatch* method for the
  particular handler function. Watch can be cleared by *oid* or globally only.

* OID masks do not support internal wildcards (e.g. *sensor:*/test*)

PSRT Enterprise
===============

PSRT Enterprise is the cluster-enabled version of our :ref:`PSRT <eva3_psrt_>`
server, recommended for big industrial/enterprise setups.

Packages for Debian, Ubuntu and other deb-compatible Linux distributions can be
downloaded at https://pub.bma.ai/psrt-enterprise/
