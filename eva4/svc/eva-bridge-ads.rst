TwinCAT ADS bridge
******************

.. contents::

ADS to BUS/RT bridge, required for :doc:`../svc/eva-controller-ads` instances.

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-bridge-ads.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-bridge-ads.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.bridge.ads1 /opt/eva4/share/svc-tpl/svc-tpl-bridge-ads.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.bridge.ads__ping:

ping
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Ping ADS device*
   * - Parameters
     - required
   * - Returns
     - current ADS state

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **net_id**
     - String/[u8; 6]
     - Device AMS Net ID
     - **yes**
   * - **port**
     - u16
     - Device AMS Port
     - **yes**


*Return payload example:*

.. code:: json

  {
    "state": 5
  }
  

.. _eva4_eva.bridge.ads__read:

read
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Call ADS read request*
   * - Parameters
     - required
   * - Returns
     - Vec<u8>

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **net_id**
     - String/[u8; 6]
     - Device AMS Net ID
     - **yes**
   * - **port**
     - u16
     - Device AMS Port
     - **yes**
   * - **index_group**
     - u32
     - Index group
     - **yes**
   * - **index_offset**
     - u32
     - Index offset
     - **yes**
   * - **size**
     - u32
     - Expected result size
     - **yes**

.. _eva4_eva.bridge.ads__su_read:

su_read
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Call ADS SUMUP read request*
   * - Parameters
     - required
   * - Returns
     - SumUp result as Vec<Res> with fields c (code), d (bytes)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **net_id**
     - String/[u8; 6]
     - Device AMS Net ID
     - **yes**
   * - **port**
     - u16
     - Device AMS Port
     - **yes**
   * - **requests**
     - Vec<ReadRequest>
     - Struct fields: index_group, index_offset, size
     - **yes**

.. _eva4_eva.bridge.ads__su_write:

su_write
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Call ADS SUMUP write request*
   * - Parameters
     - required
   * - Returns
     - SumUp result as Vec<Res> with fields c (code)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **net_id**
     - String/[u8; 6]
     - Device AMS Net ID
     - **yes**
   * - **port**
     - u16
     - Device AMS Port
     - **yes**
   * - **requests**
     - Vec<WriteRequest>
     - Struct fields: index_group, index_offset, data
     - **yes**

.. _eva4_eva.bridge.ads__su_write_read:

su_write_read
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Call ADS SUMUP write-read request*
   * - Parameters
     - required
   * - Returns
     - SumUp result as Vec<Res> with fields c (code), d (bytes)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **net_id**
     - String/[u8; 6]
     - Device AMS Net ID
     - **yes**
   * - **port**
     - u16
     - Device AMS Port
     - **yes**
   * - **requests**
     - Vec<WriteReadRequest>
     - Struct fields: index_group, index_offset, data, size
     - **yes**

.. _eva4_eva.bridge.ads__write:

write
-----

.. list-table::
   :header-rows: 0

   * - Description
     - *Call ADS write request*
   * - Parameters
     - required
   * - Returns
     - *nothing*

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **net_id**
     - String/[u8; 6]
     - Device AMS Net ID
     - **yes**
   * - **port**
     - u16
     - Device AMS Port
     - **yes**
   * - **index_group**
     - u32
     - Index group
     - **yes**
   * - **index_offset**
     - u32
     - Index offset
     - **yes**
   * - **data**
     - bytes
     - Write payload
     - **yes**

.. _eva4_eva.bridge.ads__write_read:

write_read
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Call ADS write-read request*
   * - Parameters
     - required
   * - Returns
     - Vec<u8>

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **net_id**
     - String/[u8; 6]
     - Device AMS Net ID
     - **yes**
   * - **port**
     - u16
     - Device AMS Port
     - **yes**
   * - **index_group**
     - u32
     - Index group
     - **yes**
   * - **index_offset**
     - u32
     - Index offset
     - **yes**
   * - **data**
     - bytes
     - Write payload
     - **yes**
   * - **size**
     - u32
     - Expected result size
     - **yes**
