JavaScript/TypeScript SDK
*************************

This article provides an all-in-one example for JavaScript/TypeScript EVA ICS
service.

.. contents::

JavaScript runtime
==================

.. note::

   EVA ICS has no built-in tools to install Node.js or other JavaScript server
   runtime. It must be installed manually.

JavaScript server runtime engines supported:

* `Node.js <https://nodejs.org/>`_
* `Deno <https://deno.com>`_

Other compatible engines can be used as well.

SDK module
==========

The module can be found at: https://www.npmjs.com/package/@eva-ics/sdk and
added to a project as:

.. code:: shell
   
    npm i --save @eva-ics/sdk

API reference: https://pub.bma.ai/dev/docs/eva4-js-sdk/

See also: `BUS/RT JavaScript/TypeScript client
<https://pub.bma.ai/dev/docs/busrt/js/>`_

Service example
===============

The full example can be found at
https://github.com/eva-ics/eva4/tree/main/bindings/js/example

Service code (TypeScript)
-------------------------

.. literalinclude:: ../../sdk-examples/js/svc-example.ts
    :language: typescript

package.json
------------

.. literalinclude:: ../../sdk-examples/js/package.json
    :language: json

The service can be built as:

.. code::

	npm i
	npm run build

Service template
----------------

The following template can be used to quickly create a service instance with
:ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create my.svc.js_test svc-tpl.yml

.. literalinclude:: ../../sdk-examples/js/svc-tpl.yml
   :language: yaml

HTTP API call example
---------------------

The service responds to the following API calls (`httpie <https://httpie.io>`_
call example):

.. code:: shell

    (
    cat <<EOF
    {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "x::my.svc.js_test::some.method",
        "params": {
            "k": "mykey",
            "name": "value"
            }
    }
    EOF
    ) | http :7727

If using :doc:`../../../eva-webengine/index`, the call can be made as:

.. code:: javascript

    eva.call(
        'x::my.svc.js_test::some.method',
        { param: "value" }
    );

Running with Deno
=================

Installation
------------

`Deno <https://deno.com>`_ can be installed directly into */opt/eva4* folder
with the following command:

.. code:: shell

   curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/opt/eva4/deno sh

Deno caches all modules in *$HOME/.cache/deno* folder. The cached modules can
be purged if required, e.g. when migrating to a newer SDK version.

SDK imports
-----------

To run services, built with EVA ICS JS SDK, with, it is possible to modify
imports as the following:

.. code:: typescript

   import {
    // required imports
   } from "npm:@eva-ics/sdk";

Service command
---------------

Run TypeScript service files directly with the following *command* field:

.. code:: shell

   deno/bin/deno run --allow-read --allow-write --allow-ffi --allow-env --allow-net --unstable /path/to/svc.ts

It is recommended to start the service for the first time manually to let the
runtime download all required modules or increase service startup timeout.
