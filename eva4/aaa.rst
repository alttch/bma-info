Authentication, authorization and accounting
********************************************

.. contents::

Basics
======

Local bus calls between EVA ICS services have zero security and authentication
in favor of speed and reliability, so all local services are considered as
trusted.

The following communications are considered as untrusted and require additional
authentication and authorization:

* External clients (such as web clients of :doc:`svc/eva-hmi`)

* RPC calls and events between EVA ICS nodes (:doc:`svc/eva-repl`).

Structure
=========

EVA ICS AAA model model looks as the following. There are no strict
requirements and any service layer can be replaced to a custom one, but in case
of significant incompatibility, all services above the custom layer must be
altered/patched/replaced.

.. figure:: schemas/aaa.png
    :width: 745px
    :alt: v4 aaa

.. _eva4_acl:

Access control list
-------------------

Access control lists are basic entities of EVA ICS AAA. ACLs are provided by
:doc:`svc/eva-aaa-acl`, which allows:

* ACL management

* Formatting ACL data according to the caller service needs, including
  combining multiple ACLs together.

The default ACL has the following structure:

.. code:: yaml

    id: <ACL_ID>
    admin: false
    read:
        items: ['oids']
        pvt: ['paths']
        rpvt: ['uris']
    write:
        items: ['oids']
    deny_read:
        items: ['oids']
        pvt: ['paths']
        rpvt: ['uris']
    deny_write:
        items: ['oids']
    ops:
        - log
        - developer
    meta:
        var: ['value']
        var2: ['value']

Fields:

* **admin** admin ACL (has access to everything). In case if this field is set
  to *true*, all others (except *meta*) are ignored and not used for
  authorization.

* **read** grants read access to items/pvt/rpvt

* **write** grants both read and write access to items

* **deny_read** denies access to certain items/pvt/rpvt

* **deny_write** denies write access to certain items (e.g. :ref:`unit
  <eva4_unit>` actions, setting :ref:`lvar <eva4_lvar>` values etc.)

* **ops** list of special operations ("allow" in v3). supported values:

  * **log** system log access via :doc:`svc/eva-hmi`

  * **developer** access to :doc:`data object <dobj>` methods of :doc:`svc/eva-hmi`

  * **moderator** API call log access via :doc:`svc/eva-hmi`

  * **supervisor** reserved for custom applications

* **meta** map of key=list fields, used for information purposes only. Can be
  used by custom applications for special access control.

When two ACLs are combined, all fields are combined as well, including meta.

ACL can miss any field, the only mandatory field is "id".

Note that the default ACL service does not check all fields for errors (e.g.
field name misspelling), as they can be used by different HMI/replication
services. In case of an unsupported ACL, HMI/replication service may return an
error when applied.

ACLs can be managed with :ref:`eva4_eva-shell`:

.. code:: shell

   eva acl -h

.. _eva4_api_key:

API key
-------

API keys are used by certain services (such as :doc:`svc/eva-hmi` and
replication ones) to authenticate RPC calls and encrypt certain types of
events.

Unlike similar products, API keys in EVA ICS are not connected with user
accounts, so there is not necessary to create so-called "service account
users".

By default, API key management and authentication are provided by
:doc:`svc/eva-aaa-localauth` service.

API keys can be managed with :ref:`eva4_eva-shell`:

.. code:: shell

   eva key -h

.. _eva4_user_account:

User
----

User accounts are used by certain services (such as :doc:`svc/eva-hmi`) to
authenticate end-users. External RPC calls do not support user-based
authentication, so a user must first login with its account and then use the
obtained API token to authenticate all communications.

By default, API key management and authentication are provided by
:doc:`svc/eva-aaa-localauth` service.

Additional user authentication services available:

* :doc:`svc/eva-aaa-msad` - included in :doc:`enterprise`.

Local users can be managed with :ref:`eva4_eva-shell`:

.. code:: shell

   eva user -h

.. _eva4_session_token:

Session token
-------------

Session tokens are provided by end-services (such as :doc:`svc/eva-hmi`) to
authenticate external RPC calls and communications.

When a token is issued, an end-service caches assigned ACLs and authenticates
all further calls using them.

A token can expire or be destroyed by the end-service after the certain period
of time or by request from either the token owner or by admin via bus call.

A token MUST be automatically destroyed by the end-service if the user
account/ACLs it was formed on top, are modified or removed.

Accounting
----------

See: :doc:`svc/eva-aaa-accounting`.
