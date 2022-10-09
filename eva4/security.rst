Security
********

.. contents::

Functionality
=============

EVA ICS uses `OpenSSL <https://www.openssl.org>`_ cryptographic modules
functions for:

* Token generation
* AES encryption/decryption (replication services)
* Data and password hashing

The passwords are always hashes in PBKDF2-HMAC mode (16-byte salt, 100k
iterations), unless :ref:`user accounts are deployed <eva4_iac_aaa>` with
pre-calculated SHA-hashes (not recommended for production systems).

Third-party services may use other cryptographic modules, consider reviewing
the corresponding security audits.

* EVA ICS has no built-in TLS/SSL for HMI, consider using :doc:`hmi/frontend`.

* If :doc:`PSRT <../psrt/index>` is used for data replication, read :doc:`PSRT
  Security <../psrt/security>`.

.. _eva4_native:

Native packages
===============

Supported distributions
-----------------------

========================= ===== ======================================================== ==================
CPU                       OS    Distribution                                             Arch code
========================= ===== ======================================================== ==================
x86-64 (64-bit Intel/AMD) Linux `Ubuntu 20.04 LTS <https://releases.ubuntu.com/focal/>`_ x86_64-ubuntu20.04
========================= ===== ======================================================== ==================

OpenSSL versions
----------------

Native packages use system cryptographic modules only. If vulnerabilities are
found in the actual versions, this can be fixed by applying system updates
in the regular way.

Switching to native
-------------------

Installing
~~~~~~~~~~

By default, EVA ICS node is :doc:`installed <install>` installed from an
universal package. The behaviour can be changed with adding *--force-arch*
option to the installer, e.g.:

.. code:: shell

    ./install.sh --force-arch x86_64-ubuntu20.04 -a --hmi

When native binaries are installed and OS upgrade is planned (e.g. Ubuntu 20.04
LTS -> Ubuntu 22.04 LTS), you MUST insure the native EVA ICS package exists for
the new OS version, otherwise there is no warranty that the node will work
properly.

Switching existing systems to native and vice-versa
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. warning::

    This operation is relatively safe, but may lead to serious problems in rare
    cases, full node backup is highly recommended.

* The current node architecture can be obtained with the command:

.. code:: shell

    /opt/eva4/svc/eva-node --mode info | jq -r .arch

* Open https://pub.bma.ai/eva4 and make sure the native package exists for the
  installed version, perform the node update if required.

* It is highly recommended to use packages of the same version and build only.

* Execute the following command, where the last URL parameter points to the
  selected EVA ICS package (*.tgz* tarball):

.. code:: shell

    cd /opt/eva4
    sudo -s
    curl https://pub.bma.ai/eva4/tools/switch-arch | sh /dev/stdin https://pub.bma.ai/eva4/4.0.0/stable/...

* DO NOT INTERRUPT the process until completed.

* If the node is unable to start, restore it from the backup or switch EVA ICS
  architecture back to the previous one using the same way.

Universal packages
==================

========================= ===== ============
CPU                       OS    Arch code
========================= ===== ============
x86-64 (64-bit Intel/AMD) Linux x86_64-musl
aarch64 (64-bit ARM)      Linux aarch64-musl
========================= ===== ============

OpenSSL versions
----------------

Default supplied universal binaries (both free and Enterprise version) use
"vendored" (built-in) OpenSSL libraries. This allows to use the binaries
without external dependencies, however may lead to security problems if
vulnerabilities are found in the actual OpenSSL version.

Custom :doc:`enterprise` native binaries for particular OS/distributions can be
provided for customers with active contracts by request.

FIPS 140
========

OpenSSL has a FIPS module, which is `NIST-certified (#4282)
<https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282>`_
as FIPS 140-2 complaint.

Starting from v4.0.0 build 2022100903, EVA ICS can have FIPS-140 mode activated
with the following:

* Make sure the :ref:`native package <eva4_native>` is installed.

* Enable FIPS-140 mode in the operating system

    * Ubuntu Linux 20.04 LTS:
      https://ubuntu.com/security/certifications/docs/fips-enablement

    * Other distributions: refer to OS/distribution technical documentation for
      more info

* Activate FIPS-140 mode by putting *FIPS=true* option in
  :ref:`eva4_eva_config`, The option tells the node to enable FIPS-140 mode
  even if it is disabled by OS defaults.

* After the node restart, FIPS mode is activated and the message "FIPS:
  enabled" appears in the node log.

* All the :doc:`default services <core_svcs>` and all third-party services,
  based on Rust :doc:`SDK <sdk/index>` >= 0.1.108 activate FIPS mode
  automatically at launch.

* Note that if FIPS-140 can not be enabled but the option is set, the node will
  not go online.

Limitations:

* If using :doc:`local_cluster`, all secondary points MUST use an operating
  system with FIPS mode enabled.

* :doc:`svc/eva4-svc-repl-legacy` does not use FIPS-complaint cryptographic
  methods.
