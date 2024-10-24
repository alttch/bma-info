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

The file must be placed into the root directory of the project and named
*robo.toml*. If a project has no *Cargo.toml* or its present in a subfolder,
*robo.toml* from the current directory is used. The following options are
available:

.. code:: toml

    [remote]
    url = "http://IP_OR_HOST:7700"
    key = "roboplc"
    #timeout = 60

    [build]
    #cargo = "cargo"
    #target = "x86_64-unknown-linux-gnu"
    #cargo-args = "--some-extra --cargo-arguments"

    [build-custom]
    #command = "some complex command to build"
    #file = "target file to upload"

* **remote.url** URL of the RoboPLC Manager (with no trailing slashes etc.)

* **remote.key** host management key

* **remote.timeout** max API timeout (keep it high enough for binary uploading)

* **build.cargo** cargo executable. If not specified, *cross* is used if
  present in the PATH, otherwise the compilation falls back to the default
  *cargo*

* **build.target** the remote target architecture. If not specified, the host
  architecture is tried to be detected automatically, using RoboPLC Manager API

.. warning::

   As the file contains the remote key, make sure it has got proper permissions
   and do not publish it to public source repositories.

Cross-compilation
=================

For cross compilation, it is recommended to install `cross
<https://github.com/cross-rs/cross>`_:

.. code:: shell

   cargo install cross

Custom compilation
==================

A completely custom compilation can be done using the following settings

.. code:: toml

    [build-custom]
    command = "some complex command to build"
    file = "target file to upload"

If *build-custom* section is present and *command* field is specified, *build*
section is ignored.

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

Debugging/testing
=================

The command

.. code:: shell

   robo x

Executes the program on the remote host in a virtual terminal and outputs the
result to the local console. This mode can be useful for debugging/testing
purposes.

.. note::

   The program does not capture the local console standard input on Microsoft
   Windows.

This mode also accepts additional command-line arguments, which are passed to
the program:

.. code:: shell

   robo x -- -a -b -c arg1 arg2

.. warning::

   It is not recommended to execute programs remotely on live production
   systems.

Switching between remotes
=========================

The file *robo.toml* contains the primary remote where the program is flashed.
Sometimes it is useful to switch between multiple remotes, e.g. to test the
program on different devices.

RoboPLC CLI allows to create a list of the remotes in a file named
*.robo-global.toml*. The file must be placed in the home directory of the user.

Example:

.. code:: toml

    [remote.system1]
    url = "http://192.168.20.200:7700"
    key = "secret1"

    [remote.other]
    url = "http://192.168.20.201:7700"
    key = "secret2"

When executing RoboPLC commands, specify the remote name instead of the URL,
e.g.:

.. code:: shell

   robo -U system1 stat
   robo -U system1 flash

.. warning::

   As the file contains remote keys, make sure it has got proper permissions.
