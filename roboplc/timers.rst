Timers and intervals
********************

Timers
======

Timers are one of the primary automation component for almost any project.

RoboPLC crate re-exports `AtomicTimer` component from
`atomic_timer <https://crates.io/crates/atomic_timer>`_ crate, which is also a
part of RoboPLC project.

The timer is truly atomic, meaning that it can be safely shared between threads
with no mutexes or other synchronization primitives.

Code example:

.. code:: rust

    use roboplc::AtomicTimer;

    let timer = AtomicTimer::new(Duration::from_secs(1));
    for _ in 0..100 {
        if timer.reset_if_expired() {
          // the timer has been reset, handle the expiration event
        } else {
          // do some work
        }
    }

The main benefit of `AtomicTimer` is that its state can be safely serialized
and de-serialized, despite of the real system `CLOCK_MONOTONIC` value, mean it
can be a part of :doc:`persistent state <state>`. However, to ensure no actions
are taken while a timer is being stored, it is recommended to put atomic timer
objects under a mutex.

The `AtomicTimer API
<https://docs.rs/atomic-timer/latest/atomic_timer/struct.AtomicTimer.html>`_ is
pretty flexible and can satisfy almost any automation logic out of the box.

Intervals
=========

By default, a new project gets both `roboplc` and `rtsc
<https://crates.io/crates/rtsc>`_ crate (the last one is also a part of RoboPLC
project) as dependencies. The `rtsc` crate provides a reliable and efficient
way to work with time intervals.

Let us review the following code:

.. code:: rust

   loop {
       // do some work
       thread::sleep(Duration::from_millis(100));
   }

The example above is a typical way to implement a loop with a fixed interval,
but it has a drawback: the interval is not guaranteed to be precise, as the
`work`, `sleep` syscall as well as the loop itself can introduce some
additional delay.

This is absolutely unacceptable for mission-critical workers, where time often
plays crucial role.

It is not a rocket science to implement a precise interval:

.. code:: rust

    let mut next_start = Instant::now() + Duration::from_millis(100);
    loop {
        // do some work
        let now = Instant::now();
        if now < next_start {
            thread::sleep(next_start - now);
        } else {
            warn!("The loop is running too slow");
        }
        next_start += Duration::from_millis(100);
    }

however `Interval
<https://docs.rs/rtsc/latest/rtsc/time/struct.Interval.html>`_ component does
it out of the box, providing also additional features like configurable missed
tick behavior and iteration interface.

.. code:: rust

    use rtsc::time::interval;

    for loop_state in interval(Duration::from_millis(100)) {
        // do some work
        // optionally, check if there was a missed tick
        if !loop_state {
            warn!("The loop is running too slow");
        }
    }

The `Interval` component or similar are the most recommended way to implement
precise time intervals in synchronous code.

Note that the component can not be serialized or sent between threads, unless
wrapped with a mutex, so it can not be a part of the persistent state. The main
approach is to:

* Use timers for persistent state and where the basic interval logic is not
  enough.

* Use intervals for worker loops, which should be limited by time to prevent
  CPU or I/O overuse.

* Also, use intervals for worker loops, which should sample data with a
  specific frequency.
