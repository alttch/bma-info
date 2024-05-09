Python Logic Macros
*******************

Requires: :doc:`../../svc/eva4-svc-controller-py`.

A Python macro is a file, located by default in the folder *xc/py/* (the
symlink to *runtime/xc/py*) under the name <macro_id>.py, e.g. *test.py* for
*lmacro:my_macros/test*.  Macro id must be unique within the single EVA ICS
node, OID - within the whole installation.

Additionally, each macro is automatically appended with *common.py* file
located in the same folder enabling to quickly assign common functions to
several macros without using modules.

Macros are compiled into byte-code each time after macros file or **common.py**
file are changed. Compilation or execution errors can be viewed in the log
files of the controller.

.. contents::

Executing macros
================

To execute a macro, set action executor service for it:

.. code:: yaml

    action:
      svc: eva.controller.py
    enabled: true
    oid: lmacro:test/m1

After, a macro can be started using :ref:`eva4_eva-shell` *action run* command,
:ref:`eva.core::run<eva4_eva.core__run>` bus method, by another service, or by
request from a remote node.

Common principles of macros operation
=====================================

Macros are launched simultaneously: the controller does not wait for the
completion of the macro and launches its next copy or another macro in
parallel. If the only one copy of macro is allowed to  operate at the certain
point of time or to block execution of other macros, use macro
:ref:`lock<eva4_py_macro_api_lock>` and :ref:`unlock<eva4_py_macro_api_unlock>`
functions.

The controller architecture does not provide the possibility to stop macro from
outside, that is why macros should have minimum internal logic and cycles.
These ones should be implemented by another services.

As EVA ICS allows to run multiple Python macro controller instances, take in
account that the default shared variables are not acceptable within different
controllers, use lvars or 3rd party service instead.

.. warning::

    In EVA ICS v4 all Python macro functions require OIDs only. Mean, e.g.
    reset("my/lvar") is no longer accepted, use reset("lvar:my/var") instead.
    
System macros
=============

On startup
----------

If exists, a macro from the **autoexec.py** file is launched automatically at
the controller startup. This macro is not always the first one executed, as far
as some service may call other macros before.

Example of **autoexec** macro usage:

.. code-block:: python

    # both cycle timers are expired
    if is_expired('lvar:timers/timer1') and is_expired('lvar:timers/timer2'):
        # launch the first cycle process
        action('lvar:pumps/pump1', on)
        # start the first cycle timer
        reset('lvar:timers/timer1')

On shutdown
-----------

If exists, a macro from the **shutdown.py** file is launched automatically at
the controller shutdown. This macro can, for example, gracefully stop some
processes and set/reset required lvars.

Macros and security
===================

As all Python features are available for macros, including execution of
external programs or working with any local files, the code of macros should be
edited only by system administrator.

If access permissions to individual macros are configured via ACLs, the
following must be taken into account: if a macro runs other macros using
:ref:`run<eva4_py_macro_api_run>` function or executes a unit action/sets lvars
etc., these tasks can be executed even if the ACL allows to run only the
initial macro.

Macros built-ins
================

Macros can execute any Python functions or use Python modules installed on the
local server. In addition, macros have a set of built-in functions and
variables.

Built-in functions are included for quick access to the most frequently used
EVA ICS functions.

Built-in exceptions
===================

The following additional exceptions are available:

* **FunctionFailed**
* **ResourceAlreadyExists** (alias: **ResourceBusy**)
* **ResourceNotFound**
* **AccessDenied**
* **InvalidParameter**

Variables
=========

Macros have the following built-in variables:

* **on** alias to integer *1*
* **off** alias to integer *0*
* **yes** alias to boolean *True*
* **no** alias to boolean *False*

* **_polldelay** controller poll delay
* **_timeout** controller default timeout
* **args** array list of arguments the macro is being executed with
* **kwargs** dict of keyword arguments the macro is being executed with
* **_0** current macro id (i.e. *'test'*)
* **_00** current macro full id (i.e. *'group1/test'*)
* **_1, _2, ... _9** first 9 arguments the macro is being executed with
* **out** macro may use this variable to output the data which will be set to
  **out** field of the execution result
* **is_shutdown** contains a function which returns *True* if macro caller got
  a core shutdown

* **aci**/**acl** if called by a user, contains the user's API call info and
  ACL

.. include:: python_macros_api.rst
