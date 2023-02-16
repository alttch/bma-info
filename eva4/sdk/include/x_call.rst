X call basics
=============

:doc:`../../svc/eva-hmi` can be extended with additional calls, called "X"
calls.

When a client calls method *x::svc_id::method*, the following happens:

* the target service gets EAPI calls to the method "x"

* the call contains the following payload:

======  ======  ==================================
field   type    description
======  ======  ==================================
method  String  the target x-method of the service
params  Any     the target x-method params
aci     Map     ACI (API Call Info) data
acl     Map     the session ACL
======  ======  ==================================

* the implemented method must check access control to resources manually if
  required

* the result (or error) is returned to the client as-is

