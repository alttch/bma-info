import { Thermometer } from "@eva-ics/webengine-react";

const MyComponent = () => {
  return (
    <>
      <Thermometer
        oid="sensor:tests/temp"
        minValue={0}
        maxValue={100}
        critValue={70}
        warnValue={40}
        units="&#8451;"
        showValue
        label="Temp"
      />
    </>
  );
};
