Inverted states
***************

.. contents::

When dealing with some hardware equipment (e.g. normally closed relays), it is
required to collect and send states in inverted way, physically sending "1" for
"0" and vice-versa.

.. figure:: ../schemas/nc-relay.png
    :width: 440px
    :alt: NC-relay

    NC-relay. Light turns OFF when relay turns ON

Majority of EVA ICS controllers and gateway services support inverted state
transformation for both status and value using **transform** directive in
configs.

In example, let us deal with a normal-closed relay, connected via
:doc:`../svc/eva-controller-modbus`, which has its state mapped on coil #0 and
EVA ICS :doc:`item <../items>` mapping as *unit:block1/relay0*. The unit
*status* field must show the physical relay status (on = 1, off = 0), the value
field is not used.

Pulling data
============

Let us write *pull* section of the service config:

.. code:: yaml

    # ...
    pull:
      - reg: c0
        count: 1
        unit: 1
        map:
          - offset: 0
            oid: unit:block1/relay0
            prop: status
            transform:
              - func: invert # <<
    # ...

The above transform block tells the controller to report unit status as "1"
when the coil is off and "0" when it is on.

The same approach can be used with registers and bits. Note: if a register
value differs from 0/1, *invert* works in the following way:

=======  ========
reg.val  reported
=======  ========
0        1
ANY      0
=======  ========

Actions
=======

The same approach is for :ref:`eva4_unit` actions. If EVA ICS action needs to
set unit status to "1", the coil must receive "0" and be set off to let the
circuit be closed and make the relay port online. While, when the port needs to
be offline, the coil must receive "1" and be set on to break the circuit.

All is necessary to do is to put the same transform section in action map:

.. code:: yaml

    # ...
    action_map:
      unit:block1/relay0:
        status:
          reg: c0
          unit: 1
          transform:
            - func: invert # <<
    # ...

