all:
	@echo "Select target"

prepare:
	cd /opt/eva-util/v4/pymacrodata && ./generate.py /opt/bma-info/eva4/lmacro/py
	cd /opt/eva4-enterprise/eva4-esvc/kiosk-manager && make eapi
	cp /opt/eva4/CHANGELOG.rst changelog.rst
	rm -rf registry_config
	cp -r /opt/eva4/svc/svc-example-temp ./sdk-examples/rust/
	cp -r /opt/eva4/svc/svc-example-sensor-set ./sdk-examples/rust/
	cp -r /opt/eva4/share/registry/defaults/config registry_config
	rm -rf svc-tpl
	cp -r /opt/eva4/share/svc-tpl .
	cp -r /opt/eva4-enterprise/svc-tpl/* svc-tpl/
	rm -rf etc-config
	mkdir etc-config
	cp -r /opt/eva4/etc/*-dist etc-config/
	find svc-tpl -name "*.yml" -exec sed -i 's|target/debug/|svc/|g' {} \;
	cp /opt/eva4-enterprise/svc-tpl/* svc-tpl/
	/opt/eva4/sbin/eapigen eva.core /opt/eva4/eva/eapi.yml > ./include/autogen/core_eapi.rst
	/opt/eva4/sbin/eapigen hmi_ws /opt/eva4/svc/hmi/ws_api.yml --omit-title > ./include/autogen/ws_api.rst
	/opt/eva4/sbin/eapigen hmi_http /opt/eva4/svc/hmi/http_api.yml \
		--http-api ../../http_api_examples > include/autogen/http_api.rst
	./default-svcs.py
