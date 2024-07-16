
.. py:attribute:: BusClient
   :module: evaics.client

   alias of :py:class:`evaics.client.bus.Client`

.. py:module:: evaics.client.bus


.. py:class:: Client(path: str = '/opt/eva4/var/bus.ipc', name: Optional[str] = None, timeout: float = 120)
   :module: evaics.client.bus

   BUS/RT client for EVA ICS (EAPI)
   
   Create a new BUS/RT client instance
   
   :param path: BUS/RT socket (default: /opt/eva4/var/bus.ipc)
   :param name: client name (default: PROGRAM.PID)
   
   
   .. py:method:: Client.authenticate()
      :module: evaics.client.bus
   
      Authenticate the client
      
      Blank method
      
   
   .. py:method:: Client.bus_call(method: str, params: Optional[dict] = None, target='eva.core')
      :module: evaics.client.bus
   
      Call BUS/RT EAPI method
      
      Requires admin permissions
      
      :param method: API method
      
      Optional:
      
          params: API method parameters (dict)
      
          target: target service (default: eva.core)
      
      :returns: API response payload
      
   
   .. py:method:: Client.call(*args, **kwargs)
      :module: evaics.client.bus
   
      Alias for bus_call
      
   
   .. py:method:: Client.connect()
      :module: evaics.client.bus
   
      Connects the client
      
   
   .. py:method:: Client.test()
      :module: evaics.client.bus
   
      Call eva.core test method
      
      :returns: API response payload object
      
