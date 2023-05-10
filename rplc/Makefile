all:
	@echo select target

prepare:
	mkdir -p ./samples/quickstart/src
	cp /opt/workstuff/rplc/samples/quickstart/build.rs ./samples/quickstart/
	cp /opt/workstuff/rplc/samples/quickstart/plc.yml ./samples/quickstart/
	sed 's|path = "../..", ||g' /opt/workstuff/rplc/samples/quickstart/Cargo.toml > ./samples/quickstart/Cargo.toml
	cp /opt/workstuff/rplc/samples/quickstart/src/main.rs ./samples/quickstart/src/
	mkdir -p ./samples/custom_io_rpi_gpio/src
	cp /opt/workstuff/rplc/samples/custom_io_rpi_gpio/build.rs ./samples/custom_io_rpi_gpio/
	cp /opt/workstuff/rplc/samples/custom_io_rpi_gpio/plc.yml ./samples/custom_io_rpi_gpio/
	sed 's|, path = "../.."||g' /opt/workstuff/rplc/samples/custom_io_rpi_gpio/Cargo.toml > ./samples/custom_io_rpi_gpio/Cargo.toml
	cp /opt/workstuff/rplc/samples/custom_io_rpi_gpio/src/main.rs ./samples/custom_io_rpi_gpio/src/
