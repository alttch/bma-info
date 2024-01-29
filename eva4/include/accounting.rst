Functionality
=============

The service provides node-local or cloud-wide accounting. Accounting measures
the resources used by a user during access. It also may contain critical system
messages sent by the core or services themselves.

Cloud-wide accounting
---------------------

For cloud-wide accounting the local accounting :ref:`eva4_lvar` must be
replicated between nodes.

Supported storages
------------------

* `SQLite <https://www.sqlite.org/>`_ (default, no database server required)

* `PostgreSQL <https://www.postgresql.org/>`_

* `Elasticsearch <https://www.elastic.co/elasticsearch>`_

A system can have multiple event storages using multiple service instances. In
such configuration **only one** service instance should have
*accounting_lvar_oid* set in its configuration. Other services MUST NOT handle
the lvar and work as data processors only.

.. note::

   As ELK is commonly used to perform analysis using internal and 3rd
   party-compatible tools, no querying is supported for Elasticsearch storage
   kind.

Sending events from custom services
-----------------------------------

See :ref:`eva4_eapi_accounting`.

Querying events from command-line
---------------------------------

"accounting query" command of :ref:`eva4_eva-shell` provides command-line
interface to view accounting events. Use command arguments to apply required
filters.

.. code:: shell

   eva accounting query
