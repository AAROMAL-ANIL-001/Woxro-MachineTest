import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineCloudUpload,
  AiOutlineCloudDownload,
  AiOutlineFilePdf,
} from "react-icons/ai";
import { BiLogOutCircle, BiTransferAlt } from "react-icons/bi";
import UserHome from "../components/UserHome";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import Transfer from "../components/Transfer";
import Statement from "../components/Statement";
import { message } from "antd";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth <= 644);

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const handleSubmit = () => {
    localStorage.removeItem("user");
    navigate("/");
    message.success("Logged out");
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="container mx-auto " style={{ width: "600px" }}>
        <div className="pt-5">
          <h1 className="font-bold text-gray-700 ml-5 mb-5">ABC BANK</h1>
          <hr className="border-2 " />
        </div>
        <div className="flex justify-center items-center flex-col bg-white">
          <nav className="flex justify-between items-center pt-2">
            {isMenuOpen ? (
              // <button className="text-gray-700 p-2" onClick={handleMenuToggle}>
              //   <GiHamburgerMenu className="w-6 h-6" />
              // </button>
              ""
            ) : (
              // <button className="text-gray-700 p-2" onClick={handleMenuToggle}>
              //   <GiHamburgerMenu className="w-6 h-6" />
              // </button>
              <ul className="flex  items-center">
                <li
                  className={`m-2 ${
                    selectedItem === "Home"
                      ? "font-bold text-blue-500"
                      : "font-bold text-gray-700"
                  }`}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleItemClick("Home")}
                  >
                    <AiOutlineHome />
                    Home
                  </button>
                </li>
                <li
                  className={`m-2 ${
                    selectedItem === "Deposit"
                      ? "font-bold text-blue-500"
                      : "font-bold text-gray-700"
                  }`}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleItemClick("Deposit")}
                  >
                    <AiOutlineCloudUpload /> Deposit
                  </button>
                </li>
                <li
                  className={`m-2 ${
                    selectedItem === "Withdraw"
                      ? "font-bold text-blue-500"
                      : "font-bold text-gray-700"
                  }`}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleItemClick("Withdraw")}
                  >
                    <AiOutlineCloudDownload /> Withdraw
                  </button>
                </li>
                <li
                  className={`m-2 ${
                    selectedItem === "Transfer"
                      ? "font-bold text-blue-500"
                      : "font-bold text-gray-700"
                  }`}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleItemClick("Transfer")}
                  >
                    <BiTransferAlt /> Transfer
                  </button>
                </li>
                <li
                  className={`m-2 ${
                    selectedItem === "Statement"
                      ? "font-bold text-blue-500"
                      : "font-bold text-gray-700"
                  }`}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleItemClick("Statement")}
                  >
                    <AiOutlineFilePdf /> Statement
                  </button>
                </li>
                <li
                  className={`m-2 ${
                    selectedItem === "Logout"
                      ? "font-bold"
                      : "font-bold text-gray-700"
                  }`}
                >
                  <button
                    className="flex items-center"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    <BiLogOutCircle /> Logout
                  </button>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
      <div className="p-4 bg-gray-100 h-screen w-full">
        <div
          className="container flex items-center justify-center flex-col"
          style={{ width: "600px" }}
        >
          {selectedItem === "Home" ? (
            <UserHome />
          ) : selectedItem === "Deposit" ? (
            <Deposit />
          ) : selectedItem === "Withdraw" ? (
            <Withdraw />
          ) : selectedItem === "Transfer" ? (
            <Transfer />
          ) : selectedItem === "Statement" ? (
            <Statement />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
