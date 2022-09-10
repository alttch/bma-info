HMI kiosk is a touch-panel display, which is either connected to embedded
UI-computer or has an embedded computer built-in.

.. figure:: ../screenshots/kiosk.png
    :scale: 50%
    :alt: EvaPanel

HMI Kiosk Manager service allows to orchestrate HMI kiosks and provides the
following functions:

* Provides a dedicated bus, isolated from the primary EVA ICS node bus, which
  restricts kiosk communications between each other and permits connections
  from specified IP addresses/networks only

* Allows to monitor states of connected kiosks

* Remotely controls kiosk navigation, zoom level and other UI functions

* Authenticates kiosks, including one-time-user authentication, so no sensitive
  information is stored on kiosk remotes

* Provides kiosk system management functions: turn the kiosk display on/off,
  reload the kiosk software, reboot the physical kiosk machine

.. figure:: ../schemas/kioskman.png
    :scale: 100%
    :alt: Kiosk management

To have the above functionality, the remote must run either `EvaPanel
<https://github.com/eva-ics/evapanel>`_ kiosk web browser or an alternative
software with compatible bus API.

.. note::

    Kiosk machines MUST have their host names matching the kiosk names, defined
    in the service.

    If a third-party kiosk browser is used, it must connect to the kiosk bus
    using the client name "eva.panel.KIOSKNAME".

Creating/managing kiosks
========================

To use :ref:`eva4_eva-shell` with the kiosk management service, the service
must be either deployed with ID "eva.kioskman.default" or "--kiosk-svc"
argument must be provided for all commands executed.

Creating a kiosk connection
---------------------------

After the service is deployed, a kiosk connection can be created with
:ref:`eva4_eva-shell`:

.. code:: shell

    eva kiosk create test
    eva kiosk edit test

Let us review the Kiosk configuration:

.. code:: yaml

    auth:
      login: username
      password: secret
    auto_login: true
    ip: 172.16.54.129/32
    name: test

The configuration allows the kiosk with host name "test" to connect the bus
from IP 172.16.54.129. After connecting and loading HMI web application, the
kiosk is automatically logged-in with the specified login and password.

Using one-time accounts for authentication
------------------------------------------

The service sends authentication credentials to kiosk browsers, which may be
insecure in case if a remote kiosk system is compromised. To avoid this,
one-time accounts can be used. Modify the config as the following:

.. code:: yaml

    auth:
      login: username
      acls:
      - operator
      - op_xtras
    auto_login: true
    ip: 172.16.54.129/32
    name: test

With the above configuration, the service creates an one-time user account
(using the :ref:`user authentication <eva4_user_account>` service, specified in
"auth_svc" kiosk manager configuration field) and uses its credentials to
log-in the kiosk into the web-HMI application.

The created one-time account has :ref:`ACLs <eva4_acl>` "operator" and
"op_xtras".

The created one-time account gets the login "OT.username.RANDOM" (where RANDOM
is a random sequence of letters and numbers), which can be parsed and used
later by HMI web application for its internal purposes.

Listing kiosk states
--------------------

To list defined kiosks and their states, use the command:

.. code:: shell

    eva kiosk list

To get more information about the particular kiosk: current opened page, CPU
architecture, browser version etc., use the command:

.. code:: shell

    eva kiosk info <kiosk_name>

Kiosks may have the following states:

* **preparing** a kiosk is loading HMI web application
* **loaded** the application is loaded and ready to be authenticated
* **active** the application is authenticated and running

Destroying kiosk connection
---------------------------

The command:

.. code:: shell

    eva kiosk destroy <kiosk_name>

destroys the kiosk configuration and immediately disconnects the kiosk from the
bus if connected. In case if kiosks are bulk-undeployed, their bus connections
are dropped as well.

More functions
--------------

To get list of all available functions, execute:

.. code:: shell

    eva kiosk -h

Kiosks and IaC-deployment
-------------------------

The standard :doc:`../iac` schema does not support kiosk objects. To deploy
kiosk configurations remotely, use :ref:`eva4_iac_bus_calls` of "kiosk.deploy"
and "kiosk.undeploy" kiosk management service methods.
