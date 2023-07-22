import { ActionResult, EvaError } from "@eva-ics/webengine";
import {
  ControlBlock,
  ControlButtonDisplay,
  ControlButtonKind
} from "@eva-ics/webengine-react";

const on_success = (result: ActionResult) => {
  console.log(`action success: {result.uuid}`);
};

const on_fail = (err: EvaError) => {
  console.log(`action failed: {error.message}`);
};

const MyBlock = () => {
  const buttons: Array<ControlButtonDisplay> = [
    {
      oid: "unit:tests/door",
      label: "Gate 1"
    },
    {
      oid: "unit:tests/door_remote",
      label: "Gate 2"
    },
    {
      oid: "unit:tests/srx",
      label: "SRX",
      kind: ControlButtonKind.Value,
      input_size: 5
    },
    {
      oid: "lmacro:m1",
      label: "M1",
      busy: "unit:tests/sr1"
    }
  ];
  return (
    <>
      <ControlBlock
        title="Gate controls"
        buttons={buttons}
        on_success={on_success}
        on_fail={on_fail}
      />
    </>
  );
};
