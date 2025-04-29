import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const { setIsAuthonticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      if (data.Success) {
        setIsAuthonticated(true);
        toast.success(data.message);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center">
      <Navbar />
      <form
        className="md:w-[40%] w-[80%] md:h-[60%] h-[40%] flex flex-col items-center justify-center rounded-lg bg-gradient-to-l from-slate-600 to-slate-800"
        action=""
      >
        <h2 className="text-5xl font-bold mb-5">Login</h2>

        <input
          className="outline-none p-4 py-2 rounded-lg text-lg bg-gray-100 text-black my-5"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="outline-none p-4 py-2 rounded-lg text-lg bg-gray-100 text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="p-2 cursor-pointer bg-slate-800 rounded-lg px-8 mt-3"
          type="submit"
          onClick={handleForm}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
