all:
	@echo "Select target"

prepare:
	cd /opt/eva-util/v4/pymacrodata && ./generate.py /opt/bma-info/eva4/lmacro/py
	cd /opt/eva4-enterprise/eva4-esvc/kiosk-manager && make eapi
	cp /opt/eva4/CHANGELOG.rst changelog.rst
	rm -rf registry_config
	mkdir -p ./sdk-examples/js/
	cp /opt/eva4/bindings/js/example/test.ts ./sdk-examples/js/
	cp /opt/eva4/bindings/js/example/svc-tpl.yml ./sdk-examples/js/
	sed 's|file:../dist/|^0.0.3|' /opt/eva4/bindings/js/example/package.json > ./sdk-examples/js/package.json
	cp -r /opt/eva4/svc/svc-example-temp ./sdk-examples/rust/
	cp -r /opt/eva4/svc/svc-example-sensor-set ./sdk-examples/rust/
	cp -r /opt/eva4/bindings/python/examples/svc-example-temp ./sdk-examples/python/
	cp -r /opt/eva4/bindings/python/examples/svc-example-sensor-set ./sdk-examples/python/
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
	./fb.py > ./include/fieldbus_table.rst
	pydoc2rst ./sdk/python/pydoc/tpl_api.rst ./sdk/python/pydoc/api.rst /opt/eva4/bindings/python/eva-ics-sdk
	pydoc2rst ./sdk/python/pydoc/tpl_client.rst ./sdk/python/pydoc/client.rst /opt/eva4/bindings/python/eva-ics-sdk
	pydoc2rst ./sdk/python/pydoc/tpl_busclient.rst ./sdk/python/pydoc/busclient.rst /opt/eva4/bindings/python/eva-ics-sdk
	pydoc2rst ./sdk/python/pydoc/tpl_httpclient.rst ./sdk/python/pydoc/httpclient.rst /opt/eva4/bindings/python/eva-ics-sdk
	pydoc2rst ./sdk/python/pydoc/tpl_cloudclient.rst ./sdk/python/pydoc/cloudclient.rst /opt/eva4/bindings/python/eva-ics-sdk
