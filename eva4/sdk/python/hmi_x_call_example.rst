Extending HMI with X calls in Rust
**********************************

.. contents::

.. include:: ../include/x_call.rst

Service example
===============

Let us create virtual sensors and allow clients to set item data using HTTP RPC
calls to HMI, but for sensors only.

Create a virtual sensor, not assigned to real equipment:

.. code:: shell

    eva item create sensor:tests/sensor1

Here is the service code, guided with comments in "X" call processing section.
For the general information about services structure in Rust, read
:doc:`service_example`:

.. literalinclude:: ../../sdk-examples/python/svc-example-sensor-set/eva-svc-example-sensor-set.py
   :language: python

Service template
================

The following template can be used to quickly create a service instance with
:ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create my.svc.sensor_set svc-tpl.yml

.. literalinclude:: ../../sdk-examples/rust/svc-example-sensor-set/svc-tpl.yml
   :language: yaml

API call example
================

The service responds to the following API calls (`httpie <https://httpie.io>`_
call example):

.. code:: shell

    (
    cat <<EOF
    {
        "jsonrpc": "2.0",
        "id": 1, "method":
        "x::my.svc.sensor_set::set",
        "params": {
            "k": "mykey",
            "i": "sensor:tests/sensor1",
            "status": 1,
            "value": 25
            }
    }
    EOF
    ) | http :7727

If using :doc:`../../../eva-js-framework/index`, the call can be made as:

.. code:: javascript

    $eva.call(
        'x::my.svc.sensor_set::set',
        'sensor:tests/sensor1',
        { status: 1, value: 25 }
    );
