The replication service allows V4 nodes to replicate events and interact with
each other.

.. note::

    There can be only a single replication service instance per pub/sub server
    deployed on each EVA ICS node.

The nodes must be connected via either :doc:`PSRT </psrt/index>` or `MQTT
<https://mqtt.org>`_ pub/sub.

* **PSRT** is an in-house pub/sub protocol, designed especially for industrial
  needs, which can efficiently replicate lots of events per seconds and deal
  with large payloads via slow channels.

* **MQTT** is popular standard IoT protocol, widely used and provided by lots
  of free and commercial service applications, as well as hosted versions from
  various cloud providers.

.. figure:: ../schemas/repl.png
    :scale: 80%
    :alt: v4 replication

To communicate, both local and remote node must share the same API key (a key
service is required, e.g. :doc:`../svc/eva-aaa-localauth`. In trusted
environment it is possible to use the same "default" key for all nodes. In
untrusted ones it is recommended to have a dedicated key for each node pair.

.. warning::

    All key fields MUST contain API key ID, not the key value.

The API key specifies ACL(s) for the remote node to handle RPC-via-pub/sub
calls.

To enable all remote bus calls, nodes must also share the same API key with
admin privileges, which must be set in "admin_key_id" configuration field on
the primary (manager) node. The security policy is the same as for regular
keys.

When the "admin_key_id" is set, the remote node becomes "managed".

.. note::

    Remote bus calls are required for :doc:`../iac` if a deployment
    configuration contains sections for remote nodes.

If discovery is enabled, newly discovered nodes are automatically connected
with the "default_key". Discovery feature is recommended for trusted and
semi-trusted environments.

One node can have multiple replication services deployed. However all of the
must replicate with the own set of remote nodes. Having same remote nodes
replicated by different services leads to abnormal system behavior.

See also: :doc:`../repl/proto`.

Pub/sub security
================

In production systems a pub/sub server can be securely shared between customers
in case of the following conditions:

* no node discovery (as node states can be forged)
* bulk telemetry, bulk encryption

All RPC calls in EVA ICS are AES-256-encrypted by default.

.. _eva4_repl_untrusted:

Replicating untrusted nodes
===========================

By default, all remote nodes are trusted, which means any one can push/provide
telemetry data for any :doc:`item <../items>`.

If there is an untrusted node connected, it can provide fake telemetry data for
certain items, also it is not possible to use pub/sub security for bulk topics.

In this case, the node must be marked as untrusted in its configuration, which
can be done either with :ref:`eva4_eva-shell` command "node append" with
*\--untrusted* argument, "node edit" for existing nodes or in the node
deployment configuration.

Untrusted nodes should use dedicated :ref:`API Keys <eva4_api_key>` only. To
let a remote untrusted node provide telemetry data, the configured API key must
have :ref:`ACL <eva4_acl>` with "write" permission for the allowed items,
otherwise the telemetry is ignored in both push and pull.

Untrusted nodes should provide their telemetry via bulk topics only, in
the encrypted way only. Such topics must be configured in the replication
service as "secure topics":

.. code:: yaml

    bulk:
      receive:
        secure_topics:
          - all

Regular bulk topics do not check senders' ACLs and should be used for trusted
nodes only.
