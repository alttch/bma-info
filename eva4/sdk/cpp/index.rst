C++ SDK
=======

C++ SDK for EVA ICS v4 allows to create custom services in C++. The current
minimum supported C++ standard is C++ 14.

The SDK is a high-level abstraction on top of :doc:`../abi` and requires C++
services to be compiled as shared libraries and launched by
:doc:`../../svc/eva-ffi`.

.. contents::

Resources
=========

* Download the latest version (including common C headers):
  https://pub.bma.ai/eva4/sdk/cpp/

* Source code: https://github.com/eva-ics/eva4/tree/main/bindings/cpp/sdk

Additional documentation
========================

* API reference: https://pub.bma.ai/dev/docs/eva4-cpp-sdk/

* Common constants: https://github.com/eva-ics/eva4/blob/main/bindings/common/eva4-common.h

* FFI constants (ABI): https://github.com/eva-ics/eva4/blob/main/bindings/common/eva4-ffi.h

See also: :doc:`../abi`

Implementing methods
====================

The service MUST implement mandatory and MAY implement optional methods,
required by :doc:`ABI <../abi>`.

The following methods are AUTOMATICALLY implemented by C++ SDK and DO NOT NEED
to be re-implemented manually:

* :ref:`eva4_sdk_abi_eva_svc_set_op_fn`
* :ref:`eva4_sdk_abi_eva_svc_get_result`

Service example
===============

Build
-----

Here is an example how to build the service with G++ for LINUX:

.. code:: shell

   g++ -fPIC -I/opt/eva4/bindings/cpp/sdk -I/opt/eva4/bindings/common \
       -std=c++14 -shared -Wall -Werror -s -O3 -o libsvc.so svc.cpp

Source code
-----------

Here is a simple source code of a service which controls a single :ref:`unit
<eva4_unit>` and collects data from a :ref:`sensor <eva4_sensor>`.

The unit and the sensor are not connected to a real equipment, their states are
stored in service variables. The sensor variable is increased on each worker
iteration.

The unit can respond to actions.

.. literalinclude:: ../../sdk-examples/cpp/svc.cpp
   :language: cpp

Logging
=======

The service should use bus logging when available. If the bus logging is not
available, e.g. a message need to be sent from a function which is called
before the bus is connected, it is highly recommended to flush the output
stream (STDOUT is used for info messages, STDERR for errors) to make sure the
message is put into the node log immediately.

.. code:: cpp

   std::cerr << "something wrong" << std::endl << std::flush;
