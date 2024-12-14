import { JSX, DispatchWithoutAction } from "react";
import {
  IDCElement,
  IDCPropertyKind,
  IDCValueColorMap
} from "idc-custom-elements";
import { useEvaState, get_engine } from "@eva-ics/webengine-react";
import { Eva, EvaError, EvaErrorKind, ActionResult } from "@eva-ics/webengine";
import packageInfo from "../package.json";
import "./style.css";

// Element parameters interface
interface ElementParameters {
  oid: string;
  label: string;
  colors?: Array<IDCValueColorMap>;
  disabled_actions?: boolean;
  on_success?: (result: ActionResult) => void;
  on_fail?: (err: EvaError) => void;
}

// Element view function
const Element = ({
  dragged,
  vendored,
  setVariable,
  getVariable,
  forceUpdate,
  ...params
}: {
  dragged: boolean;
  vendored?: any;
  setVariable: (name: string, value: string) => void;
  getVariable: (name: string) => string | undefined;
  forceUpdate: DispatchWithoutAction;
}): JSX.Element => {
  const parameters = params as ElementParameters;
  const state = useEvaState({ oid: parameters.oid }, [parameters.oid]);
  if (!parameters.oid) {
    // we need to return some element in case if nothing is specified to let it
    // be dragged/deleted/selected by a user
    return (
      <>
        <div className="relay-label">{parameters.label || "Relay"}</div>
      </>
    );
  }
  // select background color for the current value
  const valueColor = parameters.colors?.find((c) => c.value == state.value);

  // handle action result
  const handle_action_finished = (result: ActionResult) => {
    if (result.exitcode === 0) {
      if (parameters.on_success) parameters.on_success(result);
    } else if (parameters.on_fail) {
      parameters.on_fail(
        new EvaError(EvaErrorKind.FUNC_FAILED, result.err || undefined)
      );
    }
  };

  // handle action event
  const handle_action = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (parameters.disabled_actions) {
      return;
    }
    e.preventDefault();
    const eva_engine = get_engine() as Eva;
    eva_engine.action
      .toggle(parameters.oid, true)
      .then((result: any) => handle_action_finished(result))
      .catch((err: EvaError) => {
        if (parameters.on_fail) parameters.on_fail(err);
      });
  };

  // Render the element
  // Actions are disable either if disabled_actions is set (the current
  // dashboard is being edited) or if state.act > 0 (an action is in progress)
  return (
    <>
      <div className="relay-label">{parameters.label}</div>
      <button
        style={{ backgroundColor: valueColor?.color }}
        className="relay-button"
        type="button"
        value={state.value ? "🗲 ON" : "OFF"}
        disabled={parameters.disabled_actions || state.act > 0}
        onClick={handle_action}
      >
        {state.value ? "🗲 ON" : "OFF"}
      </button>
    </>
  );
};

// Register element
const element = new IDCElement("relay-button", Element)
  .description("Relay on/off")
  .group("Item actions")
  .prop("oid", IDCPropertyKind.OIDSubscribed, { kind: "unit" })
  .prop("label", IDCPropertyKind.String)
  .prop("colors", IDCPropertyKind.ValueColorMap)
  .defaultValue("label", "Relay")
  .defaultValue("colors", [
    { value: "0", color: "gray" },
    { value: "1", color: "yellow" }
  ])
  .actions(true)
  .boxed(true)
  .iconDraw(() => <div style={{ fontSize: 21, fontWeight: "bold" }}>R</div>);

export default element.export();

// output module name/version for debugging purposes, highly recommended
console.debug(
  `Element module ${packageInfo.name} v${packageInfo.version} loaded`
);
