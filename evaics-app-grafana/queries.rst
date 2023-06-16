Querying data
*************

.. contents::

Basics
======

EVA ICS data source can call any :doc:`../eva4/svc/eva-hmi` API method and
output the result with Grafana panels.

The method and its parameters must be specified with queries, which have the
following syntax:

.. code::

   method name=value name=value2 name=value3

the parameter "i" can be specified as the first one, with no name required. To
specify an array, separate values with comma. Map parameter values can be
specified as map.key=value.

Example queries
===============

Current item state
------------------

The current :doc:`item <../eva4/items>` state can be obtained with "s" method
(alias for "item.state"):

.. code::

   s sensor:tests/temp

The query can contain multiple OIDs or masks:

.. code::

   s sensor:tests/#,unit:tests/#

State history
-------------

:ref:`Historical item states <eva4_hmi_http__item.state_history>` can be
obtained with "h" method (alias for "item.state_history"):

.. code::

   h sensor:tests/temp fill=100A prop=value


* It is recommended to specify the "fill" parameter with "A" instead of a time
  frame to calculate number of dots automatically.

* The parameters "t_start" and "t_end" are set by Grafana plugin according to
  the chosen dashboard/query range.

System monitoring
-----------------

Get the current node core state:

.. code::

   test

Get HMI API log (calls listed below require admin permissions):

.. code::

   api_log.get t_start=${from} t_end=${to}

Get all connected nodes using :doc:`EAPI bus call <../eva4/eapi>`:

.. code::

   bus::eva.core::node.list

Get advanced replication stats from a replication service instance (v4 nodes only):

.. code::

   bus::eva.repl.default::node.list

Get list of active HMI sessions

.. code::

   bus::eva.hmi.default::session.list

Advanced
========

Calling methods on remote nodes
-------------------------------

For managed remote nodes in cluster, EAPI methods can be called to combine data
from different nodes on a single dashboard or to obtain data from EVA ICS nodes
with no direct HMI connection.

E.g. let us obtain system information from the node *mynode2*:

.. code::

   bus::eva.repl.default::bus::eva.core::core.sysinfo node=mynode2
