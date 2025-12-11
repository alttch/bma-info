Security
********

General cryptography
====================

Gateryx uses Elliptic Curve Cryptography (EC) only. The current supported
curves are: P-256. Other key types can be used for web-TLS only.

Web applications
================

All port listeners must be configured to use TLS only. The plain HTTP must be
used only by *plain* built-in application for redirection to HTTPS and certain
system purposes.

Despite Gateryx currently does not enforce clients to use TLS 1.3 only by
default, in certain environments it is recommended to disable TLS 1.2 in the
main server configuration file (`tls/protocols` section of listeners).

SNI
===

For the moment, Gateryx does not support the classic SNI as plain-text host
names are considered as sensitive information. Therefore, each Gateryx instance
must be configured to use a dedicated IP address or port for each application
group.

Support of TLS 1.3 ECH is planned for future releases.

Passkeys/WebAuthn
=================

Gateryx is designed to work with `WebAuthn
<https://en.wikipedia.org/wiki/WebAuthn>`_ for secure authentication. This
allows users to log in using biometric data or hardware security keys,
enhancing security and user convenience. The passkeys are fully supported, even
if an external IDP is used for password authentication.

It is strongly recommended to use the passkeys only and avoid or even disable
the password authentication for users after the passkeys have been enrolled.

External IDPs
=============

The external identity providers (IDPs) are used to validate user credentials
only. When an external IDP is used, Gateryx does not store any passwords or
other sensitive authentication data.

For critical setups, the credentials must be always entered on the Gateryx side
only to avoid any possible IDP vulnerabilities, while the IDP itself should
never be exposed to the public network.

Support of certain external trusted cloud IDPs with OAuth2 flow is planned for
future releases.

.. warning::

   If an external IDP is used, it is strongly recommended to revoke all issued
   tokens for a user after a password change or account suspension. Use
   `gateryx user invalidate` command.

Server administration
=====================

In case of remote administration in mission-critical environments, it is
recommended to use the official command-line client only. The communication is
performed with strong `RFC 9421 <https://www.rfc-editor.org/rfc/rfc9421>`_
ECDSA-signed requests, which ensures no administration token or password can be
stolen and reused by an attacker.

Built-in protections
====================

* Certain responses (such as authentication) are artificially delayed to
  mitigate brute-force attacks and avoid timing attacks on cryptographic
  operations.

* In case of brute-forcing, the server enforces clients to enter CAPTCHAs after
  a certain number of failed attempts for an account and/or IP address. The
  server uses built-in CAPTCHA engine to avoid third-party dependencies and
  work in fully isolated environments.

Privilege separation
====================

After initial startup, Gateryx forks into multiple processes with separated
privileges. The main process runs as the superuser and maintains all
authentication tasks. The worker process runs as an unprivileged user, fully
isolated from sensitive data, and handles all network communication and
non-sensitive tasks only.

This allows to minimize the potential impact of security vulnerabilities as
even if the worker process is compromised, the attacker can use the currently
active tokens only.

It is important to have all sensitive data (the keys, but also including
configuration files and logs) to be readable only by the superuser.
