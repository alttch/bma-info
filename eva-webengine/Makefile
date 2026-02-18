all:
	@echo Select target

prepare:
	npm i
	sed 's|import|// @ts-ignore\nimport|g' ~/src/eva-webengine/src/lib.ts > lib.ts
	tsc
	node parse.js lib.js | \
		CONFIG=webengine.yml /Users/gigabito/src/eva-util/v4/fwdocs/target/release/fwdocs > include/jsdoc_webengine.rst
	rm -f lib.js lib.ts
