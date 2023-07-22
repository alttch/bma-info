..
  AUTO-GENERATED, DO NOT MODIFY

ControlButtonRun
****************

.. contents::

React component. Executes a logical macro (see :ref:`eva4_hmi_http__run`)

Example
=======

.. image:: images/controlbuttonrun.png
    :width: 100

.. literalinclude:: include/examples/controlbuttonrun.tsx
   :language: react

Parameters
===========

.. list-table::
   :header-rows: 1

   * - name
     - type
     - required
     - description
   * - oid
     - string
     - **yes**
     - Lmacro OID
   * - params
     - object
     - no
     - additional call parameters (lmacro arguments)
   * - label
     - string
     - no
     - Button label
   * - busy
     - string
     - no
     - Item OID to get busy status from
   * - css_class
     - string
     - no
     - custom button css class
   * - on_success
     - (result: ActionResult) => void
     - no
     - called on action success
   * - on_fail
     - (err: EvaError) => void
     - no
     - called on action fail
   * - engine
     - Eva
     - no
     - WebEngine object (if no default set)

CSS classes
===========

.. list-table::
   :header-rows: 1

   * - name
     - description
   * - div.eva.button.container.run.CSS_CLASS
     - primary button container
   * - button.eva.button.run.CSS_CLASS
     - run button

