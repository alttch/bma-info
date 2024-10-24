Mobile clients
**************

Android
=======

EVA ICS Control Center client
-----------------------------

EVA ICS has got the official EVA ICS Control Center client to access
:doc:`HMI<svc/eva-hmi>` from Android-based mobile phones.

F-Droid repository (recommended): https://pub.bma.ai/fdroid/repo

Direct APK download URL: https://pub.bma.ai/evacc/

The client is evaHI-based application, so it can be `configured in the same way
<https://github.com/alttch/evaHI#create-configuration-file-on-your-web-server>`_.

:doc:`svc/eva-hmi` automatically maps *ui/.evahi* directory to */.evahi*
URI. If a front-end server is used, URI should be accessible without user
authentication to let all application features work properly.

:doc:`EVA WebEngine <../eva-webengine/index>` function *eva.hiQR* can be used
to generate configuration QR code for the current authenticated user.

.. youtube:: 1yU3oEUMQpQ

Building own client
-------------------

A custom white-label Android client can be built from sources, customizing
application class, name, menu, icons. Refer to `evaHI
<https://github.com/alttch/evaHI>`_ building instructions.

Authentication
--------------

evaHI sends username/password only if basic authentication is set up. However
API login method automatically detects evaHI client (by HTTP *User-Agent*
header) and ask it to provide authentication credentials.

If there is no front-end with basic authentication set up for all clients, HMI
can display login form for everyone, but let evaHI-based clients to try logging
in automatically via :doc:`../eva-webengine/index`:

.. code-block:: javascript

    if (eva.in_evaHI) {
        eva.start();
    } else {
        // show login form
    }

Apple iOS and other mobile platforms
====================================

Currently we have no plans to release native iOS client, iPhone users may
access HMI via 3rd-party apps or built-in mobile browser.

