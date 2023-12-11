High-load and mission-critical environments
*******************************************

.. contents::

Tuning EVA ICS
==============

To use EVA ICS in high-load environments, remember the following:

* Always turn off trace and debug :ref:`logs <eva4_config_logs>`. These can
  significantly slows down all EVA ICS components.

* Always check logs. In case of BUS queue overflow, the core may get slower,
  external services may be continuously disconnected. Consider increasing queue
  size in :ref:`eva4_config_bus`, increase queue size in services'
  configuration as well (*bus/queue_size*). This helps to cope with high-load
  peaks.

* Use *buf_ttl_sec* properties of database and replication services to send
  events in bulk. Same (*buf_ttl*) can be used for :ref:`HMI web sockets
  <eva4_hmi_ws>`.

* Set *instant_save: false* in :ref:`eva4_config_core`.

* If action history is not required, set *keep-action-history* in
  :ref:`eva4_config_core` to zero to disable it.

* For slow channels, always use compressed bulk events in :doc:`svc/eva-repl`.
  Consider using :doc:`PSRT </psrt/index>` instead of MQTT, as it is designed
  to better deal with slow communications.

* Consider splitting the node and move high-loaded services to other neighbor
  computers.

* Move inventory to an external SQL database (edit :ref:`eva4_config_core` and
  set *inventory_db* path). The inventory must be re-deployed after.

* For heavy-loaded services, use :doc:`local_cluster`.

Crash tests
===========

EVA ICS v4 comes with a :ref:`eva4_watchdog` script bundled, which is started
automatically.

The watchdog watches :doc:`the node core <core>` liveness using its :ref:`test
<eva4_eva.core__test>` method. If the core is not responding, it is
automatically restarted.

To make sure the watchdog works properly in production environment, the core
has got a special method to simulate various kinds of critical crashes:

.. code:: shell

   eva svc call eva.core simulate.crash kind=KIND

where *KIND* can be:

* **error** "test" method starts responding errors with the code -32010
  (function failed)

* **freeze** "test" method freezes itself forever

* **crash** the primary node process crashes by sending *SIGKILL* to itself

* **no** return the node to the normal mode if a crash simulation is active
  (unless the whole process had been crashed)

After any kind of simulated crash, the node watchdog must restart the core
process within the specified interval. The default is 30 seconds, the value can
be customized in :ref:`eva4_watchdog` configuration file.

If the node is not automatically restarted within the specified interval, check
the watchdog configuration or contact your support engineer.

Hardware
========

Thanks to EVA ICS architecture and optimization for modern multi-core CPUs, the
platform can show perfect results even on microcomputers.

According to tests, EVA ICS can show worse performance on industrial and micro
computers if they have:

* small amount of RAM (minimum 128 MB is recommended)
* slow SSD drive or SD card.

We strongly recommend using at least UHS-I SD cards which can show a speed up
to 100 MB/s. For machines small amount of RAM, consider undeploying all
unnecessary services, including the default ones.
