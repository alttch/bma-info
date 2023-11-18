FFI launcher
************

.. contents::

.. include:: ../include/ffi.rst


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-ffi.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-ffi.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create custom.name /opt/eva4/share/svc-tpl/svc-tpl-ffi.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI
====

The launcher itself provides no :doc:`EAPI <../eapi>` methods except the
standard ones (“test”, “info” and “stop”). All other methods are proxied to the
loaded service library.

