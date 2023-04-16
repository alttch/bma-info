Registry database
*****************

Starting from the version 3.4, EVA ICS uses structured document database as the
primary storage of all configurations. In EVA ICS it is called "registry
system" or just "registry".

.. contents::

Technology
==========

EVA ICS uses `YEDB <https://yedb.bma.ai>`_ as the structured database. YEDB is
fast, easy to repair and crash-free.

Registry service is embedded into the node server and is always started
automatically.

Registry can be managed with :ref:`eva4_eva-shell` and "sbin/eva-registry-cli"
:doc:`command-line<cli>` tools.

Reasons
=======

Why EVA ICS has been switched to the registry database, instead of using simple
"ini" and "json" files:

* Crash-free storage of configurations, inventory and data objects;
* easy management with command line tools and API;
* strict data schemas;
* unification;
* easy-to-use SDK.

Maintenance
===========

When deploying / undeploying lots of :doc:`items<items>`, removed/overridden
registry keys are not deleted but moved to the database trash. It is a good
idea to clean it from time to time with "eva-registry purge" or
"registry_safe_purge" API method.

".trash" folder can also be used to restore keys deleted by accident.

When key data is changed, the server keeps its 10 backup copies by default,
which can be also used to restore data if necessary.

All data is stored in "runtime/registry" directory, which should
not be accessed directly, unless data loss occur.

Starting the registry service only

The following command:

.. code:: shell

    EVA_NODE_MODE=registry /opt/eva4/bin/eva-control start

allows to temporary start the registry database server only.

Bus cheat-sheet 
---------------

"eva.registry" service accepts all YEDB API calls via the local bus.

Purge
~~~~~

To automatically purge the registry, e.g. after undeploying multiple items,
execute:

.. code:: shell

    /opt/eva4/sbin/bus /opt/eva4/var/bus.ipc rpc call eva.registry safe_purge

The same can be done with eva-shell:

.. code:: shell

    eva svc call eva.registry safe_purge

Temporary enable/disable auto-flush
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To deploy multiple items, it may be useful to disable the registry auto-flush
feature:

.. code:: shell

    /opt/eva4/sbin/bus /opt/eva4/var/bus.ipc rpc call eva.registry server_set name=auto_flush value=false

The same can be done with eva-shell:

.. code:: shell

    eva svc call eva.registry server_set name=auto_flush value=false


Structure
=========

Each EVA ICS node creates registry key "eva", all data is being
stored in its sub-keys.

A strict schema ".schema/eva" is created for all data keys, except "user_data"
and "svc_data", which (as well as their sub-keys) can contain any fields.

Keys can be edited with :doc:`CLI<cli>` tools.

===================== ============= ==================================
Key                   user-editable Description
===================== ============= ==================================
config/bus            yes           the local bus :doc:`configuration <config>`
config/core           yes           the primary node :doc:`configuration <config>`
config/python-venv    yes           Python venv :doc:`configuration <config>`
config/registry       yes           the registry service :doc:`configuration <config>`
config/logs           yes           logging :doc:`configuration <config>`
data                  forbidden     system objects
inventory             not rec.      inventory key (EVA ICS :doc:`items <items>`)
state                 not rec.      :doc:`item <items>` states
svc                   not rec.      external service configuration
svc_data              not rec.      used by external services
user_data             yes           any user-defined data
===================== ============= ==================================
