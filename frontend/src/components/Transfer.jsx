import { message } from "antd";
import axios from "axios";
import { useState } from "react";

const Transfer = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const id = user.user._id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const transfer = await axios.post(`/api/transfer/${id}`, { email, amount });
    console.log(transfer);
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const newTransaction = await axios.post(`/api/transaction/${id}`, {
      date: date,
      time: new Date().toLocaleTimeString(),
      details: `Transfer to , ${email}`,
      type: "Credit",
      balance: transfer.data,
      amount: amount,
    });
    console.log(newTransaction);
    message.success("Transfer successfull");
    setEmail("");
    setAmount("");
  };
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col ">
        <div className="py-4 pl-4">
          <h3 className=" font-bold text-xl">Transfer money</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-4 px-4 ">
            <label htmlFor="email" className="font-bold text-xl">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="p-2  pl-4 border-2 mt-5"
              placeholder="Enter email"
              name={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col  px-4 ">
            <label htmlFor="amount" className="font-bold text-xl">
              Amount
            </label>
            <input
              type="number"
              className="p-2  pl-4 border-2 mt-5"
              placeholder="Enter amount to withdraw"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-5 bg-blue-500 p-3 my-5 font-bold text-white"
            >
              Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
