Wireless equipment
******************

.. contents::

This documentation article explains how to connect wireless equipment (433-Mhz)
to EVA ICS.

Despite being a bit ancient and insecure, 433-Mhz equipment is still popular
and widely used, especially in environmental monitoring.

System preparation
==================

Install `rtl_433 <https://github.com/merbanan/rtl_433>`_ software and insert a
compatible wireless receiver. If the equipment is not supported by rtl_433
out-of-the-box, consider writing a custom decoder.

Decoding signals
================

rtl_433 can send decoded signals to a MQTT server and the standard output in
JSON format. EVA ICS can support both, but for a local receiver it is better to
use the standard output.

Decoded signal example:

.. code:: json

    {"time" : "2024-04-30 21:48:45", "model" : "Nexus-TH", "id" : 173, "channel" : 1, "battery_ok" : 0, "temperature_C" : 23.300, "humidity" : 22}
    {"time" : "2024-04-30 21:48:46", "model" : "LaCrosse-WS3600", "id" : 178, "temperature_C" : 22.800}
    {"time" : "2024-04-30 21:48:46", "model" : "LaCrosse-WS3600", "id" : 178, "humidity" : 38}
    {"time" : "2024-04-30 21:48:53", "model" : "Oregon-THGR122N", "id" : 231, "channel" : 1, "battery_ok" : 1, "temperature_C" : 25.100, "humidity" : 29}
    {"time" : "2024-04-30 21:48:53", "model" : "Oregon-THGR122N", "id" : 231, "channel" : 1, "battery_ok" : 1, "temperature_C" : 25.100, "humidity" : 29}

Service configuration
---------------------

In this example, :doc:`../svc/eva-controller-sr` *update_pipe* feature is used
to pipe the output of rtl_433 and decode it line-by-line.

Use the following service configuration:

.. code:: shell

   eva svc create eva.controller.sr1 /opt/eva4/share/svc-tpl/svc-tpl-controller-sr.yml

.. code:: yaml

   - id: eva.controller.sr1
   params:
     bus:
       path: var/bus.ipc
     command: svc/eva-controller-sr
     config:
       update_pipe:
       # rtl_433 outputs all log messages to STDERR, which are logged by the
       # service as errors. So it is better to redirect STDERR to STDOUT and
       # process the lines manually.
       - command: rtl_433 -F json 2>&1
         process: lmacro:process_rtl433
     user: eva
     workers: 1

Make sure *eva* user has access to the receiver device.

Parsing output
--------------

Let us parse temperature and humidity from the sensor *Oregon-THGR122N* with
id=231 and channel=1. Create the required items in case if auto-creation is not
enabled:

.. code:: shell

   eva item create sensor:env/temp
   eva item create sensor:env/hum

Create a :ref:`eva4_lmacro` to parse the output of rtl_433:

.. code:: shell

   eva item create lmacro:process_rtl433
   eva item edit lmacro:process_rtl433

Set lmacro configuration to the following (:doc:`../svc/eva4-svc-controller-py`
must be deployed on the node):

.. code:: yaml

   action:
     svc: eva.controller.py
   enabled: true
   oid: lmacro:process_rtl433

Edit lmacro code to the following:

.. code:: shell

   eva edit xc/py/process_rtl433.py

.. code:: python

    # The line variable is None when the update_pipe command is exited while
    # the service is still running. Set status of the items to -1 (error)
    if line is None:
        update_state('sensor:outside/temp', dict(status=-1))
        update_state('sensor:outside/hum', dict(status=-1))
    # The line contains a JSON payload
    elif line.startswith('{'):
        import json
        data = json.loads(line)
        # make sure the data is from the specific sensor
        if data.get('model') == 'Oregon-THGR122N' and data.get(
                'channel') == 1 and data.get('id') == 231:
            temp = data.get('temperature_C')
            hum = data.get('humidity')
            # set the values to the items
            update_state('sensor:env/temp', dict(value=temp))
            update_state('sensor:env/hum', dict(value=hum))
    else:
        # the line contains something else, output it (it will be logged with
        # INFO level)
        print(line)

After the receiver receives a signal, the sensors are updated:

.. code:: shell

   eva item state "sensor:outside/#"

.. code::

   oid              status  value
   ------------------------------
   sensor:env/hum        1   54.2
   sensor:env/temp       1    5.0

The same approach can be used for any plain-protocol wireless equipment,
including custom devices.
