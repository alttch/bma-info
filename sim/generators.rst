Data generators
***************

Starting from the version 1.0.1 Virtual Fieldbus simulator does not provide
built-in data generators. Consider using EVA ICS v4
:doc:`../eva4/svc/eva-svc-generator` service instead.

:doc:`modbus/sensor` and :doc:`ads/service` instances support *var.set* EAPI
method which can be used as a generator target:

.. code:: shell

   targets:
   - sim.modbus1.sensor1
   - sim.ads1.service1@MAIN.var1
