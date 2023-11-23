..
  AUTO-GENERATED, DO NOT MODIFY

Thermometer
***********

.. contents::

React component. Provides a termometer visualization component.

If showValue parameter is used, the component additionally accepts all
parameters of :doc:`itemvalue`.


Example
=======

.. image:: images/thermometer.png
    :width: 100

.. literalinclude:: include/examples/thermometer.tsx
   :language: react

Parameters
===========

.. list-table::
   :header-rows: 1

   * - name
     - type
     - required
     - description
   * - minValue
     - number
     - **yes**
     - Minimum value
   * - maxValue
     - number
     - **yes**
     - Maximum value
   * - oid
     - string
     - no
     - item OID
   * - state
     - ItemState
     - no
     - item state
   * - label
     - string
     - no
     - Bottom label
   * - showValue
     - boolean
     - no
     - Display item value
   * - warnValue
     - number
     - no
     - Thermometer warning upper threshold
   * - critValue
     - number
     - no
     - Thermometer critical upper threshold
   * - lowWarnValue
     - number
     - no
     - Thermometer warning lower threshold
   * - lowCritValue
     - number
     - no
     - Thermometer critical lower threshold
   * - showMinMax
     - number
     - no
     - Show min/max tick labels
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
   * - .eva-thermometer-container
     - the primary container
   * - .eva-thermometer-progress-container
     - the bar container
   * - .eva-thermometer-seperator
     - bar separator ticks
   * - .eva-thermometer-min-value
     - min. value tick label
   * - .eva-thermometer-max-value
     - max. value tick label
   * - .eva-thermometer-values-container
     - label/value container
   * - .eva-thermometer-label
     - label class
   * - .eva-thermometer-progress-color
     - the default bar color
   * - .eva-thermometer-warning-progress-color
     - warning color
   * - .eva-thermometer-critical-progress-color
     - critical color

CSS Example
===========

.. literalinclude:: include/examples/thermometer.css
   :language: css

