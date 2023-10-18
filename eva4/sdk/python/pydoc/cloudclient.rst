
.. py:attribute:: CloudClient
   :module: evaics.client

   alias of :py:class:`~evaics.client.cloud.Client`

.. py:module:: evaics.client.cloud


.. py:class:: Client(client)
   :module: evaics.client.cloud

   Cloud client for EVA ICS
   
   Create a new Cloud client instance
   
   :param client: HTTP or BUS/RT client
   
   
   .. py:method:: Client.bus_call(method: str, params: ~typing.Optional[dict] = None, target='eva.core', node=None)
      :module: evaics.client.cloud
   
      Call BUS/RT EAPI method
      
      Requires admin permissions
      
      :param method: API method
      
      Optional:
      
          params: API method parameters (dict)
      
          target: target service (default: eva.core)
      
          node: target node (.local can be used for the local)
      
      :returns: API response payload
      
   
   .. py:method:: Client.prepare()
      :module: evaics.client.cloud
   
      Prepare the client
      
      Load node map from the local core, required to be called at least once
      
