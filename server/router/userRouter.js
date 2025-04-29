import express from "express";
import {
  isAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController.js";
import { useAuth } from "../middleware/useAuth.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/logout", logoutUser);
UserRouter.get("/is-auth", useAuth, isAuth);

export default UserRouter;
