import { ActionResult, EvaError } from "@eva-ics/webengine";
import { Canvas } from "@eva-ics/webengine-react";

const on_success = (result: ActionResult) => {
  console.log(`action success: {result.uuid}`);
};

const on_fail = (err: EvaError) => {
  console.log(`action failed: {error.message}`);
};

const MyBlock = () => {
  return (
    <>
      <Canvas
        css_class="turbine"
        image="https://upload.wikimedia.org/wikipedia/commons/e/ee/Wind_turbine_blank1.svg"
        items={[
          {
            oid: "sensor:tests/temp",
            label: "TT",
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
            ],
            position: { x: 160, y: 170 }
          }
        ]}
        buttons={[
          {
            oid: "unit:tests/door",
            label: "Gate 1",
            css_class: "gate"
          },
          {
            oid: "lmacro:m1",
            label: "M1",
            busy: "unit:tests/sr1",
            css_class: "m1"
          }
        ]}
        on_success={on_success}
        on_fail={on_fail}
      />
    </>
  );
};
