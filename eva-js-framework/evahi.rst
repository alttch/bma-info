QR code for evaHI-based apps
****************************

the method *hiQR* generates QR code for evaHI-compatible apps (e.g. for EVA ICS
Control Center mobile app for Android). Current framework session must be
authorized using user login. If $eva.password is defined, QR code also contain
password value.

Example:

.. code:: javascript

  $eva.hiQR("evaccqr", {password: null});
