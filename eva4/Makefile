all:
	@echo "Select target"

prepare:
	cd ~/src/eva-util/v4/pymacrodata && ./generate.py ~/src/bma-info/eva4/lmacro/py
	cd ~/src/eva4-enterprise/eva4-esvc/kiosk-manager && make eapi
	cp ~/src/eva4/CHANGELOG.rst changelog.rst
	rm -rf registry_config
	mkdir -p ./sdk-examples/js/
	cp ~/src/eva4/bindings/js/example/svc-example.ts ./sdk-examples/js/
	cp ~/src/eva4/bindings/js/example/svc-tpl.yml ./sdk-examples/js/
	sed 's|file:../dist/|^0.0.8|' ~/src/eva4/bindings/js/example/package.json > ./sdk-examples/js/package.json
	cp -r ~/src/eva4/svc/svc-example-temp ./sdk-examples/rust/
	cp -r ~/src/eva4/svc/svc-example-sensor-set ./sdk-examples/rust/
	cp -r ~/src/eva4/bindings/python/examples/svc-example-temp ./sdk-examples/python/
	cp -r ~/src/eva4/bindings/python/examples/svc-example-sensor-set ./sdk-examples/python/
	cp ~/src/eva4/bindings/cpp/examples/simplesvc/svc.cpp ./sdk-examples/cpp/
	cp -r ~/src/eva4/share/registry/defaults/config registry_config
	rm -rf svc-tpl
	cp -r ~/src/eva4/share/svc-tpl .
	cp -r ~/src/eva4-enterprise/svc-tpl/* svc-tpl/
	rm -rf etc-config
	mkdir etc-config
	cp -r ~/src/eva4/etc/*-dist etc-config/
	cp ~/src/eva4/svc/controller-system/agent-config-example.yml ./include/controller_system_agent_config.yml
	find svc-tpl -name "*.yml" -exec sed -i '' 's|target/debug/|svc/|g' {} \;
	cp ~/src/eva4-enterprise/svc-tpl/* svc-tpl/
	~/src/eva-util/sbin/eapigen eva.core ~/src/eva4/eva/eapi.yml > ./include/autogen/core_eapi.rst
	~/src/eva-util/sbin/eapigen hmi_ws ~/src/eva4/svc/hmi/ws_api.yml --omit-title > ./include/autogen/ws_api.rst
	~/src/eva-util/sbin/eapigen hmi_http ~/src/eva4/svc/hmi/http_api.yml \
		--http-api ./http_api_examples --http-api-include-dir ../../http_api_examples > include/autogen/http_api.rst
	~/src/eva-util/sbin/eapigen aaa_accounting_http ~/src/eva4-enterprise/eva4-esvc/aaa-accounting/http_api.yml \
		--http-api ./http_api_examples/eva-aaa-accounting --http-api-include-dir ../../http_api_examples/eva-aaa-accounting > include/autogen/http_api-aaa-accounting.rst
	~/src/eva-util/sbin/eapigen svc_alarm ~/src/eva4-enterprise/eva4-esvc/alarms/http_api.yml \
		--http-api ./http_api_examples/eva-svc-alarms --http-api-include-dir ../../http_api_examples/eva-svc-alarms > include/autogen/http_api-svc-alarms.rst
	~/src/eva-util/sbin/eapigen svc_videosrv ~/src/eva4-enterprise/eva4-esvc/videosrv/http_api.yml \
		--http-api ./http_api_examples/eva-svc-videosrv --http-api-include-dir ../../http_api_examples/eva-svc-videosrv > include/autogen/http_api-svc-videosrv.rst
	./default-svcs.py
	./fb.py > ./include/fieldbus_table.rst
	../venv/bin/python ../pydoc2rst.py ./sdk/python/pydoc/tpl_api.rst ./sdk/python/pydoc/api.rst ~/src/eva4/bindings/python/eva-ics-sdk
	../venv/bin/python ../pydoc2rst.py ./sdk/python/pydoc/tpl_deploy.rst ./sdk/python/pydoc/deploy.rst ~/src/eva4/bindings/python/eva-ics-sdk
	../venv/bin/python ../pydoc2rst.py ./sdk/python/pydoc/tpl_client.rst ./sdk/python/pydoc/client.rst ~/src/eva4/bindings/python/eva-ics-sdk
	../venv/bin/python ../pydoc2rst.py ./sdk/python/pydoc/tpl_busclient.rst ./sdk/python/pydoc/busclient.rst ~/src/eva4/bindings/python/eva-ics-sdk
	../venv/bin/python ../pydoc2rst.py ./sdk/python/pydoc/tpl_httpclient.rst ./sdk/python/pydoc/httpclient.rst ~/src/eva4/bindings/python/eva-ics-sdk
	../venv/bin/python ../pydoc2rst.py ./sdk/python/pydoc/tpl_cloudclient.rst ./sdk/python/pydoc/cloudclient.rst ~/src/eva4/bindings/python/eva-ics-sdk
	./abi_ops.py > ./include/autogen/svc_abi_ops.rst
