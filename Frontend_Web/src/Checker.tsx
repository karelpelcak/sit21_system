import App from "./App";
import Login from "./Authentication/Login";
import { useCookies } from "react-cookie";

const Checker = () => {
  const [cookies] = useCookies(["Auth_Token"]);
  return (
    <>
      {cookies.Auth_Token ? (
        <App/>
      ) : (
        <Login/>
      )}
    </>
  );
};

export default Checker;
