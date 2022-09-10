.. list-table::

   * - Suggested name
     - Executable
     - Description
     - Deployed
   * - :doc:`eva.controller.w1_N<svc/eva-controller-w1>`
     - svc/eva-controller-w1
     - :doc:`1-Wire (OWFS) controller<svc/eva-controller-w1>`
     - 
   * - :doc:`eva.aaa.msad<svc/eva-aaa-msad>`
     - path/to/eva-aaa-msad
     - :doc:`Active directory auth service<svc/eva-aaa-msad>`
     - requires :doc:`enterprise`
   * - :doc:`eva.aaa.acl<svc/eva-aaa-acl>`
     - svc/eva-aaa-acl
     - :doc:`Default ACL service<svc/eva-aaa-acl>`
     - by default with HMI (*--hmi*)
   * - :doc:`eva.controller.enipN<svc/eva-controller-enip>`
     - svc/eva-controller-enip
     - :doc:`Ethernet/IP PLC controller gateway<svc/eva-controller-enip>`
     - 
   * - :doc:`eva.filemgr.main<svc/eva-filemgr>`
     - svc/eva-filemgr
     - :doc:`File manager service<svc/eva-filemgr>`
     - always by default
   * - :doc:`eva.kioskman.default<svc/eva-kioskman>`
     - path/to/eva-kioskman
     - :doc:`HMI kiosk manager<svc/eva-kioskman>`
     - requires :doc:`enterprise`
   * - :doc:`eva.hmi.default<svc/eva-hmi>`
     - svc/eva-hmi
     - :doc:`HMI service<svc/eva-hmi>`
     - by default with *--hmi* arg
   * - :doc:`eva.db.iN<svc/eva-db-influx>`
     - svc/eva-db-influx
     - :doc:`InfluxDB state history<svc/eva-db-influx>`
     - 
   * - :doc:`eva.svc.expN<svc/eva-svc-expiration>`
     - svc/eva-svc-expiration
     - :doc:`Item state expiration service<svc/eva-svc-expiration>`
     - 
   * - :doc:`eva.svc.fwriterN<svc/eva-svc-filewriter>`
     - svc/eva-svc-filewriter
     - :doc:`Item state file writer (JSON/CSV)<svc/eva-svc-filewriter>`
     - 
   * - :doc:`eva.repl.legacyN<svc/eva4-svc-repl-legacy>`
     - venv/bin/eva4-svc-repl-legacy
     - :doc:`Legacy (V3) replication service<svc/eva4-svc-repl-legacy>`
     - requires `eva4-repl-legacy <https://pypi.org/project/eva4-repl-legacy/>`_ Python module
   * - :doc:`eva.aaa.localauth<svc/eva-aaa-localauth>`
     - svc/eva-aaa-localauth
     - :doc:`Local user/key authentication service<svc/eva-aaa-localauth>`
     - by default with HMI (*--hmi*)
   * - :doc:`eva.controller.lmN<svc/eva-controller-lm>`
     - svc/eva-controller-lm
     - :doc:`Logic manager<svc/eva-controller-lm>`
     - 
   * - :doc:`eva.svc.mailer<svc/eva-svc-mailer>`
     - svc/eva-svc-mailer
     - :doc:`Mailer service<svc/eva-svc-mailer>`
     - 
   * - :doc:`eva.svc.mirror<svc/eva-svc-mirror>`
     - svc/eva-svc-mirror
     - :doc:`Mirror service<svc/eva-svc-mirror>`
     - 
   * - :doc:`eva.controller.modbusN<svc/eva-controller-modbus>`
     - svc/eva-controller-modbus
     - :doc:`Modbus master controller<svc/eva-controller-modbus>`
     - 
   * - :doc:`eva.svc.modbusN<svc/eva-svc-modbus-slave>`
     - svc/eva-svc-modbus-slave
     - :doc:`Modbus slave service<svc/eva-svc-modbus-slave>`
     - 
   * - :doc:`eva.aaa.otp<svc/eva-aaa-otp>`
     - svc/eva-aaa-otp
     - :doc:`OTP 2nd-Factor authentication service<svc/eva-aaa-otp>`
     - 
   * - :doc:`eva.controller.py<svc/eva4-svc-controller-py>`
     - venv/bin/eva4-svc-controller-py
     - :doc:`Python macros controller<svc/eva4-svc-controller-py>`
     - requires `eva4-controller-py <https://pypi.org/project/eva4-controller-py/>`_ Python module
   * - :doc:`eva.repl.N<svc/eva-repl>`
     - svc/eva-repl
     - :doc:`Replication service<svc/eva-repl>`
     - 
   * - :doc:`eva.controller.trapN<svc/eva-controller-trap>`
     - svc/eva-controller-trap
     - :doc:`SNMP/UDP trap handler<svc/eva-controller-trap>`
     - 
   * - :doc:`eva.db.sN<svc/eva-db-sql>`
     - svc/eva-db-sql
     - :doc:`SQL databases state history<svc/eva-db-sql>`
     - 
   * - :doc:`eva.controller.srN<svc/eva-controller-sr>`
     - svc/eva-controller-sr
     - :doc:`Script runner controller<svc/eva-controller-sr>`
     - 
   * - :doc:`eva.svc.lockerN<svc/eva-svc-locker>`
     - svc/eva-svc-locker
     - :doc:`Shared lock service<svc/eva-svc-locker>`
     - 
   * - :doc:`eva.svc.tts.PROVIDER<svc/eva4-svc-tts>`
     - venv/bin/eva4-svc-tts
     - :doc:`Text-to-speech service<svc/eva4-svc-tts>`
     - requires `eva4-svc-tts <https://pypi.org/project/eva4-svc-tts/>`_ Python module
   * - :doc:`eva.bridge.adsN<svc/eva-bridge-ads>`
     - svc/eva-bridge-ads
     - :doc:`TwinCAT ADS bridge<svc/eva-bridge-ads>`
     - 
   * - :doc:`eva.controller.adsN<svc/eva-controller-ads>`
     - svc/eva-controller-ads
     - :doc:`TwinCAT ADS controller<svc/eva-controller-ads>`
     - 
   * - :doc:`eva.controller.virtN<svc/eva-controller-virtual>`
     - svc/eva-controller-virtual
     - :doc:`Virtual controller<svc/eva-controller-virtual>`
     - 
   * - :doc:`eva.zfrepl.N.collector|replicator<svc/eva-zfrepl>`
     - path/to/eva-zfrepl
     - :doc:`Zero-failure replication service<svc/eva-zfrepl>`
     - requires :doc:`enterprise`
