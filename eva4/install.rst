Installation
************

.. contents::

Preparing the system
====================

The EVA ICS installer prepares the system automatically, installing required
packages. The only necessary pre-installed packages is "curl" to download and
start the installation.

Installing
==========

Basic install
-------------

For a single node, which is going to host a HMI application, type:

.. code:: shell

    sudo -s # the installer script requires root privileges
    curl https://pub.bma.ai/eva4/install | sh /dev/stdin -a --hmi

If this is a secondary node and no web services / HTTP API are required, omit
the "--hmi" argument.

.. note::

    As the installer script always installs at least the minimal list of
    required system packages, it must be executed under root.

The installer automatically prepares the system, installs the latest EVA ICS
distribution to /opt/eva4 (default) folder and sets up Python virtual
environment in /opt/eva4/venv (for mode >= 1).

Installer arguments
-------------------

By adding "-h" or "--help" argument, the full list of the installer arguments
can be obtained. Let us review the primary ones:

* **--hmi** automatically setups authentication and web HMI services.

* **--mode** prepares the system, by installing additional packages:

    * **0** installs the minimal list of required packages
    
    * **1** installs Python and eva-shell

    * **2** all of the above, plus C and C++ compilers, plus development headers

    * **3** all of the above, plus Rust compiler and additional development headers

The compilers and the development headers can be used to add custom Python
modules into venv.

* **--prepare-only** allows to install additional compilers / headers, without
  installing EVA ICS. Can be executed after the installation at any time.

Post-install configuration
==========================

Startup and watchdog options can be configured by editing configuration files
in /opt/eva4/etc folder (create them from provided examples if missing).

Additional configuration can be performed by editing :doc:`registry` keys.

Read more in :doc:`configuring <config>` documentation section.

Startup
=======

If the automatic startup has been set up, EVA ICS node is started automatically
either by Systemd or by OpenRC (Alpine). To start/stop the node server
manually, use either "/opt/eva4/sbin/eva-control" script or
:doc:`eva-shell<cli>`.

Configuring/rebuilding Python venv
==================================

An optional Python virtual environment can be configured using the command:

.. code:: shell

    /opt/eva4/sbin/eva-edit-python-venv

or by editing "eva/config/python-venv" registry key in :doc:`eva-shell<cli>` or
in other tools.

.. code:: shell

    /opt/eva4/sbin/venvmgr build

To rebuild the virtual environment from scratch, completely delete
/opt/eva4/venv folder or call the above command with *-S* argument.

.. _eva4_updating:

Updating
========

Local nodes
-----------

To update a local node, use the command:

.. code:: shell

    eva update
    # or
    /opt/eva4/bin/eva-cloud-manager node update

.. _eva4_cloud_updating:

Remote nodes
------------

If any remote nodes are connected with :doc:`replication services
<svc/eva-repl>` and configured as managed (admin key is set), they can be
updated using cloud-update feature:

.. code:: shell

    eva cloud update
    # or
    /opt/eva4/bin/eva-cloud-manager cloud update

After being started, the cloud-update firstly gathers facts about the available
nodes and after offers the update plan, which must be additionally confirmed.

Remote nodes are always updated to the same version, which the management node
has got.
