PSRT - industrial Pub/Sub for WAN
*********************************

.. raw:: html

    <h2>What is PSRT</h2>

.. image:: images/psrt.png
  :width: 120
  :class: no-scaled-link
  :align: right

PSRT is a Pub/Sub real-time telemetry protocol, optimized for industrial needs:
providing low latency, dealing with slow channels and large payloads.

PSRT can process 100K+ messages on a single node with very low latencies
(<1ms). Speeds are reasonable (1K+ ops/sec) even with enormous (1MB+) payloads.

PSRT is designed to work in wide-area networks, where connections can be slow,
unstable and clients must be authenticated.

Topic subscriptions in PSRT are processed with B-tree algorithms, which allows
the server to handle hundred thousands subscriptions without any speed
loss.

.. raw:: html

    <h2>Why not MQTT</h2>

We love MQTT. And we use MQTT a lot. There are cases where MQTT ideally fits
requirements. However, for some it does not satisfy our speed and reliability
needs and produces additional overhead. That is why we invented PSRT and use it
as the primary protocol for :doc:`../eva4/index` in large Enterprise setups.

## What is the difference?

* PSRT is the protocol, optimized for large (65K+) message payloads
* No QoS - all messages are always delivered to subscribers only once, so
  consider it is always QoS=2 if use MQTT measurements
* No retain topics. Retains usually require disk writes, which produce
  additional overhead
* No OP-ACK loops. All control operations are fast, synchronous and atomic
* Two TCP sockets: one for control ops and the second one for incoming
  messages. This makes clients a bit more complicated, but allows to process
  incoming messages without any extra overhead. Additionally, with two sockets
  control op acknowledgements and incoming message data can be mixed, which is
  important when large messages are processed on slow channels
* Devices and nodes, which do not need subscriptions, can use either a single
  TCP control socket or work without any connection established, using UDP
  datagrams with or without acknowledge from the server
* PSRT is almost 100% logically compatible with MQTT, so software can be
  switched to it and vice versa with only a couple of lines of code

.. raw:: html

    <h2>What is the same?</h2>

PSRT is logically the same as MQTT: same format for topics, same format for
topic masks etc:

* path/to/topic - an individual topic (subscribe / publish)
* path/to/# - all topics under the specified path (subscribe)
* path/+/some/+/topic - all topics matching the mask ("+" for any subtopic)

.. toctree::
    :maxdepth: 1

    psrt
    cluster
    proto
