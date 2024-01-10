Mailer service
**************

.. contents::

Allows other services to send email notifications

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-mailer.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-mailer.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.svc.mailer /opt/eva4/share/svc-tpl/svc-tpl-mailer.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.svc.mailer__send:

send
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Sends a e-mail letter*
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
   * - **rcp**
     - String/Vec<String>
     - recipients (emails)
     - no
   * - **i**
     - String/Vec<String>
     - recipients (user accounts)
     - no
   * - **subject**
     - String
     - e-mail subject
     - no
   * - **text**
     - String
     - e-mail text
     - no
