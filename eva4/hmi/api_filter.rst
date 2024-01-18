Filtering HMI API calls
***********************

:doc:`../svc/eva-hmi` service provides custom layer for API call filtering
which can be used by various restriction policies.

Filtering is implemented using a custom :ref:`eva4_lmacro` which checks API
call options and can restrict the current call by returning a non-zero exit
code.

If filtered, the user gets *access denied* (-32002) error with a message
from either *err* or *out* of the execution result payload or the default
message "Denied by API filter".

.. contents::

API methods filtered
====================

The following API methods can be filtered:

* :ref:`eva4_hmi_http__action`
* :ref:`eva4_hmi_http__action.terminate`
* :ref:`eva4_hmi_http__action.toggle`
* :ref:`eva4_hmi_http__action.kill`
* :ref:`eva4_hmi_http__lvar.set`
* :ref:`eva4_hmi_http__lvar.reset`
* :ref:`eva4_hmi_http__lvar.clear`
* :ref:`eva4_hmi_http__lvar.toggle`
* :ref:`eva4_hmi_http__lvar.incr`
* :ref:`eva4_hmi_http__lvar.decr`
* :ref:`eva4_hmi_http__pvt.put`
* :ref:`eva4_hmi_http__bus__TARGET_SVC__METHOD`
* :ref:`eva4_hmi_http__x__TARGET_SVC__METHOD`

Execution arguments
===================

The mapped lmacro is executed with the following keyword arguments:

* **api_call_method** API call method name
* **api_call_params** API call parameters
* **aci** API call info
* **acl** :ref:`ACL <eva4_acl>` of the current session

Example task
============

Consider there is a :ref:`eva4_sensor` *sensor:tests/auto* which is set by PLC
to *1* when the system is working in automated mode.

When the system is in automated mode, we want to refuse HTTP API methods
:ref:`eva4_hmi_http__action` and :ref:`eva4_hmi_http__action.toggle`, unless
called by a user with admin privileges.

Preparing
---------

To enable API call filtering:

* create :ref:`eva4_lmacro`, in this example :doc:`a Python
  macro<../lmacro/py/python_macros>` is used.

.. code:: shell

   eva item create lmacro:tests/filter
   eva item edit lmacro:tests/filter

Make sure :doc:`../svc/eva4-svc-controller-py` is deployed and set lmacro
action service field:

.. code::  yaml

  oid: lmacro:tests/filter
  enabled: true
  action:
    svc: eva.controller.py

Edit the HMI service configuration (*eva svc edit eva.hmi.default*) and set
*api_filter* field to *lmacro:tests/filter*.

The code
--------

Use the following Python code, which should be put into
*/opt/eva4/runtime/xc/py/filter.py* file directly or using *eva edit
xc/py/filter.py* shell command:

.. code:: python

    if api_call_method in ['action', 'action.toggle']:
        mode = value('sensor:tests/auto')
        if mode == 1 and not acl.get('admin'):
            out = 'system in auto mode'
            exit(1)

Note that the code does not throw any exception to make error messages less
complicated.
