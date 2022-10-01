
.. py:module:: busrt_async.rpc


.. py:class:: Event(tp, frame, payload_pos)
   :module: busrt_async.rpc

   
   .. py:method:: Event.get_payload()
      :module: busrt_async.rpc
   

.. py:class:: Notification(payload=b'')
   :module: busrt_async.rpc


.. py:class:: Reply(result=b'')
   :module: busrt_async.rpc


.. py:class:: Request(method, params=b'')
   :module: busrt_async.rpc


.. py:class:: Rpc(client)
   :module: busrt_async.rpc

   
   .. py:method:: Rpc.call(target, request)
      :module: busrt_async.rpc
      :async:
   
   
   .. py:method:: Rpc.call0(target, request)
      :module: busrt_async.rpc
   
   
   .. py:method:: Rpc.is_connected()
      :module: busrt_async.rpc
   
   
   .. py:method:: Rpc.notify(target, notification)
      :module: busrt_async.rpc
   

.. py:class:: RpcCallEvent()
   :module: busrt_async.rpc

   
   .. py:method:: RpcCallEvent.get_payload()
      :module: busrt_async.rpc
   
   
   .. py:method:: RpcCallEvent.is_completed()
      :module: busrt_async.rpc
   
   
   .. py:method:: RpcCallEvent.is_empty()
      :module: busrt_async.rpc
   
   
   .. py:method:: RpcCallEvent.wait_completed(timeout=None)
      :module: busrt_async.rpc
      :async:
   

.. py:exception:: RpcException(msg='', code=-32603)
   :module: busrt_async.rpc


.. py:function:: format_rpc_e_msg(e)
   :module: busrt_async.rpc


.. py:function:: on_call_default(event)
   :module: busrt_async.rpc
   :async:


.. py:function:: on_notification_default(event)
   :module: busrt_async.rpc
   :async:

