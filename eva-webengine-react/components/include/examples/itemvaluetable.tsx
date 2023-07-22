import { ItemValueTable, ItemValueDisplay } from "@eva-ics/webengine-react";

const SensorTable = () => {
  const sensors: Array<ItemValueDisplay> = [
    {
      oid: "sensor:tests/temp",
      label: "S1",
      units: "°C",
      digits: 1,
      threshold: [
        {
          value: 70,
          class: "temp_high"
        },
        {
          value: 50,
          class: "temp_warn"
        }
      ]
    },
    {
      oid: "sensor:tests/temp2",
      label: "S2",
      units: "°C",
      digits: 1,
      threshold: [
        {
          value: 70,
          class: "temp_high"
        },
        {
          value: 50,
          class: "temp_warn"
        }
      ]
    },
    {
      oid: "sensor:tests/t1",
      units: "°C",
      digits: 1
    },
    {
      oid: "sensor:tests/t2",
      units: "%",
      digits: 1
    }
  ];
  return (
    <>
      <ItemValueTable title="Sensor block A" items={sensors} />
    </>
  );
};
