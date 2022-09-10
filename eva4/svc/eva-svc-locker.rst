Shared lock service
*******************

.. contents::

Allows other services to work with shared locks

Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-locker.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-locker.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.svc.locker1 /opt/eva4/share/svc-tpl/svc-tpl-locker.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.

.. _eva4_eva.svc.locker__list:

list
----

.. list-table::
   :header-rows: 0

   * - Description
     - *List status of all locks*
   * - Parameters
     - *none*
   * - Returns
     - List of lock status


*Return payload example:*

.. code:: json

  [
    {
        "id": "lock1",
        "locked": false
    },
    {
        "id": "lock2",
        "locked": true
    },
  ]
  

.. _eva4_eva.svc.locker__lock:

lock
----

.. list-table::
   :header-rows: 0

   * - Description
     - *Acquire a shared lock*
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
     - lock ID
     - **yes**
   * - **expires**
     - f64
     - auto-release timer (seconds)
     - **yes**
   * - **timeout**
     - f64
     - max operation timeout (seconds)
     - no

.. _eva4_eva.svc.locker__status:

status
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get status of a lock*
   * - Parameters
     - required
   * - Returns
     - Lock status (struct)

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **i**
     - String
     - lock ID
     - **yes**


*Return payload example:*

.. code:: json

  {
      "id": "lock1",
      "locked": false
  }
  

.. _eva4_eva.svc.locker__unlock:

unlock
------

.. list-table::
   :header-rows: 0

   * - Description
     - *Unlock previously acquired lock*
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
     - lock ID
     - **yes**
