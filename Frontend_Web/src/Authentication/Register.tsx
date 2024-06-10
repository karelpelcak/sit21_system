import { useState } from "react";
import { useCookies } from "react-cookie";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    UserRole: "",
  });
  const [passVerify, setPassVerify] = useState(true);
  const [cookies] = useCookies(["Auth_Token"]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordVerify = () => {
    const password = formData.password;
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
  
    if (hasMinLength && hasUppercase && hasNumber) {
      setPassVerify(true);
      return true;
    } else {
      setPassVerify(false);
      return false
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!handlePasswordVerify()) {
        console.error("Password does not meet the required criteria.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5253/api/Auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookies.Auth_Token,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Registration error:", errorData);
            return;
        }

        const data = await response.json();
        console.log("Registration successful:", data);

    } catch (error) {
        console.error("Network error:", error);
    }
};


  return (
    <div className="flex justify-center items-center content-center mt-10">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div>
              <label htmlFor="username" className="font-bold">
                Jméno a Přijmení
              </label>
              <br />
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="on"
                className="border-b-2 border-gray-400 focus:border-black focus:outline-none p-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-bold">
                E-mail
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="on"
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
                className={`border-b-2 border-gray-400 focus:outline-none p-2 ${passVerify ? "focus:border-black" : "border-red-500"}`}
              />
            </div>
            <div>
              <label htmlFor="UserRoles" className="font-bold">
                Typ uživatele
              </label>
              <br />
              <select
                name="UserRole"
                id="UserRole"
                className="border-b-2 border-gray-400 focus:border-black focus:outline-none p-2"
                onChange={handleInputChange}
                value={formData.UserRole}
              >
                <option value="" disabled={true}>
                  Typ uživatele
                </option>
                <option value="Admin">Admin</option>
                <option value="User">Běžný uživatel</option>
              </select>
            </div>
            <div className="flex justify-end">
              <input
                type="submit"
                value="Přidat uživatele"
                className="bg-blue-500 px-2 py-1 rounded-xl mt-5 hover:text-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
