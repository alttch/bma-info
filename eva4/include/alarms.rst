Alarms service allows operator to deal with alarm events happened on EVA ICS
nodes.

Functionality limitations
=========================

The service is not open-source and is included in :doc:`../enterprise`. Despite
being a part of EVA ICS Enterprise, it is allowed to use service instances
without a license, with the following limitations:

- The maximum number of alarms is limited to 10
- The service is limited to a local node, cloud alarms are not supported

Architecture
============

The service implements ANSI/ISA 18.2 alarm management standard and allows to
deal with alarms on both local and remote nodes.

.. figure:: ../schemas/alarms.svg
    :width: 445px
    :alt: Alarms architecture

Each alarm is represented by a :ref:`eva4_lvar` item. The service manages lvars
and allows operators to perform standard alarm actions, such as getting alarm
state/summary/history, acknowledging, shelving, etc.

There are two kinds of alarms: managed and regular. A managed alarm means an
alarm, configured on a local node. Such alarm is allowed to be set in any
state, using either internal rules or external scenarios.

In addition to the internal rule engine, the service provides a flexible
:doc:`../eapi` interface which allows system integrators to create complex
alarm setups.

Terminology
===========

The tables provided below describe service data types and input/output codes.

Alarm space
-----------

An alarm space is defined with *prefix* service configuration field (the
default is *alarm/default*). Alarm service instances which operate in the same
space work with the same set of alarms.

.. warning::

    It is highly recommended to use a single service instance per a node with the
    same alarm space to avoid conflicts.

Alarm operations
----------------

ISA 18.2 defines the following alarm operations:

=====  =================  =============================================
Code   Name               Description
=====  =================  =============================================
TT     Trigger            Trigger an alarm
TL     Latch              Trigger + latch alarm
SS     Shelve             Shelve (suspend) an alarm
US     Unshelve           Unshelve (resume) an alarm
CC     Clear              Clear an alarm
SD     Suspend-by-design  Suspend an alarm (do not accept triggers)
RD     Resume-by-design   Resume an alarm (accept triggers)
AA     Acknowledge        Acknowledge an alarm
OS     Out-of-service     Put an alarm out of service
IS     In-service         Put an alarm in service
=====  =================  =============================================

* Triggered alarms can be acknowledged when active, if a clear operation is
  applied, the alarm is removed from the active state.

* Latched alarms are triggered and latched, they must be acknowledged even if a
  clear operation is applied.

* Shelved alarms are excluded from the alarm summary, however they still can be
  triggered/cleared in the background.

* Suspended-by-design operation is applied when an alarm source is down (e.g.
  PLC is shut down) so the assigned rules may produce trigger events which
  should be ignored. This operation can be applied by an external scenario or
  program only.

* Out-of-service operation means the alarm source is down and it is unable to
  determine is the alarm is active or not. E.g. an alarm is triggered by a
  temperature sensor. Out of service means the sensor is down and the current
  temperature is unknown.

Sources and source kinds
------------------------

Each alarm operation must include a source name and a source kind. Source name
is a string. HTTP API sets the source name to the login of the user who
performs the operation. External scenarios can use any custom source names or
leave the source field empty (use an empty string).

Source kinds are coded as the following:

=====  ===============================
Code   Description
=====  ===============================
U      User operation
P      Program operation
R      Used by an internal rule system
=====  ===============================

Alarm controls
--------------

Each service instance automatically crates a control :ref:`eva4_lmacro` which
is used to send operator control commands to alarms. As lmacros are cloud-wide
accessible, it is possible to control alarms on both local and remote nodes.

E.g. a service with alarm space *alarm/default* creates a control lmacro with
OID: *lmacro:alarm/default/NODE_NAME/control*. where *NODE_NAME* is the system
name of the current node.

The scenario accepts the following parameters (all are mandatory):

================  =============  =============================================
Name              Type           Description
================  =============  =============================================
alarm_oid (i)     String         Alarm lvar OID
command (cmd)     String         Command code
source_kind (sk)  String         Source kind
source (src)      String         Source name
================  =============  =============================================

Unlike alarm operations, alarm control commands can be applied to any alarm in
a cloud but the list of allowed operations is restricted. The following command
codes are accepted:

