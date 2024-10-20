EVA ICS Enterprise
******************

.. image:: images/enterprise.png
    :width: 620
    :class: no-scaled-link
    :align: right

.. contents::

General terms and conditions
============================

The default EVA ICS v4 Enterprise pack includes the following extensions:

* Enterprise services (single node)
* EVA JS Framework WASM extension (single node)
* PSRT Enterprise (up to two PSRT nodes in cluster)

The default Enterprise pack can be obtained from `Bohemia Automation
representatives <https://www.bohemia-automation.com/contacts/>`_.

* The Enterprise extensions may be provided for free or with a discount for
  customers who regularly spend certain amount of funds on support contracts.
  Please contact your representative for details.

Enterprise services
===================

* The license is issued for 366 (+30) days and is tied to the node system name.

* It is not possible to change the node name after the license had been issued.

* It is possible to get a trial (7-day) license free of charge.

.. _eva4_ee_license_install:

Installation
------------

The license is imported with a command:

.. code:: shell

    /opt/eva4/sbin/eva-registry-cli set eva/config/ee/license \
        - --type json < eva-ics-ee-NAME.json

when there is less than 30 days before the expiration date left, deployed
Enterprise services start sending warning messages in logs every hour.

A new license can be imported on-the-flow, no service/node restart is required.

The license expiration UNIX timestamp can be obtained with a command:

.. code:: shell

    /opt/eva4/sbin/eva-registry-cli get-field eva/config/ee/license expires

Active Directory authentication
-------------------------------

See :doc:`svc/eva-aaa-msad`.

Zero-failure replication
------------------------

See :doc:`svc/eva-zfrepl`.

HMI Kiosk manager
-----------------

See :doc:`svc/eva-kioskman`.

Accounting service
------------------

See :doc:`svc/eva-aaa-accounting`.

Alarm service
-------------

When a license is applied, the alarm service is not limited in functionality.

See :doc:`svc/eva-svc-alarms`.

Real-time mode
--------------

See :doc:`realtime`.

.. _eva4_webengine_wasm:

EVA ICS WebEngine WASM extension
================================

`WASM <https://webassembly.org>`_ extension for :doc:`/eva-webengine/index`
offloads state processing from the web browser JavaScript engine to the
WebAssembly application, allowing SCADA HMI to monitor hundreds of items
without any client device overhead.

According to tests, EVA ICS WebEngine with WASM extension is about 20x times
faster, than in regular mode.

Installation
------------

* Obtain WASM extension from a `Bohemia Automation representative
  <https://www.bohemia-automation.com/contacts/>`_.

* The extension requires EVA JS Framework version 0.3.25 or above.

* Unpack *evajw-XXXX.tgz* archive into the directory where EVA JS Framework is
  installed. E.g. if the framework is installed in */opt/eva4/ui*, the module
  should be placed in */opt/eva4/ui/evajw*.

* (Recommended) Make sure the *wasm* MIME type is set to "application/wasm" in
  EVA ICS HMI service.

* Put the following code in your HMI, before starting the web-HMI application
  or EVA JS Framework:

.. code:: javascript

    eva.wasm = true;
    // or for eva-webengine >= 0.5.10
    eva.wasm = "path/to/evajw.js";

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

    eva.debug = true;

* When debug mode is enabled, events processed by the WASM extension are
  prefixed with "W" (e.g. *EVA::Wws state* instead of a regular *EVA::ws
  state*).

* Also, the method *get_mode* returns current framework mode:

.. code:: javascript

    eva.get_mode(); // "js" for regular, "wasm" for WASM extension

Licensing
---------

* The WASM extension is licensed for the specified customers' domains and can
  not be used on others. If a user requires accessing web-HMI via IP address,
  it should be added in the license as well.

* The license is issued for 366 (+30) days.

* The license is built-in into the copy of the WASM extension, owned by the
  customer.

* To check the license expiration time manually, the following function can be
  used:

.. code:: javascript

    eva.evajw.get_license_expiration(); // returns either null or the license
                                    // expiration timestamp

* The list of domains/IP addresses is encrypted and can not be read.

* There is no trial license for WASM extension.

Limitations
-----------

* OID masks did not support internal wildcards (e.g. "sensor:\*/test") in
  legacy versions. Starting from :doc:`../eva-webengine/index` 0.8.9 and WASM
  extension build 336, traditional :ref:`eva4_oid` masks are fully supported.

PSRT Enterprise
===============

PSRT Enterprise is the cluster-enabled version of :doc:`PSRT </psrt/index>`
server, recommended for large industrial/enterprise setups.

Packages for Debian, Ubuntu and other deb-compatible Linux distributions can be
downloaded at https://pub.bma.ai/psrt-enterprise/

Mission-critical projects
=========================

The majority of EVA ICS components are open-source.

The code of the closed-source EVA ICS Enterprise components can be provided for
mission-critical projects (such as high-energy, heavy industry, military,
space, healthcare etc.) under a dedicated NDA agreement.

Please contact `Bohemia Automation representatives
<https://www.bohemia-automation.com/contacts/>`_ for details.
