SNMP/UDP trap handler controller provides easy-to-use way to process SNMP
v1/v2c and EVA ICS native UDP traps.

SNMP Traps
==========

Processing
----------

A trap data is parsed and processed later with a custom :ref:`eva4_lmacro` with
the following keyword arguments:

==============  ================  ==================================
Name            Type              Content
==============  ================  ==================================
trap_source     String            SNMP trap sender IP address
trap_community  String            SNMP trap community
trap_vars       Map<String, Any>  Trap variables map as SNMP_OID=VAL
==============  ================  ==================================

Supported SNMP data types
-------------------------

The following SNMP data types are parsed and sent in *trap_vars*:

===========  ===================
Type         Processed as
===========  ===================
BER (X.690)  u64/i64/bool/String
Counter32    u32
Gauge32      u32
UInteger32   u32
Counter64    u64
String       String
===========  ===================

Unsupported data types are ignored.

Native traps
============

EVA ICS native traps is a native UDP signaling trap protocol, which replaces v3
UC UDP API.

The native trap structure is a string with new-line (LF) separated commands,
e.g.:

.. code::

    u sensor:env/temp 1 25.57
    a unit:tests/motor1 1 34.22
    a unit:tests/relay1 toggle

.. note::

    Native traps are processed by the service directly, the process macro is
    not required to be set.

Updates
-------

Update commands have the following format:

.. code::

    u[pdate] <OID> <status> [value]

Example:

.. code::

    u sensor:env/temp 1 25.57

Actions
-------

Action commands have the following format:

.. code::

    a[action] <OID> <status> [value]

Example:

.. code::

    a unit:tests/motor1 1 34.22

If a toggle-action is required to be executed, use "t" (or "toggle") as the
status.

Encrypted/compressed traps
--------------------------

The service supports encrypted and/or compressed trap payloads. The frame
format is the same as for :ref:`replication bulk events
<eva4_bulk_repl_event>`.

For encrypted frames, *key_svc* parameter in the service config is mandatory.

A Python example, which sends bzip2-compressed plus AES-256-GCM-encrypted
native traps:

.. code:: python

    import socket
    import bz2
    from Cryptodome import Random
    from Cryptodome.Cipher import AES
    from hashlib import sha256

    sender = ''
    key_id = 'mykey'
    key_val = 'SECRET'

    payload = """
    u sensor:env/temp 1 25.57
    a unit:tests/door t
    a unit:tests/u2 1
    """

    flags = 2 + (1 << 4)  # 2 = AES-256-GCM, 5th bit = 1 - bzip2
    nonce = Random.new().read(12)
    hasher = sha256()
    hasher.update(key_val.encode())
    cipher = AES.new(hasher.digest(), AES.MODE_GCM, nonce)
    frame, digest = cipher.encrypt_and_digest(bz2.compress(payload.encode()))
    binary_payload = b'\x00\x01' + flags.to_bytes(
        1, 'little') + b'\x00\x00' + sender.encode() + b'\x00' + key_id.encode(
        ) + b'\x00' + frame + digest + nonce
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(binary_payload, ('127.0.0.1', 1162))