* **AA** - Acknowledge an alarm
* **SS** - Shelve (suspend) an alarm
* **US** - Unshelve (resume) an alarm

Alarm states
------------

An alarm lvar value contains a set of fields used to process alarm logic.
However when a state method is called, the value is contracted to the
following fields which represent the current alarm state:

* **active** - A boolean value, which is set to *true* if the alarm is
  triggered, triggered+latched, latched (triggered+latched, then cleared but
  not acknowledged) or out-of-service.

* **current** - Contains the current alarm state code:

=====  ===================  =============================================
Code   Name                 Description
=====  ===================  =============================================
CC     Cleared              The alarm is cleared (default state)
TL     Triggered+latched    The alarm is triggered and latched
LL     Latched              The alarm is latched
TT     Triggered            The alarm is triggered
OS     Out-of-service       The alarm is out of service
AA     Acknowledged         The alarm is acknowledged
SS     Shelved              The alarm is shelved
SD     Suspended-by-design  The alarm is suspended by design
=====  ===================  =============================================

Alarm subscriptions
-------------------

The following kinds are supported:

=====  ===================
Code   Description
=====  ===================
M      E-mail
=====  ===================

When a subscription method is called, a notification is sent to the subscribed
user when an alarm operation is applied. It is recommended to subscribe at
least to the following operations: *TT*, *TL*, *OS*.

Note that triggered and triggered + latched alarm operations are different,
despite the user may see the same notification.

If an alarm or user is deleted, its subscriptions are kept so if a new alarm
with the same OID/user with the same login is created, the subscriptions are
restored.

Defining alarms
===============

The alarms can be deployed either with :doc:`../iac` or by calling
:ref:`eva4_eva.alarm.__alarm.deploy` EAPI method directly. It also possible to
manage alarms with :ref:`eva4_eva-shell` commands.

An alarm payload example:

.. code:: yaml

    alarms:
      # a mandatory alarm group
      group: test
      # a mandatory alarm ID
      id: AL001
      # a mandatory alarm level (0-255)
      level: 20
      # an optional alarm description
      description: "test alarm"
      # an optional configuration
      - config:
          # optional delayed alarm configuration
          delay:
            # delay for out-of-service state (seconds). If in-service operation
            # is applied during the delay, the out-of-service operation is
            # aborted.
            oos: 1.0
            # delay for triggres (seconds). If the alarm is cleared during the
            # delay, the trigger is aborted.
            trig: 1.0
          # internal rules, processed one-by-one
          rules:
          # an optional bit parameter to process value bit number
          - bit: null
            # optional, break the rule chain if the condition is met
            break: false
            # condition to process the rule, written as a string
            condition: "x >= 30"
            # optional, on initial core state: process/skip/only
            initial: process
            # OID of an item which is monitored
            oid: sensor:env/temp
            # Alarm operation code, trigger+latch the alarm
            op: TL
            # optional, item state property to monitor (the default is value)
            prop: value
          - condition:
              # a condition written in the machine format
              max: 25.0
              max_eq: false
              min: null
              min_eq: false
            initial: process
            oid: sensor:env/temp
            # clear the alarm
            op: CC
            prop: value
          - condition: "x = 1"
            oid: sensor:env/temp
            # set the alarm in-service if the sensor status is 1
            op: IS
            prop: status
          - condition: "x = -1"
            oid: sensor:env/temp
            # set the alarm out-of-service if the sensor status is -1 (error)
            op: OS
            prop: status
  
When deployed, the above payload creates an alarm with assigned
:ref:`eva4_lvar` *lvar:alarm/default/NODE_NAME/20/test/AL001*. After creation,
the majority operations are handled by providing lvar OID.

If a description is defined, it is placed into meta/description field of the
item.

.. warning::

   It is highly non-recommended to modify/read alarm lvar values manually as
   the internal logic may be changed in the further versions of the service.
   Use the service methods only.

For more complex rule chains it is recommended to use
:doc:`../svc/eva-controller-lm` or a custom event-processing service.

Service instance IDs
====================

For the default functionality, service instances must have IDs set to
*eva.alarm.default*. For custom functionality, any ID can be used.
