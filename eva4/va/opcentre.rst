Operation centre
****************

.. contents::

The :doc:`vendored UI application <index>` allows operators to create custom
dashboards, perform typical monitoring and analytics tasks.

Short URL:

    \http://HOST:PORT/va/opcentre/

.. figure:: ../screenshots/va_opcentre.png
    :width: 505px
    :alt: Operation Centre

Access levels
=============

No special access level required to use the application. However, special
permissions in :ref:`eva4_acl` required for users to read/create dashboard with
IDC:

.. code:: yaml

   # to read custom dashboards from the server
   read:
   # ...
    pvt:
      - vendored-apps/opcentre/idc/dashboards/#
   # to write custom dashboards to the server
   write:
   # ...
    pvt:
      - vendored-apps/opcentre/idc/dashboards/#

User access can be also limited to read/write specific dashboards only.
