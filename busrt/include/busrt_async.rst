
.. py:module:: busrt_async.client


.. py:class:: Client(path, name)
   :module: busrt_async.client

   
   .. py:method:: Client.connect()
      :module: busrt_async.client
      :async:
   
   
   .. py:method:: Client.disconnect()
      :module: busrt_async.client
      :async:
   
   
   .. py:method:: Client.handle_daemon_exception(e)
      :module: busrt_async.client
      :async:
   
   
   .. py:method:: Client.is_connected()
      :module: busrt_async.client
   
   
   .. py:method:: Client.readexactly(reader, data_len)
      :module: busrt_async.client
      :async:
   
   
   .. py:method:: Client.send(target=None, frame=None)
      :module: busrt_async.client
      :async:
   
   
   .. py:method:: Client.subscribe(topics)
      :module: busrt_async.client
   
   
   .. py:method:: Client.unsubscribe(topics)
      :module: busrt_async.client
   

.. py:class:: ClientFrame(qos)
   :module: busrt_async.client

   
   .. py:method:: ClientFrame.is_completed()
      :module: busrt_async.client
   
   
   .. py:method:: ClientFrame.wait_completed(timeout=None)
      :module: busrt_async.client
      :async:
   

.. py:class:: Frame(payload=None, tp=18, qos=0)
   :module: busrt_async.client


.. py:function:: on_frame_default(frame)
   :module: busrt_async.client
   :async:

