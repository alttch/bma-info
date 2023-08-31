import { Gauge, GaugeType } from "@eva-ics/webengine-react";

const MyComponent = () => {
  return (
    <>
      <Gauge
        type={GaugeType.Light}
        oid="sensor:tests/angle"
        minValue={0}
        maxValue={100}
        critValue={70}
        warnValue={40}
        diameter={250}
        units="&#8451;"
        showValue
        label="Temp"
      />
    </>
  );
};
