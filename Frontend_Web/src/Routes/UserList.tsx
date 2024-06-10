import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

interface IUser {
  userName: string;
  id: string;
  email: string;
}

const UserList: React.FC = () => {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [cookies] = useCookies(["Auth_Token"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5253/api/User/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.Auth_Token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: IUser[] = await response.json();
        setUserList(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [cookies.Auth_Token]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = userList.filter(user =>
      user.userName.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const userListToRender = filteredUsers.length > 0 ? filteredUsers : userList;

  return (
    <div className="mt-5 w-screen flex flex-col content-center gap-10 items-center">
      <div>
        <input
          type="text"
          className="w-[300px] md:w-[500px] border-b-2 border-gray-400 focus:border-black focus:outline-none p-2"
          onChange={handleFilterChange}
          placeholder="Search by username"
        />
      </div>
      <div className="flex flex-col gap-4">
        {userListToRender.map((user, index) => (
          <UserCard
            key={index}
            userName={user.userName}
            HrefId={user.id}
            Email={user.email}
          />
        ))}
      </div>
    </div>
  );
};

interface IUserCardProps {
  userName: string;
  Email: string;
  HrefId: string;
}

const UserCard: React.FC<IUserCardProps> = ({ userName, Email, HrefId }) => {
  return (
    <div className="w-[300px] md:w-[500px] h-[100px] bg-slate-200 flex text-black justify-between p-4 items-center rounded-md">
      <div>
        <p className="text-xl">{userName}</p>
        <p className="text-sm">{Email}</p>
      </div>
      <div>
        <Link to={HrefId} className="border-2 border-black rounded-md px-3 py-2 flex flex-col md:flex-row"><span>Stránka</span> <span>uživatele</span></Link>
      </div>
    </div>
  );
};

export default UserList;
