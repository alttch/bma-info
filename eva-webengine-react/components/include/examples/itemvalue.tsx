import { ItemValue } from "@eva-ics/webengine-react";

const MyComponent = () => {
  return (
    <>
      <div>
        <ItemValue oid="sensor:env/temp" digits="2" units="C" />
      </div>
      <div>
        <ItemValue oid="sensor:env/hum" digits="2" units="%" />
      </div>
    </>
  );
};
