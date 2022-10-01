
.. py:module:: busrt.rpc


.. py:class:: Event(tp, frame, payload_pos)
   :module: busrt.rpc

   
   .. py:method:: Event.get_payload()
      :module: busrt.rpc
   

.. py:class:: Notification(payload=b'')
   :module: busrt.rpc


.. py:class:: Reply(result=b'')
   :module: busrt.rpc


.. py:class:: Request(method, params=b'')
   :module: busrt.rpc


.. py:class:: Rpc(client)
   :module: busrt.rpc

   
   .. py:method:: Rpc.call(target, request)
      :module: busrt.rpc
   
   
   .. py:method:: Rpc.call0(target, request)
      :module: busrt.rpc
   
   
   .. py:method:: Rpc.is_connected()
      :module: busrt.rpc
   
   
   .. py:method:: Rpc.notify(target, notification)
      :module: busrt.rpc
   
   
   .. py:method:: Rpc.spawn(f, *args, **kwargs)
      :module: busrt.rpc
   

.. py:class:: RpcCallEvent()
   :module: busrt.rpc

   
   .. py:method:: RpcCallEvent.get_payload()
      :module: busrt.rpc
   
   
   .. py:method:: RpcCallEvent.is_completed()
      :module: busrt.rpc
   
   
   .. py:method:: RpcCallEvent.is_empty()
      :module: busrt.rpc
   
   
   .. py:method:: RpcCallEvent.wait_completed(*args, **kwargs)
      :module: busrt.rpc
   

.. py:exception:: RpcException(msg='', code=-32603)
   :module: busrt.rpc


.. py:function:: format_rpc_e_msg(e)
   :module: busrt.rpc


.. py:function:: on_call_default(event)
   :module: busrt.rpc


.. py:function:: on_notification_default(event)
   :module: busrt.rpc

