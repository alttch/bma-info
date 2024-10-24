IaC and deployment
******************

EVA ICS supports infrastructure-as-code paradigm, providing a way to deploy
resources and their parameters from deployment files in YAML format.

.. note::

    To allow deployment on remote nodes, the local node must have remotes
    connected in management mode (the :doc:`replication service
    <svc/eva-repl>` field "admin_key_id" must be set).

.. contents::

Deployment file
===============

Deployment configurations are stored in YAML files, which have the following
format:

.. code:: yaml

    version: 4
    content:
        - node: <NODE_NAME>
        # ......
        - node: <NODE_NAME>
        # ......

An alias ".local" can be used for the local node deployment.

.. _eva4_iac_aaa:

AAA
---

:doc:`User account, API keys and ACLs <aaa>` can be deployed as well, per
node. Note that user passwords contain password hashes, not the passwords
itself.

:doc:`svc/eva-aaa-localauth` accepts the following hash types:

* SHA256 and SHA512 hashes (hex). Should be used in test configurations only to
  avoid possible `rainbow table
  <https://en.wikipedia.org/wiki/Rainbow_table>`_ attacks if the password hash
  is compromised. Can be generated in command-line with:

.. code:: shell

    echo -n password | sha256sum
    echo -n password | sha512sum

* PBKDF2-HMAC (100k iterations, 16-byte salt), for production use, as:
  *$1$BASE64(SALT)$BASE64(SHA256-HASH)*. Can be generated with:

.. code:: shell

    # with eva-shell
    eva svc call eva.aaa.localauth password.hash password=mypassword algo=pbkdf2
    # or
    /opt/eva4/sbin/bus -s /opt/eva4/var/bus.ipc \
        rpc call eva.aaa.localauth password.hash password=mypassword algo=pbkdf2

.. code:: yaml

    - node: .local
      acls:
        - id: admin2
          admin: true
        - id: default2
          read:
            items:
              - "#"
          write:
            items:
              - "#"
          meta:
              name:
                - "default ACL #"
      keys:
        - id: admin2
          key: "mykey2"
          acls:
            - admin2
      users:
        - login: admin2
          password: "$1$CaqoIL8WXkDnqnwMXLeW5g==$qXQVPbRibRSomjtzKuyOePv59lx3eAQUR3yqAUS4YoE="
          acls:
            - admin2

.. _eva4_deploy_files:

Uploading files
---------------

Uploading single files
~~~~~~~~~~~~~~~~~~~~~~

Local files can be uploaded to the target's EVA_DIR/runtime directory with the
following block:

.. code:: yaml

    - node: .local
      upload:
        - src: deploy.info
          target: data/
          # override the file permissions, specify in oct
          permissions: 0o400
        - src: xx.yml
          target: data/x.yml
          svc: eva.filemgr.main # override the file manager
        - text: |
            hello, i am here
          target: data/some-file

.. note::

    If a file content is defined directly in the deployment (field *text*), the
    target MUST contain the full destination path, including the file name.

The upload source field accepts both local files and HTTP URLs. If an URL is
specified in "src", it is downloaded first to the local host where the
deployment process is started and after pushed to the target node via pub/sub.

.. note::

    The specified way is not recommended to deploy large (>1MB) files as they
    may block pub/sub replication pipes.

Uploading files in bulk
~~~~~~~~~~~~~~~~~~~~~~~

It is not allowed to upload files in bulk, however an archive can be uploaded
and extracted by :doc:`svc/eva-filemgr` service on the target node/spoint.

.. code:: yaml

    - node: .local
      upload:
        - src: path/to/archive.tgz
          target: data/
          extract: true

The following archive types are supported: tar, tar.gz (tgz), tar.xz (txz),
tar.bz2 (tbz2), zip (requires *unzip* on the target node/spoint).

The archive type is detected automatically, by the file extension. If the
source file/URL has no extension, the archive type can be set manually:

.. code:: yaml

    - node: .local
      upload:
        - src: path/to/some.archive
          target: data/
          extract: tgz

The following field values are supported: tar, tgz, txz, tbz2, zip.

.. note::

    :doc:`svc/eva-filemgr` allows archiver processes to run for the limited
    period of time. In case of timeout errors, increase the service timeout.

Uploading single/multiple files from HTTP URLs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

HTTP/HTTPS-hosted files can be fetched by the target node into EVA_DIR/runtime
directory with the following block:

.. code:: yaml

    - node: .local
      upload:
        - url: http://some.host/deploy.info
          target: data/
          # optional file permissions
          permissions: 0o400

In this case, only file URL is pushed to the remote node, the content is
downloaded by the remote node. The parameter "extract" is supported for
archives as well.

