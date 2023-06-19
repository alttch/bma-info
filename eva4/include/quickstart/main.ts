import "./style.css";
import "./slider.css";

import { Eva } from "@eva-ics/webengine";

interface Config {
  api_uri?: string;
  debug?: boolean;
}

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

fetch("config.json")
  .then((res) => res.json())
  .then((config: Config) => {
    if (config.api_uri) eva.api_uri = config.api_uri;
    eva.debug = config.debug || false;
    eva.start();
    show_hmi();
  });

const show_hmi = () => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>Temperature: <span id="temp"></span></div>
  <div>Fan: <label class="switch"><input type="checkbox" id="fan"><span class="slider"></span></label></div>
`;
  document.getElementById("fan")!.onclick = (e) => {
    e.preventDefault();
    eva.action.toggle("unit:room1/fan").catch((err) => {
      log.error(`fan toggle error: ${err}`);
    });
  };
};
