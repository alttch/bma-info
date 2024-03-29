
.. py:attribute:: HttpClient
   :module: evaics.client

   alias of :py:class:`~evaics.client.http.Client`

.. py:module:: evaics.client.http


.. py:class:: Client(url: str = 'http://localhost:7727', user: ~typing.Optional[str] = None, password: ~typing.Optional[str] = None, key: ~typing.Optional[str] = None, timeout: float = 120)
   :module: evaics.client.http

   HTTP client for EVA ICS (HMI HTTP API)
   
   Requires "requests" Python module to be manually installed
   
   Create a new HTTP client instance
   
   :param url: HMI URL (proto://host:port)
   
   
   .. py:method:: Client.api_key(api_key: str)
      :module: evaics.client.http
   
      Authenticate with API key
      
      :param api_key: API key
      
   
   .. py:method:: Client.authenticate()
      :module: evaics.client.http
   
      Authenticate the client
      
      Authenticates the client and stores the authentication token. The
      method may be called manually but is not mandatory to use
      
   
   .. py:method:: Client.bus_call(method: str, params: ~typing.Optional[dict] = None, target='eva.core')
      :module: evaics.client.http
   
      Call BUS/RT EAPI method
      
      Requires admin permissions
      
      :param method: API method
      
      Optional:
      
          params: API method parameters (dict)
      
          target: target service (default: eva.core)
      
      :returns: API response payload
      
   
   .. py:method:: Client.call(method: str, params: ~typing.Optional[dict] = None)
      :module: evaics.client.http
   
      Call server API method
      
      :param method: API method
      
      Optional:
      
          params: API method parameters (dict)
      
      :returns: API response payload
      
   
   .. py:method:: Client.connect()
      :module: evaics.client.http
   
      Blank method, tests HTTP connection only
      
   
   .. py:method:: Client.credentials(user: str, password: str)
      :module: evaics.client.http
   
      Set authentication credentials
      
      :param user: user name
      :param password: user password
      
   
   .. py:method:: Client.test()
      :module: evaics.client.http
   
      Call server test method
      
      :returns: API response payload object (server and session info)
      
