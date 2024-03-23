Data objects I/O controller
***************************

.. contents::

Allows to accept :doc:`data objects <../dobj>` as raw UDP packets from
various 3rd party sources such as Matlab, LabView, other data modelling
software as well as from compatible hardware.


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-dobj.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-dobj.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.dobj /opt/eva4/share/svc-tpl/svc-tpl-controller-dobj.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)

