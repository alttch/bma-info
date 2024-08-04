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
  keep_engine_auth?: boolean; // less secure but allows to re-login if token is expired
  register_globals?: boolean; // register window.$eva and set window.$eva.hmi
}
