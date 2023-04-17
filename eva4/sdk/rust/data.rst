Keeping service data between reloads
************************************

Services can keep data between reloads in several ways. Note than if a service
is purged, its data is deleted (both from the data directory and the registry).

.. contents::

Keeping data in the node registry
=================================

Rust SDK has got built-in instruments to work the with the :doc:`registry
<../../registry>`.

To connect to the registry, use "init_registry" method of the initial payload:

.. code:: rust

    let registry = initial.init_registry();

Service registry methods automatically operate under a key path
*eva/svc_data/<SVC_ID>* and it is not necessary to set key prefixes.

More info about "Registry" object and its methods can be found at
https://docs.rs/eva-common/latest/eva_common/services/struct.Registry.html

Keeping data in files
=====================

The method "data_path" of the initial payload returns path to a directory where
the service can store its data.

.. code:: rust

    let data_path: Option<&str> = initial.data_path();

If the data path is *None*, it means that the service is started under "nobody"
user and can not use the data path.

.. note::

   To avoid permission problems, the service should always use its data path
   only after "initial.drop_privileges()" method is called.
