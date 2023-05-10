Managing PLC instances
**********************

.. contents::

PLC instances can be easily managed with rplc command-line tool.

The tool can be freely downloaded at https://github.com/eva-ics/rplc/releases

.. note::

   The majority of the commands require CLI tool to be executed under root.

PLC var directory
=================

By default, PLC instances use the system temporary directory to store their
*pid* files, API sockets etc. This can be changed by setting *PLC_VAR_DIR*
system environment variable.

If a custom var directory is used, the variable must be set before calling
*rplc* command-line tool as well.

Registering a PLC instance
==========================

The command

.. code:: shell

   rplc register path/to/plc_binary

registers a PLC instance in systemd. Additional arguments:

* **--force** re-register an instance even if its already registered (stops PLC
  process if running)

* **--eapi** specify :doc:`EAPI <io/eapi>` path

* **-a** specify :doc:`PLC thread affinity <realtime>`, as NAME=CPU_ID,PRIORITY

* **--var** specify a custom system environment variable

* **--start** start the PLC instance after registering

Unregistering PLC instance
==========================

The command

.. code:: shell

   rplc unregister plc_name # plc_name = binary name

unregisters a PLC instance from systemd. The PLC process is stopped if
required.

Additional commands
===================

The additional commands allow to list available PLC instances, get their info,
stats, start, stop instances etc. The full list of available commands can be
obtained with

.. code:: shell

   rplc -h
