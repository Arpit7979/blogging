import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthonticated, setIsAuthonticated] = useState(false);

  const logout = async () => {
    try {
      const { data } = await API.post("/auth/logout");
      setIsAuthonticated(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await API.get("/auth/is-auth");
      if (data.Success) {
        setIsAuthonticated(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = { isAuthonticated, setIsAuthonticated, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
