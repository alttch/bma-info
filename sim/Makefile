all:
	@echo "Select target"

prepare:
	mkdir -p svc-tpl
	cp /opt/sim/svc-tpl/* svc-tpl/
	find svc-tpl -name "*.yml" -exec sed -i 's|/opt/sim/target/debug/|sim/|g' {} \;
	/opt/eva4/sbin/eapigen --omit-title sim.modbus.generic /opt/sim/modbus-generic/eapi.yml > ./include/autogen/modbus_generic.rst
	/opt/eva4/sbin/eapigen --omit-title sim.modbus.sensor /opt/sim/modbus-sensor/eapi.yml > ./include/autogen/modbus_sensor.rst
	/opt/eva4/sbin/eapigen --omit-title sim.modbus.relay /opt/sim/modbus-relay/eapi.yml > ./include/autogen/modbus_relay.rst
	/opt/eva4/sbin/eapigen --omit-title sim.ads.port /opt/sim/ads-port/eapi.yml > ./include/autogen/ads_port.rst
	/opt/eva4/sbin/eapigen --omit-title sim.ads.service /opt/sim/ads-service/eapi.yml > ./include/autogen/ads_service.rst
	cp /opt/sim/CHANGELOG.rst ./include/
