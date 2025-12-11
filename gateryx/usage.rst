Usage
*****

Authentication
==============

If a user has no JWT token issued yet, Gateryx will redirect the user to the
internal authentication web app. The authentication form accepts both passwords
and passkeys if enrolled. The passkey selection is offered automatically by the
browser.

.. figure:: ss/auth.png
    :width: 265px

In case if the application group is deployed as `APP.domain`, the
authentication app works as a single-signon (SSO) point, no repeated login is
required until the token expires.

**Trust this device** mean to store the issued token in the browser's for the
all time it has been issued.

.. note::

   If a passkey is used for authentication, the device is considered trusted no
   matter if the checkbox is selected or not.

Web applications
================

The majority web applications work out-of-the box, no special
configuration/rules are required. Gateryx is designed to resolve problems
automatically, in case of any issues please contact the product support.

Certain web applications may require custom web socket settings to work
properly. Refer to :doc:`configuration <config>` for more details.

System application
==================

If the system application is configured, users can access it via
`https://gate.domain/` (or a custom subdomain if set).

The system application provides the web application list and a minimalistic
interface, which allows users to:

.. figure:: ss/sysui.png
    :width: 465px

* Change password - works only if the authenticator is set to `db` (internal
  database).

* Add a passkey - available only for the application group of the same domain.

* Logout - terminates the session and removes the token from the browser.
