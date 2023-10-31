Storing user data
*****************

:doc:`../svc/eva-hmi` instances have got built-in key-value storage to keep
persistent user data, such as settings, profile information etc. 

The data is stored in HMI database (see the service instance configuration).
Data values may contain any serializable object (strings, numbers, structures,
arrays etc.)

Working with user data
======================

Settings user data
------------------

A HMI application can set data field for the current logged in user using HTTP
API method :ref:`eva4_hmi_http__user_data.set`.

Getting user data
-----------------

A HMI application can get data for the current logged in user using HTTP API
method :ref:`eva4_hmi_http__user_data.get`.

Other services can get user data using :doc:`../eapi` method
:ref:`eva4_eva.hmi.default__user_data.get` of HMI service instance.

Deleting user data
------------------

A HMI application can delete data field for the current logged in user using
HTTP API method :ref:`eva4_hmi_http__user_data.delete`.

Setting limits
==============

The service configuration has got *user_data* field with the following
sub-fields:

.. code:: yaml

    user_data:
      max_records: 100
      max_record_length: 16384

Where

* **max_records** maximum number of data records a user can have
* **max_record_length** maximum JSON-serialized length of a single record

To disable user data functionality, either set limits to zeroes or remove the
field from the service configuration completely.
