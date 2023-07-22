..
  AUTO-GENERATED, DO NOT MODIFY

ControlButtonValue
******************

.. contents::

React component. Unit action value input and apply button (see :ref:`eva4_hmi_http__action`)

Example
=======

.. image:: images/controlbuttonvalue.png
    :width: 220

.. literalinclude:: include/examples/controlbuttonvalue.tsx
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
     - Unit OID
   * - label
     - string
     - no
     - Button label
   * - css_class
     - string
     - no
     - custom button css class
   * - input_size
     - number
     - no
     - value input size
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
   * - div.eva.button.container.value.CSS_CLASS
     - primary button container
   * - input.eva.button.value.CSS_CLASS
     - value input
   * - div.eva.button.input.label.CSS_CLASS
     - text label
   * - button.eva.button.input.apply.CSS_CLASS
     - apply button

