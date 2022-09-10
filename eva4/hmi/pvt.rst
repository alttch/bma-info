Serving private data (PVT)
**************************

.. contents::

While developing the interfaces for :doc:`../svc/eva-hmi`, integrators face the
issue of the private data protection: the UI is loaded with the JavaScript
application that runs in the browser and requires authentication to access the
:doc:`../svc/eva-hmi` methods. However, the application may contain components
which an unauthorized user should not see: plans of the building, security cam
footages, even the list of the managed :doc:`items<../items>` may be
confidential.

One way to solve this problem is to use a front-end server for such content.
However, front-end is not always necessary and, in many cases, the content
structure requires access rights to certain files/folders only.

Therefore, it may involve duplicating user base and make difficult to integrate
the additional authentication methods.

In the most cases, it would be sufficient to delineate access to such content
with the help of the service's PVT feature: the access rights to the certain
files and folders are regulated with **pvt** parameter of ACLs.

The PVT feature is available at *http(s)://<IP/DOMAIN>:[SVC_PORT]/pvt*.

The private content must be placed in **pvt** folder of EVA ICS root directory.

ACL *pvt* parameter supports wildcards as well e.g.:

.. code-block:: yaml

    read:
      pvt:
        - map.jpg
        - c1/#
        - +/content.js

will give the key access to *map.jpg*, all files and sub-folders of *c1* folder
as well as *content.js* file in any first-level folder.

.. note::

    If the client is authenticated in advance (auth cookie is set by `EVA JS
    Framework <https://github.com/alttch/eva-js-framework>`_), requests do not
    require *k=APIKEY/TOKEN* parameter.

.. contents::

Loading files from PVT Server
=============================

A private file can be loaded with the following request:

.. code-block:: bash

    http(s)://<IP/DOMAIN>[:PORT]/pvt?k=APIKEY&f=FILE

    or

    http(s)://<IP/DOMAIN>[:PORT]>/pvt/FILE?k=APIKEY

where

* **k** valid API key
* **f** a full relative file path, i.e. *map.jpg* or *c2/content.js*

.. _eva4_pvt_registry:

Serving private data from EVA ICS Registry
==========================================

To serve private structured data from :doc:`EVA ICS registry<../registry>`, use
the following request:

.. code-block:: bash

    http(s)://<IP/DOMAIN>[:PORT]>/:pvt/REGISTRY-KEY

where REGISTRY-KEY - key name, relative to *eva/user_data/pvt*, e.g.
to request a key "eva/user_data/pvt/codes/code1" use the following request:

.. code-block:: bash

    http(s)://<IP/DOMAIN>[:PORT]>/:pvt/codes/code1

The session key MUST have permissions either to the whole pvt data ("#") or to
specific registry folders/keys. ACLs for registry keys should start with
"%/", e.g. to grant an access to the above key, pvt ACL MUST be
"%/codes/code1". Wildcards in paths ("#"/"+") are supported.

By default, registry data is served as JSON. To change format and/or to add
locale translation, see :doc:`../hmi/serve_as`.

.. _eva4_rpvt:

Serving remote resources (RPVT)
===============================

The service can act as a proxy, fetching allowed resources in the local or
remote networks.

Local network resources
-----------------------

Example:

.. code-block:: bash

    http(s)://<IP/DOMAIN>[:PORT]/rpvt?k=APIKEY&f=<NODE>/remote_host/folder/file

Example: there is a chart on a storage server in the local network displaying
storage usage. The chart is located at http://192.168.1.20/charts/zfs.png

Set rpvt permissions of the API key to:

.. code:: yaml

  read:
    # .....
    rpvt:
    - .local/192.168.1.20/charts/#

The above grants access to all files on the specified host in /charts/ folder.

Then include remote chart in the interface:

.. code-block:: html

    <img src="/rpvt?k=APIKEY&f=.local/192.168.1.20/charts/zfs.png" />

Optionally, the protocol schema can be specified:

.. code-block:: html

    <img src="/rpvt?k=APIKEY&f=.local/https://192.168.1.20/charts/zfs.png" />

Note that the URL schema is stripped before checking and it must be omitted in
ACLs. If access to the remote resource is granted, it can be requested with
both http and https.

.. note::

    Avoid using rpvt: ["#"], as this allows **/rpvt** to work as http proxy for
    any local and Internet resource and may open a security hole.

Remote network resources
------------------------

If ".local" (or the local node name) is specified, the HMI service requests the
resource. Otherwise, the HMI service works in combination with
:doc:`../svc/eva-repl`.

The remote node always receives rpvt call as
".local/resource", so the remote replication ACL must be set to ".local/..."
only.

Example of a local ACL:

.. code:: yaml

  read:
    # .....
    rpvt:
    - remote_node/192.168.99.20/charts/#

Example of a remote ACL, assigned to the replication key:

.. code:: yaml

  read:
    # .....
    rpvt:
    - .local/192.168.99.20/charts/#

Example HTML block with a chart image:

.. code-block:: html

    <img src="/rpvt?k=APIKEY&f=remote_node/https://192.168.99.20/charts/zfs.png" />
