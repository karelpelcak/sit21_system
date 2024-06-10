import { jwtDecode } from "jwt-decode";
import { useCookies } from 'react-cookie';

interface CustomJwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string | string[]; // Use the correct claim type
}

const Home = () => {
  const [cookie] = useCookies(["Auth_Token"]);
  const decoded = jwtDecode<CustomJwtPayload>(cookie.Auth_Token);
  const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]; // Use the correct claim type
  
  console.log(username);
  console.log(roles);
  console.log(decoded);
  return (
    <div></div>
  );
};

export default Home;
