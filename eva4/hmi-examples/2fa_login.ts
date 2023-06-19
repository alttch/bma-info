import "./style.css";

import { Eva, EventKind } from "@eva-ics/webengine";
import QRious from "qrious";

interface Config {
  api_uri?: string;
  debug?: boolean;
}

const eva = new Eva();

eva.external.QRious = QRious;

eva.on(EventKind.LoginSuccess, () => {
  // hide QR container in case if OTP setup process was going
  hide("qr_container");
  set_status(`Logged in as ${eva.server_info.aci.u}`);
  // do not forget to clear the password in DOM and framework variables
  clear("password");
  eva.password = "";
  eva.login_xopts = null;
});
eva.on(EventKind.LoginFailed, (err) => {
  set_status(`Login failed: ${err.message} ${err.code}`);
  show("login_form");
  clear("password");
  focus("password");
});
eva.on(EventKind.LoginOTPRequired, () => {
  show("otp_form");
  set_status("OTP code required");
  focus("otp_code");
});
eva.on(EventKind.LoginOTPInvalid, () => {
  show("otp_form");
  set_status("Invalid OTP code entered");
  clear("otp_code");
  focus("otp_code");
});
eva.on(EventKind.LoginOTPSetup, (msg) => {
  show("qr_container");
  show("otp_form");
  set_status("Scan this code with an authenticator app");
  eva.otpQR("qr", msg.value);
  focus("otp_code");
});

fetch("config.json")
  .then((res) => res.json())
  .then((config: Config) => {
    if (config.api_uri) eva.api_uri = config.api_uri;
    eva.debug = config.debug || false;
    show_hmi();
  });

const show_hmi = () => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="status"></div>
  <div id="qr_container" style="width: 200px; height: 200px; display: none">
    <canvas id="qr"></canvas>
  </div>
  <div id="login_form">
    <form id="f_login_form">
    User: <input type="text" id="login"><br>
    Password: <input type="password" id="password"><br>
    <input type="submit" value="Login">
    </form>
  </div>
  <div id="otp_form" style="display: none">
    <form id="f_otp_form">
    OTP: <input type="text" id="otp_code"><br>
    <input type="submit" value="Continue">
    </form>
  </div>
  `;
  document.getElementById("f_login_form")!.onsubmit = process_login;
  document.getElementById("f_otp_form")!.onsubmit = process_otp;
  focus("login");
};

const hide = (id: string) => {
  document.getElementById(id)!.style.display = "none";
};
const show = (id: string) => {
  document.getElementById(id)!.style.display = "block";
};
const focus = (id: string) => {
  document.getElementById(id)!.focus();
};
const clear = (id: string) => {
  (document.getElementById(id) as HTMLInputElement).value = "";
};
const set_status = (msg: string) => {
  document.getElementById("status")!.innerHTML = msg;
};
const process_login = (e: SubmitEvent) => {
  e.preventDefault();
  set_status("Logging in...");
  eva.login = (document.getElementById("login") as HTMLInputElement).value;
  eva.password = (
    document.getElementById("password") as HTMLInputElement
  ).value;
  hide("login_form");
  eva.start();
};
const process_otp = (e: SubmitEvent) => {
  e.preventDefault();
  set_status("Logging in...");
  eva.login_xopts = {
    otp: (document.getElementById("otp_code") as HTMLInputElement).value
  };
  hide("otp_form");
  eva.start();
};
