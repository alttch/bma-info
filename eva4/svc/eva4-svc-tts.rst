Text-to-speech service
**********************

.. contents::

Allows to use text-to-speech functions via the local bus

Installing/updating
===================

Text-to-speech service is not included into EVA ICS distribution. To install/update it,
either edit "eva/config/python-venv" :doc:`registry<../registry>` key, specify
the desired version in "extra" section (e.g. *eva4-svc-tts>=0.0.1*) and rebuild the
Python virtual environment (*/opt/eva4/sbin/venvmgr build*). Or execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr add eva4-svc-tts
    # or 
    /opt/eva4/sbin/venvmgr add eva4-svc-tts==N # where N = version number

The latest eva-shell version number can be obtained from
https://pypi.org/project/eva4-svc-tts/

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-tts.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-tts.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.svc.tts.PROVIDER /opt/eva4/share/svc-tpl/svc-tpl-tts.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.svc.tts.PROVIDER__say:

say
---

.. list-table::
   :header-rows: 0

   * - Description
     - *Says a word or a phrase*
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
   * - **text**
     - String
     - Text to say
     - **yes**
   * - **other params**
     - Any
     - Sent as-is to https://github.com/alttch/ttsbroker/ engine say fn
     - no
