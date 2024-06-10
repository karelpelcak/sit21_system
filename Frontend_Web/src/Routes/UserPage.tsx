import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

interface IProps {
  userName: string;
  email: string;
}

const UserPage = () => {
  const { userid } = useParams();
  const [cookies] = useCookies(["Auth_Token"]);
  const [user, setUser] = useState<IProps>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5253/api/User/userbyid?userId=${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookies.Auth_Token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: IProps[] = await response.json();
        console.log(data[0]);
        setUser(data[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [cookies.Auth_Token]);
  return (
    <div>
        <div>
            <h1>{user?.userName}</h1>
            <h1>{user?.email}</h1>
        </div>
    </div>
  );
};

export default UserPage;
