Calling API methods
*******************

.. contents::

Single API calls
================

Any API method can be called with low-level API *call* function:

.. code:: javascript

    await eva.api_call({ method: "action" }, params: { i: "unit:tests/lamp1", v: 1 });

Legacy way (not recommended, may be deprecated in future):

.. code:: javascript

    await eva.call("action", "unit:tests/lamp1", { v: 1 });
    // or 
    await eva.call("action", { i: "unit:tests/lamp1", v: 1 });

If first parameter is a string, it's automatically set to "i" argument of API
request.

Function *call* returns Promise object, on success = API call result, on error
= an object with props:

* **code** error code (equal to EVA ICS API client error codes)
* **message** error message
* **data** full server response

The above example can be also rewritten using high-level API:

.. code:: javascript

   await eva.action.start("unit:tests/lamp1");
   // or
   await eva.action.exec("unit:tests/lamp1", { v: 1 });

Bulk API calls
==============

The engine can perform bulk JSON RPC API calls. The methods are always executed
in the same order they are prepared.

.. code:: javascript

    let bulk = eva.bulk_request();
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

Binary data (send/receive)
==========================

It is highly recommended to perform MessagePack-serialized API calls for
sending/receiving binary data from the server:

.. code:: javascript

   import { SerializationKind } from "@eva-ics/webengine";

   await eva.api_call({
        method: "x::somesvc::method_which_returns_blobs",
        params: { "some": "params" },
        serialization_kind: SerializationKind.MsgPack
      });

To let WebEngine work with MessagePack-serialized data, an external MessagePack
library must be imported and its methods must be set in `eva.external.msgpack`
as `decode(data)` and `encode(data)`. Example:

.. code:: javascript

   import { encode, decode } from "@msgpack/msgpack";

   eva.external.msgpack = { decode, encode };

.. note::

   Binary API calls are not supported for bulk requests.

Error codes
===========

See :ref:`eva4_eapi_error_codes`.
