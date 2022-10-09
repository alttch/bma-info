Zero-failure replication service solves a typical IoT problem, when real-time
data is lost in cases if pub/sub target is offline or a source has temporally
no connection with pub/sub.

The service provides a second replication layer, in addition to
:doc:`../svc/eva-repl`, which 100% guaranties that all telemetry data is
transferred to the target node, unless deleted as expired.

The service is a perfect helper to fill all gaps in logs, charts or any other
kind of archive data representation, collection or analysis.

.. figure:: ../schemas/zfrepl.png
    :scale: 100%
    :alt: Zero-failure replication schema

The service can work in 3 roles (only one can be defined in the deployment
config):

Service roles
=============

Collector
---------

Collects real-time data for local :doc:`items <../items>` and stores them into
blocks of the subscribed mailboxes. The mailboxes must be called same as the
remote nodes, which collect the data.

The mailbox blocks have compact and crash-free format with serialize+CRC32
scheme, which allows processing all available frames in the block unless a
broken one is detected.

Telemetry data is known to be compressed well so it is highly recommended to
compress blocks when transferred (the service client applies BZIP2-compression
automatically).

Additionally, if replication blocks are lost but there is a history database
service on a local node (e.g. :doc:`../svc/eva-db-influx` or
:doc:`../svc/eva-db-sql`), the collector may be asked to fill a mailbox with
blocks from the database (see
:ref:`eva4_eva.zfrepl.N.collector|replicator__mailbox.fill`).

The service performing the collector role is always online.

Replicator
----------

Allows to setup mailbox replication, based on a flexible custom schedule (e.g.
every minute, at night only etc.).

Automatically collects replication blocks from remote nodes and pushes them to
the local bus replication archive topic (*ST/RAR/<OID>*).

Requires a Pub/Sub server (:doc:`PSRT </psrt/index>` or `MQTT
<https://mqtt.org>`_).  Both source and target node must share the same
:ref:`eva4_api_key`. The API key is used to check a particular service
configuration-mapped mailbox access only and can have an empty ACL. While being
usually deployed together with :doc:`../svc/eva-repl`, uses a dedicated
connection (or a dedicated server).

Transfers blocks compressed and encrypted.

.. warning::

    The replicator role MUST be deployed on the same machine as the collector.

The replicator client may fetch both prepared-to-replicate blocks as well as
the current collector block. In the last case, the block is forcibly rotated.
This means if the mailbox replication schedule is set as continuous, the
replication frequency is nearly equal to the block requests interval set.

The service performing the replicator role is automatically restarted on
pub/sub failures.

Standalone
----------

Allows to import manually copied blocks only (see
:ref:`eva4_eva.zfrepl.N.collector|replicator__process_dir`).

To process the block directory manually, use:

.. code:: shell

    eva svc call eva.zfrepl.1.replicator \
        process_dir path=/path/to/blocks node=SOURCE_NAME delete=true
    # or using the bus CLI client
    /opt/eva4/sbin/bus /opt/eva4/var/bus.ipc rpc call eva.zfrepl.1.replicator \
        process_dir path=/path/to/blocks node=SOURCE_NAME delete=true

The service performing the standalone role is always online.

Recommendations
===============

* Large blocks may cause database service data-flooding on target nodes. Make
  sure these services have enough resources and bus queue size set.

* Keep data blocks small (2-3MB). Approximately, telemetry data is compressed
  10x but the ratio may vary depending on setup.

* If large amount of blocks is generated, increase *block_ttl_sec* mailbox
  collector field.

* :ref:`eva4_eva.zfrepl.N.collector|replicator__mailbox.fill` may cause
  significant disk/event queue overhead. Make sure the collector service has:

    * enough bus queue
    * enough file ops queue

* if huge network load is expected (e.g. equipment, connected to the node, is
  reconfigured) because of lots of real-time data, a service, which runs under
  the replicator role may be temporally disabled:

.. code:: shell

    eva svc call eva.zfrepl.1.replicator disable
    # or using the bus CLI client
    /opt/eva4/sbin/bus /opt/eva4/var/bus.ipc rpc call eva.zfrepl.1.replicator disable

When disabled, the service stops all local replication client tasks (which must
be later triggered either by schedulers or manually) and forbids serving blocks
via pub/sub for external clients. Other methods and tasks are not affected.

To enable the service back, repeat the above command with "enable" method or
restart it.

.. _eva4_zfrepl_untrusted:

Untrusted nodes and zero-failure replication
============================================

The approach is similar to :ref:`real-time replication <eva4_repl_untrusted>`:
by default remote zero-failure replication mailboxes
are trusted, which means all remotes can provide telemetry data for all
:doc:`items <../items>`.

To setup zero-failure replication with an untrusted node, mark its mailbox with
"trusted: false" in the replicator/client section of the service configuration
and make sure the configured API key has :ref:`ACL <eva4_acl>` with "write"
permission for the allowed items.
