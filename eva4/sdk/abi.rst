C-style ABI
***********

An alternative to a native SDK is writing EVA ICS services using ABI.

.. note::
   
  The programming language must be able to compile shared libraries for Linux
  with non-mangled exported methods.

Services, written with ABI, are launched with :doc:`../svc/eva-ffi`.

.. figure:: abi.png
    :width: 745px
    :alt: ABI architecture

The current stable service ABI version is **1**.

See also: :doc:`cpp/index`

.. contents::

Commons
=======

Common constants and structured are defined at:

* https://github.com/eva-ics/eva4/blob/main/bindings/common/eva4-common.h
* https://github.com/eva-ics/eva4/blob/main/bindings/common/eva4-ffi.h

The following structures are used:

EvaFFIBuffer
------------

.. code:: c

    struct EvaFFIBuffer {
      size_t len;
      char* data;
      size_t max;
    };

A read-write buffer, depending on context.

* The field "len" indicates data length.

* The field "max" indicates amount of memory, allocated for the *data* pointer.
  For write operations, the number MUST be always checked. The writer MUST
  abort the operation with an error.

EvaFFIFrame
-----------

.. code:: c

    struct EvaFFIFrame {
      unsigned char kind;
      char *primary_sender;
      char *topic;
      size_t payload_size;
      char *payload;
    };

A read-only buffer which contains a received bus frame. The fields
"primary_sender" and "topic" are null-terminated strings.

EvaFFIRpcEvent
--------------

.. code:: c

    struct EvaFFIRpcEvent {
      char *primary_sender;
      size_t method_size;
      char *method; // the method is allowed to be binary
      size_t payload_size;
      char *payload;
    };

A read-only buffer which contains a received bus frame.

* The field "primary_sender" is a null-terminated strings.

* The field "method" **is not a string**, as :doc:`EAPI <../eapi>` allows RPC
  methods to be binary/numeric.

Convention
==========

Both sides (launcher and the service library) follow the convention:

* If a function returns *int16_t*, it must return either *EVA_OK* (0) if the
  operation is successful or a negative error code if failed.

* If a function returns *int32_t*, it must return either *EVA_OK* (0) if the
  operation is successful and no data is required to be retrieved OR a positive
  number of bytes if there is an additional data. The caller must next allocate
  *EvaFFIBuffer* with the required amount of memory and call a method to get
  it.

* For multi-thread environments, the result buffer MUST be always stored in a
  thread-local variable.

* When the result is retrieved, the caller MUST process/copy it BEFORE the next
  ABI function is called.

* If a payload encoding is not particularity specified, the payload is packed
  with `MessagePack <https://msgpack.org/index.html>`_. MessagePack is the
  standard encoding of :doc:`EAPI <../eapi>` frames so there is no transcoding
  required between a service library and the bus.

.. _eva4_sdk_abi_functions:

Library functions to implement
==============================

Mandatory
---------

The service shared library MUST export the following methods:

.. _eva4_sdk_abi_eva_svc_set_op_fn:

eva_svc_set_op_fn
-----------------

.. code:: c

   int16_t eva_svc_set_op_fn(uint16_t abi_version, int32_t (*f)(int16_t, struct EvaFFIBuffer*))

When the service library is loaded, the launcher immediately sets the service
operations function pointer. The service operations function is the only
function the service library uses to perform all required bus communication
operations.

* If manually implemented, service library SHOULD check ABI version.

For multi-thread environments, the function pointer MUST be always stored
either in an atomic variable or using a higher-level mutex/thread-lock
mechanism.

.. _eva4_sdk_abi_eva_svc_get_result:

eva_svc_get_result
------------------

.. code:: c

   int16_t eva_svc_get_result(struct EvaFFIBuffer *ebuf)

The method is used by the launcher retrieve additional result data from a
function if available.

svc_init
--------

.. code:: c

    int32_t svc_init(struct EvaFFIBuffer *initial_buf)

The method is called by the launcher to initialize the service after it is
loaded.

