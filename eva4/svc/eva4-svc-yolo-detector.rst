Object detector for YOLO models
*******************************

.. contents::

Allows to use YOLO object detection models for image analysis

Installing/updating
===================

Object detector for YOLO models is not included into EVA ICS distribution. To install/update it,
either edit "eva/config/python-venv" :doc:`registry<../registry>` key, specify
the desired version in "extra" section (e.g. *eva4-svc-yolo-detector>=0.0.1*) and rebuild the
Python virtual environment (*/opt/eva4/sbin/venvmgr build*). Or execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr add eva4-svc-yolo-detector
    # or 
    /opt/eva4/sbin/venvmgr add eva4-svc-yolo-detector==N # where N = version number

The latest eva-shell version number can be obtained from
https://pypi.org/project/eva4-svc-yolo-detector/

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-yolo-detector.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-yolo-detector.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.detector.1 /opt/eva4/share/svc-tpl/svc-tpl-yolo-detector.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.detector.__detector.stats:

detector.stats
--------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get detector stats*
   * - Parameters
     - *none*
   * - Returns
     - Detector stats


*Return payload example:*

.. code:: json

  {
    "fps": 30,
    "frames_dropped": 3,
    "frames_processed": 149,
    "status": "ready",
    "t_avg_ms": 25,
    "t_max_ms": 141,
    "t_min_ms": 18
  }
