import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthonticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100px] bg-slate-900 text-white flex justify-between items-center p-10 fixed top-0 z-99">
      <h1
        onClick={() => navigate("/")}
        className="text-4xl font-bold cursor-pointer"
      >
        Blogging
      </h1>
      {isAuthonticated ? (
        <div className="flex gap-5 items-center">
          <h4 className="cursor-pointer" onClick={() => navigate("/profile")}>
            <img
              src={import.meta.env.VITE_BACKEND_URL_IMG + user?.profilePic}
              className="w-8 h-8 rounded-full"
              alt=""
            />
          </h4>
          <h4 className="cursor-pointer" onClick={logout}>
            <img src="/logout.png" className="w-10 h-10" alt="" />
          </h4>
        </div>
      ) : (
        <div className="flex gap-4">
          <a href="/login">
            <h4>Login</h4>
          </a>
          <a href="/register">
            <h4>Register</h4>
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
