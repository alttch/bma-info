
.. py:module:: evaics.sdk


.. py:class:: ACI(aci_payload)
   :module: evaics.sdk

   ACI (API Call Info) helper class
   
   
   .. py:method:: ACI.is_writable()
      :module: evaics.sdk
   
      Check is the current session writable or read-only
      

.. py:class:: Action(event)
   :module: evaics.sdk

   Item action from bus event
   

.. py:class:: Controller(bus)
   :module: evaics.sdk

   Action handler helper class for controllers
   

.. py:class:: EvaLogHandler(bus)
   :module: evaics.sdk

   Initializes the instance - basically setting the formatter to None
   and the filter list to empty.
   
   
   .. py:method:: EvaLogHandler.emit(record)
      :module: evaics.sdk
   
      Do whatever it takes to actually log the specified logging record.
      
      This version is intended to be implemented by subclasses and so
      raises a NotImplementedError.
      

.. py:class:: LocalProxy
   :module: evaics.sdk

   Simple proxy for threading.local namespace
   
   
   .. py:method:: LocalProxy.clear(attr)
      :module: evaics.sdk
   
      Clear (delete) thread-local attribute
      
      :param attr: attribute name
      
   
   .. py:method:: LocalProxy.get(attr, default=None)
      :module: evaics.sdk
   
      Get thread-local attribute
      
      :param attr: attribute name
      :param default: default value if attribute is not set
      
      :returns: attribute value or default value
      
   
   .. py:method:: LocalProxy.has(attr)
      :module: evaics.sdk
   
      Check if thread-local attribute exists
      
      :param attr: attribute name
      
      :returns: True if attribute exists, False if not
      
   
   .. py:method:: LocalProxy.set(attr, value)
      :module: evaics.sdk
   
      Set thread-local attribute
      
      :param attr: attribute name
      :param value: attribute value to set
      

.. py:class:: OID(s, from_path=False)
   :module: evaics.sdk

   Base item OID class
   
   Constructs a new OID from string
   
   :param from_path: construct OID from a path (kind/group(s)/id)
   
   
   .. py:method:: OID.to_path()
      :module: evaics.sdk
   
      Converts OID to path
      

.. py:class:: Service()
   :module: evaics.sdk

   The primary service class
   
   
   .. py:method:: Service.block(prepare=True)
      :module: evaics.sdk
   
      Block the service until terminated
      
      Automatically calls register_signals, mark_ready, mark_terminating
      (after receiving a termination signal/event)
      
      Optional:
      
          prepare: default: True, if False, register_signals, mark_ready and
                   mark_terminating must be called manually
      
      
   
   .. py:method:: Service.drop_privileges()
      :module: evaics.sdk
   
      Drop service process privileges
      
   
   .. py:method:: Service.get_config()
      :module: evaics.sdk
   
      Get service configuration
      
   
   .. py:method:: Service.init(info=None, on_frame=None, on_rpc_call=None)
      :module: evaics.sdk
   
      Init the service
      
      Automatically calls init_bus, drop_privileges, init_logs and init_rpc
      (if info specified)
      
      Optional:
      
          info: RPC info
      
          on_frame: bus frame handler
      
      
   
   .. py:method:: Service.init_bus()
      :module: evaics.sdk
   
      Init the local bus
      
   
   .. py:method:: Service.init_logs()
      :module: evaics.sdk
   
      Initialize service logs
      
   
   .. py:method:: Service.init_rpc(svc_info)
      :module: evaics.sdk
   
      Init bus RPC layer
      
   
   .. py:method:: Service.is_active()
      :module: evaics.sdk
   
      Check is the service active
      
   
   .. py:method:: Service.is_mode_normal()
      :module: evaics.sdk
   
      Is service started in normal mode
      
   
   .. py:method:: Service.is_mode_rtf()
      :module: evaics.sdk
   
      Is service started in react-to-fail mode
      
   
   .. py:method:: Service.is_shutdown_requested()
      :module: evaics.sdk
   
      Check is the service shutdown requested
      
   
   .. py:method:: Service.mark_ready()
      :module: evaics.sdk
   
      Mark the service ready
      
      Automatically logs the service is started if logs are initialized
      
   
   .. py:method:: Service.mark_terminating()
      :module: evaics.sdk
   
      Mark the service terminating
      
   
   .. py:method:: Service.need_ready()
      :module: evaics.sdk
   
      Raises an exception if not ready
      
      RPC helper method which raises an exception if the service is not ready
      
   
   .. py:method:: Service.register_signals()
      :module: evaics.sdk
   
      Register service process system signals
      
   
   .. py:method:: Service.report_accounting_event(u=None, src=None, svc=None, subj=None, oid=None, data=None, note=None, code=None, err=None)
      :module: evaics.sdk
   
      Reports an event into accounting system
      
   
   .. py:method:: Service.subscribe_oids(oids, event_kind='any')
      :module: evaics.sdk
   
      subscribe bus to OID events
      
      :param oids: list of OIDs or strings
      :param event_kind: any, remote, remote_archive or local
      
   
   .. py:method:: Service.wait_core(timeout=None, wait_forever=True)
      :module: evaics.sdk
   
      Wait until the EVA ICS core is started
      

