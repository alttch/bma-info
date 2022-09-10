OTP 2nd-Factor authentication service
*************************************

.. contents::

Provides OTP 2FA, see :doc:`../2fa` for more details.

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-aaa-otp.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-aaa-otp.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.aaa.otp /opt/eva4/share/svc-tpl/svc-tpl-aaa-otp.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.aaa.otp__otp.check:

otp.check
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Checks OTP password for the given account*
   * - Parameters
     - required
   * - Returns
     - If OTP is required, returns "OTP|svc|REQ" in the error message, for new OTP setup returns "OTP|svc|SETUP=SECRET"

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **login**
     - String
     - Account login
     - **yes**
   * - **otp**
     - String/null
     - One-time password
     - **yes**

.. _eva4_eva.aaa.otp__otp.destroy:

otp.destroy
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Destroys OTP for the account*
   * - Parameters
     - required
   * - Returns
     - *nothing*

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - Account login
     - **yes**
