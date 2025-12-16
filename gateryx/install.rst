Installation
************

.. contents::

System requirements
===================

- 64-bit Linux operating system (x86_64 or ARM64)

- OpenSSL v3 or higher

Installing from pre-built packages
==================================

For Debian/Ubuntu and other deb-based distributions, .deb packages can be used
via the apt repository:

.. code:: bash

   curl https://pub.bma.ai/apt/setup | sudo sh
   sudo apt-get install gateryx-server
   # for admin client only: gateryx-client

After installation, :doc:`configuration<./config>` files are located in
**/etc/gateryx/**.

The server package automatically enabled *gateryx* systemd service, but it
must be manually started for the first time, after the configuration is set up:

.. code:: bash

   sudo systemctl start gateryx

Supported distributions:

- Ubuntu 22.04 LTS (Jammy Jellyfish) and later
- Debian 12 (Bookworm) and later

Building from source
====================

To build Gateryx from source, ensure you have the following dependencies installed:

* Rust toolchain (See https://rustup.rs/) for building the core server and CLI

* Node.js (v20 or higher) for web UI components (See https://nodejs.org/)

Clone the repository, then run the following commands:

.. code:: bash

   cargo install just
   git clone https://github.com/eva-ics/gateryx
   cd gateryx
   just auth-web system-web
   cargo build --release

The built binaries will be located in `target/release`. The auth and system web
applications will be in `auth/dist` and `system/dist` respectively.

To install the client only, do not clone the entire repository; instead, run:

.. code:: bash

   cargo install gateryx

Running in Docker/Kubernetes
============================

The official images are available on Docker Hub:

* https://hub.docker.com/r/bmauto/gateryx - x86_64
* https://hub.docker.com/r/bmauto/gateryx-arm64 - ARM64

To use in production it is recommended to mount the following volumes:

* **/etc/gateryx** - configuration files

* **/var/gateryx/log** - log files (if enabled and the default path is not changed in the config)

Custom authentication UI, system UI and plain web root can be mounted to
*/var/gateryx/www* (if enabled and the default path is not changed in the
configs).
