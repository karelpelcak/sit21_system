import { useState } from "react";
import { isMobile } from "react-device-detect";
import Spinner from "../Components/Spinner";
import { useCookies } from "react-cookie";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(["Auth_Token"]);
  const currentTime = new Date();
  const expirationTime = new Date(currentTime.getTime() + 10 * 60 * 60 * 1000);
  
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5253/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setCookie("Auth_Token", data.token, {
          expires: expirationTime,
          path: "/",
        });
        navigateToSuccess();
      } else {
        console.error("Bad response from server");
        setLoading(false);
      }
    } catch (error) {
      console.error("Network error", error);
      setLoading(false);
    }
  };

  const navigateToSuccess = () => {
    window.location.href = '/';
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center content-center">
      <form onSubmit={handleSubmit}>
        <div className={`${isMobile ? "" : "bg-white p-20 rounded-lg drop-shadow-md"} `}>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              <div>
                <label htmlFor="email" className="font-bold">
                E-mail
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="on"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-400 focus:border-black focus:outline-none p-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="font-bold">
                  Heslo
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-400 focus:border-black focus:outline-none p-2"
                />
              </div>
              <div className="flex justify-end">
                <input
                  type="submit"
                  value="Přihlásit se"
                  className="bg-blue-500 px-2 py-1 rounded-xl mt-5 hover:text-white"
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
