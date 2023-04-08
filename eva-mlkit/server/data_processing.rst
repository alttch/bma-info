Data processing best practices
******************************

Querying data
=============

The server has got "response_max_size" :ref:`configuration <eva_mlkit_config>`
parameter which limits memory usage for individual requests.

Depending on the response type, the data is limited differently:

Apache arrow streams
--------------------

Arrow streams are returned column-by-column as soon as a column is retrieved
from a EVA ICS database service. Depending on max response size, columns can be
returned in bulk or one-by-one.

The max column size (number of rows) is limited by the formula:
*response_max_size \* 8*

CSV streams
-----------

CSV streams are returned row-by-row. As the data is collected by columns, it is
required to form the full data frame on the server side. Because of that, the
full data frame size is limited to "response_max_size" and the server refuses
to query data frames which do not fit this value.

Uploading data
==============

The server does not limit size of upload payloads. Limits can be installed with
using :ref:`a front-end server <eva_mlkit_frontend>`, e.g. for NGINX:

.. code:: nginx

    server {
        # ....
        client_max_body_size 1000M;
    }

Individual upload formats must be enabled in the server :ref:`configuration
<eva_mlkit_config>` and are processed differently.

Apache arrow streams
--------------------

There must be a single table in a stream which can be split into multiple
chunks. The chunks are processed one-by-one.

Apache arrow files
------------------

Arrow files can not be processed as streams, so the server firstly stores
uploaded data into a temporary file which may consume disk drive resources.

CSV files/streams
-----------------

CSV uploads are processed line-by-line.
