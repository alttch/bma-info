.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_is_active:

EVA_FFI_SVC_OP_IS_ACTIVE
------------------------

Checks is the service active.

* Operation code: **1**
* FFI buffer data: none
* Returns: 1 for active, 0 for inactive
* Bus required: no


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_subscribe_topic:

EVA_FFI_SVC_OP_SUBSCRIBE_TOPIC
------------------------------

Subscribes to a topic.

* Operation code: **10**
* FFI buffer data: topic names, as null-terminated strings
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_unsubscribe_topic:

EVA_FFI_SVC_OP_UNSUBSCRIBE_TOPIC
--------------------------------

Unsubscribes from a topic.

* Operation code: **11**
* FFI buffer data: topic names, as null-terminated strings
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_publish_topic:

EVA_FFI_SVC_OP_PUBLISH_TOPIC
----------------------------

Publishes data to a topic.

* Operation code: **12**
* FFI buffer data: topic payload (MessagePack-encoded)
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_rpc_call:

EVA_FFI_SVC_OP_RPC_CALL
-----------------------

Performs a rpc call.

* Operation code: **20**
* FFI buffer data: target, method (both null-terminated), payload (MessagePack)
* Returns: call result (size) if available
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_get_rpc_result:

EVA_FFI_SVC_OP_GET_RPC_RESULT
-----------------------------

Gets result of the latest rpc call.

* Operation code: **29**
* FFI buffer data: the buffer MUST be set up and allocated by the caller
* Returns: the call result is written into FFI buffer
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_log_trace:

EVA_FFI_SVC_OP_LOG_TRACE
------------------------

Logs a trace-level message.

* Operation code: **100**
* FFI buffer data: a message string (null termination not required)
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_log_debug:

EVA_FFI_SVC_OP_LOG_DEBUG
------------------------

Logs a debug-level message.

* Operation code: **110**
* FFI buffer data: a message string (null termination not required)
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_log_info:

EVA_FFI_SVC_OP_LOG_INFO
-----------------------

Logs an info-level message.

* Operation code: **120**
* FFI buffer data: a message string (null termination not required)
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_log_warn:

EVA_FFI_SVC_OP_LOG_WARN
-----------------------

Logs a warn-level message.

* Operation code: **130**
* FFI buffer data: a message string (null termination not required)
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_log_error:

EVA_FFI_SVC_OP_LOG_ERROR
------------------------

Logs an error-level message.

* Operation code: **140**
* FFI buffer data: a message string (null termination not required)
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_terminate:

EVA_FFI_SVC_OP_TERMINATE
------------------------

Asks the launcher to terminate the service.

* Operation code: **-99**
* FFI buffer data: none
* Returns: none
* Bus required: **yes**


.. _eva4_sdk_abi_svc_op_eva_ffi_svc_op_poc:

EVA_FFI_SVC_OP_POC
------------------

Forces the launcher to panic (critical error). the caller do not need to
log the message itself, it is logged by the launcher automatically
.

* Operation code: **-100**
* FFI buffer data: a message string (null termination not required)
* Returns: none
* Bus required: no


