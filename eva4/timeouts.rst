Understanding timeouts
**********************

.. contents::

All EVA ICS calls rely on timeouts. To understand the timeout model, let us
review one of the most complicated examples , which may be faced in production.

Call timeouts
=============

Consider we have a :doc:`deployment <iac>` payload with lots of items, which
must be deployed to a remote node. Even if :ref:`the registry
auto-flush<eva4_iac_auto_flush_off>` is disabled on the remote node, the call
may not fit the default 5-sec timeout.

In this case, the item deployment call is completed, but the client gets
timeout and the further deployment process is stopped.

The schema
==========

To understand the problem, let us review the full path of the above call:

.. figure:: schemas/timeouts.svg
    :width: 370px
    :alt: timeouts schema

Configuring the timeouts
========================

All the timeouts, present on the above schema, must be increased to allow the
long deployment call be processed without timeout errors.

Client timeout
--------------

To let a client wait until a long API call is finished, increase its timeout to
the corresponding value, which should be slightly higher than the maximum
expected operation timeout. In our example, add *-T* argument for
:ref:`eva4_eva-shell` (*\-\-timeout* if calling
:ref:`eva4_eva-cloud-manager-cli` directly):

.. code:: shell

    eva -T 60 cloud deploy payload.yml

Local replication pub/sub timeout
---------------------------------

To send a call to another node, :doc:`svc/eva-repl` is used. Consider it is
deployed with the default id *eva.repl.default*. Modify the service
configuration and set the default timeout to a higher value:

.. code:: shell

    eva svc edit eva.repl.default

.. code:: yaml

    # ...
    timeout:
        default: 30
    # ...

This affects the default timeout of all newly added remote nodes.

Individual remote node timeouts
-------------------------------

The remote node timeout for RPC calls can be seen with the command:

.. code:: shell

   eva node list -s

and modified with the command:

.. code:: shell

   eva node edit NODENAME

The timeout can be edited for static nodes only. If the node is not a static
one, it should be appended first:

.. code:: shell

   eva node append NODENAME

Bus call timeout
----------------

The last timeout in the above call is the local BUS/RT call from the remote
replication service to the remote node core. To increase the max allowed
timeout, repeat the procedure, described in the previous chapter, on the
**remote node** and increase the default timeout for the remote replication
service as well (do not confuse with bus timeout, which is used by BUS/RT
sockets for low-level packet processing but not for RPC calls):

.. code:: shell

    eva svc edit eva.repl.default

.. code:: yaml

    # ...
    timeout:
        default: 30
    # ...
