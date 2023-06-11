import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await axios.post("/api/login", { email, password });
      console.log(res);

      setUser(res.data.data);

      console.log(res.data);

      localStorage.setItem("user", JSON.stringify(res.data));
      message.success("Login successfull");

      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
      message.error(error.response.data.message);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center flex-col bg-gray-300">
      <div>
        <h3 className="font-bold text-gray-600 py-5">ABC BANK</h3>
      </div>

      <div
        className="p-5"
        style={{ width: "400px", height: "320px", backgroundColor: "white" }}
      >
        <div>
          <h4 className="text-gray-400">Login to your account</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pt-3">
            <label htmlFor="email" className="font-bold">
              Email address
            </label>
            <input
              type="text"
              name="email"
              className="w-full p-2 border-2 border-black-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="pt-3">
            <label htmlFor="email" className="font-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border-2 border-black-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="py-3 block  items-center">
            <input type="checkbox" id="checkbox" className="mr-2" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <div>
            <button className="bg-blue-500 p-3 w-full" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div>
        <h5 className="py-3">
          Don&apos;t have an account ?{" "}
          <Link to="/register" className="text-blue-900 font-bold">
            Signup
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
