Local user/key authentication service
*************************************

.. contents::

Local user/API key authentication service, see :doc:`../aaa` for more details.

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-aaa-localauth.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-aaa-localauth.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.aaa.localauth /opt/eva4/share/svc-tpl/svc-tpl-aaa-localauth.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.aaa.localauth__auth.key:

auth.key
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Authenticates a client using API key*
   * - Parameters
     - required
   * - Returns
     - The method returns errors if auth is not successful

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **key**
     - String
     - API key value
     - **yes**
   * - **timeout**
     - f64
     - Max operation timeout
     - no

.. _eva4_eva.aaa.localauth__auth.user:

auth.user
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Authenticates a client using a local user account*
   * - Parameters
     - required
   * - Returns
     - The method returns errors if auth is not successful

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **login**
     - String
     - Account login
     - **yes**
   * - **password**
     - String
     - Account password (plain text)
     - **yes**
   * - **timeout**
     - f64
     - Max operation timeout
     - no

.. _eva4_eva.aaa.localauth__key.deploy:

key.deploy
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploys API keys*
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
   * - **keys**
     - Vec<struct>
     - API keys (same as got in *key.export*)
     - **yes**

.. _eva4_eva.aaa.localauth__key.destroy:

key.destroy
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroy a single API key*
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
     - API key ID
     - **yes**

.. _eva4_eva.aaa.localauth__key.export:

key.export
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Export API keys as a deployment*
   * - Parameters
     - required
   * - Returns
     - API key deployment struct

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - API key ID (can be mask)
     - **yes**


*Return payload example:*

.. code:: json

  {
      "keys": [
          {
              "acls": [
                  "default"
              ],
              "id": "default",
              "key": "defaultXXX"
          }
      ]
  }
  

.. _eva4_eva.aaa.localauth__key.get:

key.get
-------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get a single API key value*
   * - Parameters
     - required
   * - Returns
     - API key ID/key value

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - API key ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "id": "default",
      "key": "defaultXXX"
  }
  

.. _eva4_eva.aaa.localauth__key.get_config:

key.get_config
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get configuration of a single API key*
   * - Parameters
     - required
   * - Returns
     - API key configuration

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - API key ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "acls": [
          "default"
      ],
      "id": "default",
      "key": "defaultXXX"
  }
  

.. _eva4_eva.aaa.localauth__key.list:

key.list
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *List API keys*
   * - Parameters
     - *none*
   * - Returns
     - List of defined API keys, they values and assigned ACLs


*Return payload example:*

.. code:: json

  [
      {
          "acls": [
              "admin"
          ],
          "id": "admin",
          "key": "mykey"
      },
      {
          "acls": [
              "default"
          ],
          "id": "default",
          "key": "defaultXXX"
      },
      {
          "acls": [],
          "id": "default-v3",
          "key": "default123"
      },
      {
          "acls": [
              "ui_all",
              "ui_default"
          ],
          "id": "ui",
          "key": "ij31i3j21345"
      },
      {
          "acls": [
              "ui_default"
          ],
          "id": "uid",
          "key": "YHiT172ani2KGoTUPSurSA1Rx6n7TVnL"
      }
  ]
  

.. _eva4_eva.aaa.localauth__key.regenerate:

key.regenerate
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Re-generates key value of API key*
   * - Parameters
     - required
   * - Returns
     - API key configuration with a new key value

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - API key ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "acls": [
          "default"
      ],
      "id": "default",
      "key": "uULa5QSORbEJX1QM3RYeC2kVwcVlg2zC"
  }
  

.. _eva4_eva.aaa.localauth__key.undeploy:

key.undeploy
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploy API keys*
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
   * - **keys**
     - Vec<struct/String>
     - API keys or a list of API key IDs
     - **yes**

.. _eva4_eva.aaa.localauth__password.hash:

password.hash
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Hashes the password with the requested algorithm*
   * - Parameters
     - required
   * - Returns
     - password hash

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **password**
     - String
     - Plain password string string to hash
     - **yes**
   * - **algo**
     - String
     - sha256, sha512, or pbkdf2
     - **yes**


*Return payload example:*

.. code:: json

  {
      "hash": "$1$CaqoIL8WXkDnqnwMXLeW5g==$qXQVPbRibRSomjtzKuyOePv59lx3eAQUR3yqAUS4YoE="
  }
  

.. _eva4_eva.aaa.localauth__user.create_one_time:

user.create_one_time
--------------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Creates an one-time temporary user account, which is auto-deleted after the first login*
   * - Parameters
     - required
   * - Returns
     - One-time account credentials

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **acls**
     - String
     - ACL IDs
     - **yes**
   * - **login**
     - String
     - included into one-time login as OT.$login.$RANDOM
     - no


*Return payload example:*

.. code:: json

  {
      "login": "OT.test.eHlrGMgPlpqKmzTr",
      "password": "QZoz0jYRaL2BSdKc"
  }
  

.. _eva4_eva.aaa.localauth__user.deploy:

user.deploy
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploys local user accounts*
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
   * - **users**
     - Vec<struct>
     - Users (same as got in *user.export*, note: passwords must be sha256-hashed)
     - **yes**

.. _eva4_eva.aaa.localauth__user.destroy:

user.destroy
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroy a single local user account*
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
     - User login
     - **yes**

.. _eva4_eva.aaa.localauth__user.export:

user.export
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Exports local user accounts as a deployment*
   * - Parameters
     - required
   * - Returns
     - User accounts deployment struct

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Login (can be mask)
     - **yes**


*Return payload example:*

.. code:: json

  {
      "users": [
          {
              "acls": [
                  "ui_default",
                  "ui_all"
              ],
              "login": "operator",
              "password": "cd2eb0837c9b4c962c22d2ff8b5441b7b45805887f051d39bf133b583baf6860"
          }
      ]
  }
  

.. _eva4_eva.aaa.localauth__user.get_config:

user.get_config
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get configuration of a single user account*
   * - Parameters
     - required
   * - Returns
     - User account configuration

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - API key ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "acls": [
          "ui_default",
          "ui_all"
      ],
      "login": "operator",
      "password": "cd2eb0837c9b4c962c22d2ff8b5441b7b45805887f051d39bf133b583baf6860"
  }
  

.. _eva4_eva.aaa.localauth__user.list:

user.list
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *List local user accounts*
   * - Parameters
     - *none*
   * - Returns
     - List of defined local user accounts, the ACLs and password hashes


*Return payload example:*

.. code:: json

  [
      {
          "acls": [
              "admin"
          ],
          "login": "admin",
          "password": "cd2eb0837c9b4c962c22d2ff8b5441b7b45805887f051d39bf133b583baf6860"
      },
     {
          "acls": [
              "ui_default",
              "ui_all"
          ],
          "login": "operator",
          "password": "cd2eb0837c9b4c962c22d2ff8b5441b7b45805887f051d39bf133b583baf6860"
      }
  ]
  

.. _eva4_eva.aaa.localauth__user.set_password:

user.set_password
-----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Changes user's password. Does not require the current one, so consider calling *auth.user* before*
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
     - User login
     - **yes**
   * - **password**
     - String
     - New password (plain text)
     - **yes**

.. _eva4_eva.aaa.localauth__user.undeploy:

user.undeploy
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploy local users*
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
   * - **users**
     - Vec<struct/String>
     - User structs or a list of user logins
     - **yes**
