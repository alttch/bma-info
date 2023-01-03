Troubleshooting
***************

.. contents::

.. _eva4_dump:

Creating dumps
==============

Plain
-----

In case of hardly repeatable errors it is recommended to instantly create a
dump file with :doc:`cli`:

.. code:: shell

    eva dump
    # or directly with eva-cloud-manager
    /opt/eva4/bin/eva-cloud-manager node dump

.. note::

    Unlike v3, in EVA ICS v4 dumps are created not by the core but by
    eva-cloud-manager, so it is usually safe to dump productional systems.

Dumps are bzip2-compressed JSON files, which can be opened e.g. with:

.. code::

    bzcat /path/to/dump.bz2 | jq

The dump file contains various information about the node, including
configuration keys, items, services and their states etc. Also, the dump
contains memory log messages and actions for the last hour (up to 10k records),
so it is highly recommended to create a dump as soon as the problem occurred.

.. warning::

    Plain dumps may contain sensitive private information, such as passwords,
    access keys etc. Never send plain dumps to untrusted 3rd parties, also
    never send plain dumps using public communication channels.

Encrypted
---------

If a support contract is available or expected, create an encrypted
service-request dump:

.. code:: shell

    eva dump -s
    # or directly with eva-cloud-manager
    /opt/eva4/bin/eva-cloud-manager node dump -s

Such dumps are RSA-encrypted and can be opened by EVA ICS core-team engineers
only.

.. note::

    Encrypted dumps are safe-to-send using any public channel available.

Support requests
================

If no support contract is available, a new one can be requested at
`<https://www.bohemia-automation.com/contacts/>`_ page or from the official partners. After
filling the form you will be contacted by a core-team support engineer. Do not
forget to prepare a :ref:`system dump <eva4_dump>`.

Community support
=================

Community support is limited and available at
`<https://github.com/eva-ics/eva4/issues>`_ only.
