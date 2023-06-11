import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Withdraw = () => {
  const [amount, setAmount] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const id = user.user._id;
  async function getBalance() {
    const balance = await axios.get(`/api/balance/${id}`);
    console.log(balance.data);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWithdraw = await axios.post(`/api/withdraw/${id}`, { amount });
    console.log(newWithdraw);
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const newTransaction = await axios.post(`/api/transaction/${id}`, {
      date: date,
      time: new Date().toLocaleTimeString(),
      details: "Withdraw",
      type: "Debit",
      balance: newWithdraw.data,
      amount: amount,
    });
    message.success("Withdraw successfull");
    console.log("new transaction", newTransaction);
    setAmount("");
  };
  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col ">
        <div className="py-4 pl-4">
          <h3 className=" font-bold text-xl">Withdraw money</h3>
        </div>
        <form className="flex flex-col py-4 px-4 " onSubmit={handleSubmit}>
          <label htmlFor="amount" className="font-bold text-xl">
            Amount
          </label>
          <input
            type="number"
            className="p-2 py-4 pl-4 border-2 mt-5"
            placeholder="Enter amount to withdraw"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="mt-5 bg-blue-500 p-3 font-bold text-white"
            type="submit"
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
