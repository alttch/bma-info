Docker application launcher service allows to launch `Docker
<https://www.docker.com>`_ containers (using docker compose) directly from EVA
ICS.

The service is useful to keep the whole setup and deployment unified.

Requirements
============

`Install Docker Engine <https://docs.docker.com/engine/install/>`_ and Docker
compose plugin. In case if Docker engine is installed from the OS repository,
make sure the compose plugin is present (or docker-compose binary for compose
V1, deprecated).

Networking
==========

If a private network is required, create it system-wide with a command:

.. code:: shell

   docker network create eva --subnet 10.20.0.0/16

refer to `Docker networking documentation <https://docs.docker.com/network/>`_
for more info.

Volumes
=======

Persistent volumes can be kept at any location of the local file systems.

Applications
============

By default Docker applications are uploaded into */opt/eva4/runtime/dapp*
folder (create if missing).

An application should contain *docker-compose.yml* file and optional
configuration if required.

It is recommended to test applications with *docker compose up* command before
deploying.

Application log messages are automatically fetched into EVA ICS logging
subsystem on behalf of the launcher service instance.

Deployment example
==================

The following :doc:`EVA ICS deployment <../iac>` file deploys an official
`NGINX container <https://hub.docker.com/_/nginx>`_ which is used as a
front-end/ingress for :doc:`EVA ICS HMI <../svc/eva-hmi>`.

deploy.yml
----------

.. code:: yaml

  version: 4
  content:
    - node: .local
      upload:
      - src: ./ingress.tgz
        target: dapp/ingress/
        extract: true
      svcs:
      - id: dapp.ingress
        params:
          bus:
            path: var/bus.ipc
          command: svc/eva-dapp
          config:
            path: ingress

The source files must be either compressed into a single archive or uploaded
one-by-one.

docker-compose.yml
------------------

.. code:: yaml

    services:
      web:
        image: nginx
        networks:
          - eva
        volumes:
          - source: ./nginx.conf
            target: /etc/nginx/nginx.conf
            type: bind
        ports:
         - "80:80"
    networks:
      eva:
        external: true


nginx.conf
----------

Make sure the HMI service upstream is accessible from the Docker network the
container is attached to. See also :doc:`../hmi/frontend`.

.. code:: nginx

    user  nginx;
    worker_processes  4;
    error_log  /dev/fd/1 warn;
    pid        /var/run/nginx.pid;
    events {
        worker_connections  1024;
    }
    http {
        include       /etc/nginx/mime.types;
        default_type  application/octet-stream;
        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                          '$status $body_bytes_sent "$http_referer" '
                          '"$http_user_agent" "$http_x_forwarded_for"';
        access_log  /dev/fd/0  main;
        sendfile        on;
        keepalive_timeout  65;
        gzip  on;
        upstream eva-hmi-default {
                server 10.20.0.1:7727;
        }
        server {
            listen 0.0.0.0;
            client_max_body_size 1M;
            server_name  eva;
            location / {
                proxy_buffers 16 16k;
                proxy_buffer_size 16k;
                proxy_busy_buffers_size 240k;
                proxy_pass http://eva-hmi-default;
                proxy_set_header X-Host $host;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-Proto https;
                proxy_set_header X-Frontend "nginx";
            }
            location /ws {
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_buffers 16 16k;
                proxy_buffer_size 16k;
                proxy_busy_buffers_size 240k;
                proxy_pass http://eva-hmi-default;
                proxy_set_header X-Host $host;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-Proto https;
                proxy_set_header X-Frontend "nginx";
            }
        }
    }