.. py:class:: ServiceInfo(author='', description='', version='')
   :module: evaics.sdk

   Service info helper class
   
   :param author: service author
   :param description: service description
   :param version: service version
   
   
   .. py:method:: ServiceInfo.add_method(method, description='', required=[], optional=[])
      :module: evaics.sdk
   
      Add a method to service info help
      
      :param method: method name
      :param description: method description
      :param required: list of required param names (strings)
      :param optional: list of optional param names
      

.. py:class:: XCall(payload)
   :module: evaics.sdk

   HMI X calls helper class
   
   
   .. py:method:: XCall.check_op(op)
      :module: evaics.sdk
   
      Check if the session ACL has rights for the operation
      
      :param op: operation code (e.g. "supervisor")
      
   
   .. py:method:: XCall.get_items_allow_deny_reading()
      :module: evaics.sdk
   
      Get allow and deny item list from ACL
      
   
   .. py:method:: XCall.is_admin()
      :module: evaics.sdk
   
      Check if the session ACL has admin rights
      
   
   .. py:method:: XCall.is_item_readable(oid)
      :module: evaics.sdk
   
      Check if the session ACL has rights to read an item
      
   
   .. py:method:: XCall.is_item_writable(oid)
      :module: evaics.sdk
   
      Check if the session ACL has rights to write an item
      
   
   .. py:method:: XCall.is_pvt_readable(path)
      :module: evaics.sdk
   
      Check if the session ACL has rights to read a pvt path
      
   
   .. py:method:: XCall.is_writable()
      :module: evaics.sdk
   
      Check is the current session writable or read-only
      

.. py:function:: log_traceback()
   :module: evaics.sdk

   Log an exception traceback
   

.. py:function:: no_rpc_method()
   :module: evaics.sdk

   Raise an exception on invalid RPC method
   

.. py:module:: evaics.exceptions


.. py:exception:: AccessDenied(msg='')
   :module: evaics.exceptions

   raised when a call has no access to the resource
   

.. py:exception:: FunctionFailed(msg='')
   :module: evaics.exceptions

   raised when a function failed is failed with any reason
   

.. py:exception:: GenericException(msg='')
   :module: evaics.exceptions


.. py:exception:: InvalidParameter
   :module: evaics.exceptions


.. py:exception:: MethodNotImplemented(msg='')
   :module: evaics.exceptions

   raised when the requested method exists but requested functionality is not
   implemented
   

.. py:exception:: ResourceAlreadyExists(msg='')
   :module: evaics.exceptions

   raised when the requested resource already exists
   

.. py:exception:: ResourceBusy(msg='')
   :module: evaics.exceptions

   raised when the requested resource is busy or can not be modified
   

.. py:exception:: ResourceNotFound(msg='')
   :module: evaics.exceptions

   raised when the requested resource is not found
   

.. py:exception:: TimeoutException(msg='')
   :module: evaics.exceptions

   raised when a call is timed out
   
