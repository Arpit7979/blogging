import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthonticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100px] bg-slate-900 text-white flex justify-between items-center md:p-10 p-4 fixed top-0 z-99">
      <h1
        onClick={() => navigate("/")}
        className="text-4xl font-bold cursor-pointer"
      >
        Blogging
      </h1>
      {isAuthonticated ? (
        <div className="flex md:gap-5 gap-2 items-center">
          <div className="cursor-pointer" onClick={() => navigate("/profile")}>
            <img
              src={import.meta.env.VITE_BACKEND_URL_IMG + user?.profilePic}
              className="w-8 h-8 rounded-full"
              alt=""
            />
          </div>
          <div className="cursor-pointer" onClick={() => navigate("/bookmark")}>
            <img className="h-8 w-8" src="/bookmark-solid.png" alt="" />
          </div>
          <div className="cursor-pointer" onClick={logout}>
            <img src="/logout.png" className="w-10 h-10" alt="" />
          </div>
        </div>
      ) : (
        <div className="flex md:gap-4 gap-2 text-[10px] items-center justify-between">
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