Make sure the remote node has got access to the specified HTTP resource.

.. note::

    The specified way is the most recommended way to deploy large (>1MB) files
    as they do not block pub/sub replication pipes.


Uploading UI/PVT files
~~~~~~~~~~~~~~~~~~~~~~

By default, uploading UI and PVT files is not possible. This can be manually
enabled with:

.. code:: shell

   cd /opt/eva4
   # make sure no symlinks in runtime are present
   rm -f runtime/ui runtime/pvt
   # move ui and pvt into runtime and create symlinks
   mv ui pvt runtime/ && ln -s runtime/ui && ln -s runtime/pvt

Items
-----

:doc:`items` can be deployed in "items" section:

.. code:: yaml

    - node: .local
      items:
        - oid: unit:tests/door
          status: 1
          action:
            svc: eva.controller.virtual
        - oid: unit:tests/door2
          enabled: true

Units, sensors and lvars can contain initial status and value fields. The
fields are ignored if items already exist and the current states are kept.

Macros
------

:ref:`eva4_lmacro` are deployed as all other items. If
:doc:`lmacro/py/python_macros` are used, upload the macro code to *xc/py*
subdirectory of the target's runtime:

.. code:: yaml

    - node: .local
      upload:
        - src: m1.py
          target: xc/py/m1.py
      items:
        - oid: lmacro:tests/m1
          action:
            svc: eva.controller.py

Services
--------

It is possible to deploy new services on the target. After the node is
deployed, the deployment process waits until all deployed services are started
before continue.

.. code:: yaml

    - node: .local
      svcs:
        - id: eva.svc.locker2
          params:
            bus:
              path: var/bus.ipc
            command: svc/eva-svc-locker
            config:
              locks:
                - lock1
                - lock2
                - lock3
            workers: 1
            user: nobody

.. _eva4_iac_dobj:

Data objects
------------

:doc:`dobj` can be deployed as the following:

.. code:: yaml

    version: 4
    content:
      - node: .local
        data_objects:
        - name: Env
          fields:
          - name: temp
            oid: sensor:env/temp
            type: f64
          - name: hum
            oid: sensor:env/hum
            type: f64
          - name: pressure
            oid: sensor:env/pressure
            type: f64
        - name: sub1
          fields:
          - name: counter_array
            type: u64,10
        - name: test
          fields:
          - name: value2
            type: u16
          - name: value_s1
            oid: sensor:tests/s1
            type: i16
          - name: substruct
            type: sub1


Generator sources
-----------------

:doc:`Data generator <svc/eva-svc-generator>` sources can be deployed as the
following:

.. code:: yaml

    version: 4
    content:
      - node: .local
        generator_sources:
        - kind: random_float
          name: v1
          params:
            max: 5
            min: -5
          sampling: 10
          targets:
          - sensor:tests/voltage

.. note::

    There is no generator service deployed by default. Make sure the service is
    already either deployed or included into the deployment payload.

Alarms
------

:doc:`Alarms <svc/eva-svc-alarms>` can be deployed as the following:

.. code:: yaml

    version: 4
    content:
      - node: .local
        alarms:
        - group: test
          id: AL001
          level: 20
          # extra parameters

Extra commands
--------------

.. _eva4_iac_bus_calls:

Bus calls
~~~~~~~~~

Node bus calls can be automatically executed before/after the deployment is
complete:

.. code:: yaml

    - node: .local
      extra:
        deploy:
          before:
            - method: test
            - method: item.list
              params:
                i: '#'
            - method: eva.registry::server_set
              params:
                name: auto_flush
                value: false
          after:
            - method: eva.registry::server_set
              params:
                name: auto_flush
                value: true
        undeploy:
          before:
            - method: svc.purge
              params:
                svcs:
                  - eva.svc.locker2
              _pass: true

API calls are always executed in the specified order, one-by-one, *method:*
field contains EAPI method function to execute. The default target is :doc:`the
target node core <core>`, to specify a service call, use the format
"TARGET_SVC::METHOD".

The special parameter *_pass* allows to ignore errors.

Additional deploy functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~

sleep
^^^^^

Delays execution of next before/after deploy commands. E.g. the following block
makes 1-sec delay after undeployment:

.. code:: yaml

    - node: .local
      extra:
        undeploy:
          after:
            - function: sleep
              args: [ 1 ]

system
^^^^^^

Executes (local) system command:

.. code:: yaml

    - node: .local
      extra:
        undeploy:
          after:
            - function: system
              args: [ "touch /tmp/xxx.flag" ]

Deployment via CLI
==================

Deploying
---------

Deployment configuration can be applied using  *eva cloud deploy* (or
*eva-cloud-manager cloud deploy*) command.

