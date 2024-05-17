Hardware boxes
**************

A hardware box is a computer (a server or industrial PC), installed by Bohemia Automation engineers.

.. contents::

System information and access
=============================

The system information and access is provided by the box vendor.

Common conditions:

* All boxes are configured with a dynamic IP address (DHCP) by default.

* SSH root access is enabled by default.

* Remote assistance keys are placed into */root/.ssh/authorized_keys*.

Remote assistance VPN
=====================

All boxes are automatically connected to Bohemia Automation remote assistance
VPN. Support engineers can access customer boxes via VPN+SSH.

To disable the remote assistance VPN, execute the following:

.. code:: shell

   systemctl disable openvpn@bma
   systemctl stop openvpn@bma

Optionally, remove the remote assistance keys from
*/root/.ssh/authorized_keys*.

To enable the remote assistance VPN, execute the following:

.. code:: shell

   systemctl enable openvpn@bma
   systemctl start openvpn@bma

If the remote assistance keys have been removed, contact Bohemia Automation
support for details.

Headless configuration
======================

If there are problems accessing a box via SSH, additional system configuration
can be performed using a script. The script should be placed on the box memory
card. If the box has no memory card, the script can be placed on a USB stick.

The script must be named *box-configure* and placed in the root directory of
the storage device. The script is executed with bash and with root privileges
during the system boot.

After the script is placed on the storage device, the box must be rebooted.

.. note::

   It is highly recommended to have UNIX line endings in the script.

Configuring static IP address
-----------------------------

Place the following script named *box-configure* on the storage device:

.. code:: shell

    cat <<EOF > /etc/systemd/network/eth0.network
    [Match]
    Name=eth0

    [Network]
    Address=192.168.1.2/24
    Gateway=192.168.1.1
    DNS=192.168.1.1
    EOF

    systemctl restart systemd-networkd

Replace the IP address, gateway, and DNS with the actual values. Make sure the
network interface name is correct.

Configuring dynamic IP address
------------------------------

Place the following script named *box-configure* on the storage device:

.. code:: shell

    cat <<EOF > /etc/systemd/network/eth0.network
    [Match]
    Name=eth0

    [Network]
    DHCP=yes
    MulticastDNS=yes
    LinkLocalAddressing=fallback

    [DHCPv4]
    ClientIdentifier=mac
    UseHostname=no
    EOF

    systemctl restart systemd-networkd

Make sure the network interface name is correct.

Disabling execution from a USB stick
------------------------------------

Script execution from USB may be insecure in certain configurations. To disable
it, execute the following:

.. code:: shell

   systemctl disable box-configure-usb
