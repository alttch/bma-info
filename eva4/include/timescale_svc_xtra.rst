Retention policies
==================

In TimescaleDB, retention policies are implemented using materialized views. To
let EVA ICS API method pass the view name, it must be called `rp_<view_name>`
in the database (e.g. `rp_foo` for `rp=foo` API parameter). This restricts
users from selecting data from other views and tables via API calls.

The materialized view must have the same columns as `state_history_events`
table:

* **t** timestamp without time zone
* **oid_od** integer
* **status** smallint
* **value** double precision

In case if there is no plan to query via API status or value columns, the one
which is not required can be omitted.

Example, let us create a retention policy to store hour-averages:

.. code:: sql

   CREATE MATERIALIZED VIEW rp_all_hourly_avg
   WITH (timescaledb.continuous) AS
   SELECT 
       time_bucket('1 hour', t) AS t,
       oid_id,
       avg(value) AS value
   FROM state_history_events AS she
   JOIN state_history_oids AS sh ON she.oid_id = sh.id
   GROUP BY 1,2;

In case if the view is required for certain items only, use `WHERE` clause to
specify oids by joining `state_history_oids` table or directly specifying OID
ids as recorded.

Then create a continuous aggregate policy to refresh the view every 5 minutes:

.. code:: sql

    SELECT add_continuous_aggregate_policy('rp_all_hourly_avg',
        start_offset => INTERVAL '1 day',
        end_offset => INTERVAL '5 minutes',
        schedule_interval => INTERVAL '5 minutes');

.. note::

   Materialized views are not purged automatically by EVA ICS and may require
   additonal cleanup logic.
