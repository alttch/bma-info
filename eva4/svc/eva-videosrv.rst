Video server service
********************

.. contents::

**Requires** :doc:`../enterprise`.

Video server service


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-videosrv.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-videosrv.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.videosrv.1 /opt/eva4/share/svc-tpl/svc-tpl-videosrv.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.videosrv.__Crec.pull:

Crec.pull
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Pull video recordings*
   * - Parameters
     - required
   * - Returns
     - Cursor for pulling video frames with `u` field set to the cursor UUID

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Stream sensor OID
     - **yes**
   * - **t_start**
     - f64
     - Start timestamp (seconds since epoch)
     - no
   * - **t_end**
     - f64
     - End timestamp (seconds since epoch)
     - no
   * - **limit**
     - u32
     - Maximum number of frames to return
     - no

.. _eva4_eva.videosrv.__Nrec.pull:

Nrec.pull
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Pull next video frames from a cursor*
   * - Parameters
     - required
   * - Returns
     - A next video frame from the cursor or null if the end is reached

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **u**
     - String/Vec<u8>
     - Cursor UUID
     - **yes**

.. _eva4_eva.videosrv.__rec.create:

rec.create
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Create video recording*
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
     - Stream sensor OID
     - **yes**
   * - **enabled**
     - bool
     - Enable/disable recording
     - no
   * - **keep**
     - f64
     - Keep time (seconds)
     - no

.. _eva4_eva.videosrv.__rec.deploy:

rec.deploy
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Deploy video recordings*
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
   * - **video_recordings**
     - Vec<struct>
     - Video recording configurations
     - **yes**

.. _eva4_eva.videosrv.__rec.destroy:

rec.destroy
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroy a video recording*
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
     - Stream sensor OID
     - **yes**

.. _eva4_eva.videosrv.__rec.disable:

rec.disable
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Disable video recording*
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
     - Stream sensor OID
     - **yes**

.. _eva4_eva.videosrv.__rec.enable:

rec.enable
----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Enable video recording*
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
     - Stream sensor OID
     - **yes**

.. _eva4_eva.videosrv.__rec.get_config:

rec.get_config
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get video recording configuration*
   * - Parameters
     - required
   * - Returns
     - Recording configuration

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Stream sensor OID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "enabled": true,
      "keep": 86400000.0,
      "oid": "sensor:s0"
  }
  

.. _eva4_eva.videosrv.__rec.image:

rec.image
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Retrieve an image from a video recording*
   * - Parameters
     - required
   * - Returns
     - Vec<u8> of the image data (PNG) or null if no image is found

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Stream sensor OID
     - **yes**
   * - **t**
     - f64
     - Timestamp (seconds since epoch)
     - **yes**
   * - **max_delta**
     - f64
     - Maximum time difference (seconds) from the requested timestamp
     - no

.. _eva4_eva.videosrv.__rec.info:

rec.info
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get video recording information*
   * - Parameters
     - required
   * - Returns
     - Video recording information

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Stream sensor OID
     - **yes**
   * - **t**
     - f64
     - Timestamp (seconds since epoch) to get information for
     - no
   * - **limit**
     - u32
     - Maximum number of frames to analyze
     - no


*Return payload example:*

.. code:: json

  {
      "format": 10,
      "fps": 60,
      "height": 480,
      "width": 640
  }
  

.. _eva4_eva.videosrv.__rec.list:

rec.list
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *List video recordings*
   * - Parameters
     - *none*
   * - Returns
     - List of video recordings


*Return payload example:*

.. code:: json

  [
      {
          "enabled": true,
          "keep": 86400000.0,
          "oid": "sensor:s0"
      },
      {
          "enabled": false,
          "keep": 30.0,
          "oid": "sensor:s1"
      }
  ]
  

.. _eva4_eva.videosrv.__rec.segmented:

rec.segmented
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Retrieve a segmented video from a video recording*
   * - Parameters
     - required
   * - Returns
     - Array of frames with metadata. The first array element is always a key frame at or after the requested timestamp. The frames are returned either until the next key frame or until the limit_max is reached. If limit_max is not specified, it is set as limit_min + 1000.

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Stream sensor OID
     - **yes**
   * - **t**
     - f64
     - Timestamp (seconds since epoch)
     - **yes**
   * - **limit_min**
     - u32
     - Minimum number of frames to include in the segment
     - **yes**
   * - **limit_max**
     - u32
     - Maximum number of frames to include in the segment
     - no


*Return payload example:*

.. code:: json

  [
      {
          "data": [
              69,
              86,
              83,
              235,
              174,
              186,
              235,
              174,
              186
          ],
          "key_unit": true,
          "t": 1755203121.461881
      },
      {
          "data": [
              69,
              86,
              83,
              1,
              10,
              128,
              2,
              224,
              1,
              0,
              0,
              0,
              0
          ],
          "key_unit": false,
          "t": 1755203121.478216
      },
      {
          "data": [
              69,
              86,
              83,
              1,
              10,
              128,
              2,
              224,
              1,
              0,
              0
          ],
          "key_unit": false,
          "t": 1755203121.494861
      }
  ]
  

.. _eva4_eva.videosrv.__rec.undeploy:

rec.undeploy
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Undeploy video recordings*
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
   * - **video_recordings**
     - Vec<struct>
     - Video recording configurations
     - **yes**

HTTP API
========

The service provides certain methods via
:ref:`extra calls<eva4_hmi_http__x__TARGET_SVC__METHOD>` (the methods must
be called e.g. as *x::eva.videosrv.default::summary*)

To use HTTP API methods, a user must have read or write access to video sensors.

.. include:: ../include/autogen/http_api-svc-videosrv.rst

