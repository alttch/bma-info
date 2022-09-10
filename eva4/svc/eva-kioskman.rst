HMI kiosk manager
*****************

.. contents::

**Requires** :doc:`../enterprise`.

.. include:: ../include/kioskman.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-kioskman.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-kioskman.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.kioskman.default /opt/eva4/share/svc-tpl/svc-tpl-kioskman.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.kioskman.default__kiosk.alert:

kiosk.alert
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Display an alert*
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
   * - **text**
     - String
     - Text to display
     - **yes**
   * - **level**
     - String
     - Level (info/warning)
     - no

.. _eva4_eva.kioskman.default__kiosk.deploy:

kiosk.deploy
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploy kiosk(s) configurations*
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
   * - **kiosks**
     - Struct
     - Configuration list
     - no

.. _eva4_eva.kioskman.default__kiosk.destroy:

kiosk.destroy
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroy a kiosk*
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
     - Kiosk name
     - **yes**

.. _eva4_eva.kioskman.default__kiosk.dev_close:

kiosk.dev_close
---------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Close development console*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.kioskman.default__kiosk.dev_open:

kiosk.dev_open
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Open development console*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.kioskman.default__kiosk.display:

kiosk.display
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Display control*
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
   * - **on**
     - bool
     - Display on/off
     - no
   * - **brightness**
     - f32
     - Display brightness
     - no

.. _eva4_eva.kioskman.default__kiosk.eval:

kiosk.eval
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Execute JavaScript code inside the web-app*
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
   * - **code**
     - String
     - JavaScript code to execute
     - **yes**

.. _eva4_eva.kioskman.default__kiosk.get_config:

kiosk.get_config
----------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get kiosk configuration*
   * - Parameters
     - required
   * - Returns
     - Kiosk configuration

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Kiosk name
     - **yes**


*Return payload example:*

.. code:: json

  {
      "auth": {
          "login": "username",
          "password": "secret"
      },
      "auto_login": true,
      "ip": "172.16.54.129/32",
      "name": "k1"
  }
  

.. _eva4_eva.kioskman.default__kiosk.info:

kiosk.info
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get the current session info*
   * - Parameters
     - *none*
   * - Returns
     - Session info (struct)


*Return payload example:*

.. code:: json

  {
      "agent": "EvaPanel",
      "arch": "x86_64",
      "current_url": "http://eva/ui/",
      "debug": true,
      "engine": "wasm",
      "home_url": "http://eva/ui/",
      "state": "active",
      "version": "0.1.1"
  }
  

.. _eva4_eva.kioskman.default__kiosk.list:

kiosk.list
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *List kiosks*
   * - Parameters
     - *none*
   * - Returns
     - The list of all kiosks, their configurations and states


*Return payload example:*

.. code:: json

  [
      {
          "agent": "EvaPanel",
          "auth": {
              "login": "username1",
              "password": "secret"
          },
          "auto_login": true,
          "current_url": "http://eva/ui/",
          "ip": "172.16.54.129/32",
          "name": "k1",
          "state": "active",
          "version": "0.1.1"
      },
      {
          "agent": null,
          "auth": {
              "login": "username2",
              "acls": ["operator"]
          },
          "auto_login": false,
          "current_url": null,
          "ip": "127.0.0.1/32",
          "name": "mws1",
          "state": null,
          "version": null
      }
  ]
  

.. _eva4_eva.kioskman.default__kiosk.login:

kiosk.login
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Perform log-in*
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
   * - **login**
     - String
     - user login
     - **yes**
   * - **password**
     - String
     - user password
     - **yes**

.. _eva4_eva.kioskman.default__kiosk.logout:

kiosk.logout
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Perform log-out*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.kioskman.default__kiosk.navigate:

kiosk.navigate
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Open an URL*
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
   * - **url**
     - String
     - URL (opens home if not set)
     - no

.. _eva4_eva.kioskman.default__kiosk.reboot:

kiosk.reboot
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Reboot the kiosk machine*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.kioskman.default__kiosk.reload:

kiosk.reload
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Reload the kiosk process*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.kioskman.default__kiosk.test:

kiosk.test
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Test the bus*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.kioskman.default__kiosk.undeploy:

kiosk.undeploy
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploy kiosk(s) configurations*
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
   * - **kiosks**
     - Vec<Struct/String>
     - Configuration list
     - no

.. _eva4_eva.kioskman.default__kiosk.zoom:

kiosk.zoom
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Web zoom level*
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
   * - **level**
     - f64
     - Zoom level
     - **yes**
