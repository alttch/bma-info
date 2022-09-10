The script-runner controller is used to update item states and execute actions
using external shell scripts or programs.

External scripts are useful for rapid-draft integration of an equipment or if
the equipment does not require high-speed actions/updates.

Commons
=======

When executed, a script has the following environment variables set:

* **EVA_BUS_PATH** path to the bus socket
* **EVA_DIR** EVA ICS directory
* **EVA_ITEM_OID** item OID (e.g. *sensor:plant1/tests/env*)
* **EVA_ITEM_FULL_ID** item full id (e.g. *plant1/test/env*)
* **EVA_ITEM_GROUP** item group (e.g. *plant1/test*)
* **EVA_ITEM_ID** item short id (e.g. *env*)
* **EVA_ITEM_PARENT_GROUP** the nearest parent group (e.g. *test*)
* **EVA_ITEM_TYPE** item type (e.g. *sensor*)

Update scripts
==============

The update scripts must print current state for item(s), a single one or
multiple, in order as configured, separated by space:

    <STATUS> [VALUE]

The status field is always i16, the value is optional, e.g.:

.. code:: shell

    1 12.95
    1 2.77

If state values exist, they are automatically converted to numerics if
possible.

The update is considered as failed if the script exits with a non-zero code.

Action scripts
==============

Action scripts are executed with the following parameters:

.. code:: shell

    path/to/script <STATUS> [VALUE]

where status/value is the desired action state.

The action is considered as failed if the script exits with a non-zero code.

Current unit states
-------------------

Sometimes to perform an action, the current unit state is required. There are
no environment variables in the service to avoid unnecessary action-preparation
bus calls. In case if the state is required, it can be obtained manually via a
:doc:`command-line <../cli>` bus call:

.. code:: shell

    "${EVA_DIR}/sbin/bus" -s "$EVA_BUS_PATH" \
        rpc call eva.core item.state "i=$EVA_ITEM_OID" | jq -r ".[0]"

It is recommended to store the state in a variable and use *jq* later to parse
required fields.
