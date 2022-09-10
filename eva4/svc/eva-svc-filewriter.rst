Item state file writer (JSON/CSV)
*********************************

.. contents::

Allows to write item states into JSON/CSV text files.

The files can be rotated with any external tool or manually. As soon as the
file is rotated, a new one is created automatically.


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-filewriter.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-filewriter.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.svc.fwriter1 /opt/eva4/share/svc-tpl/svc-tpl-filewriter.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.svc.fwriter__flush:

flush
-----

.. list-table::
   :header-rows: 0

   * - Description
     - *Flushes the output file immediately*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. _eva4_eva.svc.fwriter__rotate:

rotate
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Rotates the output file, by renaming it to file_path.TIME_RFC3339*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*
