The legacy replication service is used to replicate EVA ICS v3 nodes with v4
until migrated.

.. note::

    The service will be not supported and excluded from the default EVA ICS v4
    distribution after v3 EOL.

Limitations
===========

Protocol and configuration
--------------------------

* only `PSRT <https://psrt.bma.ai/>`_ pub/sub servers are supported
* only v3-to-v4 one-way replication is supported (v4-v3 actions are supported)
* a single PSRT server per service is supported
* auto-discovery is not supported
* deployment is not supported
* the service supports compressed API calls only (v3.4.2+ required)
* individual real-time state replication is not supported. Remote nodes MUST
  have bulk topics configured
* all v3 node controllers are considered as a single node. if any component is
  stopped, the whole node is marked as offline

Items
-----

Cycle states are not supported (there are no replicated cycles in v4)

rpvt
----

v4-v3 rpvt calls are not supported: if a node can not be migrated to v4 yet,
consider installing an additional local v4 node for rpvt functionality only.
