
.. py:module:: evaics.deploy


.. py:class:: ACL(id)
   :module: evaics.deploy

   ACL class is used to represent an access control list
   
   :param id - the ACL ID:
   

.. py:class:: Alarm(group: str, id: str, level: int)
   :module: evaics.deploy

   Alarm class is used to represent an alarm
   
   :param group - the alarm group:
   :param id - the alarm ID:
   :param level - the alarm level:
   

.. py:class:: DataObject(name)
   :module: evaics.deploy

   DataObject class is used to represent a data object
   
   :param name - the data object name:
   
   
   .. py:method:: DataObject.field(name: str, type: str)
      :module: evaics.deploy
   
      Add a field to the data object
      
   
   .. py:method:: DataObject.fields(fields: list)
      :module: evaics.deploy
   
      Specify the fields for the data object
      

.. py:class:: Deploy()
   :module: evaics.deploy

   Deploy class is used to represent the deploy file
   
   
   .. py:method:: Deploy.add(node: ~evaics.deploy.Node)
      :module: evaics.deploy
   
      Add a node to the deploy file
      
   
   .. py:method:: Deploy.clone()
      :module: evaics.deploy
   
      Clone the Deploy object
      
   
   .. py:method:: Deploy.print(*args, **kwargs)
      :module: evaics.deploy
   
      Print the Deploy object to the console (requires PyYAML)
      
   
   .. py:method:: Deploy.save(path: str)
      :module: evaics.deploy
   
      Save the Deploy object to a file (requires PyYAML)
      
   
   .. py:method:: Deploy.to_dict()
      :module: evaics.deploy
   
      Convert the Deploy object to a dictionary
      
   
   .. py:method:: Deploy.to_json()
      :module: evaics.deploy
   
      Convert the Deploy object to a JSON string
      
   
   .. py:method:: Deploy.to_yaml()
      :module: evaics.deploy
   
      Convert the Deploy object to a YAML string (requires PyYAML)
      

.. py:class:: EAPICall(method: str, on='deploy', stage='after')
   :module: evaics.deploy

   EAPICall class is used to represent an API call
   

.. py:class:: Element()
   :module: evaics.deploy

   Basic abstract node element class
   
   
   .. py:method:: Element.clone()
      :module: evaics.deploy
   
      Clone the Element object
      
   
   .. py:method:: Element.set(key: str, value)
      :module: evaics.deploy
   
      Set data to the element by key
      
   
   .. py:method:: Element.to_dict()
      :module: evaics.deploy
   
      Convert the Element object to a dictionary
      

.. py:class:: ExtraComamand(on='deploy', stage='after')
   :module: evaics.deploy


.. py:class:: Function(function: str, *args, on='deploy', stage='after')
   :module: evaics.deploy

   Function class is used to represent a function call
   
   :param function - the function name:
   :param args - the function arguments:
   :param passed as-is:
   :param on - deploy/undeploy (default: 'deploy')
   :param stage - the stage value: 'after')
   :param before/after (default: 'after')
   

.. py:class:: GeneratorSource(name: str, sampling: int)
   :module: evaics.deploy

   GeneratorSource class is used to represent a generator source
   
   :param name - the generator source name:
   :param sampling - the generator source sampling frequency:
   
   
   .. py:method:: GeneratorSource.params(params: dict)
      :module: evaics.deploy
   
      Specify the parameters for the generator source
      
   
   .. py:method:: GeneratorSource.target(target)
      :module: evaics.deploy
   
      Add a target item to the generator source
      
   
   .. py:method:: GeneratorSource.targets(targets: list)
      :module: evaics.deploy
   
      Specify the target items for the generator source
      

.. py:class:: Item(oid)
   :module: evaics.deploy

   Item class is used to represent a node item
   
   :param oid - the item OID:
   
   
   .. py:method:: Item.action_svc(svc)
      :module: evaics.deploy
   
      Specify the action service
      
   
   .. py:method:: Item.action_timeout(timeout)
      :module: evaics.deploy
   
      Specify the action timeout
      

.. py:class:: Key(id)
   :module: evaics.deploy

   Key class is used to represent an API key
   
   :param id - the key ID:
   

.. py:class:: Node(name: str = '.local')
   :module: evaics.deploy

   Node class is used to represent a single node in the deploy file.
   
   :param name - the name of the node (default: '.local')
   
   
   .. py:method:: Node.add(key: str, value)
      :module: evaics.deploy
   
      Add data to the node
      
   
   .. py:method:: Node.add_element(element)
      :module: evaics.deploy
   
      Add an element to the node
      
   
   .. py:method:: Node.add_from_export(path: str)
      :module: evaics.deploy
   
      Add data from an export file
      
   
   .. py:method:: Node.clone()
      :module: evaics.deploy
   
      Clone the Node object
      
   
   .. py:method:: Node.param(key: str, value)
      :module: evaics.deploy
   
      Specify a parameter for the node
      
   
   .. py:method:: Node.set(key: str, value)
      :module: evaics.deploy
   
      Set data to the node by key
      
   
   .. py:method:: Node.to_dict()
      :module: evaics.deploy
   
      Convert the Node object to a dictionary
      

.. py:class:: Service(id: str, command: str)
   :module: evaics.deploy

   Service class is used to represent a service
   
   :param id - the service ID:
   :param command - the service command:
   
   
   .. py:method:: Service.config(config: dict)
      :module: evaics.deploy
   
      Specify the configuration for the service
      
   
   .. py:method:: Service.user(user: str)
      :module: evaics.deploy
   
      Specify the user for the service
      
   
   .. py:method:: Service.workers(workers: int)
      :module: evaics.deploy
   
      Specify the number of workers for the service
      

.. py:class:: Upload(src, target)
   :module: evaics.deploy

   Upload class is used to represent a file upload element
   
   :param src - the source file path or URL:
   :param target - the target file path:
   

.. py:class:: User(login)
   :module: evaics.deploy

   User class is used to represent a user
   
   :param login - the user login:
   

.. py:function:: load_deploy(path: str)
   :module: evaics.deploy

   Load a deployment configuration from a path
   

.. py:function:: service_from_tpl(id: str, tpl_path)
   :module: evaics.deploy

   Create a service from a template file (requires PyYAML)
   
