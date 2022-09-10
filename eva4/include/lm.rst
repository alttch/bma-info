Logic manager is a software programmable logic controller, which allows to cope
with typical automation tasks.

Functionality
=============

Rules
-----

A rule is a way to react to item state events, either for a particular
:doc:`item <../items>` or for an item mask.

If an event matches condition and the previous state was out-of-condition
range, the rule executes :ref:`eva4_lmacro` handler, a local or remote.

The handler receives additional keyword arguments:

======  ==========================
Name    Content
======  ==========================
source  Event source (state + OID)
======  ==========================

Chillout
~~~~~~~~

If a rule has chill-out time set and an event matches the rule condition,
further events are ignored until chill-out time is over.

If a rule receives match-event during the chill-out time, the handler is
executed right after the chill-out is over. *source* argument contains the last
event received during the chill-out.

Cycles
------

A cycle is a high-performance loop-executor for a :ref:`eva4_lmacro`, a local
or remote. The service provides cycles up to 1000Hz (interval 0.001 sec = 1ms),
nevertheless cycle frequencies are usually limited to lmacro execution time
(e.g. :doc:`../svc/eva4-svc-controller-py` has the fastest execution time near
3ms for local actions).

In case of errors, an error-handler lmacro is called if defined, which gets the
following args:

==================  ======  ====================
Error               Arg 1   Arg 2
==================  ======  ====================
Cycle timeout       cycle   timeout
Handler error       lmacro  result error as-is
Handler timeout     lmacro  timeout
Handler exec error  exec    BUS error code (i16)
==================  ======  ====================

Cycles can be started automatically or manually, via BUS calls. E.g. to start a
cycle with :doc:`../lmacro/py/python_macros`, use :ref:`rpc_call
<eva4_py_macro_api_rpc_call>` method.

Jobs
----

A job is a low-performance loop or scheduled executor for a :ref:`eva4_lmacro`,
a local or remote.

Jobs provide the same functionality as the system cron, except the smallest
execution time unit is a second, plus optionally year(s) can be set.

.. note::

    Job schedulers use local time, which may cause certain commands to be
    repeated/skipped if the system time goes backward/forward, when corrected
    or during dayling saving switches.
