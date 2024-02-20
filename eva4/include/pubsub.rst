Allows to communicate with Pub/Sub (MQTT, PSRT) equipment and 3rd party
platforms.

Blocks
======

Block kinds
-----------

The controller supports 3 kinds of blocks:

* **input** are used to set EVA ICS :doc:`item <../items>` states and execute
  local actions with pub/sub messages.

* **output** are used to export EVA ICS item states and static payloads.

* **action_map** are used to map EVA ICS actions. When an action is executed,
  the mapped payload is sent to a pub/sub server topic.

Parsing/creating payloads
-------------------------

Payloads are parsed/created with `JSONPath <https://jsonpath.com>`_ lightweight
implementation:

* $. block root (the default path value, can be omitted)

* $.[0] first element if the root block is an array

* $.name - block field "name"

* $.name.value - block field "name", subfield "value"

* $.name[0] - the first element of block field "name" if the field is an array

Array ranges are not supported. If a payload or its part is created as an array
and no elements are set before the value index, their values are set to *null*.

Payloads can be packed/unpacked as JSON (*json*), `MessagePack
<https://msgpack.org/>`_ (*msgpack*) or as-is for strings/numbers (*no*, the
default one).

See all the available parameters in the deployment template comments.

Input
~~~~~

For example, the remote sends data packed with JSON to a topic "lab/env" in the
following format:

.. code:: json

   {
      "device": {
          "deviceStatus": "OK",
          "data": {
              "temp": {
                  "deviceKind": "temperature sensor",
                  "deviceValue": 25
              },
              "hum": {
                  "deviceKind": "humidity sensor",
                  "deviceValue": 50
              }
          }
      }
   }

where *deviceStatus* can be "OK" or "ERROR". Let us map the payload to a local
*sensor:env/temp* and *sensor:env/hum* where *deviceStatus* goes to the item
status and *deviceValue* goes to the item value.

.. code:: yaml

   input:
     - topic: lab/env
       packer: json
       map:
         - path: $.device.deviceStatus
           value_map:
            "OK": 1
            "ERROR": -1
           oid: sensor:env/temp
           process: status
         - path: $.device.data.temp.deviceValue
           oid: sensor:env/temp
           #process: value # the default, can be omitted
         - path: $.device.deviceStatus
           value_map:
            "OK": 1
            "ERROR": -1
           oid: sensor:env/hum
           process: status
         - path: $.device.data.hum.deviceValue
           oid: sensor:env/hum

Output
~~~~~~

Output payloads are sent in two cases:

* if there is at least one item OID in the payload, it is sent as soon as the
  item state has been changed, unless *ignore_events* is set to *true*

* if there is an *interval* property set, the payload is sent with the
  specified interval (seconds)

Let us repeat the presented task but opposite, sending the payload when a local
state is changed and additionally every 5 seconds:

.. code:: yaml

   output:
     - topic: lab/env
       interval: 5
       packer: json
       map:
         # as the equipment is a single physical sensor, the status register
         # can be got from any item mapped
         - path: $.device.deviceStatus
           value_map:
            "1": "OK"
            "-1": "ERROR"
           oid: sensor:env/temp
           prop: status
         - path: $.device.data.temp.deviceValue
           oid: sensor:env/temp
           #prop: value # the default, can be omitted
         - path: $.device.data.temp.deviceKind
           payload: "temperature sensor"
         - path: $.device.data.hum.deviceValue
           oid: sensor:env/hum
         - path: $.device.data.hum.deviceKind
           payload: "humidity sensor"

.. note::

   Some platforms/devices require pub/sub announcements (e.g. equipment info)
   without an actual state. For such cases, regular output blocks, which
   contain no *oid* but *payload* only data can be used.

Action maps
~~~~~~~~~~~

Action maps are equal to output blocks with the following exception: if neither
*oid* nor *prop* is specified in a mapping block, the action value is inserted.

Extra topics
~~~~~~~~~~~~

Extra topics can be processed with :ref:`eva4_lmacro`. See configuration
options for more details.

The target lmacro gets the following keyword arguments:

* **pubsub_topic** message topic

* **pubsub_payload** message payload

.. note::

   The process lmacro always gets message paylaods as-is. JSON and other
   serialized data SHOULD be deserialized manually.

Extra outgoing payloads can be sent using EAPI bus call
:ref:`eva4_eva.controller.pubsub__pubsub.publish` to the service instance.
