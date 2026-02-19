Configuration
*************

.. contents::

Setup layout
============

Gateryx is designed to serve a group of web applications. For basic
configuration it is important to have all web applications hosted as
**APP.domain** where *APP* is the name of the application and *domain* is the
domain of the group. The applications may have aliases.

Different layouts are possible but may require additional complicated setups
and certain functionality is not available in such cases (e.g. Passkey
authentication).

Initial setup
=============

After the server is installed, it is important to change the following:

* **/etc/gateryx/config.toml** - change *auth/tokens/domain* to the domain of
  the application group.

* **/etc/gateryx/config.toml** - obtain and replace the certificate and key
  files in *tls* section of the HTTPS listener. As there is only one
  certificate used for the whole application group, it should either cover all
  hosted application subdomains or be a wildcard (both kinds can be obtained
  e.g. from `LetsEncrypt <https://letsencrypt.org/>`_ or an internal company
  certificate can be used).

* **/etc/gateryx/app.d/system.toml** - change *hosts* to the desired system
  application host name.

* **/etc/gateryx/app.d** - create configuration files for each web application
  to be served, see included *example.toml* for reference.

There is no users created by default, use the *gateryx* CLI command to create:

.. code-block:: bash

    gateryx user create USERNAME

In case if an external IDF will be used, no local users are needed.

Server
======

Main configuration
------------------

The main server configuration file is located by default at */etc/gateryx/config.toml*

.. literalinclude::  ./configs/config.toml.default
   :language: toml

It is possible to validate the configuration file with:

.. code-block:: bash

    gateryx-server --check

After the configuration file is modified, the Gateryx server can be started with:

.. code-block:: bash

    systemctl start gateryx

Web Applications
----------------

Web application configurations are located in */etc/gateryx/app.d/*.toml* by
default. In case if a different configuration path is used, the *app.d* folder
must be located in the same folder as the main configuration file.

Example:

.. literalinclude:: ./configs/app.d/example.toml
   :language: toml

An application can also include specific WebSocket options in `websocket`
section. The parameters are identical to the ones in the main configuration
file.

System application
------------------

The system application is a built-in web application that provides a general
interface for users. There should be only one system application configured.

.. literalinclude:: ./configs/app.d/system.toml.default
   :language: toml

The system application is also responsible for OIDC token flow and other system
tasks.

Plain application
-----------------

The plain application is a web application which does several important tasks:

* Serves static files from *.well-known* folder which must be located in the
  configured web root (*remote* parameter).

* For other requests - redirects requests to secure HTTPS URLs.

The application has no host names to configure and is connected directly to a
listener in the main configuration file (usually plain HTTP listener on port
80).

.. literalinclude:: ./configs/app.d/plain.toml.default
   :language: toml

Administration client
=====================

The Gateryx client is a command line tool to perform the administration tasks.

The configuration file is located by default at */etc/gateryx/client.toml*. In
case the configuration file is missing, the client will use server defaults if
installed on the same machine.

.. literalinclude:: ./configs/client.toml.default
   :language: toml

In case if the client is used on a different machine, it is important to copy
*admin.pem* key file from the server and ensure the *client.toml* file points
to it.

Configuring 3rd party apps for OIDC
===================================

Third-party applications can be configured to use Gateryx as an OIDC provider
with the following URLs exposed:

* *https://gate.domain/.well-known/openid-configuration* - OIDC configuration URL

* *https://gate.domain/.well-known/jwks.json* - public keys URL

* *https://gate.domain/.well-known/public.pem* - public key URL in PEM format

Where *gate.domain* is the host name of the system application configured.

The current token can be obtained by the third party application either from
*gateryx_auth_token* cookie or *X-JWT-Assertion* HTTP header.

If an application wants to logout the user, it can erase the mentioned cookie. This
works either for a single application if a custom domain is used or for all
application group of the domain. For the last case, the `domain=.yourdomain`
must be used when the cookie is erased.

If a third-party application can fully trust the Gateryx server (e.g. using IP
filtering or having no external access), it can use `X-Gateryx-User` HTTP
header which contains the username of the authenticated user.

Configuring 3rd party apps for Gateryx API
==========================================

Third-party applications can be configured to use the exposed Gateryx API
(`./gateryx/rpc`) having `gateryx_api: true` in the application configuration.

As the API can directly manipulate sensitive authentication data, it is
strongly recommended to enable API for trusted applications only.
