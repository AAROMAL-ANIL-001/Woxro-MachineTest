import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const res = await axios.post("api/signup", {
      name,
      email,
      password,
    });
    console.log(res);
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-gray-300">
      <div>
        <h3 className="font-bold text-gray-600 py-5">ABC BANK</h3>
      </div>

      <div
        className="p-5"
        style={{ width: "400px", height: "400px", backgroundColor: "white" }}
      >
        <div>
          <h4 className="text-gray-400">Create new account</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pt-3">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border-2 border-black-500"
              placeholder="Enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="pt-3">
            <label htmlFor="email" className="font-bold">
              Email address
            </label>
            <input
              type="text"
              name="email"
              className="w-full p-2 border-2 border-black-500"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="py-3 block  items-center">
            <input type="checkbox" id="checkbox" className="mr-2" />
            <label htmlFor="checkbox">
              Agree the <span className="text-blue-600">terms and policy</span>{" "}
            </label>
          </div>
          <div>
            <button className="bg-blue-500 p-3 w-full" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div>
        <h5 className="py-3">
          Already have an account ?{" "}
          <Link to="/" className="text-blue-900 font-bold">
            Sign in
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Register;
