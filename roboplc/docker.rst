Running in Docker
*****************

Running PLC programs in `Docker <https://www.docker.com>`_ is a modern trend,
supported by leading PLC and industrial computer manufacturers.

Docker adds almost no overhead to the execution of PLC programs, running them
in containers is more related to the security, isolation and deployment
aspects.

.. contents::

Creating RoboPLC project for Docker
===================================

See also: :doc:`flashing`.

To create a RoboPLC project for Docker, execute:

.. code:: shell

    robo new project1 --docker x86_64

(for ARM architecture, use `--docker aarch64` instead). The project is created
with the following `robo.toml` file:

.. code:: toml

   [remote]
   url = 'docker://project1'

   [build]
   target = 'x86_64-unknown-linux-gnu'

Where URL contains `docker://` prefix and the target image name.

The command also creates `Dockerfile`:

.. code:: dockerfile

    FROM bmauto/roboplc-x86_64:latest
    COPY ./target/x86_64-unknown-linux-gnu/release/project1 /var/roboplc/program/current

Building Docker image
=====================

The Docker image can be build in the traditional way, using `docker`
executable, or with `robo`. If the remote URL starts with `"docker://"`, `robo
flash` builds a local Docker image instead of flashing the program to the
remote:

.. code:: shell

    robo flash

.. note::

   To build the image, the cargo target directory must be below the project
   root.

The Docker container includes :ref:`roboplc_manager` running in restricted
mode:

* The manager allows only to get program stats and monitoring.

* The manager requires no authentication.

* The PLC program is automatically started and always running

* The port is mapped to the local host port 7700, the manager is available at
  `http://127.0.0.1:7700`

If there is Docker installed on the local machine, the image can be
automatically started locally after building:

.. code:: shell

    robo flash --run

.. note::

   If the program inside the container uses privileged system calls, such as
   heap pre-allocation, task scheduling, etc., the target container must be
   started in privileged mode.

To start the container in privileged mode with `robo`, use:

.. code:: shell

    robo flash --run --force

After the container is ready, it can be pushed to a custom Docker registry and
deployed on a remote machine. Refer to your Docker registry/engine
documentation for more information.

Environment variables
=====================

* **ROBOPLC_DOCKER_TAG** by default, the Docker image is tagged with the
  program version from `Cargo.toml`. To override the tag, set the
  `ROBOPLC_DOCKER_TAG` environment variable.

* **ROBOPLC_DOCKER_PORT** by default, the manager is available at
  127.0.0.1:7700. To override the port, set the `ROBOPLC_DOCKER_PORT`
  environment variable. To disable port mapping, set the variable to empty.

* **ROBOPLC_DOCKER_OPTS** passed to the `docker` executable as-is (requires
  `roboplc-cli` 0.6.2 or later).

Limitations
===========

As containerized programs do not support :doc:`flashing <flashing>`, certain
:doc:`pro` features are not available as well:

* :ref:`roboplc_rollback`

* :ref:`roboplc_live_updates`

Use the container manager / orchestrator to manage the program life cycle.

Docker on Windows, Mac OSX and some other platforms does not have certain
Linux system calls, such as `sched_setscheduler`. These platforms should not be
used for production, for testing and development purposes, use the following
workaround:

.. code:: rust

  if !roboplc::is_production() || std::env::var("SIMULATE").is_ok_and(|v| v == "1") {
       roboplc::set_simulated();
  }

Then run the container as:

.. code:: shell

   ROBOPLC_DOCKER_OPTS="-e SIMULATE=1" robo flash -r
