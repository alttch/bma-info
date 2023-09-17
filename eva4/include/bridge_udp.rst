The service provides UDP bridges between EVA ICS IPC bus and 3rd-party
applications.

The payload format can be chosen between JSON (default) and MessagePack.

.. _eva4_bridge_udp_out:

Outgoing payload
================

Bus events are sent via UDP packets as-is (see :ref:`EAPI Core events
<eva4_eapi_core_events>`) with an additional "oid" field.

.. _eva4_bridge_udp_in:

Incoming payload
================

3rd-party applications can execute any bus methods via RPC payload which has
the following fields:

* **method** method to be executed

* **params** method parameters, optional

* **target** target service, optional (the default is :doc:`eva.core
  <../core>`)

E.g. the following payload executes unit toggle action via the node core EAPI
RPC:

.. code:: json

    {
        "method": "action.toggle",
        "params": {
            "i": "unit:tests/fan"
            }
    }
