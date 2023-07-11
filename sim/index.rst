Virtual Fieldbus Simulator
**************************

Virtual Fieldbus Simulator is a pack of services which can run a virtual
fieldbus on any :doc:`EVA ICS v4<../eva4/index>` node.

The source code is available at https://github.com/eva-ics/sim

Currently Virtual Fieldbus Simulator supports Modbus simulation only.

EVA ICS can run both Virtual Fieldbus Simulator and SCADA services on the same
machine, however there are no internal bus method for SCADA services to
synchronize data with fieldbus.

To connect to a virtual fieldbus, the standard services must be used (e.g. for
Modbus: :doc:`../eva4/svc/eva-controller-modbus`) as any software acts with
virtual fieldbus as with a real one.

.. toctree::
    :caption: Virtual Fieldbus Simulator documentation
    :maxdepth: 1

    install
    modbus/index
