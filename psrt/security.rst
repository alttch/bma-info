Security
********

.. contents::

Functionality
=============

PSRT server uses `OpenSSL <https://www.openssl.org>`_ functions for:

* Token generation
* TLS communication layer
* AES decryption

OpenSSL versions
================

Default supplied binaries (both free and Enterprise version) use "vendored"
(built-in) OpenSSL libraries. This allows to use the binaries without external
dependencies, however may lead to security problems if vulnerabilities are
found in the actual OpenSSL version.

.. _psrt_compile:

The behaviour can be changed with compiling the server without
"openssl-vendored" feature:

* Install `Rust <https://www.rust-lang.org/tools/install>`_

* Compile the server and CLI:

.. code:: shell

    cargo build --release --features server,cli

Custom :ref:`PSRT Enterprise <psrt_enterprise>` binaries for particular
OS/distributions can be provided for customers with active contracts by
request.

Certifications
==============

OpenSSL has a FIPS module, which is `NIST-certified (#4282)
<https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282>`_.

PSRT server can have FIPS-140 mode activated with the following:

* :ref:`compile PSRT to use system OpenSSL libraries <psrt_compile>`

* install FIPS-140 SSL modules (refer to OS/distribution technical
  documentation for more info)

* activate FIPS-140 mode by putting *fips: true* option in the server config:

.. code:: yaml

    # ..........
    proto:
        fips: true
    # ..............

* note that if FIPS-140 can not be enabled but the option is set, the server
  will not go online
