Services practices
******************

This article covers service best practices, as well as describes how to develop
an own EVA ICS SDK or a service from scratch.

For EAPI communications, see also :doc:`../eapi`.

If a payload encoding is not particularity specified, the payload is packed
with `MessagePack <https://msgpack.org/index.html>`_.

.. contents::

Startup
=======

*(covered by SDK if available)*

A service is a process which is launched by :doc:`../../eva4/core` via a local
launcher.

* the process may contain user-defined command-line arguments

* the process environment does not contain any extra variables

Loading initial payload
=======================

*(covered by SDK if available)*

The service receives all parameters data from the local launcher with a
package, called "the initial payload".

The payload structure is well-described in

* https://docs.rs/eva-common/0.3.8/eva_common/services/struct.Initial.html (Rust SDK commons)

* https://pub.bma.ai/dev/docs/eva4-js-sdk/interfaces/InitialPayload.html (JavaScript/TypeScript SDK)

The initial payload is loaded in the following way:

* The service opens STDIN in binary mode

* reads a single byte, which MUST be equal to **0x01** (initial payload hello).
  If the byte is not equal, the service MUST terminate itself with an error
  code

* reads 4 more bytes from STDIN, which contain the initial payload size as
  32-bit integer little-endian (SIZE)

* reads SIZE bytes from STDIN, which contain the initial payload, packed with
  MessagePack

* unpacks the initial payload

STDIN beacon
============

*(covered by SDK if available)*

After the initial payload is processed, the service MUST leave STDIN open and
spawn a worker, which reads single bytes from it.

The service receives from time to time data from launcher, which MUST be equal
to **0x00**. No response is required in any way. If the byte is not equal or
STDIN steam is closed, the service MUST terminate itself (with no error code).
This may happen if the node core process is crashed or killed.

Environment variables
=====================

*(covered by SDK if available)*

If the service spawns child processes, it SHOULD set environment variables.
There is no standard how the variables should be set, however it is usually
recommended to set:

=================  =======================  ==================================================
Variable           Value                    Description
=================  =======================  ==================================================
EVA_SYSTEM_NAME    initial.system_name      Node name
EVA_DIR            initial.core.path        EVA ICS directory
EVA_SVC_ID         initial.id               Service ID
EVA_SVC_DATA_PATH  initial.data_path        Should be set to empty if the svc user is "nobody"
EVA_TIMEOUT        initial.timeout.default  The default service timeout
=================  =======================  ==================================================

Launching prepare commands
==========================

*(covered by SDK if available)*

If *initial.prepare_command* is filled, the service SHOULD launch the given
prepare command by itself and deal with the result.

Initializing
============

*(covered by SDK if available, some methods may require to be called manually
depending on SDK implementation)*

The service MUST connect to the local bus as soon as possible and after SHOULD
drop it privileges to a restricted user if set.

Workers
=======

*(covered by SDK if available)*

The parameter *initial.workers* tells the service to set the amount of workers
for its runtime. The service SHOULD always respect the parameter if it is
possible by its runtime/programming language used.

React-to-fail mode
==================

*(partiaally covered by SDK)*

If the previous service instance exited with an error code (e.g. the service
collects data from a PLC, but it is down), it may be launched in
*react-to-fail* mode, which is specified as *initial.fail_mode = true*.

The logic is the following:

* **initial.fail_mode = true** the previous instance has been exited with an
  error. The service may deal with it or just ignore the flag.

* **initial.react_to_fail = true** a user asks the service to provide some
  reaction, when started in the fail mode (e.g. setting mapped :doc:`items
  <../items>` to status **-1** or other less than zero (failed).

The service SHOULD:

* Give a warning or exit with an error code if *initial.react_to_fail* is set
  to *false* or the mode is not supported by the service itself

*(next steps are not covered by SDK)*

* Mark mapped items as failed if possible/required

* If fail mode differs from normal one - exit gracefully with no error.

Announcing service status
=========================

*(covered by SDK if available, some methods may require to be called manually
depending on SDK implementation)*

The service MUST announce its status via the local bus to the bus topic
*SVC/ST* with the following payload:

.. code::

   { "status": "STATUS" }

where the status is:

* **ready** the service is ready to work

* **terminating** the service is terminating

The service MUST announce its ready status within *initial.timeout.startup*.
Otherwise the service process is forcibly terminated by the launcher.

.. note::

   It is common for a service to refuse bus event processing/RPC calls until it
   becomes ready.

RPC
===

*(covered by SDK if available and no other information is given)*

After the service becomes ready, it MUST respond to RPC command "test" and
SHOULD to "info" (see :doc:`../eapi`). If the service is refusing RPC command
"test", it is killed by the launcher.

Handling signals
================

*(covered by SDK if available, some methods may require to be called manually
depending on SDK implementation)*

The service SHOULD handle termination signals *SIGINT* and *SIGTERM* and
terminate itself gracefully when received.

If the service is not terminated within the given *initial.timeout.shutdown*,
it is forcibly terminated by the launcher with *SIGKILL*, as well as all its
child processes if spawned.

Logging
=======

*(covered by SDK if available, some methods may require to be called manually
depending on SDK implementation)*

The service SHOULD have a logger, which sends messages to *LOG/IN/<level>*
topics (see :doc:`../eapi`).

The log messages which are sent via the bus, have a plain-text UTF-8 format and
are not encoded/serialized in any way.

The service MAY also output log messages to STDIN (level: info) and STDERR
(level: error) which are automatically processed by the local launcher. If
output streams are used, they SHOULD be properly locked and flushed after each
message.

.. note::

    If bus logging is used, keep it mind that the service stays muted until the
    bus is connected.

Waiting for the core
====================

*(The majority of SDK provides handy methods to wait until the core becomes
ready, named "wait_core" or similar)*

If the service is started during the node startup, the core may be not ready
yet (waiting until all other services become ready).

The proper way to check/wait is the node core ready is to do bus pull requests
via RPC calls to *eva.core*, method :ref:`eva4_eva.core__test`.

.. warning::

   The method MUST NOT be called in the same thread which marks later the
   service ready as it stops the node startup process and the service will be
   killed after its startup timeout is over.

Waiting for dependencies
========================

If a service depends on another one, it SHOULD manually check/wait until the
services it depends on become ready.

The service may use bus calls, file flags etc, depending on a dependency kind
and/or a particular implementation.

Handling events
===============

When the node core is started and all services become ready (or does not become
ready via the given max *initial.timeout.startup*), it announces states of all
local items via the local bus (topic *ST/LOC*).

FIPS 140
========

If the node is launched in :ref:`FIPS-140 mode <eva4_security_fips>`, the
service MUST use only FIPS-140 compliant cryptographic libraries/manually turn
on FIPS-140 mode in them if necessary.

If the service uses libraries which are not FIPS-140 compliant, the service
vendor MUST clearly specify this information in the service documentation.

Exit codes
==========

The service MUST terminate itself with the exit code *0* after the graceful
shutdown and with any other code on errors.
