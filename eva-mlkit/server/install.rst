Installation
************

EVA ICS Machine Learning kit server must be installed on any machine which runs
a :doc:`../../../eva4/index` node. It is recommended to install the server on a
dedicated node if possible.

.. note::

    ML kit server requires EVA ICS 4.0.1. It is also recommended to update the
    system to the build 2023032901 or newer.

Downloading/updating
====================

The server binaries can be manually downloaded from
https://pub.bma.ai/eva-mlkit/server/. There is also an installer script which
automatically downloads and extracts the latest stable server tar-ball:

.. code:: shell

    curl https://pub.bma.ai/eva-mlkit/server/install | sh

The script installs server binaries into */opt/eva4/mlkit/* folder. To
customize the target path, execute installer as the following:

.. code:: shell

    curl https://pub.bma.ai/eva-mlkit/server/install | TARGET_DIR=/path/to/folder sh

The script also can update an existing installation with the same command as
above. Disable deployed services or stop EVA ICS server completely, execute the
command to re-install the server and enable/start everything back.

Installing server license key
=============================

EVA ICS Machine Learning kit server is not included into
:doc:`../../../eva4/enterprise` and must have own product key deployed. The
license key can be deployed with the following command:

.. code:: shell

    /opt/eva4/sbin/eva-registry-cli set eva/user_data/mlkit/license - --type json < license-file.json

when there is less than 30 days before the expiration date left, deployed
Enterprise services start sending warning messages in logs every hour.

A new license can be imported on-the-flow, no service/node restart is required.

The license expiration UNIX timestamp can be obtained with a command:

.. code:: shell

    /opt/eva4/sbin/eva-registry-cli get-field eva/user_data/mlkit/license expires

Creating/deploying
==================

The ML kit server is a standard EVA ICS v4 service and can be created as:

.. code:: shell

    eva svc create eva.svc.ml /opt/eva4/mlkit/svc-tpl-mlsrv.yml

where the service configuration template is:

.. literalinclude:: ../share/svc-tpl-mlsrv.yml
    :language: yaml

The server can work with databases which are connected to the local node bus
via database services. The default services which are currently supported:

* :doc:`../../../eva4/svc/eva-db-influx`

* :doc:`../../../eva4/svc/eva-db-sql` (`PostgreSQL
  <https://www.postgresql.org>`_ with `TimescaleDB
  <https://www.timescale.com>`_ extensions.
