Read-only mode for mission-critical systems
*******************************************

Mission-critical systems often require PLC storage to be in read-only mode to
minimize unauthorized modifications, data corruption or drive failures.

.. contents::

Performing general maintenance
==============================

To perform general maintenance operations, such as changing program mode,
flashing or rolling back, the following folders must be re-mounted in
read-write mode until the operation is complete:

* */etc/systemd/system*
* */var/roboplc/program*

This can be performed using the following commands:

.. code:: bash

   sudo mount -o remount,rw / # the mountpoint
   # perform maintenance operation here
   sudo mount -o remount,ro / # the mountpoint

.. note::

   :doc:`./pro` (starting from RoboPLC manager 0.6.2) has got read-only mode
   support out-of-the box and performs required remounts automatically.


Storing PLC data in read-only mode
==================================

To allow PLC store session data, the directory */var/roboplc/data* must be
mounted in read-write mode. This is possible either by moving the data
directory to a dedicated partition or using an additional storage device.

Setting up the system in read-only mode
=======================================

Raspberry Pi OS (Raspbian)
--------------------------

To set up Raspberry Pi OS in read-only mode, follow the steps:

* Flash the Raspberry Pi OS image to the SD card in the usual way.

* Do not eject SD card yet and execute the following on the system where it is
  inserted:

.. code:: bash

   curl https://pub.bma.ai/roboplc/tools/setup-raspbian-readonly-root | \
        sudo bash -x /dev/stdin /dev/XXXX

Replace ``/dev/XXXX`` with the actual device name of your SD card (e.g.
``/dev/sdc``).

The script automatically creates data partition (1024 MB) at the end of the SD
card and resizes the root partition to use the remaining space. To specify
custom data partition size (in megabytes), use the argument: *\--data-size SIZE*

The script also adds `fstab` entries to move certain folders (such as
*/var/log*, */tmp*) to *tmpfs* (RAM disk).

* Boot the Raspberry Pi with the SD card. The system will be mounted in
  read-write mode at first boot to generate required configuration files, ssh
  keys, etc.

* Login and execute the following on the Raspberry Pi:

.. code:: bash

   # disable swap
   sudo dphys-swapfile swapoff
   sudo dphys-swapfile uninstall
   sudo systemctl disable dphys-swapfile

   # install RoboPLC manager
   curl https://pub.bma.ai/apt/setup | sudo sh
   sudo apt-get install roboplc-manager

   # configure /etc/roboplc/manager.toml

   # for RoboPLC pro: set general / readonly_drive = true
   # upload and provide path to RoboPLC pro key

   # optionally: configure DNS server as the network management will be unable to
   # do it itself
   #echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf

   # turn system file systems read only and set the data folder permissions
   sudo chmod 700 /var/roboplc/data
   sudo sed -i -E '/^PARTUUID=/s/(defaults)(,ro)?/\1\2,ro/' /etc/fstab

* Reboot the system to apply read-only mode.
