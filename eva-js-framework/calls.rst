Calling API methods
*******************

.. contents::

Single API calls
================

Any API method can be called with low-level API *call* function:

.. code:: javascript

    $eva.call("action", "unit:tests/lamp1", { s: 1 })
    // or 
    $eva.call("action", { i: "unit:tests/lamp1", s: 1 })

If first parameter is a string, it's automatically set to "i" argument of API
request.

Function *call* returns Promise object, on success = API call result, on error
= an object with props:

* **code** error code (equal to EVA ICS API client error codes)
* **message** error message
* **data** full server response

The above example can be also rewritten using high-level API:

.. code:: javascript

   await $eva.action.start("unit:tests/lamp1");
   // or
   await $eva.action.exec("unit:tests/lamp1", { s: 1 });

Bulk API calls
==============

The framework can perform bulk JSON RPC API calls. The methods are always
executed in the same order they are prepared.

.. code:: javascript

    let bulk = $eva.bulk_request();
    bulk.prepare("action.toggle", "unit:lights/l1", { w: 5 }).then((data) => {
      console.log("action l1 ok: ", data);
    }).catch((err) => {
      console.log("action l1 error: ", err);
    });
    bulk.prepare("action.toggle", "unit:lights/l2", { w: 5 }).then((data) => {
      console.log("action l2 ok: ", data);
    }).catch((err) => {
      console.log("action l2 error: ", err);
    });
    bulk.call().then(
        () => { console.log("bulk call ok")}
    ).catch(
        (err) => { console.log("bulk call error", err)}
    );

Every prepared request in the bulk gets its own unique id. It is not
recommended to execute *call* method on the same bulk more than once. Prepare a
new bulk request instead.

Error codes
===========

See :ref:`eva4_eapi_error_codes`.
