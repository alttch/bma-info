import { Eva } from "@eva-ics/webengine";
import { HMIApp, LoginProps, FunctionLogout } from "@eva-ics/webengine-react";
import { Toaster } from "react-hot-toast";

const eva = new Eva();

eva.load_config().then(() => {
  const login_props: LoginProps = {
    label_login: "User",
    label_enter: "Enter",
    otp_issuer_name: "Test HMI",
    cache_login: true,
    cache_auth: true
  };
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <Toaster position={"bottom-left"} />
      <HMIApp engine={eva} Dashboard={HmiDashboard} login_props={login_props} />
    </React.StrictMode>
  );
});

const HmiDashboard = ({
  engine,
  logout
}: {
  engine: Eva;
  logout: FunctionLogout;
}): JSX.Element => {
  return (
    <div>
      <div>Logged in</div>
      <div>
        <a href="#" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
};
