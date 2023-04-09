HTTP API
********

.. contents::

The following methods can be called via HTTP. The methods required an
authentication token which must be obtained by logging into the connected
:doc:`../../eva4/svc/eva-hmi`.

Query item state history
========================

The method allows to query state history for multiple items as CSV or Apache
Arrow stream.

* In case of CSV the data is returned line-by-line

* In case of Arrow stream the data is returned column-by-column as a single or
  multiple tables depending on column sizes. If multiple tables are returned,
  the result table must be created with splitting all received tables in
  columns (arrays) and joining them back into a single one.

URI: **/ml/api/query.item.state_history**

Required HTTP request headers:

* **x-auth-key** authentication token

* **accept** data frame output format, the following are supported:

    **application/vnd.apache.arrow.stream** for Apache Arrow stream

    **text/csv** for CSV stream

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **oid_map**
     - OID processing maps (list)
     - Maps for server-side OID processing
     - **yes**
   * - **fill**
     - String
     - Fill (nS/T/H/D/W e.g. 10T for 10-minute) + optional [:precision]
     - **yes**
   * - **t_start**
     - f64/String
     - Beginning timestamp (default: last 24 hours)
     - no
   * - **t_end**
     - f64/String
     - Ending timestamp (default: now)
     - no
   * - **limit**
     - u32
     - Limit records to
     - no
   * - **time_format**
     - String
     - raw (UNIX TIMESTAMP, default), rfc3399 (CSV only) or no (no time colum required)
     - no

The following complex structures are used:

.. include:: ../include/oid_map.rst

Upload item state history
=========================

The method allows to push data to a database which can be useful for testing
and prototype modelling. The method can push data to a single database only. If
the data need to be pushed to different databases, call the method for each one
separately.

URI: **/ml/api/upload.item.state_history**

Required HTTP request headers:

* **x-auth-key** authentication token

* **content-type** data frame output format, the following are supported:

    **application/vnd.apache.arrow.stream** for Apache Arrow stream

    **application/vnd.apache.arrow.file** for Apache Arrow file

    **text/csv** for CSV file

The request payload must be multipart/form-data (RFC 1341) with **strict**
ordering:

* **params** JSON-encoded request params

* **file** file/stream body

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **oid_map**
     - OID upload processing maps (list)
     - Maps for server-side OID processing
     - **yes**
   * - **database**
     - String
     - A EVA ICS database service
     - **yes**

OID upload processing map
-------------------------

The map is used to push item states:

.. list-table:: Fields
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **oid**
     - String
     - Item OID
     - **yes**
   * - **status**
     - i16
     - Item state status field
     - no
   * - **value**
     - f64
     - Item state value field
     - no
