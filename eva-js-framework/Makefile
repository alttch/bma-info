all:
	@echo Select target

prepare:
	node parse.js /opt/eva-js-framework/framework/src/index.js | \
		CONFIG=framework.yml /opt/eva4/sbin/fwdocs > include/jsdoc_framework.rst
	node parse.js /opt/eva-js-framework/toolbox/src/index.js | \
		CONFIG=toolbox.yml /opt/eva4/sbin/fwdocs > include/jsdoc_toolbox.rst
