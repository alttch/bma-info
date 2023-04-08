all:
	@echo "Select target"

prepare:
	cp -vf /opt/eva-mlsrv/svc-tpl-mlsrv.yml share/
	/opt/eva4/sbin/eapigen --omit-title mlsrv /opt/eva-mlsrv/eapi.yml > ./include/autogen/mlsrv_eapi.rst
	pydoc2rst ./client/py/pydoc/tpl_ml.rst ./client/py/pydoc/pydoc_ml.rst /opt/eva-ics-ml-py
