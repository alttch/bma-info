Secondary clients and blocking RPC
**********************************

.. contents::

When used in blocking mode, RPC executes frame handlers in the primary frame
processing loop and waits until its completed.

This guarantees correct ordering of event processing and is highly recommended
for systems where ordering is important, such as decision-making systems, data
collecting services, which store data as a stream etc.

Event handlers and RPC
======================

The problem
-----------

The common problem of RPC-over-frame-exchange models is that event handlers are
not allowed to use the same client, from which the current frame is received.
Why? Let us explain:

* RPC layer receives a frame, which is not a RPC event and needs to be
  processed by the blocking frame handler

* To keep ordering, RPC layer blocks frame processing until the handler
  execution is over

* The handler calls RPC method and... gets stuck. The reply can not be received
  as the RPC layer is blocked and waits until the handler finishes its current
  task

* As the result, the whole RPC layer is blocked and IPC communications from/to
  the process are no longer possible

Solutions
---------

* Do not use RPC calls during event handling. Great idea, but what if RPC calls
  are really required and it is impossible to process an event without them?

* Keep RPC queue empty and toss events into secondary queries, where they are
  processed by blocking but background loop-handlers. Works fine with bounded
  channels until they are large enough. When the channels are full - blocks the
  RPC layer completely.

* Toss events to unbounded channels. Works fine until the client is flooded.

What can be done? Only registering a dedicated client for in-handler RPC calls.
The best idea possible.

Secondary clients
=================

To solve the above and some other blocking problems, BUS/RT gives a powerful
tool: secondary clients.

When a client is registered with a name "NAME%%SFX", it is considered by the
broker as a secondary client for the primary one, called "NAME".

How secondary clients work:

* The client must have an unique suffix SFX, otherwise the broker refuses
  registration with BUSY (0x76) error

* The primary client "NAME" must be registered in the broker, otherwise the
  registration of secondary one is refused with CLIENT_NOT_REGISTERED (0x71)

* If security model is used, secondary connections have the same AAA as the
  primary one

* The broker never sends register/unregister announcements for secondaries

* If the primary client is disconnected from the broker, all its secondaries
  are unregistered automatically. In case of external IPC clients, they are
  also forcibly disconnected

* Secondary clients do not appear in "client.list" broker's RPC method results,
  but primary clients have a column "instances", which shows how many
  secondaries are registered (1 + SECONDARIES_COUNT)

Creating secondary clients in Rust
----------------------------------

Internal
~~~~~~~~

To create an internal secondary client, use "register_secondary_for" method of
the broker object:

.. code:: rust

    let client = broker.register_client("client1").await.unwrap();
    let secondary_client = broker.register_secondary_for(&client).unwrap();

Do not forget that if the primary client is unregistered or dropped, all its
secondaries are unregistered automatically

IPC
~~~

To easily register a secondary client, use "register_secondary" method of IPC
client object:

.. code::

    let client = Client::connect(&Config::new("path/to/busrt/socket",
        "client1")).await.unwrap();
    let secondary_client = client.register_secondary().await.unwrap();

The secondary client is disconnected automatically if the primary one is
disconnected or dropped.

Handling frames
~~~~~~~~~~~~~~~

BUS/RT frames and events have two methods to identify the frame/event sender:

* **frame.sender()** returns the full peer client name, including secondary
  sender suffix. Must be used for RPC replies etc., where it is important to
  deliver the frame back to the sender peer.

* **frame.primary_sender()** returns the primary sender name. Must be used in
  logging, ACL processing etc.

Creating secondary clients in other languages
---------------------------------------------

Other language bindings do not support secondary clients out-of-the-box, but
they can be easily created manually: create a new client with a name
"NAME%%SFX" where SFX - a counter or a random value.
