``eva.session``
---------------

Create a new EVA ICS session

Description
~~~~~~~~~~~

Create a new EVA ICS session

Usage
~~~~~

.. code:: r

   eva.session(
     url = "http://localhost:7727",
     user = NULL,
     password = NULL,
     key = NULL,
     timeout = 120,
     mlkit = FALSE
   )

Arguments
~~~~~~~~~

+-------------------------------+--------------------------------------+
| Argument                      | Description                          |
+===============================+======================================+
| ``url``                       | HMI or front-end server URL          |
+-------------------------------+--------------------------------------+
| ``user``                      | user login (for login/password       |
|                               | authentication)                      |
+-------------------------------+--------------------------------------+
| ``password``                  | user password                        |
+-------------------------------+--------------------------------------+
| ``key``                       | API key (for API key authentication) |
+-------------------------------+--------------------------------------+
| ``timeout``                   | timeout for HTTP requests            |
+-------------------------------+--------------------------------------+
| ``mlkit``                     | if ML Kit server is installed: TRUE  |
|                               | (if front-end server is used) or ML  |
|                               | Kit server URL                       |
+-------------------------------+--------------------------------------+

``eva.authenticate``
--------------------

Authenticate the session (usually not called manually)

.. _description-1:

Description
~~~~~~~~~~~

Authenticate the session (usually not called manually)

.. _usage-1:

Usage
~~~~~

.. code:: r

   eva.authenticate(session)

.. _arguments-1:

Arguments
~~~~~~~~~

=========== ===========
Argument    Description
=========== ===========
``session``
=========== ===========

``eva.call``
------------

Perform a RPC call on HMI service

.. _description-2:

Description
~~~~~~~~~~~

Perform a RPC call on HMI service

.. _usage-2:

Usage
~~~~~

.. code:: r

   eva.call(session, method, params = list())

.. _arguments-2:

Arguments
~~~~~~~~~

=========== =============
Argument    Description
=========== =============
``session``
``method``  RPC method
``params``  method params
=========== =============

``eva.credentials``
-------------------

Set session credentials for login/password authentication

.. _description-3:

Description
~~~~~~~~~~~

Set session credentials for login/password authentication

.. _usage-3:

Usage
~~~~~

.. code:: r

   eva.credentials(session, user, password)

.. _arguments-3:

Arguments
~~~~~~~~~

============ =============
Argument     Description
============ =============
``session`` 
``user``     user login
``password`` user password
============ =============

``eva.test``
------------

Execute “test” RPC method on HMI service

.. _description-4:

Description
~~~~~~~~~~~

Execute “test” RPC method on HMI service

.. _usage-4:

Usage
~~~~~

.. code:: r

   eva.test(session)

.. _arguments-4:

Arguments
~~~~~~~~~

=========== ===========
Argument    Description
=========== ===========
``session``
=========== ===========

``eva.history.request``
-----------------------

Create a new item state history request

.. _description-5:

Description
~~~~~~~~~~~

Create a new item state history request

.. _usage-5:

Usage
~~~~~

.. code:: r

   eva.history.request(params_csv = NULL)

.. _arguments-5:

Arguments
~~~~~~~~~

============== ===================================
Argument       Description
============== ===================================
``params_csv`` Load oid map params from a CSV file
============== ===================================

``eva.history.append_oid``
--------------------------

Append item OID mapping to a request

.. _description-6:

Description
~~~~~~~~~~~

Append item OID mapping to a request

.. _usage-6:

Usage
~~~~~

.. code:: r

   eva.history.append_oid(
     request,
     oid,
     status = FALSE,
     value = FALSE,
     database = NULL,
     xopts = NULL
   )

.. _arguments-6:

Arguments
~~~~~~~~~

============ ===================================
Argument     Description
============ ===================================
``request`` 
``oid``      item OID
``status``   status mapping: TRUE or col name
``value``    value mapping: TRUE or col name
``database`` database service to load state from
``xopts``    extra database request options
============ ===================================

``eva.history.fetch``
---------------------

Fetch state history data

.. _description-7:

Description
~~~~~~~~~~~

Fetch state history data

.. _usage-7:

Usage
~~~~~

.. code:: r

   eva.history.fetch(
     session,
     request,
     t_start = NULL,
     t_end = NULL,
     fill = NULL,
     limit = NULL,
     database = NULL,
     xopts = NULL,
     t_col = "keep",
     tz = NULL
   )

.. _arguments-7:

Arguments
~~~~~~~~~

+-------------------------------+--------------------------------------+
| Argument                      | Description                          |
+===============================+======================================+
| ``session``                   |                                      |
+-------------------------------+--------------------------------------+
| ``request``                   | Request object                       |
+-------------------------------+--------------------------------------+
| ``t_start``                   | start time: date/time or unix        |
|                               | timestamp                            |
+-------------------------------+--------------------------------------+
| ``t_end``                     | end time: date/time or unix          |
|                               | timestamp                            |
+-------------------------------+--------------------------------------+
| ``fill``                      | fill: NX, where X: S for seconds, T  |
|                               | for minutes, H for hours, D for      |
|                               | days, W for weeks, e.g. 15T          |
+-------------------------------+--------------------------------------+
| ``limit``                     | limit result records to              |
+-------------------------------+--------------------------------------+
| ``database``                  | database service to perform request  |
|                               | on                                   |
+-------------------------------+--------------------------------------+
| ``xopts``                     | extra options                        |
+-------------------------------+--------------------------------------+
| ``t_col``                     | time column processing: keep         |
|                               | (default) or drop                    |
+-------------------------------+--------------------------------------+
| ``tz``                        | time zone                            |
+-------------------------------+--------------------------------------+

``eva.history.push``
--------------------

Push data to a database service

.. _description-8:

Description
~~~~~~~~~~~

Push data to a database service

.. _usage-8:

Usage
~~~~~

.. code:: r

   eva.history.push(session, request, data, database = "default")

.. _arguments-8:

Arguments
~~~~~~~~~

============ ===========================================
Argument     Description
============ ===========================================
``session`` 
``request``  request object
``data``     file path or a data frame
``database`` database to push data to (default: default)
============ ===========================================
