import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      sameSite: process.env.NODE_ENV ? "strict" : "none",
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
      sameSite: process.env.NODE_ENV ? "strict" : "none",
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
    return res.json({ Success: true, message: "User is Authorized" });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};