Variables
~~~~~~~~~

When deployed with :doc:`CLI<cli>`, deployment files can contain external
variables.

Example:

.. code:: yaml

    - node: {{ srv }}
      items:
        - oid: sensor:{{ srv }}/env/temp

Here is *srv* variable defined. To set its value, e.g. to "plant1", use *-c
srv=plant* command line argument. If multiple variable values are going to be
set, use *-c* argument multiple times.

The deployment variable values can be also got from the system environment,
from variables which have got *ECD_* prefix. For the above example, use a
variable *ECD_srv* to set *srv* template variable:

.. code:: shell

   ECD_srv=node1 eva cloud deploy file.yml

Timeouts
~~~~~~~~

The default deployment timeout is 5 seconds. If some deployment calls
require more time to be executed, consider increasing the timeout value
with command-line argument *-T*:

.. code:: shell

    eva -T 15 cloud deploy file.yml

The deployment file can be a local one or HTTP URL.

Flushing registry
~~~~~~~~~~~~~~~~~

.. _eva4_iac_auto_flush_off:

If :doc:`registry` auto-flush is enabled on the target and multiple items are
deployed, the deployment may take long time to complete. The registry
auto-flush can be automatically switched off and back on with the following
block:

.. code:: yaml

    - node: .local
      extra:
        deploy:
          after:
          - method: eva.registry::server_set
            params:
              name: auto_flush
              value: true
          before:
          - method: eva.registry::server_set
            params:
              name: auto_flush
              value: false
        undeploy:
          after:
          - method: eva.registry::safe_purge
          - method: eva.registry::server_set
            params:
              name: auto_flush
              value: true
          before:
          - method: eva.registry::server_set
            params:
              name: auto_flush
              value: false

The block also calls safe_purge to cleanup the registry after undeploy.

Undeploying
-----------

Deployment configuration can be removed with *eva cloud undeploy*
(*eva-cloud-manager cloud undeploy*) command.  Custom variable values can be
set in the same way as during deployment.

Node parameters
===============

Node deployment parameters can be used to override the default services the
deployment process is applied for:

.. code:: yaml

   - node: .local
     params:
       acl_svc: eva.aaa.acl
       key_svc: eva.aaa.localauth
       user_svc: eva.aaa.localauth
       filemgr_svc: eva.filemgr.main
       generator_svc: eva.generator.default
       alarm_svc: eva.alarm.default

Advanced configuration
======================

:ref:`eva4_yaml_advanced` directives are processed by the deployment CLI tool
on the local machine. If the target deployment (e.g. a service configuration)
must contain these directives, use "^^" directive prefix instead of a single
one.

Dealing with timeouts
=====================

During deployment the following timeouts may appear:

General timeout
---------------

Caused by the cloud manager CLI which waits 5 seconds as max by default for
each RPC response. To increase the general timeout, use "-T" option of
:ref:`eva4_eva-shell` or "-t" option if the cloud manger CLI is used directly:

.. code:: shell

    eva -T 60 could deploy file.yml

Remote node timeout
-------------------

When deploying to remote nodes, RPC calls go thru an instance of
:doc:`svc/eva-repl`. The service has got own timeouts for RPC calls to
particular nodes which can be changed with adding "timeout" field to the remote
node configuration:

.. code:: shell

    eva node edit remote-node-name

to modify the default timeout for all nodes, set the value of "timeout/default"
field of the replication service:

.. code:: shell

    eva svc edit eva.repl.default

Downloading files on remote nodes
---------------------------------

When HTTP URL is pushed to a remote node with a download request, it is
processed by an instance of :doc:`svc/eva-filemgr` on the remote. The default
download timeout is 5 seconds.

To raise the timeout, set "timeout/default" field of the file manager service
instance on the **remote** node:

.. code:: shell

    eva svc edit eva.filemgr.main

Deployment automation
=====================

Starting from the version 0.2.29, :doc:`EVA ICS Python SDK
<./sdk/python/index>` provides a module for deployment automation. It is
recommended to use the module for all tasks where the deployment configuration
is generated dynamically, is complicated or requires a lot of boilerplate code.

All deployment automation components except `Deploy` and `Node` are optional
and allow development operators both using the high-level API with pre-defined
elements or modify the payload either directly or using `add`/`set` methods,
which accept key names as paths.

:ref:`Full API reference <eva4_python_sdk_deploy>`

If using on a non-EVA ICS system, install the SDK and PyYAML:

.. code:: shell

    pip3 install evaics pyyaml

Example:

.. literalinclude:: ./sdk-examples/python/deploy.py
   :language: python

It is also possible to deploy using a generation script directly:

.. code:: shell

    python3 deploy.py | eva cloud deploy -
