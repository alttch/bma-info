GStreamer pipeline service
**************************

.. contents::

.. include:: ../include/gst-pipeline.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-gst-pipeline.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-gst-pipeline.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.gst_pipeline.1 /opt/eva4/share/svc-tpl/svc-tpl-gst-pipeline.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.gst_pipeline.__pipeline.state:

pipeline.state
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get pipeline state*
   * - Parameters
     - *none*
   * - Returns
     - Pipeline state


*Return payload example:*

.. code:: json

  {
    "buffers_in": 281,
    "buffers_out": 277,
    "buffers_pending": 4,
    "state": "playing"
  }
