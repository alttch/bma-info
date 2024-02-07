System controller
*****************

.. contents::

.. include:: ../include/controller_system.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-system.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-system.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.system /opt/eva4/share/svc-tpl/svc-tpl-controller-system.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


.. include:: ../include/controller_system_xtra.rst

