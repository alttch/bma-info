Quick start
***********

.. contents::

Initialization
==============

For Node.js:

.. code:: javascript

    eva_framework = require("@eva-ics/framework");

    // the default object
    $eva = eva_framework.$eva;

    // or for multiple targets
    // $eva = new eva_framework.EVA();

For web browsers:

.. code:: html

  <script src="eva.framework.min.js"></script>

Configuration
=============

.. code:: javascript

    $eva.login = "operator";
    $eva.password = "123";

    // not required for web browsers
    $eva.api_uri = "http://localhost:7727";

    // turn on debug mode
    // $eva.debug = 1;

    $eva.on("login.success", () => {
      // called when login is successful, states and server info are loaded
    });

    $eva.on("login.failed", (err) => {
      // do some stuff
      console.log("LOGIN FAILED");
      // login failed not due to invalid credentials - will retry soon
      if (err.code != -32002) {
        setTimeout(function(){$eva.start()}, 2000);
      }
    });

    // start framework and log in
    $eva.start();

Watching states and performing API calls
========================================

.. code:: javascript

    // watch example. Items can have multiple watchers, masks '*' are allowed.

    $eva.watch("unit:tests/unit1", (state) => {
          document.getElementById("u").innerHTML = state.status?"ON":"OFF";
        });

    // action example, high-level API
    async function handle_click() {
        await $eva.action.toggle("unit:tests/unit");
    }

    document.getElementById("u").addEventListener("click",
        () => { handle_click(); });

    // action example, low-level API
    document.getElementById("u").addEventListener("click", function() {
      $eva.call("action_toggle", "unit:tests/unit1").then(function(data) {
          console.log("action sent to server, uuid: " + data.uuid)
          // watch action result
          $eva.watch_action(data.uuid, function(action) {
            if (action.uuid) {
                if (action.finished) {
                    console.log("action is finished, status: " + action.status);
                }
            } else {
                console.log("server error");
            }
          });
        }).catch(function(err) {
          console.log("action failed, code: " + err.code + ", " + err.message);
        });

Any EVA ICS API method can be called. The methods are called using :doc:`EVA
ICS HMI JSON RPC API <../eva4/svc/eva-hmi>`.

