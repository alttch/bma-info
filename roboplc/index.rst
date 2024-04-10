RoboPLC
*******

.. image:: ./roboplcline_.png
   :width: 220px
   :class: no-scaled-link
   :align: right

`RoboPLC <https://www.bohemia-automation.com/software/roboplc/>`_ is a
framework and tools for creating both PLC (Programmable Logic Controller) and
robotic real-time Linux applications in Rust.

RoboPLC is a successor of :doc:`../rplc/index` project and continues our
evolution of Rust-based controller programming.

* Completely Rust-way (everything is done with procedural macros)

* Fully modular architecture. The framework components can be used both
  together and separately.

* Convenient, easy to use API.

* RoboPLC perfectly plays together with :doc:`EVA ICS v4 <../eva4/index>`.

* RoboPLC programs are created for Linux only, work in *std* mode and use
  real-time capabilities of the Linux kernel.

See also:

* `RoboPLC API documentation <https://docs.rs/roboplc>`_

* `EVA ICS plugin for Visual Studio Code
  <https://marketplace.visualstudio.com/items?itemName=bohemia-automation.evaics>`_
  - for quick import of :doc:`EVA ICS data objects <../eva4/dobj>`.

* `RoboPLC GitHub repository <https://github.com/eva-ics/roboplc>`_

* `RoboPLC examples <https://github.com/eva-ics/roboplc/tree/main/examples>`_

.. toctree::
   :caption: RoboPLC documentation
   :maxdepth: 1

   quickstart
   config
   flashing
   license
   manager_license
