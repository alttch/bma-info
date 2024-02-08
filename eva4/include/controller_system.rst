The service provides tools to monitor system parameters of local and remote
machines.

Collected data can be used later for custom alerts, dashboards, analytics etc.

Monitoring
==========

After setup, the service creates sensors for various system parameters. Reports
are sent by provider modules, which can be flexibly configured in the service
configuration.

.. note:: 

   If a system metric contains symbols, disallowed in EVA ICS v4 :ref:`OIDs
   <eva4_oid>`, these symbols are replaced with triple underscores ("___").

System
------

The system provider creates sensors in a sub-group "os", which display OS
version, kernel version, CPU architecture etc. as well as system uptime.

CPU
---

The cpu provider creates a sub-group "cpu" and displays CPU usage and frequency
for every CPU core in the system. The list of CPUs is auto-generated.

Load average
------------

The load average provider creates a sub-group "load_avg" and displays system
load averages for 1, 5 and 15 seconds (UNIX/Linux standard).

Memory
------

The memory provider creates sub-groups "ram" and "swap" and displays memory and
swap information.

Disks
-----

The disk provider creates a sub-group "disk" and displays information about
mount points.

The list of mount points is detected automatically. When a mount point is
removed, the monitoring is stopped. This behaviour can be changed if the list
is specified in the service configuration:

* only specific mount points are monitored

* if there is no mount point found, its sensors' status becomes -1 (ERROR)

Mount point sensors are specified without leading slashes. For system root in
Linux/UNIX systems, sensors are created in a sub-group called "SYSTEM_ROOT".

Network
-------

The network provider creates a sub-group "network" and displays information
about network interfaces.

The list of interfaces is detected automatically. When an interface is removed,
the monitoring is stopped. This behaviour can be changed if the list is
specified in the service configuration:

* only specific interfaces are monitored

* if there is no interface found, its sensors' status becomes -1 (ERROR)

Explanation for certain sensors:

* **rx** received (incoming) packets during the last second
* **rx_total** total number of received packets
* **rx_err** received packet errors during the last second
* **rx_err_total** total number of received packet errors 
* **rxb** received bytes during the last second
* **rxb_total** total number of received bytes

The same abbreviations apply for transmitted (outgoing) packets. These sensors
start with *tx_* prefix.
