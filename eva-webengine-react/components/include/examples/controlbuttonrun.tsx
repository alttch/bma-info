import { ControlButtonRun } from "@eva-ics/webengine-react";
import { ActionResult, EvaError } from "@eva-ics/webengine";

const on_success = (result: ActionResult) => {
  console.log(`action success: {result.uuid}`);
};

const on_fail = (err: EvaError) => {
  console.log(`action failed: {error.message}`);
};

const MyBlock = () => {
  return (
    <ControlButtonRun
      oid="lmacro:tests/open_all"
      label="Open"
      on_success={on_success}
      on_fail={on_fail}
    />
  );
};
