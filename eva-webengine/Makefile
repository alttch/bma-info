all:
	@echo Select target

prepare:
	npm i
	sed 's|import|// @ts-ignore\nimport|g' /opt/eva-webengine/src/lib.ts > lib.ts
	tsc
	node parse.js lib.js | \
		CONFIG=webengine.yml /opt/eva4/sbin/fwdocs > include/jsdoc_webengine.rst
	rm -f lib.js lib.ts
