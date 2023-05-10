Real-time threads
*****************

.. contents::

Intro
=====

Linux is not a hard-realtime operating system, however in the most cases its
soft real-time capabilities are enough to cope with the typical automation
tasks, especially if mission-critical controls are moved to low-level dedicated
equipment controllers and PLCs are used for high-level logic only.

In production environments it is recommended to isolate CPUs for input, output
and program threads. It is also recommended to replace the default Linux kernel
with a real-time one (if the used distribution has got a kernel with
RT-PREEMPT or compile it manually), but in the majority of the cases CPU
isolation is much more important.

CPU isolation
=============

To perform CPU isolation, add *isolcpus* option to the Linux kernel.

Consider there are 8 CPUs in the system. To isolate the last one CPU #7 (CPU
ids start from zero), on Debian/Ubuntu systems edit */etc/default/grub*
configuration file and add *isolcpus=7* option into *GRUB_CMDLINE_LINUX*
variable:

.. code:: shell

   GRUB_CMDLINE_LINUX="isolcpus=7"

If the variable contains other options, they can be kept as space-separated. To
isolate more CPUs, put their IDs to the same variable, comma separated (e.g.
*isolcpus=6,7*).

Reboot the system. Now the CPU #7 is isolated from the default system
scheduler.

Thread affinity and priority
============================

Let us manually tune the input, output and program threads of our PLC program:

.. note::

   This operation requires the process to be started under root.

.. code:: shell

   PLC_THREAD_AFFINITY_NAME1=7,50 \
       PLC_THREAD_AFFINITY_NAME2=7,50 \
       PLC_THREAD_AFFINITY_NAME3=7,50 ./myplc

Where *NAME1*, *NAME2*, *NAME3* - PLC thread names with prefixes (e.g. *Pp1*
for *p1* program thread).

All the specified threads are automatically assigned to CPU #7 and share it
using the same priority.

This can be verified by calling

.. code:: shell

    rplc stat myplc

The output should show all the threads assigned to CPU #7 and their priority
(50).
