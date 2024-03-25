Data objects
************

.. contents::

Data objects are structural interfaces which allow to process and convert
traditional SCADA/fieldbus data into EVA ICS :doc:`items`.

The data objects are defined and processed by :doc:`EVA ICS core <core>`.

.. raw:: html

    <div style="font-size: larger; width: 100%; margin-bottom: 20px; text-align: center; font-weight: bold; font-style: italic;">
    Data Object = Structured interface + Data Buffer + DCS item mappings
    </div>

.. note::

   EVA ICS core data objects have write-only (push) access. Reading data back
   is not supported.

   PLCs and real-time applications should not use the core data objects for
   data exchange. Instead they should use either unmapped fieldbus shared
   context or channels. Consider reviewing features of chosen fieldbus
   protocols.

Manipulating data objects
=========================

To create and edit a new data object, execute :ref:`eva4_eva-shell` command:

.. code-block:: shell

   eva dobj create MyObj
   eva dobj edit MyObj

Each data object has got the following parameters:

* **name** - data object name

* **fields** - list of structure fields

Where fields contain:

* **name** - field name

* **type** - field data type

* **oid** - Mapping to a EVA ICS DCS :doc:`item <items>` (optional).

.. note::

   Data object names must contain only letters, digits and underscores.

Data objects can be also deployed/undeployed/exported in bulk using either
:ref:`eva4_eva-shell` (for the local node) or a :ref:`eva4_iac_dobj`.

Example
-------

Let us crate a data object for environment sensors, where there are two
temperature sensors.

.. code-block:: shell

   eva dobj create Env
   eva dobj edit Env

.. code:: yaml

    name: Env
    fields:
    - name: temp
      oid: sensor:env/temp
      type: f64,2
    - name: hum
      oid: sensor:env/hum
      type: f64
    - name: pressure
      oid: sensor:env/pressure
      type: f64

Let us now create another data object, which has got environment sensor mapping
for two plants:

.. code-block:: shell

   eva dobj create PlantsEnv
   eva dobj edit PlantsEnv

.. code:: yaml

    name: PlantsEnv
    fields:
    - name: Turbine
      type: Env
    - name: Battery
      type: Env

Let us validate the data objects created:

.. code-block:: shell

   eva dobj validate

Data types
==========

========  =============  =====================================
Type      Aliases        Description
========  =============  =====================================
bool      BOOL, BOOLEAN  A boolean value (in-memory as 1/0 u8)
i8        SINT           8-bit signed integer
u8        USINT          8-bit unsigned integer
i16       INT            16-bit signed integer
u16       UINT           16-bit unsigned integer
i32       DINT           32-bit signed integer
u32       UDINT          32-bit unsigned integer
i64       LINT           64-bit signed integer
u64       ULINT          64-bit unsigned integer
f32       REAL           32-bit floating point number
f64       LREAL          64-bit floating point number
========  =============  =====================================

* If a data type is specified as TYPE,N it is processed as an array. Example:
  **i32,3** is an array of 3 32-bit signed integers.

* If a data type is specified as a type, unlisted in the table above, it is
  processed as a custom structure.

Validation
==========

Data objects can be validated using :ref:`eva4_eva-shell`:

.. code-block:: bash

   eva dobj validate

When validated, the EVA ICS core verifies that all data objects have got known
data types.

Submitting data
===============

EAPI
----

Data blocks into data objects can be pushed using :doc:`eapi` RPC command
:ref:`eva4_eva.core__dobj.push` sent to "eva.core". If any :doc:`items <items>`
are mapped, their states automatically get updated.

This allows to simplify and unify data processing logic for both fieldbus
controller services, controllers themselves and custom scripts/programs.

UDP
---

Various 3rd party software (such as Matlab, LabView etc.) and hardware can send
raw UDP packets which can be processed with EVA ICS data objects.

See :doc:`svc/eva-controller-dobj`.

Development
===========

ICD and HTTP API methods
------------------------

:doc:`svc/eva-hmi` has got certain methods to allow developers to work with
data objects via HTTP API (read-only):

* :ref:`eva4_hmi_http__dobj.list` - list data objects

* :ref:`eva4_hmi_http__dobj.get_struct` - get a data object as a structure
  (with no :doc:`items <items>` mapping)

* :ref:`eva4_hmi_http__dobj.generate_struct_code` - generate a data object
  structure code for the selected programming language

The methods allow to automatically generate interface control documentation
(ICD) and structured types for various programming languages.

.. note::

    To access the functions, a user must have *developer* operation set in his
    :ref:`ACL <eva4_acl>`.

ICD (Interface Control Documentation) and code generation is available in
:doc:`va/opcentre`, section "Data objects".

Code generation
---------------

Code generation can be automated with
:ref:`eva4_hmi_http__dobj.generate_struct_code` HTTP method.

.. _eva4_dobj_codegen_c:

C/C++
~~~~~

No any special options are available for C/C++ generator. Arrays and arrays of
structures are always generated in stack. Consider moving them to heap manually
if required.

.. _eva4_dobj_codegen_rust:

Rust
~~~~

Rust generator has got special options, provided as subfields for "config"
field:

* **box_arrays (number)** automatically box arrays which are equal or larger
  than the specified number of elements (default: from 100 elements)

* **derive_debug (boolean)** automatically derive Debug trait for the structure

* **derive_default (boolean)** automatically derive Default trait for the structure

* **derive_clone (boolean)** automatically derive Clone trait for the structure

* **derive_copy (boolean)** automatically derive Copy trait for the structure

* **derive_eq (boolean)** automatically derive Eq and PartialEq traits for the structure

* **binrw (string)** generate binrw serialization/deserialization code for the
  structure. The string can be "big", "little" or "native"
