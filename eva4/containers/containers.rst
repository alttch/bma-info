Running in containers
*********************

.. contents::

The official images
===================

The official EVA ICS v4 `Docker <https://www.docker.com>`_ images can be found
at https://hub.docker.com/r/altertech/eva-ics4. These images can be used with
Docker, as well as with `Kubernetes <https://kubernetes.io>`_.

What is included
----------------

* the container images are based on Ubuntu 20.04 LTS

* the images do not contain any services pre-deployed

* the images contain Python and :ref:`eva4_eva-shell` installed

* file and syslog logging is disabled by default

* internal watchdog is disabled

* the container time zone is set to UTC

* the container bus has got an open TCP port 7778 for external connections

.. warning::

   If using containers in untrusted networks, it is highly recommended to
   remove the open bus TCP port.

Volumes
-------

The following volumes are automatically used as persistent if found, replacing
the default EVA ICS directories:

============  =================  ============================================================
Volume path   Used as            Notes
============  =================  ============================================================
/mnt/etc      /opt/eva4/etc      Can contain a custom :ref:`eva4_eva_config`
/mnt/init                        Can contain files for custom node initialization
/mnt/runtime  /opt/eva4/runtime  If the volume is empty, the default runtime is copied
/mnt/log      /opt/eva4/log      Can be used for logging (must be enabled in eva/config/logs)
/mnt/pvt      /opt/eva4/pvt      Used for HMI web applications private files
/mnt/ui       /opt/eva4/ui       Used for :doc:`HMI <../svc/eva-hmi>` web applications
============  =================  ============================================================

* It is highly recommended to keep the node :doc:`item <../items>` inventory
  either in an :ref:`external inventory database <eva4_config_core>` or mount
  **runtime** volume as a persistent one.

* A container can be used as a :doc:`secondary point <../local_cluster>`, which
  runs a single or multiple services but is connected to an external EVA ICS
  core. To connect the container to the one which runs the node core, use the
  corresponding parameters in :ref:`eva4_eva_config`.

Preparation
-----------

On the first run, after the node process is successfully started, the container
executes a script (if exists):

.. code:: shell

   /mnt/init/prepare.sh

The script may contain custom preparation commands as well as apply a custom
:doc:`registry <../registry>` setup.

If the script has no execution permissions, it is started with bash.

Configuring the node core
-------------------------

The core process can not be restarted. When the core receives restart/shutdown
request, the container is terminated.

To pre-configure node settings, the following YAML files can be used to be
imported into :doc:`EVA ICS registry <../registry>` before the node is started:

==================================  ============================
File path                           Imported as the registry key
==================================  ============================
/mnt/init/config/bus.yml            eva/config/bus
/mnt/init/config/cloud-manager.yml  eva/config/cloud-manager
/mnt/init/config/core.yml           eva/config/core
/mnt/init/config/logs.yml           eva/config/logs
/mnt/init/config/registry.yml       eva/config/registry
==================================  ============================

See more at :ref:`eva4_eva_config_registry_keys`.

Initialization
--------------

On the first run, after the node process is successfully started, the container
executes a script (if exists):

.. code:: shell

   /mnt/init/init.sh

The script may contain custom initialization commands as well as custom
:doc:`deployment commands <../iac>`.

If the script has no execution permissions, it is started with bash.

Deployment
----------

On the first run, if the container locates files named */mnt/init/init\*.yml*
(e.g. */mnt/init/init0.yml*), they are automatically used for the node
:doc:`deployment <../iac>`.

* The files are executed one-by-one in alphabetical order

* As the node comes with no services deployed, for deploying user accounts,
  keys or ACLs, it is required to split deployment into several files, where
  first one deploys the required services and the next one deploys
  the authorization objects. An example can be found at:
  https://github.com/eva-ics/eva4/tree/main/docker/test/data/init

* The deployment files may contain external variables. To set the variables,
  use variable configuration files, which must be named as
  */mnt/init/vars\*.yml* where the file name suffix corresponds the deployment
  file suffix. E.g. if the deployment file is named as *init01.yml*, the
  variable file must be named as *vars01.yml*.

.. warning::

    The deployment/variable files must not contain spaces in their names.

Updating
--------

The containers must be updated only from the image repository. The containers
CAN NOT be updated with :ref:`eva4_eva-shell`,
:ref:`eva4_eva-cloud-manager-cli` or remotely using the native EVA ICS cloud
update feature.

After updating, no special actions are required. If persistent volumes are
used, the container automatically updates the registry keys and other files if
necessary.

Features of using with Kubernetes
=================================

See :doc:`k8s`.
