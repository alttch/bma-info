Installation
************

.. contents::

.. _eva4_supported_os:

Supported operating systems
===========================

The following operating systems are supported out-of-the-box:

Recommended for production setups
---------------------------------

* `Ubuntu Linux 20.04+ <https://ubuntu.com>`_
* `Debian GNU/Linux 11+ <https://www.debian.org>`_
* `Alpine Linux 13.3+ <https://alpinelinux.org>`_

Tested and fully compatible
---------------------------

* `Raspbian Linux <https://www.raspberrypi.org>`_
* `RedHat Enterprise Linux 8 <https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/>`_
* `Fedora Linux <https://getfedora.org>`_

By default, an universal (static-linked) EVA ICS distribution package is
installed. See :ref:`eva4_native` for more info.

Preparing the system
====================

The EVA ICS installer prepares the system automatically, installing required
packages. The only necessary pre-installed packages is "curl" to download and
start the installation.

.. _eva4_install:

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

To specify an alternative Python path during the installation, use *PYTHON*
environment variable:

.. code:: shell

    sudo -s
    curl https://pub.bma.ai/eva4/install | env PYTHON=/path/to/python sh /dev/stdin -a --hmi

Installer arguments
-------------------

By adding "-h" or "--help" argument, the full list of the installer arguments
can be obtained. Let us review the primary ones:

* **\--hmi** automatically setups authentication and web HMI services.

* **\--mode** prepares the system, installs additional packages:

    * **0** installs the minimal list of required packages
    
    * **1** installs Python and eva-shell

    * **2** all of the above, plus C and C++ compilers, plus development headers

    * **3** all of the above, plus Rust compiler and additional development
            headers

The compilers and the development headers can be used to add custom Python
modules into venv.

* **\--prepare-only** allows to install additional compilers / headers, without
  installing EVA ICS. Can be executed after the installation at any time.

Overriding keys/passwords
~~~~~~~~~~~~~~~~~~~~~~~~~

If :doc:`HMI service <./svc/eva-hmi>` is selected to be installed, the
installer automatically sets up :doc:`./svc/eva-aaa-acl` and
:doc:`./svc/eva-aaa-localauth` services as well.

The passwords / API keys are generated automatically. To override, use the
following environment variables:

* **DEFAULTKEY** - the default host API key
* **ADMINKEY** - the admin API key
* **ADMINPASSWD** - the admin password
* **OPKEY** - the operator API key
* **OPPASSWD** - the operator password

Example:

.. code:: shell

    sudo -s
    curl https://pub.bma.ai/eva4/install | env DEFAULTKEY=secret sh /dev/stdin -a --hmi


Uninstalling
============

To uninstall EVA ICS, execute the following:

.. code:: shell

   systemctl stop eva4
   rm -rf /opt/eva4
   rm -f /etc/systemd/system/eva4.service
   systemctl daemon-reload

On Alpine Linux, stop EVA ICS using:

.. code:: shell

   rc-service eva4 stop
   # or
   /etc/init.d/eva4 stop

.. note::

   If installation has been failed at some point, it is recommended to execute
   the above commands to clean up the system before the next installation
   attempt.

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

.. note::

    Operating system upgrade to a new version usually requires rebuilding venv
    from scratch after the upgrade process is finished.

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

Mission-critical systems
------------------------

The following update strategy is recommended for mission-critical systems:

* Backup the system (*/opt/eva4* directory) before updating

* Apply update on a test system before updating the critical one

* If the test system works with no issues after update has been applied,
  execute the following :ref:`eva4_eva-shell` command:

.. code:: shell

   eva update -i

The above outputs the latest available EVA ICS build/version plus provides a
command how to update other nodes to the same build the test system has got.

* Execute the provided command on the target mission-critical system as-is:

.. code:: shell

   eva update --target-version VERSION:BUILD

Running under a restricted user
===============================

By default, the EVA ICS main process is started as root, while secondary
services drop their privileges to system restricted users.

Sometimes the whole platform must run under a restricted user. To make it work,
perform the following:

* :ref:`Install <eva4_install>` EVA ICS v4 in the regular way. The commands
  below require :ref:`eva4_eva-shell` to be installed, so run the installer
  with *-a* option or install eva-shell later manually.

* Execute the following command to remove "props/user" option in the existing
  deployed services:

.. code:: shell

    eva svc export \*|grep -v '^    user: '|eva svc deploy

* Stop the server completely

.. code:: shell

    systemctl stop eva4
    # if not using systemd to start/stop EVA ICS automatically
    eva server stop

* Create a desired user, change ownership of /opt/eva4 directory, where
  *useracc* is user's login:

.. code:: shell

    chown -R useracc /opt/eva4

* If using *systemd*, create a systemd service configuration override:

.. code:: shell

    systemctl edit eva4

and put the following to override the user:

.. code:: ini

    [Service]
    User=useracc

* If *logrotate* is automatically configured during the install, edit
  */etc/logrotate.d/eva4* and replace in the default "create 640 root adm" line
  *root* to *useracc*.

* Start the server back

.. code:: shell

    systemctl start eva4
    # if not using systemd to start/stop EVA ICS automatically
    su - useracc -c "/opt/eva4/bin/eva server start"

.. note::

    When deploying new services on EVA ICS system, which runs under a
    restricted user, avoid using "user" field in the service primary params
    section (remove it if using the default templates).

Installing/updating on Debian 10
================================

Despite Debian 10 is not officially supported, EVA ICS can be installed on it.
If :ref:`eva4_eva-shell` or Python services are required, install Python 3.8
back-port:

.. code:: shell

   sudo -s
   apt -y install curl lsb-release
   curl https://people.debian.org/~paravoid/python-all/unofficial-python-all.asc | \
        tee /etc/apt/trusted.gpg.d/unofficial-python-all.asc
   echo "deb http://people.debian.org/~paravoid/python-all $(lsb_release -sc) main" | \
        tee /etc/apt/sources.list.d/python-all.list
   apt update
   apt -y install python3.8

The install EVA ICS as the following:

.. code:: shell

    curl https://pub.bma.ai/eva4/install | env PYTHON=python3.8 sh /dev/stdin -a --hmi

If updating Python venv on an existing system, execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr edit
    # or
    /opt/eva4/sbin/eva-registry-cli edit eva/config/python-venv

Set "python" field to "python3.8" then execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr build -S

.. note::

   Python 3.8 backport to Debian 10 is not officially supported by Debian.

