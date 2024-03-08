Allows to store item states history in Timescale/PostgreSQL database. Unlike
:doc:`eva-db-sql` this service provides a dedicated connector, optimized
for speed and database size.

Note that the service can store numeric item state values only.

The service provides unified database EAPI.

.. include:: common/timeframe-fill.rst

Timescale Installation
======================

See https://docs.timescale.com/self-hosted/latest/install/installation-linux/

Initialization
==============

The service creates a table for event data called *state_history_events* and
automatically tries to convert it to hyper-table (see
https://docs.timescale.com/api/latest/hypertable/create_hypertable/).

If the service is unable to init the hyper-table, a warning message is written
in the node log. The problem may be e.g. the table already contains events
data. In this case, connect to the database and perform initialization
manually:

.. warning::

   The operation blocks the events table and may consume a lot of time for
   large databases.

.. code:: sql

    SELECT create_hypertable('state_history_events', 't', migrate_data => true);
    ALTER TABLE state_history_events SET
        (timescaledb.compress,
        timescaledb.compress_orderby = 't DESC',
        timescaledb.compress_segmentby = 'oid_id');
    SELECT add_compression_policy('state_history_events', INTERVAL '1d');

To check that the events hyper-table has been initialized properly, use the
following request:

.. code:: sql

    SELECT * FROM timescaledb_information.hypertables WHERE
        hypertable_name='state_history_events';

Modifying compression policy
============================

The default compression policy is set for 1 day. To modify it, connect to the
database and use the following commands (the example sets compression policy to
7 days):

.. code:: sql

   SELECT remove_compression_policy('state_history_events');
   SELECT add_compression_policy('state_history_events', INTERVAL '7d');

To check compression effectiveness, use the following command:

.. code:: sql

   SELECT before_compression_total_bytes AS before,
        after_compression_total_bytes AS after,
        (before_compression_total_bytes::DOUBLE PRECISION
            /after_compression_total_bytes)::DECIMAL(100,2) || 'x'
        AS "compression rate"
        FROM hypertable_compression_stats('state_history_events');
