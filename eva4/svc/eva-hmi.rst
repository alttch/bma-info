HMI service
***********

.. contents::

.. include:: ../include/hmi_svc.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-hmi.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-hmi.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.hmi.default /opt/eva4/share/svc-tpl/svc-tpl-hmi.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.hmi.default__api_log.get:

api_log.get
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets log of recent API calls*
   * - Parameters
     - required
   * - Returns
     - List of recent API calls

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **t_start**
     - String/i64
     - Start time
     - no
   * - **t_end**
     - String/i64
     - End time
     - no
   * - **user**
     - String
     - Filter by user
     - no
   * - **acl**
     - String
     - Filter by ACL ID
     - no
   * - **method**
     - String
     - Filter by method
     - no
   * - **source**
     - String
     - Filter by source
     - no
   * - **code**
     - i64
     - Filter by code
     - no
   * - **success**
     - bool
     - Filter by success/failed
     - no


*Return payload example:*

.. code:: json

  [
      {
          "acl": "admin",
          "auth": "token",
          "code": 0,
          "dt": "2022-05-10T03:43:26+02:00",
          "elapsed": 0.023,
          "id": "41770402-8154-4d3f-ae49-55fa9b9840b6",
          "method": "action.toggle",
          "msg": null,
          "params": {
            "i": "unit:tests/door1"
          },
          "source": "127.0.0.1",
          "t": 1652147006,
          "user": "admin"
      },
      {
          "acl": "admin",
          "auth": "token",
          "code": 0,
          "dt": "2022-05-10T03:43:32+02:00",
          "elapsed": 0.019,
          "id": "6d12a29e-ba5f-4757-a2d3-770641393dd3",
          "method": "action.toggle",
          "msg": null,
          "params": {
            "i": "unit:tests/door2"
          },
          "source": "127.0.0.1",
          "t": 1652147012,
          "user": "admin"
      }
  ]
  

.. _eva4_eva.hmi.default__authenticate:

authenticate
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Allows other services to directly authenticate users*
   * - Parameters
     - required
   * - Returns
     - Serialized ACL

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **key**
     - String
     - API key or a token
     - **yes**
   * - **ip**
     - String
     - IP Address of the client
     - no


*Return payload example:*

.. code:: json

  {
      "admin": true,
      "deny_read": {
          "items": [],
          "pvt": [],
          "rpvt": []
      },
      "deny_write": {
          "items": [],
          "pvt": [],
          "rpvt": []
      },
      "from": [
          "admin"
      ],
      "id": "admin",
      "meta": {
          "admin": [
              "any"
          ]
      },
      "ops": [],
      "read": {
          "items": [],
          "pvt": [],
          "rpvt": []
      },
      "write": {
          "items": []
      }
  }
  

.. _eva4_eva.hmi.default__i18n.cache_purge:

i18n.cache_purge
----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Purges i18n locale cache*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.hmi.default__session.broadcast.reload:

session.broadcast.reload
------------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Broadcasts an event to connected clients to reload interface*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.hmi.default__session.broadcast.restart:

session.broadcast.restart
-------------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Broadcasts an event to connected clients that the server is restarting*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.hmi.default__session.destroy:

session.destroy
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroys an active user session*
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
   * - **i**
     - String
     - Session token ID
     - **yes**

.. _eva4_eva.hmi.default__session.list:

session.list
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Lists active sessions of logged in users*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*


*Return payload example:*

.. code:: json

  [
      {
          "expires_in": 57,
          "id": "token:unFdcur2dGUcfA4XgBaEIVqVBFjEi83U",
          "mode": "normal",
          "source": "127.0.0.1",
          "user": "admin"
      },
      {
          "expires_in": 59,
          "id": "token:OziFA5Pzb0IndXHmVVy13Sh24BxFW73E",
          "mode": "normal",
          "source": "127.0.0.1",
          "user": "admin"
      }
  ]
  

.. _eva4_eva.hmi.default__tpl.reload:

tpl.reload
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Reloads server templates*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.hmi.default__user_data.get:

user_data.get
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get user data*
   * - Parameters
     - required
   * - Returns
     - User data field value

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **login**
     - String
     - user login
     - **yes**
   * - **key**
     - String
     - field key
     - **yes**


*Return payload example:*

.. code:: json

  {
    "value": "somedata"
  }
  

.. _eva4_eva.hmi.default__ws.stats:

ws.stats
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Gets statistic of connected web sockets*
   * - Parameters
     - *none*
   * - Returns
     - Web socket subscription statistic (struct)


*Return payload example:*

.. code:: json

  {
      "clients": 1,
      "sub_clients": 1,
      "subscriptions": 1
  }

.. include:: ../include/hmi_xtra.rst

