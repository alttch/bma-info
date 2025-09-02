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

    eva item set sensor:sdktest/temp1 20

Creating and debugging services with EVA ICS Python SDK
=======================================================

Starting from Python SDK 0.2.33, it is possible to create and debug services in
more convenient way. The following steps are required to create and debug the
service:

* Deploy a service template on a EVA ICS node, mark the service disabled

* If EVA ICS is running on a remote machine, ensure there is direct access to
  the :ref:`IPC bus <eva4_config_bus>`

Create a service file:

.. code:: shell

   python -m evaics.sdk new myservice

The above command creates a file `myservice.py` in the current directory.

The service can be run locally with the following command:

.. code:: shell

    python -m evaics.sdk run -b BUS_IP:PORT svc_id myservice.py

If EVA ICS is running on a local machine, the parameter `-b` is not required.

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

