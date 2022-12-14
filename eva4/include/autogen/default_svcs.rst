.. list-table::

   * - Description
     - Suggested name
     - Executable
     - Deployed
   * - :doc:`1-Wire (OWFS) controller<svc/eva-controller-w1>`
     - :doc:`eva.controller.w1_N<svc/eva-controller-w1>`
     - svc/eva-controller-w1
     - 
   * - :doc:`Active directory auth service<svc/eva-aaa-msad>`
     - :doc:`eva.aaa.msad<svc/eva-aaa-msad>`
     - svc/eva-aaa-msad
     - requires :doc:`enterprise`
   * - :doc:`Default ACL service<svc/eva-aaa-acl>`
     - :doc:`eva.aaa.acl<svc/eva-aaa-acl>`
     - svc/eva-aaa-acl
     - by default with HMI (*--hmi*)
   * - :doc:`Ethernet/IP PLC controller gateway<svc/eva-controller-enip>`
     - :doc:`eva.controller.enipN<svc/eva-controller-enip>`
     - svc/eva-controller-enip
     - 
   * - :doc:`File manager service<svc/eva-filemgr>`
     - :doc:`eva.filemgr.main<svc/eva-filemgr>`
     - svc/eva-filemgr
     - always by default
   * - :doc:`HMI kiosk manager<svc/eva-kioskman>`
     - :doc:`eva.kioskman.default<svc/eva-kioskman>`
     - svc/eva-kioskman
     - requires :doc:`enterprise`
   * - :doc:`HMI service<svc/eva-hmi>`
     - :doc:`eva.hmi.default<svc/eva-hmi>`
     - svc/eva-hmi
     - by default with *--hmi* arg
   * - :doc:`InfluxDB state history<svc/eva-db-influx>`
     - :doc:`eva.db.iN<svc/eva-db-influx>`
     - svc/eva-db-influx
     - 
   * - :doc:`Item state expiration service<svc/eva-svc-expiration>`
     - :doc:`eva.svc.expN<svc/eva-svc-expiration>`
     - svc/eva-svc-expiration
     - 
   * - :doc:`Item state file writer (JSON/CSV)<svc/eva-svc-filewriter>`
     - :doc:`eva.svc.fwriterN<svc/eva-svc-filewriter>`
     - svc/eva-svc-filewriter
     - 
   * - :doc:`Legacy (V3) replication service<svc/eva4-svc-repl-legacy>`
     - :doc:`eva.repl.legacyN<svc/eva4-svc-repl-legacy>`
     - venv/bin/eva4-svc-repl-legacy
     - requires `eva4-repl-legacy <https://pypi.org/project/eva4-repl-legacy/>`_ Python module
   * - :doc:`Local user/key authentication service<svc/eva-aaa-localauth>`
     - :doc:`eva.aaa.localauth<svc/eva-aaa-localauth>`
     - svc/eva-aaa-localauth
     - by default with HMI (*--hmi*)
   * - :doc:`Logic manager<svc/eva-controller-lm>`
     - :doc:`eva.controller.lmN<svc/eva-controller-lm>`
     - svc/eva-controller-lm
     - 
   * - :doc:`Mailer service<svc/eva-svc-mailer>`
     - :doc:`eva.svc.mailer<svc/eva-svc-mailer>`
     - svc/eva-svc-mailer
     - 
   * - :doc:`Mirror service<svc/eva-svc-mirror>`
     - :doc:`eva.svc.mirror<svc/eva-svc-mirror>`
     - svc/eva-svc-mirror
     - 
   * - :doc:`Modbus master controller<svc/eva-controller-modbus>`
     - :doc:`eva.controller.modbusN<svc/eva-controller-modbus>`
     - svc/eva-controller-modbus
     - 
   * - :doc:`Modbus slave service<svc/eva-svc-modbus-slave>`
     - :doc:`eva.svc.modbusN<svc/eva-svc-modbus-slave>`
     - svc/eva-svc-modbus-slave
     - 
   * - :doc:`OTP 2nd-Factor authentication service<svc/eva-aaa-otp>`
     - :doc:`eva.aaa.otp<svc/eva-aaa-otp>`
     - svc/eva-aaa-otp
     - 
   * - :doc:`Python macros controller<svc/eva4-svc-controller-py>`
     - :doc:`eva.controller.py<svc/eva4-svc-controller-py>`
     - venv/bin/eva4-svc-controller-py
     - requires `eva4-controller-py <https://pypi.org/project/eva4-controller-py/>`_ Python module
   * - :doc:`Replication service<svc/eva-repl>`
     - :doc:`eva.repl.N<svc/eva-repl>`
     - svc/eva-repl
     - 
   * - :doc:`SNMP/UDP trap handler<svc/eva-controller-trap>`
     - :doc:`eva.controller.trapN<svc/eva-controller-trap>`
     - svc/eva-controller-trap
     - 
   * - :doc:`SQL databases state history<svc/eva-db-sql>`
     - :doc:`eva.db.sN<svc/eva-db-sql>`
     - svc/eva-db-sql
     - 
   * - :doc:`Script runner controller<svc/eva-controller-sr>`
     - :doc:`eva.controller.srN<svc/eva-controller-sr>`
     - svc/eva-controller-sr
     - 
   * - :doc:`Shared lock service<svc/eva-svc-locker>`
     - :doc:`eva.svc.lockerN<svc/eva-svc-locker>`
     - svc/eva-svc-locker
     - 
   * - :doc:`Text-to-speech service<svc/eva4-svc-tts>`
     - :doc:`eva.svc.tts.PROVIDER<svc/eva4-svc-tts>`
     - venv/bin/eva4-svc-tts
     - requires `eva4-svc-tts <https://pypi.org/project/eva4-svc-tts/>`_ Python module
   * - :doc:`TwinCAT ADS bridge<svc/eva-bridge-ads>`
     - :doc:`eva.bridge.adsN<svc/eva-bridge-ads>`
     - svc/eva-bridge-ads
     - 
   * - :doc:`TwinCAT ADS controller<svc/eva-controller-ads>`
     - :doc:`eva.controller.adsN<svc/eva-controller-ads>`
     - svc/eva-controller-ads
     - 
   * - :doc:`Virtual controller<svc/eva-controller-virtual>`
     - :doc:`eva.controller.virtN<svc/eva-controller-virtual>`
     - svc/eva-controller-virtual
     - 
   * - :doc:`Zero-failure replication service<svc/eva-zfrepl>`
     - :doc:`eva.zfrepl.N.collector|replicator<svc/eva-zfrepl>`
     - svc/eva-zfrepl
     - requires :doc:`enterprise`
