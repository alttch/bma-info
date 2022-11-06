Active directory auth service
*****************************

.. contents::

**Requires** :doc:`../enterprise`.

Active directory user authentication service, see :doc:`../aaa` for more details.

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-aaa-msad.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-aaa-msad.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.aaa.msad /opt/eva4/share/svc-tpl/svc-tpl-aaa-msad.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.aaa.msad__auth.user:

auth.user
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Authenticates a client using Active Directory account*
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

.. _eva4_eva.aaa.msad__cache.delete:

cache.delete
------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Delete cache entry for a user*
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

.. _eva4_eva.aaa.msad__cache.purge:

cache.purge
-----------

.. list-table::
   :header-rows: 0

   * - Description
     - *Purge cache*
   * - Parameters
     - *none*
   * - Returns
     - *nothing*

.. include:: ../include/msad.rst

