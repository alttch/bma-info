Embedding PSRT server as EVA ICS v4 service
*******************************************

PSRT server can be embedded as EVA ICS v4 service and started by the EVA ICS
service launcher. This allows to unify the deployment, configuration and
management process.

.. contents::

Installing
==========

If :ref:`installed/updated <psrt_install>` from a .deb package, make sure
*psrtd* is not running and disabled in systemd:

.. code:: shell

   systemctl stop psrtd
   systemctl disable psrtd

Configuring
===========

Use the following configuration template:

.. literalinclude:: ./include/svc-tpl-psrtd.yml
   :language: yaml

Create a PSRT service instance with :ref:`eva4_eva-shell`:

.. code:: shell

   eva svc create eva.pubsub.default path/to/svc-tpl-psrtd.yml

Note that in the proposed configuration the server listens on two sockets: TCP
port 2873 and UNIX socket *var/psrt.sock* (created as
*/opt/eva4/var/psrtd.sock*.

Also note that certain parameters, such as timeout, FIPS mode, number of
workers, are moved from the server configuration to EVA ICS service
configuration and taken from there.

Running
=======

The server is automatically launched as EVA ICS service. The process does not
create a PID file and does not respond to system signals in a usual way. Use
EVA ICS service management commands only.

Using with local replication services
=====================================

The best practice for :doc:`../eva4/svc/eva-repl` and
:doc:`../eva4/svc/eva-zfrepl` is to use UNIX socket instead of TCP to speed up
data exchange and minimize system load.

Set socket path in the above service configurations as *var/psrt.sock*.