* The service library SHOULD process *initial_buf*, which contains the initial
  payload. The library MUST NOT process "prepare_command" or drop the process
  privileges - these are handled by the launcher.

The payload format is well-described in:

The payload structure is well-described in

* https://docs.rs/eva-common/latest/eva_common/services/struct.Initial.html (Rust SDK commons)

* https://pub.bma.ai/dev/docs/eva4-js-sdk/interfaces/InitialPayload.html (JavaScript/TypeScript SDK)

* https://github.com/eva-ics/eva4/blob/main/bindings/cpp/sdk/eva4-ffi-sdk.hpp (C++ SDK)

however differs from a standard one that all optional fields are filled by
defaults for compatibility purposes.

The initial payload can be also obtained manually for discovering purposes
using the :ref:`eva4_eva-shell` command with RPC call to the node core:

.. code:: shell

    eva -J svc call eva.core svc.get_init i=SVC_ID

* The service library MUST send back MessagePack-encoded service metadata (see
  :ref:`eva4_eapi_metadata`). As already mentioned above, it MUST allocate a
  thread-local buffer, put there encoded data and return its size as the
  result.

Despite the service function is set, the bus is not connected at the moment the
method is called, so no bus calls should be used otherwise an error is
returned. There is impossible to use logging methods as well, the bus logging
is not ready and muted. If a method needs to output a log message, it should
use STDOUT/STDERR instead.

If the method returns an error, the service launcher quits.

.. note::

    The service library MUST respect *fips* parameter and use
    FIPS-140-compliant cryptographic libraries only if it is set to *true*. If
    the service is unable to work in FIPS-140-compliant mode, it MUST terminate
    itself with an error.

Optional
--------

svc_prepare
-----------

.. code:: c

    int16_t svc_prepare()

Called just before the service is marked ready. All bus calls are already
available.

If the method returns an error, the service launcher quits.

svc_launch
----------

.. code:: c

    int16_t svc_launch()

Called just after the service is marked ready.

If the method returns an error, the service launcher quits.

svc_terminate
-------------

.. code:: c

    int16_t svc_terminate()

Called just after the service is marked terminated. The method SHOULD stop all
background workers if spawned. There is no warranty the service launcher will
deliver all data of bus operations, called after.

If the method returns an error, the service launcher quits.

svc_on_frame
------------

.. code:: c

   void svc_on_frame(struct EvaFFIFrame *r)

.. note::

   The launcher executes this method in a separate thread.

Called with a bus frame is received. The frame format differs depending of
topic, the majority of frames are well-described in:

* :doc:`../eapi`

* https://docs.rs/eva-common/latest/eva_common/events/index.html (Rust commons)

* https://docs.rs/eva-sdk/latest/eva_sdk/types/index.html (Rust SDK)

The desired bus frames can be also obtained for discovering purposes with a
command:

.. code:: shell

   /opt/eva4/sbin/bus /opt/eva4/var/bus.ipc listen -t TOPIC # Set "#" to listen to all bus topics

svc_on_rpc_call
---------------

.. code:: c

   int32_t svc_on_rpc_call(struct EvaFFIRpcEvent *r)

.. note::

   The launcher executes this method in a separate thread.

Called when an incoming RPC call is received. The service MAY implement RPC
methods "action" (for unit actions) and "run" (for lmacro execution) as well as
custom methods.

The method returns either EVA_OK (0), an error code or size of payload result
(MessagePack-encoded). The result is put to a thread-local variable to be
retrieved later.

For payload formats see :ref:`eva4_unit_action` and :ref:`eva4_macro_action`.

Operations
==========

The function, its pointer is provided into
:ref:`eva4_sdk_abi_eva_svc_set_op_fn` is used by the service library, including
its background workers, to perform service operations.

The recommended calling format is 

.. code:: c

   return svc_op_fn ? svc_op_fn(op_code, data) : EVA_ERR_CODE_NOT_READY;

despite the pointer is set before any other library method is called. If the
operation requires no data, it SHOULD be set to null-pointer.

.. include:: ../include/autogen/svc_abi_ops.rst
