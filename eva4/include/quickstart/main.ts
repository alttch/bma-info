import "./style.css";
import "./slider.css";

import { Eva } from "@eva-ics/webengine";

const eva = new Eva();

eva.login = "operator";
eva.password = "secret";

eva.watch("sensor:room1/temp", (state) => {
  document.getElementById("temp")!.innerHTML = state.value;
});

eva.watch("unit:room1/fan", (state) => {
  const fan = document.getElementById("fan") as HTMLInputElement;
  fan.disabled = (state.act as number) > 0; // disable when action is running
  fan.checked = state.value > 0;
});

const log = eva.log;

eva.load_config().then(() => {
  eva.start();
  show_hmi();
});

const show_hmi = () => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>Temperature: <span id="temp"></span></div>
  <div>Fan: <label class="switch"><input type="checkbox" id="fan"><span class="slider"></span></label></div>
`;
  document.getElementById("fan")!.onchange = (e) => {
    e.preventDefault();
    eva.action.toggle("unit:room1/fan").catch((err) => {
      log.error(`fan toggle error: ${err}`);
    });
  };
};
