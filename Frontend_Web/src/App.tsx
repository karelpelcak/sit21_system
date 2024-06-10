import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Routes/Home";
import ErrorPage from "./Routes/ErrorPage";
import Login from "./Authentication/Login";
import UserList from "./Routes/UserList";
import UserPage from "./Routes/UserPage";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Register from "./Authentication/Register";


interface CustomJwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

const App = () => {
  const [cookie] = useCookies();
  const decoded = jwtDecode<CustomJwtPayload>(cookie.Auth_Token);
  const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
return(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="users/:userid" element={<UserPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/register" element={role === "Admin" ? <Register /> : <ErrorPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </div>
  )};

export default App;
