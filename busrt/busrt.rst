IPC documentation
=================

.. toctree::
   :hidden:

    <python/busrt.rst>
    <python/busrt_async.rst>

.. contents::

Bindings
--------

* `Rust client/broker <https://crates.io/crates/busrt>`_
* :doc:`Python client (sync) <python/busrt>`
* :doc:`Python client (async) <python/busrt_async>`
* `Javascript client <https://www.npmjs.com/package/busrt>`_

Inter-process communication
---------------------------

The following communication patterns are supported out-of-the-box:

-  one-to-one messages
-  one-to-many messages
-  pub/sub

The following channels are supported:

-  async channels between threads/futures (Rust only)
-  UNIX sockets (local machine)
-  TCP sockets

Rust crate features
-------------------

* **ipc** - enable IPC client
* **rpc** - enable optional RPC layer
* **broker** - enable broker
* **full** - IPC+RPC+broker
* **server** - build stand-alone broker server
* **cli** - build CLI tool
* **std-alloc** - forcibly use the standard memory allocator for server/cli
  (enable in case of problems with jemalloc)

QoS
---

BUS/RT frames have 4 types of QoS:

* No (0) - does not need confirmation, non-real-time
* Processed (1) - needs confirmation from the broker, non-real-time
* Realtime (2) - does not need confirmation, real-time
* RealtimeProcessed (3) - needs confirmation from the broker, real-time

When a real-time frame is send to a socket, its write buffer is flushed
immediately. Otherwise, a "buf_ttl" delay may occur (>1ms), unless any data is
sent after and the buffer is flushed automatically.

Performance tips
----------------

* Use "Realtime" or "RealtimeProcessed" QoS for the softly-loaded networks to
  get minimal latencies.

* Use high-capacity queues (both client and server) to deal with short
  high-load peaks.

* For permanently loaded networks, the opposite strategy is recommended - keep
  queues as small as possible (256-512 elements), otherwise the broker can be
  easily flooded with more active clients.

* If large payloads are expected, consider to increase client/server buffers.
