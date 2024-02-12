Pub/Sub (MQTT) controller gateway
*********************************

.. contents::

.. include:: ../include/pubsub.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-pubsub.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-pubsub.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.pubsub1 /opt/eva4/share/svc-tpl/svc-tpl-controller-pubsub.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.pubsub__pubsub.publish:

pubsub.publish
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Publish data to a pub/sub server topic*
   * - Parameters
     - required
   * - Returns
     - *nothing*

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **topic**
     - String
     - Server topic
     - **yes**
   * - **payload**
     - Any
     - Data payload
     - **yes**
   * - **qos**
     - i32
     - Operation QoS
     - no
   * - **packer**
     - String
     - Data packer: no, json, msgpack (default: no, send data as-is)
     - no
