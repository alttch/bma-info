System preparation
******************

.. contents::

Install Python modules
======================

Install the required Python modules

.. code:: shell

   pip3 install tensorflow pandas scikit-learn

Create OID mapping
==================

Let us create a file named *params_alarm.csv* to perform ML kit requests more
comfortable:

.. code::

   oid,value
   sensor:plant1/pwr,pwr
   sensor:plant1/temp,temp
   sensor:plant1/alarm,alarm

