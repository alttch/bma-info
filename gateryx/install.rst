Installation
************

.. contents::

System requirements
===================

- 64-bit Linux operating system (x86_64 or ARM64)

- OpenSSL v3 or higher

Installing from pre-built packages
==================================

For Debian/Ubuntu and other deb-based distributions, .deb packages can be used,
downloaded either directly or via the apt repository:

.. code:: bash

   curl https://pub.bma.ai/apt/setup | sudo sh
   sudo apt-get install gateryx-server
   # for admin client only: gateryx-client

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
   just build-x86_64-unknown-linux-gnu # for aarch64 use build-aarch64-unknown-linux-gnu

To install the client only, do not clone the entire repository; instead, run:

.. code:: bash

   cargo install gateryx
