Video sink controller
*********************

.. contents::

.. include:: ../include/videosink.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-videosink.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-videosink.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.controller.camera.1 /opt/eva4/share/svc-tpl/svc-tpl-videosink.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.controller.camera.__stream.info:

stream.info
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get info for the current stream*
   * - Parameters
     - *none*
   * - Returns
     - Stream info


*Return payload example:*

.. code:: json

  {
    "format": "video/x-h264",
    "fps": 15,
    "frames": 7231,
    "height": 480,
    "width": 640
  }
