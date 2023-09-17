Bus UDP bridge
**************

.. contents::

.. include:: ../include/bridge_udp.rst


Installing/updating
===================

Bus UDP bridge is not included into EVA ICS distribution. To install/update it,
either edit "eva/config/python-venv" :doc:`registry<../registry>` key, specify
the desired version in "extra" section (e.g. *eva4-bridge-udp>=0.0.1*) and rebuild the
Python virtual environment (*/opt/eva4/sbin/venvmgr build*). Or execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr add eva4-bridge-udp
    # or 
    /opt/eva4/sbin/venvmgr add eva4-bridge-udp==N # where N = version number

The latest eva-shell version number can be obtained from
https://pypi.org/project/eva4-bridge-udp/

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-bridge-udp.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-bridge-udp.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.bridge.udp1 /opt/eva4/share/svc-tpl/svc-tpl-bridge-udp.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.
