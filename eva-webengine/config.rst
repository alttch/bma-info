Configuring
************

.. contents::

The primary class variables are get and set directly, e.g.:

.. code:: javascript

   eva.login = "operator";

.. contents::

API and Authentication
======================

Authentication variables should set before *start()* method is called - either
login/password or API key. If there is *auth* cookie set, API token variable is
filled by the engine automatically.

* **login** user login

* **password** user password

* **xopts** extra login options (EVA ICS v4 only)

* **apikey** API key

* **client_id** report a custom client id to the server (e.g. a custom-defined
  ID of the current UI page)

* **api_uri** API URI (do not required if working in a web browser)

* **set_auth_cookies** if true (default), *auth* cookie is used to store API
  token.

* **api_token** current API token, filled automatically after login. Can be
  filled manually if obtained e.g. for an embedded JS HMI application.

Item processing, special
========================

* **debug** enable debug mode (1), enable verbose debug mode (2)

* **log.records** set max. log records to retrieve from the server.

* **state_updates** Possible values:

  * true (default) - get states of all items API key has access to

  * [ 'oidmask1', 'oidmask2' ] - (v4) specified subscriptions for EVA ICS v4 (e.g. 'sensor:env/#')

  * false - disable state updates

* **ws_mode** use web sockets. Set automatically if WebSocket object is
  detected, can be set to "false" manually before engine start.

* **clear_unavailable** if true, item state is set to null, if the one is no
  longer available on the back-end (default: false).

* **log_params** log processing params

Read-only informational variables
=================================

* **version** engine version

* **authorized_user** current authorized user

* **logged_in** boolean, set to true when user is logged in

* **ws** engine web socket object

* **log.level** current log level (for log processing)

* **log_level_names** dictionary of log level names (code: name)

* **in_evaHI** true if the engine runs in evaHI-based web client

* **server_info** contains actual server info (output of API *test* method)

* **tsdiff** time difference between client and server

Loading configuration
=====================

The engine has got a built-in method to load configuration JSON:

.. code:: typescript

   eva.load_config("path/to/config.json").then((_config) => start_your_hmi());

If the path is not specified, the engine tries to load *config.json* file from
the path where the compiled JS is located.

The config has the following format:

.. code:: json

    {
      "engine": {
        "api_uri": "API_URI",
        "api_key": "SECRET",
        "debug": true,
        "login": "user",
        "password": "secret",
        "set_auth_cookies": true,
        "state_updates": true,
        "wasm": false,
        "ws_mode": true,
        "log_params": {
          "level": 20,
          "records": 200
        }
        "interval": {
          "ajax_reload": 2,
          "log_reload": 2,
          "action_watch": 0.5,
          "heartbeat": 5,
          "reload": 5,
          "restart": 1,
          "ws_buf_ttl": 0
        }
      }
    }

All the configuration fields are optional.
