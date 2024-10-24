Compatible hardware
*******************

RoboPLC can work on any big or embedded board/computer with a Linux operating
system. It is highly recommended to use 64-bit distributions, as the 32-bit
versions are not officially supported.

We recommend modern ARM boards, which are known to have minimal latency and are
good for real-time applications.

The following hardware is known to work with RoboPLC (tested in Bohemia
Automation labs):

=======================  ====================================================
Board                    Notes
=======================  ====================================================
Odroid N2                eMMC IRQs can block real-time tasks in certain cases
Orange Pi 5              CSI IRQs 81/82 can block real-time tasks
Raspberry Pi 4        
Raspberry Pi 5
Raspberry Pi Zero 2 W
UniPi Axon series        EOL
UniPi Neuron series      Raspberry Pi 4-based
RevPi Connect            Raspberry Pi 4/4S-based
=======================  ====================================================

Have a board working or having issues? `Please let us know!
<https://github.com/roboplc/roboplc/issues>`_
