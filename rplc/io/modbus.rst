Modbus master (client) I/O
**************************

.. contents::

Modbus I/O is supported out-of-the-box via TCP and RTU (via RS485 serial
ports).

.. note::

   The described functionality requires **modbus** crate feature.

Block configuration
===================

Modbus I/O should be defined in PLC config YAML as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: modbus
      config:
        proto: tcp # or rtu
        path: host:port # e.g. 192.168.1.5:503
        # for RTU e.g.:
        #path: /dev/ttyS0:9600:8:N:1
        # the port reconnects if there are no operations within the timeout
        timeout: 5 
      input:
        # input block configurations (array)
      output:
        # output block configurations (array)

A single I/O per target device should be used. It can contain any number of
input and output blocks which can have different synchronization intervals.

Register codes
==============

* **hN** holding register, 16-bit (e.g. *h100* - holding register #100)
* **iN** input register, 16-bit
* **cN** coil, boolean
* **dN** discrete input, boolean

Input blocks
============

Modbus registers are read in bulk blocks and then parsed to context according
to defined maps.

Input blocks should be defined as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: modbus
      config:
        # .....
      input:
      - reg: h0-9 # get the first 10 16-bit holding registers
        unit: 0x01 # remote device unit ID
        map:
        - offset: 0
          target: var1 # a context variable
        - offset: 2
          target: var2 # another variable
        sync: 500ms
      - reg: c0-1
        unit: 0x01
        map:
        - target: flag1
        - offset: 1
          target: flag2
        sync: 1s
      output:
        # ....

Another way to specify the number of registers to read:

.. code:: yaml

    - reg: h0
      number: 10 # 10 registers, starting from h0

The offset *0* can be omitted. Another way to specify offset is =N, e.g. =100.
This means the offset is absolute, e.g. if a block starting from *h100*
(holding register #100) is fetched, =102 means 2nd register (starting from
zero) in the block but 102th absolute holding register.

The field *sync* is mandatory and specifies how frequently the block must be
synchronized.

The I/O module automatically gets the required number of registers in block and
tries to convert them both to single variables and to arrays. Coils and
discrete inputs can be synchronized with boolean variables only.

Float numbers can be directly synchronized if IEEE754 encoding is used on the
target device. Otherwise it is necessary to define a temporary context variable
and parse it in PLC programs.

Output blocks
=============

It is highly recommended to write Modbus registers in bulk blocks as well.

Output blocks should be defined as:

.. code:: yaml

    io:
    - id: someblock # id must be 14 chars as max
      kind: modbus
      config:
        # .....
      input:
        # .....
      output:
      - reg: h10-19 # write 10 16-bit holding registers starting from h10
        unit: 0x01 # remote device unit ID
        map:
        - offset: 0
          target: var3 # a context variable to put
        - offset: 2
          target: var4 # another variable to put
        sync: 500ms
      - reg: c0-1
        unit: 0x01
        map:
        - target: out1
        - offset: 1
          target: out2
        sync: 1s

Another way to specify the number of registers to write:

.. code:: yaml

    - reg: h10
      number: 10 # 10 registers, starting from h10

The field *sync* is mandatory and specifies how frequently the block must be
synchronized.

Coils and discrete inputs can be synchronized with boolean variables only.

Float numbers can be directly synchronized if IEEE754 encoding is used on the
target device. Otherwise it is necessary to define a temporary context variable
and prepare it in PLC programs.