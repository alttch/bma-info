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
