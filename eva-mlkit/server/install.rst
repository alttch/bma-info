Installation
************

EVA ICS Machine Learning kit server must be installed on any machine which runs
a :doc:`../../../eva4/index` node. It is recommended to install the server on a
dedicated node if possible.

.. note::

    ML kit server requires EVA ICS 4.0.1. It is also recommended to update the
    system to the build 2023032901 or newer.

    ML kit server works on x86-64 Linux only.

.. contents::

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
above.

After the server is updated, it is necessary to manually restart all ML kit
service instances, e.g. with :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc restart <SVC_ID>

Installing server license key
=============================

EVA ICS Machine Learning kit server is not included into
:doc:`../../../eva4/enterprise` and must have own product key deployed. The
license key can be deployed with the following command:

.. code:: shell

    /opt/eva4/sbin/eva-registry-cli set eva/user_data/mlkit/license - --type json < license-file.json

when there is less than 30 days before the expiration date left, deployed
instances start sending warning messages in logs every hour.

A new license can be imported on-the-flow, no service/node restart is required.

The license expiration UNIX timestamp can be obtained with a command:

.. code:: shell

    /opt/eva4/sbin/eva-registry-cli get-field eva/user_data/mlkit/license expires

.. _eva_mlkit_config:

Creating/deploying service instances
====================================

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

.. _eva_mlkit_frontend:

Using front-end web server
==========================

With a front-end web server both :doc:`../../../eva4/svc/eva-hmi` and ML kit
server can be mapped on the same URL port.

See :doc:`../../../eva4/hmi/frontend` about the general info how to use `NGINX
<https://www.nginx.com>`_ as the front-end web server.

To include ML kit server, add the following lines to the NGINX web site
configuration:

.. code:: nginx

    upstream eva-mlkit {
        server 127.0.0.1:8811;
    }

    server {
    # ...
    location /ml/ {
            gzip                on;
            gzip_min_length     8192;
            gzip_proxied no-cache no-store private expired auth;
            gzip_types          application/vnd.apache.arrow.stream text/csv;
            gzip_vary on;
            proxy_buffers 16 16k;
            proxy_buffer_size 16k;
            proxy_busy_buffers_size 240k;
            proxy_pass http://eva-mlkit;
            # a few variables for backend, in fact HMI requires X-Real-IP only
            proxy_set_header X-Host $host;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto https;
            proxy_set_header X-Frontend "nginx";
        }
    }
