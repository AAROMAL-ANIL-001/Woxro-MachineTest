import axios from "axios";
import { useEffect, useState } from "react";

const UserHome = () => {
  const [balance, setBalance] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const id = user.user._id;

  async function getBalance() {
    const balance = await axios.get(`/api/balance/${id}`);
    console.log(balance);
    setBalance(balance.data);
  }

  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div className="w-full bg-white">
      <table className="table-fixed w-full">
        <tbody>
          <tr>
            <td className="py-4 pl-4 font-bold text-xl">
              Welcome {user.user.name}{" "}
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 font-bold text-gray-400">YOUR ID:</td>
            <td className="py-2">
              <div className="flex items-center font-bold">
                {user.user.email}
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 font-bold text-gray-400">YOUR BALANCE:</td>
            <td className="py-2">
              <div className="flex items-center font-bold">{balance} INR </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserHome;
