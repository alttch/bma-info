Why RoboPLC?
************

RoboPLC has been founded as a project to write industrial automation and
robotics Linux firmware in Rust with no overhead.

The components, provided by the `roboplc <https://crates.io/crates/roboplc>`_
and other project crates, cover the majority of the most common automation
tasks. But RoboPLC is not only a set of libraries, its goal is to be a complete
eco-system to reduce the time and boilerplate required.

We understand that some existing projects can not be ported to RoboPLC due to a
huge codebase or other reasons. But we believe that RoboPLC can be the best
choice for new projects or creating certain additional programs, tests or
real-time tools for existing ones.

Let us review typical tasks.

.. contents::

Starting a new project
======================

With pure Rust/cargo:

* Create a new project with `cargo new`.

* Add required dependencies to `Cargo.toml`.

* Copy/paste certain parts of your typical template.

* Make sure it compiles.

With RoboPLC:

* Create a new project with `robo new`. That is it.

Connecting I/O
==============

With pure Rust/cargo:

* Find a required protocol crate.

* Make sure it is not abandoned or broken.

* Try to connect to your device.

* Find the I/O is not reliable. Patch the crate. Replace `std` I/O components
  with some wrappers. Manually handle errors.

With pure Rust/cargo:

* A dozen of protocols are supported out of the box. Others can be added either
  as-is or easily modified to use the provided reliable I/O wrappers.

Make it real-time
=================

With pure Rust/cargo:

* Refresh your knowledge of real-time programming for Linux.

* Find a CPU affinity crate. Find a thread scheduling crate.

* Make sure all the found components work.

* Design some regimentation to avoid the code turning into a mess.

* Test that everything works as expected.

With RoboPLC:

A single derive and it is done:

.. code:: rust

   #[derive(WorkerOpts)]
   #[worker_opts(cpu = 2, priority = 80, scheduling = "fifo")]
   struct MyWorker {}

Test your program
=================

With pure Rust/cargo:

* Make sure you have access to the target device.

* compile the binary.

* `scp target/aarch64-unknown-linux-gnu/...` (is there really aarch64? or
  x86_64? why these paths are so long...)

* ssh to the device, run the binary.

* Next time I definitely need to write a `Makefile`/`justfile` or a script for
  this. Or not, it was a one-time task...

* (runs `scp` again) next time definitely!

With RoboPLC:

.. code:: shell

   robo x

(see more: :doc:`flashing`).

Deploy your program
===================

With pure Rust/cargo:

* Repeat the steps from the previous case.

* Should I go with `systemd`? Or write some own launcher?

* What should be the directory structure? Logging? (return to the code and add
  a logger).

* I need to remember about all the file system permissions...

* A customer: "It doesn't start after reboot". Fixing.

* (calling to a colleague): are you uploading your firmware version too? I see
  `The file is busy` error.

With RoboPLC:

.. code:: shell

   robo flash

(see more: :doc:`flashing`).

Monitoring
==========

With pure Rust/cargo:

* Let us start with prints.

* Then switch to a logger.

* Find a crate for metrics. Learn/remember how to use it.

* Make sure everything is working.

* Find some UI to display everything.

With RoboPLC:

.. code:: rust

   // install metrics exporter in Prometheus and metrics-scope formats
   roboplc::metrics_exporter().set_bucket_duration(
        Duration::from_secs(600)).unwrap().install().unwrap();

   // Use it
   gauge!("my_gauge", 42.0);

Open :doc:`RoboPLC Manager <./config>` and enjoy.

Sending control commands
========================

With pure Rust/cargo:

* This is a firmware, it should get control commands with a certain protocol!

* This protocol is too hard/annoying to be mocked. I need to create some basic
  interface to send commands directly...

* (spending hours on it)

* (spending days to make it more user-friendly)

With RoboPLC:

Add :doc:`./rflow-chat` and enjoy.

Debugging image processing and computer vision
==============================================

With pure Rust/cargo:

* Print a vector of pixels. Ensure humans can not view it as an image.

* Print a width/height/length of the image. Try getting something from it.

* Store the image to a file. Open it in an image viewer.

* The image is broken. Oh, I need to store an image after the each step while I
  am processing it.

* Put the result blobs on the image to see if the processing works. It doesn't
  work. Is there a processing bug or the blobs are just drawn in the wrong
  place?

With RoboPLC:

Add :doc:`./video` and the problem is solved.
