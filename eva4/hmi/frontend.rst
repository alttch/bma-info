Front-end server for HMI service
********************************

It is recommended to use a front-end server for :doc:`../svc/eva-hmi` to get
additional features:

* limit max upload size for clients

* have connections TLS-encrypted

* add an optional additional authentication

.. note::

    To properly log IP addresses of the requests, make sure the front-end sets
    *X-Real-IP* header and set *real_ip_header* parameter in the service
    configuration.

Example with NGINX
==================

Here is an example configuration for `NGINX <https://www.nginx.com>`_ with SSL
enabled and uploads limited to 1Mb.

.. code-block:: nginx

    upstream eva-hmi {
            server 127.0.0.1:7727;
    }

    server {
        listen 192.168.1.1 ssl;
        client_max_body_size 1M;

        server_name  eva;

        ssl_certificate /opt/eva4/etc/eva.crt;
        ssl_certificate_key /opt/eva4/etc/eva.key;
        ssl_session_timeout  1m;

        # proxy for HTTP
        location / {
            proxy_buffers 16 16k;
            proxy_buffer_size 16k;
            proxy_busy_buffers_size 240k;   
            proxy_pass http://eva-hmi;
            # a few variables for backend, in fact HMI requires X-Real-IP only
            proxy_set_header X-Host $host;  
            proxy_set_header Host $host;    
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto https;
            proxy_set_header X-Frontend "nginx";
        }
        # proxy for WebSocket
        location /ws {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_buffers 16 16k;
            proxy_buffer_size 16k;
            proxy_busy_buffers_size 240k;   
            proxy_pass http://eva-hmi;      
            proxy_set_header X-Host $host;  
            proxy_set_header Host $host;    
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto https;
            proxy_set_header X-Frontend "nginx";
        }
    }
