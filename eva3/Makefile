all:
	@echo "Select target"

prepare:
	cp -vf /opt/eva/lib/eva/registry/defaults/config/uc/main.yml cfg/uc_main.yml
	cp -vf /opt/eva/lib/eva/registry/defaults/config/lm/main.yml cfg/lm_main.yml
	cp -vf /opt/eva/lib/eva/registry/defaults/config/sfa/main.yml cfg/sfa_main.yml
	cp -vf /opt/eva/etc/eva_config-dist cfg/
	cp -vf /opt/eva/CHANGELOG.rst changelog.rst

pydocs:
	./generate-pydocs.py
	sed 's/:module: eva.x/&\n      :noindex:/g' ./pydoc/pydoc_validateconfig.rst > ./pydoc/pydoc_validateconfig2.rst
