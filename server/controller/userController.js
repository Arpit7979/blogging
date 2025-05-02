import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import postModel from "../model/postModel.js";
import path from "path";
import fs from "fs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ Success: false, message: "missing required fields" });
    }
    const user = await userModel.findOne({ email });
    if (user)
      return res.json({ Success: false, message: "user already registered" });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashPassword });
    await newUser.save();
    //generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ Success: true, message: "User register successfully" });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ Success: false, message: "missing required fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({
        Success: false,
        message: "user not registered, plz register",
      });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.json({ Success: false, message: "enter correct details" });

    //generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ Success: true, message: "User login successfully" });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};

export const isAuth = async (req, res) => {
  try {
    return res.json({
      Success: true,
      message: "User is Authorized",
      user: req.user,
    });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    const userPost = await postModel
      .find({ author: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ Success: true, user, userPost });
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};

//upload profile pic
export const uploadProfilePic = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    //delete old imgage if it exist
    if (user.profilePic) {
      const oldPath = path.join(path.resolve(), user.profilePic);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    //save new image path
    user.profilePic = `/upload/${req.file.filename}`;
    await user.save();
    res.json({ Success: true, profilePic: user.profilePic });
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};
