import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const Deposit = () => {
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
    const newDeposit = await axios.post(`/api/balance/${id}`, { amount });
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const newTransaction = await axios.post(`/api/transaction/${id}`, {
      date: date,
      time: new Date().toLocaleTimeString(),
      details: "Deposit",
      type: "Credit",
      balance: newDeposit.data,
      amount: amount,
    });
    console.log("new transaction", newTransaction);
    console.log("balance", newDeposit.data);
    setAmount("");
    message.success("Deposit successfull");
  };
  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col ">
        <div className="py-4 pl-4">
          <h3 className=" font-bold text-xl">Deposit money</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col py-4 px-4 ">
          <label htmlFor="amount" className="font-bold text-xl">
            Amount
          </label>
          <input
            type="number"
            className="p-2 py-4 pl-4 border-2 mt-5"
            placeholder="Enter amount to deposit"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            type="submit"
            className="mt-5 bg-blue-500 p-3 font-bold text-white"
          >
            Deposit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
