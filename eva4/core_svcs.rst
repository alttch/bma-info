The core and services
*********************

EVA ICS v4 provides a powerful core, which holds :doc:`item <items>`
inventory and routes actions. Each EVA ICS node has got the own core instance.

Node functionality can be extended with services - small processes which are
launched by core launchers, interact with the core and each other via the local
ultra-fast IPC bus and extend functionality of EVA ICS nodes.

.. contents::

.. include:: include/autogen/core_svcs_toc.rst

V4 Core
=======

See :doc:`core`

The default services
====================

The default services are either bundled into EVA ICS (Rust services) or
provided as separate modules (e.g. Python services).

More services can be found in `service contribution repository
<https://github.com/eva-ics/eva4/tree/main/contrib>`_, provided by integrators
or developed using :doc:`sdk/index`.

.. include:: include/autogen/default_svcs.rst
