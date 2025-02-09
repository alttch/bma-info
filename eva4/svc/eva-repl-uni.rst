Data diode replication service
******************************

.. contents::

Allows to replicate nodes via uni-directional network. The configuration is
similar to :doc:`../svc/eva-repl` with the following differences:

* Incoming API calls can not be enabled.
* Only :doc:`../../psrt/index` is supported as the pub/sub server. Requires
  the server to accept UDP publish requests.

See also: :ref:`eva4_replication_diodes`.


Setup
=====

Use the template *EVA_DIR/share/svc-tpl/svc-tpl-replication-uni.yml*:

.. literalinclude:: ../svc-tpl/svc-tpl-replication-uni.yml
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create eva.repl.1 /opt/eva4/share/svc-tpl/svc-tpl-replication-uni.yml

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)


EAPI methods
============

See :doc:`../eapi` for the common information about the bus, types, errors and RPC calls.
