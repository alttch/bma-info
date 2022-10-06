Security
********

.. contents::

Functionality
=============

PSRT server uses `OpenSSL <https://www.openssl.org>`_ cryptographic modules
functions for:

* Token generation
* TLS communication layer
* AES decryption

.. _psrt_distr:

Distribution packages
=====================

Supported distributions
-----------------------

* `Ubuntu 20.04 LTS <https://releases.ubuntu.com/focal/>`_

OpenSSL versions
----------------

Distribution packages use system cryptographic modules only. If vulnerabilities
are found in the actual versions, this can be fixed by applying system updates
in the regular way.

Universal packages
==================

OpenSSL versions
----------------

Default supplied universal binaries (both free and Enterprise version) use
"vendored" (built-in) OpenSSL libraries. This allows to use the binaries
without external dependencies, however may lead to security problems if
vulnerabilities are found in the actual OpenSSL version.

.. _psrt_compile:

The behaviour can be changed with compiling the server without
"openssl-vendored" feature:

* Install `Rust <https://www.rust-lang.org/tools/install>`_

* Compile the server and CLI:

.. code:: shell

    git clone https://github.com/alttch/psrt/
    cd psrt
    cargo build --release --features server,cli

Custom :ref:`PSRT Enterprise <psrt_enterprise>` binaries for particular
OS/distributions can be provided for customers with active contracts by
request.

FIPS 140
========

OpenSSL has a FIPS module, which is `NIST-certified (#4282)
<https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282>`_
as FIPS 140-2 complaint.

PSRT server can have FIPS-140 mode activated with the following:

* Make sure the :ref:`distribution package <psrt_distr>` is installed or
  :ref:`compile PSRT to use system OpenSSL libraries <psrt_compile>`.

* Note that PKCS12 can not be used for TLS layer in FIPS-140 mode due to
  cryptographic functions limitations. Use TLS certificates/keys only instead.

* Enable FIPS-140 mode in the operating system

    * Ubuntu Linux 20.04 LTS:
      https://ubuntu.com/security/certifications/docs/fips-enablement

    * Other distributions: refer to OS/distribution technical documentation for
      more info

* Activate FIPS-140 mode by putting *fips: true* option in the server config,
  The option tells the server to enable FIPS-140 mode even if it is disabled by
  OS defaults:

.. code:: yaml

    # ..........
    proto:
        fips: true
    # ..............

* Note that if FIPS-140 can not be enabled but the option is set, the server
  will not go online.
