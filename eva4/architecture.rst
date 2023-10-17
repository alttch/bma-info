Platform architecture
*********************

.. contents::

Basics
======

Each EVA ICS v4 node has the following architecture:

.. figure:: schemas/v4arch.png
    :width: 745px
    :alt: v4 architecture

* Services are launched by the core (if deployed and setup) or by external
  launchers.

* The core and all services are connected to the single inter-process
  communication bus, based on :doc:`BUS/RT </busrt/index>`.

* BUS/RT is a high-speed industrial IPC bus, which can provide 100K+ RPC calls a
  second and 1M+ events a second without significant CPU load. BUS/RT provides
  zero security in favor of speed and reliability, so all services/equipment in
  the local cluster must communicate via a private network only.

* EVA ICS core and services use :doc:`EAPI <eapi>` layer above the bus, which
  contains unified RPC, topics and event format and exchange with `MessagePack
  <https://msgpack.org/index.html>`_-encoded payloads.

* The node server has the following services embedded:

    * **.broker** BUS/RT broker service
    * **eva.core** the core service
    * **eva.launcher.** external service launchers
    * **eva.registry** the registry database service

* An external service is a local/remote process, connected to the node bus.

* External services are usually launched by "eva.launcher" services, which push
  initial configuration payloads, provide additional startup and watchdog
  functions. The external service processes can be launched manually.

* External equipment (such as custom hardware controllers) can be connected to
  the bus directly (if externals sockets are specified in "eva/config/bus"
  registry key).

* Multiple EVA ICS nodes can be :doc:`replicated<svc/eva-repl>` and interact
  with each other via replication services.

* Authentication services are commonly used by HMI services only.

* HMI services provide web servers to host user-interface applications and
  HTTP/web socket API.

See also: :doc:`core_svcs`.

Service types
=============

Common types
------------

There are several common types of services, used in EVA ICS v4:

* **authentication services** provide ACLs, login- and key-based authentication

* **controllers and PLC gateways** provide logic and/or equipment connection
  services. The base distribution includes controller gateways for popular
  industrial protocols, such as Modbus, Ethernet/IP etc.

* **database services** provide input/output functions (unified database EAPI)
  for SQL and time-series databases

* **HMI services** provide HTTP API and host user-interface web applications.

* **other services** various tools and helpers, such as shared locks services,
  mailers etc.

Service names
-------------

* When created/deployed, service IDs should be named as:

    * "eva.aaa.ID" - authentication and ACL services
    * "eva.hmi.ID" - HMI services
    * "eva.controller.ID" - controllers and gateways
    * "eva.db.ID" - database services
    * "eva.repl.ID" - replication services
    * "eva.svc.ID" - all other services

Majority of services can have multiple instances running under different names.

Primary external services
=========================

If :doc:`installed <install>` with "-a" argument, the following services are
created automatically:

* **eva.aaa.acl** ACL service
* **eva.aaa.localauth** Local authentication service (local users / API keys)
* **eva.hmi.default** The default HMI service (web UI and HTTP API)

* **eva.filemgr.ID** File managers, allow to deploy/undeploy custom files in
  EVA_DIR/runtime. The primary file manager service on each node is
  automatically created and called "eva.filemgr.main".

Additional external services
============================

See :doc:`list of all default services<core_svcs>`.

Service management
==================

Create
------

If managed by EVA ICS launchers, a service can be created either:

* via "eva.core" bus RPC

* using :ref:`eva4_eva-shell` (svc create / svc deploy commands)

If deployed with eva-shell, the payload must have the following minimal format:

.. code:: yaml

    - id: SERVICE_ID
      params:
        command: # path to the service executable
        bus:
            path: var/bus.ipc # for the local bus
        config:
            # service configuration

For the whole parameters, see bus RPC "svc.deploy" method of "eva.core".

Manage
------

Services provide bus RPC methods, methods "test" and "info" are mandatory.

If using :ref:`eva4_eva-shell`, service methods can be either assigned to
dedicated commands or be called directly with "svc call" command.

Service methods can be called via bus RPC directly, e.g.:

.. code:: shell

    /opt/eva4/sbin/bus /opt/eva4/var/bus.ipc rpc call eva.aaa.acl acl.list

If payload is required, it must be packed to MessagePack. A tool "bin/yml2mp"
can be used to convert YAML files to MessagePack from the command-line.

Destroy / undeploy / purge
--------------------------

Use either :ref:`eva4_eva-shell` or the corresponding bus RPC methods of
"eva.core".

.. _eva4_yaml_advanced:

Advanced configuration
----------------------

Service configuration files support extended non-standard YAML directives:

.. code:: yaml

    # includes YAML/JSON file
    field1: ^include /path/to/file

    # includes YAML/JSON, generated by an external command
    field2: ^pipe /path/to/command args

    # includes external file as text
    field3: ^include-text /path/to/file

    # includes text, generated by an external command
    field4: ^pipe-text /path/to/command args
