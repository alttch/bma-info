Pub/Sub RPC and data replication
********************************

.. contents::

Common
======

* EVA ICS v4 has no "spaces", all topics are written to the pub/sub root. If
  more than one cluster is set up, consider using multiple or virtual pub/sub
  servers.

Events
======

* State topics are written into state topic: *ST/unit*, *ST/sensor* and
  *ST/lvar*. Such state events have JSON payload encoding.

* a special state topic *STBULK*, which accepts bulk state events in subtopics

* Log and action state replication are not supported by default and has no any
  standard.

Tests
=====

Nodes send test messages to *TEST/random(uuid)* topic in any format

Announce/discovery/node state
=============================

Nodes announce their states to *NODE/ST/<name>* topic in the following format:

status: ready/terminating

starting/ready statuses have additional fields:

build: EVA ICS build (u64)
version: EVA ICS version (string)

.. _eva4_bulk_repl_event:

Bulk events
===========

* byte 0: 0x00 (binary notification)

* byte 1: protocol version (current 1)

* byte 2: protocol flags

* byte 3-4: reserved

* byte 5-: sender (string) 0x00 encryption key id (string) or nothing 0x00
  payload

where protocol flags byte is (bits)

0-3 - encryption type (0 - none, 1 - AES-128-GCM, 2 - AES-256-GCM)

4-5 - compression type (0 - none, 1 - bzip2)

6-7 - reserved

RPC
===

Requests
--------

RPC request are performed to *NODE/RPC/<target_name>* topics and have the
following payload format:

* byte 0: protocol version (current 1)

* byte 1: 0x01 (rpc request)

* byte 2: protocol flags

* bytes 3-4: reserved

* byte 5-: sender (string) 0x00 encryption key id (string) or nothing 0x00
  payload

(see :ref:`eva4_bulk_repl_event` for protocol flags)

Call payload format:

* bytes 0-15: 16-byte request uuid

* byte 16: method 0x00 params (msgpack)

AES GCM nonce (12 bytes) is added at the payload end

Replies
-------

RPC replies are sent to *NODE/RPC/<caller_name>* topic in the following format:

(flags must be same as used in the RPC request)

* byte 0: protocol version (current 1)

* byte 1: 0x11 for reply 0x12 for error reply

* bytes 2-3: reserved

* bytes 4-19: 16-bytes request uuid

* byte 20-: payload (encrypted)

(see :ref:`eva4_bulk_repl_event` for protocol flags)

Response payload format:

* byte 0: data (msgpack)

Error payload format:

* byte 0: error code (i16)
* byte 2: error message

Encryption
----------

* the encryption key id must match the key value on both sides

* the call is considered as authorized if either the encryption is turned off
  or the payload is successfully decrypted

