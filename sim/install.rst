Installation
************

.. contents::

Virtual Fieldbus Simulator can be installed free of charge to any EVA ICS node.

The pack supports both x86-64 and 64-bit ARM Linux systems.

Preparing the system
====================

Install :doc:`EVA ICS v4 <../eva4/install>`.

Downloading/updating
====================

Execute the following command:

.. code:: shell

   curl https://pub.bma.ai/sim/install | sh

The script installs service binaries and service templates into /opt/eva4/sim/
folder. To customize the target path, execute installer as the following:

.. code:: shell

    curl https://pub.bma.ai/sim/install | TARGET_DIR=/path/to/folder sh

To update, run the installation command again. The pack services will be
replaced with the actual versions.
