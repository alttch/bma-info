all:
	@echo "Select target"

prepare:
	cp -vf /opt/eva-mlsrv/svc-tpl-mlsrv.yml share/
	cd /opt/eva-ics-ml-py/evaics && ln -sf /opt/eva4/bindings/python/eva-ics-sdk/evaics/client
	cd /opt/eva-ics-ml-py/evaics && ln -sf /opt/eva4/bindings/python/eva-ics-sdk/evaics/sdk
	cd /opt/eva-ics-ml-py/evaics && ln -sf /opt/eva4/bindings/python/eva-ics-sdk/evaics/exceptions.py
	/opt/eva4/sbin/eapigen --omit-title mlsrv /opt/eva-mlsrv/eapi.yml > ./include/autogen/mlsrv_eapi.rst
	pydoc2rst ./client/py/pydoc/tpl_ml.rst ./client/py/pydoc/pydoc_ml.rst /opt/eva-ics-ml-py
	cd ./client/R && Rscript prepare_man.R && sed -i 's/^#/##/g' man.md && pandoc man.md -o man.rst && rm -f man.md
