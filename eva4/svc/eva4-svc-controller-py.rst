Python macros controller
************************

.. contents::

Executor controller service for Python macros. See :doc:`../lmacro/py/python_macros`.

Installing/updating
===================

Python macros controller is not included into EVA ICS distribution. To install/update it,
either edit "eva/config/python-venv" :doc:`registry<../registry>` key, specify
the desired version in "extra" section (e.g. *eva4-controller-py>=0.0.1*) and rebuild the
Python virtual environment (*/opt/eva4/sbin/venvmgr build*). Or execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr add eva4-controller-py
    # or 
    /opt/eva4/sbin/venvmgr add eva4-controller-py==N # where N = version number

The latest eva-shell version number can be obtained from
https://pypi.org/project/eva4-controller-py/

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-controller-py.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-controller-py.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.py /opt/eva4/share/svc-tpl/svc-tpl-controller-py.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.py__run:

run
---

.. list-table::
   :header-rows: 0

   * - Description
     - *Executes a mapped macro action*
   * - Parameters
     - See :ref:`eva4_macro_action`
   * - Returns
     - See :ref:`eva4_macro_action`
