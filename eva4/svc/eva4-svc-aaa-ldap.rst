LDAP authentication service
***************************

.. contents::

LDAP basic authentication service

Installing/updating
===================

LDAP authentication service is not included into EVA ICS distribution. To install/update it,
either edit "eva/config/python-venv" :doc:`registry<../registry>` key, specify
the desired version in "extra" section (e.g. *eva4-aaa-ldap>=0.0.1*) and rebuild the
Python virtual environment (*/opt/eva4/sbin/venvmgr build*). Or execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr add eva4-aaa-ldap
    # or 
    /opt/eva4/sbin/venvmgr add eva4-aaa-ldap==N # where N = version number

The latest eva-shell version number can be obtained from
https://pypi.org/project/eva4-aaa-ldap/

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-aaa-ldap.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-aaa-ldap.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.aaa.ldap /opt/eva4/share/svc-tpl/svc-tpl-aaa-ldap.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.aaa.ldap__auth.user:

auth.user
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Authenticates a client using a local user account*
   * - Parameters
     - required
   * - Returns
     - The method returns errors if auth is not successful

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
   * - **password**
     - String
     - Account password (plain text)
     - **yes**
   * - **timeout**
     - f64
     - Max operation timeout
     - no
   * - **xopts**
     - map<String/Any>
     - Extra options map (e.g. otp=code for two-factor auth)
     - no
   * - **externally_verified**
     - bool
     - DANGEROUS: Skip password verification, assume it is already done by an external agent
     - no
