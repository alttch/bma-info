OPC-UA client I/O
******************

.. contents::

.. note::

   The described functionality requires **opcua** crate feature.

Block configuration
===================

OPC-UA I/O should be defined in PLC config YAML as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: opcua
      config:
        # custom pki dir, by default automatically created as
        # PLC_VAR_DIR/processname_pki
        #pki_dir: /some/dir
        trust_server_certs: false
        create_keys: true # auto-create a cert/key
        timeout: 5 # server timeout
        # by default the client tries to connect as anonymous
        # user authentication:
        #auth:
        #  user: usernmae
        #  password: secret
        # X509 authentication
        #auth:
          # absolute paths or relative to pki_dir
          #cert_file: own/cert.der
          #key_file: private/private.pem
        url: opc.tcp://host:port # e.g. opc.tcp://192.168.1.5:4855
      input:
        # input block configurations (array)
      output:
        # output block configurations (array)

A single I/O per target server should be used. It can contain any number of
input and output blocks which can have different synchronization intervals.

Input blocks
============

OPC nodes are read in bulk blocks and then parsed to context according to
defined maps.

Input blocks should be defined as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: opcua
      config:
        # .....
      input:
        - nodes:
            - id: "ns=2;s=var1"
              map: var1 # a context variable to map
            - id: "ns=2;s=var2"
              map: var2
          sync: 500ms
        - nodes:
            - id: "ns=2;g=dcff8e02-4706-49ea-979c-fc1ec6cff8ef"
              map: temp
          sync: 2s
      output:
        # ....


The field *sync* is mandatory and specifies how frequently the block must be
synchronized.

Output blocks
=============

Output blocks should be defined as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: opcua
      config:
        # .....
      input:
        # .....
      output:
        - nodes:
          - id: "ns=2;s=somevar1"
            map: outvar1
          - id: "ns=2;s=somevar2"
            map: outvar2
          sync: 1s
        - nodes:
          - id: "ns=2;s=somevar3"
            map: outvar3
          - id: "ns=2;s=somevar4"
            map: outvar4
          sync: 500ms
          cache: 20s


The field *sync* is mandatory and specifies how frequently the block must be
synchronized.

The field *cache* is optional. If an output variable is cached, its state is
not synchronized with OPC-UA server until the cache expires.
