A simple service in Python
**************************

.. contents::

SDK Installation
================

If EVA ICS v4 venv is already configured (manually or the node is
:doc:`installed <../../install>` with "-a" installer option), Python SDK is
already available on the host.

Otherwise Python virtual environment can be installed with the following
command:

.. code:: shell

    /opt/eva4/sbin/venvmgr build

or, alternatively, SDK can be installed as system-wide:


.. code:: shell

    pip3 install evaics

The task
========

Let us create a simple monitoring service, which monitors temperature sensors
and sends email notifications when temperature is above a threshold.

Preparing the system
====================

* Deploy an instance of :doc:`../../svc/eva-svc-mailer`
* Create a couple of sensors with :ref:`eva4_eva-shell`:

.. code:: shell

    eva item create sensor:sdktest/temp1
    eva item create sensor:sdktest/temp2

In this example, the sensors are not mapped to real equipment, but their state
values can be changed with :ref:`eva4_eva-shell` manually, as the following:

.. code:: shell

    eva item set sensor:sdktest/temp1 1 -v20

Service code
============

Here is the service code, guided with comments. The following example is
created as a single script. To create a dedicated Python module, refer to
Python documentation for more info.

Make sure the file shebang points to the correct Python executable path.

.. literalinclude:: ../../sdk-examples/python/svc-example-temp/eva-svc-example-temp.py
   :language: python

Service template
================

The following template can be used to quickly create a service instance with
:ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create my.svc.alarm_temp svc-tpl.yml

.. literalinclude:: ../../sdk-examples/rust/svc-example-temp/svc-tpl.yml
   :language: yaml
