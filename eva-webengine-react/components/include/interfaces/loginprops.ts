interface LoginProps {
  label_login?: string; // override the default labels
  label_password?: string;
  label_enter?: string;
  label_cancel?: string;
  label_otp_setup?: string;
  label_otp_setup_scan?: string;
  label_otp_required?: string;
  label_otp_code?: string;
  label_otp_invalid?: string;
  label_remember?: string;
  label_logging_in?: string;
  otp_issuer_name?: string; // OTP issuer
  otp_qr_size?: number; // OTP QR code size
  cache_login?: boolean; // cache login in cookies
  cache_auth?: boolean; // cache password in cookies
  register_globals?: boolean; // register window.$eva and set window.$eva.hmi
  form_header?: () => JSX.Element; // custom login form header
  form_footer?: () => JSX.Element; // custom login form footer
  on_login_failed?: (err: EvaError) => LoginFailedAction | void;
  // if set, launched after the login button is pressed, the response is set as
  // eva.login_xopts = { data: response }. can be used e.g. to install various
  // CAPTCHA verification schemes
  prelogin_hook?: () => Promise<unknown>;
  state_announce?: (app_state: HMIAppState) => void; // application state hook
}

enum LoginFailedAction {
  Default = "default", // process login error as usual
  Retry = "retry", // retry the login
  Abort = "abort" // abort further processing, show the error message and login form
}

interface HMIAppState {
  state: HMIAppStateKind;
  svc_msg?: SvcMessage;
  err?: EvaError;
}

export enum HMIAppStateKind {
  LoginSession = "login_session",
  LoginAuto = "login_auto",
  Login = "login",
  OtpSetup = "otp_setup",
  OtpAuth = "otp_auth",
  LoginForm = "login_form",
  Active = "active"
}
