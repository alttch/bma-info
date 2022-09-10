Mirror service
**************

.. contents::

Allows to host mirror for the current version of EVA ICS distribution and
Python modules if venv is configured.

Updating mirror files on the source node
========================================

.. note::

    The files must be updated every time the source node is updated to a
    new version/build.

Use either :ref:`eva4_eva-shell`:

.. code:: shell

  eva mirror update

or :ref:`eva4_eva-cloud-manager-cli`:

.. code:: shell

  /opt/eva4/bin/eva-cloud-manager node mirror-update

Configuring mirror on target nodes
==================================

Use either :ref:`eva4_eva-shell`:

.. code:: shell

  eva mirror set <URL>

or :ref:`eva4_eva-cloud-manager-cli`:

.. code:: shell

  /opt/eva4/bin/eva-cloud-manager node mirror-set <URL>


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-mirror.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-mirror.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.svc.mirror /opt/eva4/share/svc-tpl/svc-tpl-mirror.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)

