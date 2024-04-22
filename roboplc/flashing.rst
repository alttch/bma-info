Flashing
********

.. contents::

If :ref:`roboplc_manager` is installed, it is possible to flash the program
remotely via either its web interface or using *robo* CLI program. Note that
the program can be flashed only when the host is in *CONFIG* mode.

.. note::

   RoboPLC Manager is not a mandatory component. The program can be
   uploaded/run using any custom method.

Installing RoboPLC CLI
======================

The *robo* CLI tool is available in cargo package *roboplc-cli*:

.. code:: shell

   cargo install roboplc-cli

The tool should be installed on the client machine, where the Rust project is
being developed. It is also possible to include the tool into CI/CD pipelines.

Configuring
===========

The program can be used with no configuration. In this case all options are
provided either via system variables *ROBOPLC_URL*, *ROBOPLC_KEY* or via
command-line arguments.

The priority is the following:

* Command-line arguments (higher)
* Environment variables
* Configuration file (lower)

Configuration file
------------------

.. note::

   When a new project is created with *robo new* command, it is possible to
   specify the remote url, key and timeout. If specified, the values are stored
   in the *robo.toml* file.

The file must be placed into the projects root directory and named *robo.toml*.
The following options are available:

.. code:: toml

    [remote]
    url = "http://IP_OR_HOST:7700"
    key = "roboplc"
    #timeout = 60

    [build]
    #cargo = "cargo"
    #target = "x86_64-unknown-linux-gnu"
    #cargo-args = "--some-extra --cargo-arguments"

* **remote.url** URL of the RoboPLC Manager (with no trailing slashes etc.)

* **remote.key** host management key

* **remote.timeout** max API timeout (keep it high enough for binary uploading)

* **build.cargo** cargo executable. If not specified, *cross* is used if
  present in the PATH, otherwise the compilation falls back to the default
  *cargo*

* **build.target** the remote target architecture. If not specified, the host
  architecture is tried to be detected automatically, using RoboPLC Manager API

Cross-compilation
=================

For cross compilation, it is recommended to install `cross
<https://github.com/cross-rs/cross>`_:

.. code:: shell

   cargo install cross

Flashing
========

The program can be flashed using the following command:

.. code:: shell

   robo flash

The program is automatically compiled for the remote target (release) and
uploaded to the remote host.

* use **\--run** (short: **-r**) option to automatically start the program
  after flashing

* use **\--force** (short: **-f**) option to switch the remote into *CONFIG*
  mode before flashing.
