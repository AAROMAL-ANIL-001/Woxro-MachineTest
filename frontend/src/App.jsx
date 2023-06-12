import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const user = localStorage.getItem("user") || null;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
