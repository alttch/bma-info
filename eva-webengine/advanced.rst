Advanced usage
**************

.. contents::

Multi-page interfaces, external authentication
==============================================

The primary page
----------------

If multi-page navigation contains links back to the main page, it should
perform a single authentication attempt to re-use an existing token:

.. code:: javascript

    let first_time_login = true;

    eva.on(EventKind.LoginFailed, (err) => {
      if (err.code === EvaErrorKind.ACCESS_DENIED) {
        // show login window
        if (first_time_login) {
          first_time_login = false;
        } else {
          // display err.message
        }
      } else {
        // handle server error
      }
    });

The same method is used when client can authenticate itself with basic
authentication on front-end sever and in :doc:`mobile clients <../eva4/evahi>`.

Secondary pages
---------------

By default, the interface should be programmed in a single HTML/J2 document
*ui/index.html* or *ui/index.j2*, however sometimes it's useful to split parts
of the interface to different html page files.

Each HTML document should initialize/login the engine to access its functions.
However if *eva_sfa_set_auth_cookies* is set to *true*, the secondary page can
log in user with the existing token:

.. code:: javascript

    eva.on(EventKind.LoginFailed, (err) => {
        // token is invalid or expired, redirect the user to the main page
        document.location = "/ui/";
    }

Authentication with front-end server
====================================

If there is a front-end server installed in front of UI and it has got HTTP
basic authentication set up, the fields **eva.login** and **eva.password** can
be empty and let the engine log in using the basic authentication
credentials.
