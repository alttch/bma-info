Event accounting service
************************

.. contents::

**Requires** :doc:`../enterprise`.

.. include:: ../include/accounting.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-aaa-accounting.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-aaa-accounting.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.aaa.accounting /opt/eva4/share/svc-tpl/svc-tpl-aaa-accounting.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.aaa.accounting__query:

query
-----

.. list-table::
   :header-rows: 0

   * - Description
     - *Query accounting events*
   * - Parameters
     - required
   * - Returns
     - Events matching the filter

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **t_start**
     - Time
     - start time (default: last 24 hours)
     - no
   * - **t_end**
     - Time
     - end time (default: now)
     - no
   * - **node**
     - String
     - event node
     - no
   * - **u**
     - String
     - user account name
     - no
   * - **src**
     - String
     - source
     - no
   * - **svc**
     - String
     - service id (substring)
     - no
   * - **subj**
     - String
     - event subject
     - no
   * - **oid**
     - String
     - OID affected
     - no
   * - **note**
     - String
     - a note or its part (substring)
     - no
   * - **data**
     - String
     - substring of data payload casted as text
     - no
   * - **code**
     - i16
     - event error code (0 = success)
     - no
   * - **err**
     - String
     - event error message
     - no


*Return payload example:*

.. code:: json

  [
    {
      "code": 0,
      "data": null,
      "err": null,
      "id": [
          207,
          214,
          106,
          1,
          143,
          123,
          76,
          205,
          159,
          165,
          103,
          26,
          81,
          30,
          20,
          201
      ],
      "node": "mws1",
      "note": null,
      "oid": null,
      "src": "127.0.0.1",
      "subj": "login",
      "svc": "eva.hmi.default",
      "t": 1706309851.0001848,
      "u": "admin"
    },
    {
      "code": 0,
      "data": null,
      "err": null,
      "id": [
          170,
          82,
          141,
          89,
          160,
          254,
          66,
          37,
          150,
          19,
          130,
          241,
          140,
          246,
          140,
          214
      ],
      "node": "mws1",
      "note": null,
      "oid": null,
      "src": "127.0.0.1",
      "subj": "login",
      "svc": "eva.hmi.default",
      "t": 1706309888.0001206,
      "u": "opx"
    }
  ]
  

.. _eva4_eva.aaa.accounting__report:

report
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Send accounting event via RPC call*
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
   * - **u**
     - String
     - user account name
     - no
   * - **src**
     - String
     - source (e.g. user's IP address)
     - no
   * - **svc**
     - String
     - service id (default: caller)
     - no
   * - **subj**
     - String
     - event subject
     - no
   * - **oid**
     - String
     - OID affected
     - no
   * - **data**
     - Object
     - any additional information
     - no
   * - **note**
     - String
     - a custom note
     - no
   * - **code**
     - i16
     - event error code (0 = success)
     - no
   * - **err**
     - String
     - event error message
     - no

HTTP API
========

The service provides certain methods via
:ref:`extra calls<eva4_hmi_http__x__TARGET_SVC__METHOD>` (the methods must
be called e.g. as *x::eva.aaa.accounting::query*)

To use HTTP API methods, a user must be either a node administrator or have
"log" operation permission.

.. include:: ../include/autogen/http_api-aaa-accounting.rst

