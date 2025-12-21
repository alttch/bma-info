Processing lmacro calls
***********************

.. contents::

:ref:`eva4_lmacro` scenarios are powerful tools to execute various code between
EVA ICS nodes with specific arguments and permissions. Starting from `0.3.77`,
:doc:`EVA ICS Rust SDK <./index>` has got lmacro processor out of the box to
make lmacro integration seamless and straightforward.

Usage
=====

Define a processor and register lmacro handlers:

.. code:: rust

   use eva_sdk::controller::LmacroProcessor;

   let mut lmp_builder = LmacroProcessor::builder();
   lmp_builder.register(
        "lmacro:some/name".parse().unwrap(),
        closure_or_function
   );
   let lmp = lmp_builder.build();

Then use the processor to handle lmacro calls in EAPI handler:

.. code:: rust

    match method {
        // .....
        "run" => {
            let action = unpack(event.payload())?;
            let lmp = lmp.clone();
            // for synchronious execution do not spawn a new task
            tokio::spawn(async move {
                lmp.execute(action).await;
            });
            Ok(None)
        }
        // .....
    }

.. note::

   The processor does not allow to use external variables inside lmacro
   handlers. Consider using service static context if required.

Full service example
====================

.. literalinclude:: ../../sdk-examples/rust/lmp/src/main.rs
   :language: rust
