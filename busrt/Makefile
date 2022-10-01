all:
	@echo select target

prepare:
	pydoc2rst ./pydoc/tpl_busrt.rst ./include/busrt.rst /opt/busrt/bindings/python/busrt
	pydoc2rst ./pydoc/tpl_busrt_rpc.rst ./include/busrt_rpc.rst /opt/busrt/bindings/python/busrt
	pydoc2rst ./pydoc/tpl_busrt_async.rst ./include/busrt_async.rst /opt/busrt/bindings/python/busrt_async
	pydoc2rst ./pydoc/tpl_busrt_async_rpc.rst ./include/busrt_async_rpc.rst /opt/busrt/bindings/python/busrt_async
	cp -prvf /opt/busrt/examples .
