Quick start
***********

.. contents::

Create an empty vanilla JS (TypeScript) project, e.g. with `Vite
<https://vitejs.dev>`_:

.. code:: shell

   npx --yes create-vite quickstart --template vanilla-ts
   cd quickstart
   npm install
   npm install --save @eva-ics/webengine

Initialization
==============

.. code:: typescript

    import { Eva, EventKind, EvaError } from "@eva-ics/webengine";

    const eva = new Eva();

    // optionally register window.$eva for older HMI apps and for testing
    // purposes
    eva.register_legacy_globals();

    const log = eva.log; // Get the engine console logger

Configuration
=============

.. code:: javascript

    // login with API key
    eva.apikey = "secret";
    // or with login/password
    //eva.login = "operator";
    //eva.password= "secret";

    // required for development servers only, remove when hosted in EVA ICS HMI
    eva.api_uri = "http://localhost:7727";

    eva.watch("sensor:tests/temperature", (state) => {
      document.getElementById("temperature")!.innerHTML = state.value;
      });

    eva.on(EventKind.LoginSuccess, () => {
      log.info("logged into", eva.system_name());
    });

    eva.on(EventKind.LoginFailed, (err: EvaError) => {
      log.error("login failed", err);
    });

    eva.start();

Watching states and performing API calls
========================================

.. code:: javascript

    // watch example. Items can have multiple watchers, masks '*' are allowed.

    eva.watch("unit:tests/unit1", (state) => {
          document.getElementById("u").innerHTML = state.status?"ON":"OFF";
        });

    // action example, high-level API
    async function handle_click() {
        await eva.action.toggle("unit:tests/unit");
    }

    document.getElementById("u").addEventListener("click",
        () => { handle_click(); });

    // action example, low-level API
    document.getElementById("u").addEventListener("click", function() {
      eva.call("action_toggle", "unit:tests/unit1").then(function(data) {
          log.info("action sent to server, uuid: " + data.uuid)
          // watch action result
          eva.watch_action(data.uuid, function(action) {
            if (action.uuid) {
                if (action.finished) {
                    log.info("action is finished, status: " + action.status);
                }
            } else {
                log.error("server error");
            }
          });
        }).catch(function(err) {
          log.error("action failed, code: " + err.code + ", " + err.message);
        });

Any EVA ICS API method can be called. The methods are called using :doc:`EVA
ICS HMI JSON RPC API <../eva4/svc/eva-hmi>`.

See also: :ref:`eva4_quickstart_webhmi`.
