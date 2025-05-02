import express from "express";
import {
  getUserProfile,
  isAuth,
  loginUser,
  logoutUser,
  registerUser,
  uploadProfilePic,
} from "../controller/userController.js";
import { useAuth } from "../middleware/useAuth.js";
import { upload } from "../middleware/multer.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/logout", logoutUser);
UserRouter.get("/is-auth", useAuth, isAuth);
UserRouter.get("/profile", useAuth, getUserProfile);
UserRouter.put(
  "/profile-pic",
  useAuth,
  upload.single("profilePic"),
  uploadProfilePic
);

export default UserRouter;
