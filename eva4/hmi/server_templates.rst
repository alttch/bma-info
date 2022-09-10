Server Templates
****************

In EVA ICS v4, :doc:`../svc/eva-hmi` uses `tera <https://tera.netlify.app>`_
server-side template engine, which is almost compatible with `jinja2
<http://jinja.pocoo.org/>`_. Server templates can be used for regular HTML,
JavaScript and JSON data files. Both *ui* and *pvt* folders can contain
template files, the difference is only that templates in *ui* are public while
templates in *pvt* are served via :doc:`../hmi/pvt`.

Working with server templates
=============================

All server templates are indexed/cached. In case of file modification, either
restart HMI service or :ref:`reload templates
<eva4_eva.hmi.default__tpl.reload>` with a bus call:

.. code:: shell

    # with eva-shell
    /opt/eva4/bin/eva svc call eva.hmi.default tpl.reload

    # or with the bus client directly
    ./sbin/bus ./var/bus.ipc rpc call eva.hmi.default tpl.reload

Template files
==============

All files with *.j2* extension are processed as templates, *index.j2* has more
priority than *index.html* as the primary interface page.

Templates support all *tera* functions and features, plus have built-in
variables.

Template variables
==================

The following variables are available in all templates:

* **request.ip** client IP address

* **request.headers** the current request headers

.. code-block:: jinja

    {{ request.headers["user-agent"] }}

