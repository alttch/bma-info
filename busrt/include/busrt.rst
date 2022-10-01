
.. py:module:: busrt.client


.. py:class:: Client(path, name)
   :module: busrt.client

   
   .. py:method:: Client.connect()
      :module: busrt.client
   
   
   .. py:method:: Client.disconnect()
      :module: busrt.client
   
   
   .. py:method:: Client.is_connected()
      :module: busrt.client
   
   
   .. py:method:: Client.read_exact(data_len)
      :module: busrt.client
   
   
   .. py:method:: Client.send(target=None, frame=None)
      :module: busrt.client
   
   
   .. py:method:: Client.subscribe(topics)
      :module: busrt.client
   
   
   .. py:method:: Client.unsubscribe(topics)
      :module: busrt.client
   

.. py:class:: ClientFrame(qos)
   :module: busrt.client

   
   .. py:method:: ClientFrame.is_completed()
      :module: busrt.client
   
   
   .. py:method:: ClientFrame.wait_completed(*args, **kwargs)
      :module: busrt.client
   

.. py:class:: Frame(payload=None, tp=18, qos=0)
   :module: busrt.client


.. py:function:: on_frame_default(frame)
   :module: busrt.client

