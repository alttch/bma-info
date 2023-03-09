Cursors
*******

.. contents::

Consider there is data in an external database or files which is processed by a
process and sent to client processes.

If there are lots of records (like millions) and the data source allows to read
them as a stream (e.g. a SQL database), it is useful to let clients read these
records either one-by-one or in bulk blocks to avoid unnecessary huge memory
allocation on both the clients and the server.

To solve the problem, BUS/RT provides a helper module "cursors" starting from
the version 0.4. The module must be enabled with "cursors" crate feature.

With cursors processes can exchange data of nearly unlimited size.

When to use cursors
===================

It is recommended to use cursors when there is expected to deal with 10-100k
data records or more. It is recommended to use bulk-only requests unless
working with huge data rows.

If less amount of records is usually expected, cursors may provide additional
overhead and there is usually no significant RAM advantages in typical tasks.

Besides RAM advantages, cursors may provide slightly better overall performance
if the optimal-sized data blocks are processed (up to 10% less CPU load).

Technical background
====================

* BUS/RT cursors are very similar to database cursors.

* When a client process calls a RPC method to get data, a server process
  defines a cursor object, which contains a database, HTTP, a file stream etc.
  The cursor unique ID (a counter, UUID etc.) is returned instead of data.
  There is no mandatory ID type and serialization format.

* The client can use the cursor (UUID) to get data records from the stream
  either one-by-one or in bulks. There is no mandatory naming for the RPC
  methods as well.

* The cursor should be automatically dropped if there are no data records or if
  the client is unable to process all records during the specified amount of
  time (cursor time-to-live).

Server example
==============

.. literalinclude:: examples/server_cursor.rs
    :language: rust

Client example
==============

.. literalinclude:: examples/client_cursor.rs
    :language: rust
