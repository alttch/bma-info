Machine learning: regressions
*****************************

EVA ICS Machine Learning kit data frames can be used for various data analysis.
In this example linear regression with ML kit and TensorFlow is explained as it
can be applied to a real IoT case.

.. note::

    Linear regression is a linear approach for modelling the relationship
    between a scalar response and one or more explanatory variables.

.. raw:: html

    <h2>The task</h2>

Consider there is a EVA ICS node with sensors: temperature, power meter and
alarm. There is a prediction that the sensors are connected somehow, possibly
the alarm is triggered when the temperature is higher than approx 20-22C and
power consumption is higher than 50 kW, but we are not sure about it.

The goal is to train AI model to:

* determine relationship between the sensors

* predict alarms approx. 60 minutes before they actually happen

Sensor mapping:

* **sensor:plant1/pwr** - the power consumption sensor (kW)

* **sensor:plant1/temp** - the temperature sensor (°C)

* **sensor:plant1/alarm** - the alarm sensor. Let us use in this example 0 - no
  alarm and 100 - alarm triggered to make chart visualizations better

.. toctree::
    :caption: Linear regression example
    :maxdepth: 1

    prepare
    training

