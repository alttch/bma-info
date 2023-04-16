Keeping service data between reloads
************************************

Services can keep data between reloads in several ways. Note than if a service
is purged, its data is deleted (both from data directory and the registry).

.. contents::

Keeping data in the node registry
=================================

Python SDK has no built-in methods to work with the :doc:`registry
<../../registry>`, however the registry can be still accessed under the local
bus with calls to **eva.registry**.

Available registry RPC methods are described at https://yedb.bma.ai, section
3.3 (Mandatory methods).

The keys must be kept under *eva/svc_data/<SVC_ID>* only.

The following example contains a simple service which operates with data from
the registry:

.. literalinclude:: ../../sdk-examples/python/registry.py
   :language: python

Keeping data in files
=====================

The field "data_path" of the "service" object contains path to a directory
where the service can store its data.

.. code:: python

    service = sdk.Service()
    data_path = service.data_path

If the data path is *None*, it means that the service is started under "nobody"
user and can not use the data path.

.. note::

   To avoid permission problems, the service should always use its data path
   only after "service.drop_privileges()" method is called.
