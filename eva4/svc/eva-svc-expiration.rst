Item state expiration service
*****************************

.. contents::

Marks items as expired/error.

Useful to create lvar timers (timers have status -1 when expired) or set
error item states (items get status=1 if not updated for a long time, e.g.
because of a data puller service crash).


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-expiration.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-expiration.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.svc.exp1 /opt/eva4/share/svc-tpl/svc-tpl-expiration.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)

