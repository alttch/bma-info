Serving structured data
***********************

.. contents::

Structured data (YAML and JSON files) is very typical for UI development to
keep settings, texts and other structured information.

:doc:`../svc/eva-hmi` provides a feature, called "serve as", which allows to
convert any structured data file on-the-flow and load it into UI
applications in the most convenient way.

This feature is supported by both public UI ("/ui" URLs) and :doc:`pvt` and
enabled automatically for all YAML and JSON files.

.. _eva4_serve_as_format:

Format conversion
=================

To convert a structured file into another format, request it as:

    /ui/filename.yml?as=FMT

where FMT:

* **yml** (or yaml) - convert the file into YAML
* **json** - convert the file into JSON
* **js** - convert the file into JavaScript (requires either "var" or "func" as
  the additional parameter)

e.g. let's convert YAML, which is usually more human-editable and preferred to
keep configs, into JSON:

    /ui/filename.yml?as=json

The file can also be converted on-the-flow to JavaScript variable, or, as
copying JavaScript arrays and dicts is usually tricky, into the function, which
returns the structured data on every call:

    /ui/filename.yml?as=js&func=myfunc

.. _eva4_serve_as_locale:

Multi-language
==============

Usage
-----

An additional argument "lang" can be used to apply the chosen locale on **all**
string fields of structured data file. Multi-line strings are processed with
indents kept as-is, string formatting (left and right white spaces) is
preserved:

    /ui/test.yml?as=json&lang=LANG

The "lang" argument always must be combined with "as", unless the data is
served from the registry.

Firstly, an i18n file must be created. The tree must have the following schema
e.g. ("cs" is for Czech language):

.. code::

    pvt
    └── locales
        └── cs
            └── LC_MESSAGES
                ├── messages.po
                ├── tests
                └────── test.po

".po" files are standard `Gettext <https://en.wikipedia.org/wiki/Gettext>`_
files, which look as:

.. code::

    msgid "this is a test"
    msgstr "je to test"

or e.g. for Japanese (UTF-8):

.. code::

    #, fuzzy
    msgid ""
    msgstr ""
    "Content-Type: text/plain; charset=utf-8\n"

    msgid "this is a test"
    msgstr "これはテストです"

(note that if diacritic is used e.g. in Czech language messages, the file must
have UTF-8 encoding specified as well)

The files can be compiled with "msgfmt" Linux command from "gettext" package
(installed by default by majority Linux distributions):

.. code:: shell

    msgfmt file.po -o file.mo

EVA ICS HMI service uses the following strategy to find locale files. E.g. if
the document

    /ui/tests/test.yml?as=json&lang=cs

is served, the message files are looked up in the following order:

* EVA_DIR/pvt/locales/cs/LC_MESSAGES/tests/test.mo
* EVA_DIR/pvt/locales/cs/LC_MESSAGES/tests/messages.mo
* EVA_DIR/pvt/locales/cs/LC_MESSAGES/messages.mo

(the last file is the standard common message file). If no message file is
found, the strings are served as-is, without any conversion.

.. note::

    Altrenatively, locale files can be kept in EVA_DIR/ui/locales. EVA ICS HMI
    service automatically searches for the locale files in "ui" if no locale
    files found in "pvt".

Generating
----------

Make sure Gettext is installed:

.. code:: shell

    command -v msgfmt

in case if missing, install it with (e.g. for Debian/Ubuntu):

.. code:: shell

    apt -y install gettext

To auto-generate / update ".po" files from JSON or YAML strings, a supplied
tool "gen-intl" can be used (multiple languages can be specified at once):

.. code:: shell

    /opt/eva4/bin/gen-intl -u /opt/eva4/ui -o /opt/eva4/pvt/locales -l cs /opt/eva4/ui/tests/test.yml generate

The above command auto-generates or updates "test.po" file and puts it to the
corresponding locale path. E.g. if the file absolute path is
*/opt/eva4/ui/tests/test.yml*, the result ".po" file is written to
*/opt/eva4/pvt/locales/cs/LC_MESSAGES/tests/test.po*.

After editing, compile ".po" file manually with "msgfmt", or run

.. code:: shell

    /opt/eva4/bin/gen-intl -u /opt/eva4/ui -o /opt/eva4/pvt/locales -l cs /opt/eva4/ui/tests/test.yml compile

.. note::

    As in EVA ICS v4 ui and pvt directories can have any custom locations,
    specifying "-u" and "-o" options for "gen-intl" is mandatory.

Locale cache
------------

Message files are cached by EVA ICS gettext library, until the HMI service is
restarted.

The cache can be purged with the bus RPC call "i18n.cache_purge" to the HMI
service (e.g. with :ref:`eva4_eva-shell`):

.. code:: shell

    /opt/eva4/bin/eva svc call eva.hmi.default i18n.cache_purge

Serving structured data from EVA ICS Registry
=============================================

To serve structured data from :doc:`EVA ICS registry<../registry>`, use the
following request:

.. code-block:: shell

    http://<IP/DOMAIN>[:PORT]>/:pub/REGISTRY-KEY

where REGISTRY-KEY - key name, relative to *eva/user_data/pub*, e.g.
to request a key "eva/user_data/pub/settings" use the following request:

.. code-block:: shell

    http://<IP/DOMAIN>[:PORT]>/:pub/settings

By default, registry data is served in JSON. To change format or add locale
translation, see :ref:`eva4_serve_as_format` and :ref:`eva4_serve_as_locale`.

To serve private data, see :ref:`eva4_pvt_registry`.

Why serving structure data from the registry is more convenient than using
files:

* reliability
* unified data storage
* data schemas
