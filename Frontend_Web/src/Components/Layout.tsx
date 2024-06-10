import { Outlet, Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

const Layout = () => {
  return (
    <>
      <div className="">{isMobile ? <MobileLayout /> : <ComputerLayout />}</div>
      <Outlet />
    </>
  );
};

const MobileLayout = () => {
  const [expand, setExpand] = useState(false);
  const [cookie, , removeCookie] = useCookies();
  const decoded = jwtDecode<CustomJwtPayload>(cookie.Auth_Token);
  const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  return (
    <div
      className={`${
        expand ? "h-[300px]" : "h-[110px]"
      } w-screen bg-slate-900 flex flex-col justify-between content-center items-center px-10 py-4 transition-all duration-300`}
    >
      <div className="w-full flex justify-between">
        <div>
          <Link to="/" className="text-white font-extrabold text-2xl">
            WorkFlow
          </Link>
        </div>
        <div className="text-white font-extrabold text-2xl">
          <Link to="">{username}</Link>
        </div>
      </div>
      {expand ? (
        <div className="flex gap-2 text-white flex-col text-lg">
          <div>
            <Link to="">Přidat úkol</Link>
          </div>
          <div>
            <Link to="">Ůkoly</Link>
          </div>
          <div>
            <Link to="/users">Uživatele</Link>
          </div>
          {role === "Admin" ? (
            <div>
              <Link to="/register">Přidat uživatele</Link>
            </div>
          ) : (
            <div>
              <Link to="/"></Link>
            </div>
          )}
          <div>
            <button
              className="text-1xl"
              onClick={async () => {
                await removeCookie("Auth_Token");
              }}
            >
              odhlasit
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <button
        className="text-white text-3xl"
        onClick={() => setExpand(!expand)}
      >
        Menu {expand ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </button>
    </div>
  );
};

const ComputerLayout = () => {
  const [cookie, , removeCookie] = useCookies();
  const decoded = jwtDecode<CustomJwtPayload>(cookie.Auth_Token);
  const username =
    decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  const role =
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  return (
    <div className="h-[100px] w-screen bg-slate-900 flex justify-between content-center items-center px-10">
      <div>
        <Link to="/" className="text-white font-extrabold text-2xl">
          WorkFlow
        </Link>
      </div>
      <div className="flex gap-4 text-white">
        <div>
          <Link to="">Přidat úkol</Link>
        </div>
        <div>
          <Link to="">Ůkoly</Link>
        </div>
        <div>
          <Link to="/users">Uživatele</Link>
        </div>
        {role === "Admin" ? (
          <div>
            <Link to="/register">Přidat uživatele</Link>
          </div>
        ) : (
          <div>
            <Link to="/">User</Link>
          </div>
        )}
      </div>
      <div className="text-white font-extrabold flex gap-3 items-center content-center justify-center">
        <Link to="" className="text-1xl">
          {username}
        </Link>
        <button
          className="text-1xl"
          onClick={async () => {
            await removeCookie("Auth_Token");
          }}
        >
          odhlasit
        </button>
      </div>
    </div>
  );
};

export default Layout;
