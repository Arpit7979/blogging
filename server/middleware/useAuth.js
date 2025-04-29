import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const useAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res.json({ Success: false, message: "Unauthorized, plz login" });
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodeToken.id).select("-password");

    if (!user)
      return res.json({ Success: false, message: "Unauthorized, plz login" });
    req.user = user;

    next();
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};
