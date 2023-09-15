Docker Application launcher
***************************

.. contents::

.. include:: ../include/dapp.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-dapp.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-dapp.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create dapp.NAME /opt/eva4/share/svc-tpl/svc-tpl-dapp.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.
