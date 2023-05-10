Internal API
************

.. contents::

All rPLC processes have a basic internal API which can be accessed via
*procname.plcsock* UNIX socket file, automatically created either in the system
temporary directory or in a directory specified in *PLC_VAR_DIR* system
environment variable.

*rplc* CLI tool uses API to obtain PLC info and statistics. API can be also
accessed by 3rd party programs.

API protocol
============

rPLC uses `JSON RPC 2.0 <https://www.jsonrpc.org/specification>`_ with
MessagePack-encoded payloads. The packet format is:

====  ====================================
Byte  Description
====  ====================================
0     Protocol version (0)
1-4   Packet length (32-bit little-endian)
5-    Packet payload (MessagePack)
====  ====================================

API methods
===========

==================  ==========  ======================================================
Method              Parameters  Description
==================  ==========  ======================================================
test                None        returns null
info                None        returns PLC name, description, version, status and PID
thread_stats.get    None        returns thread stats (iterations, jitters etc.)
thread_stats.reset  None        resets thread stats, returns null
==================  ==========  ======================================================
