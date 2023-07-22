import { ControlButtonValue } from "@eva-ics/webengine-react";
import { ActionResult, EvaError } from "@eva-ics/webengine";

const on_success = (result: ActionResult) => {
  console.log(`action success: {result.uuid}`);
};

const on_fail = (err: EvaError) => {
  console.log(`action failed: {error.message}`);
};

const MyBlock = () => {
  return (
    <ControlButtonValue
      oid="unit:tests/srx1"
      label="SRX"
      on_success={on_success}
      on_fail={on_fail}
    />
  );
};
