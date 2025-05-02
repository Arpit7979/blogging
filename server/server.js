import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectMongoDB from "./config/mongoose.js";
import UserRouter from "./router/userRouter.js";
import postRouter from "./router/postRoute.js";
import commentRouter from "./router/commentRoute.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
connectMongoDB();

const allowedOrigin = [
  "http://localhost:5173",
  "https://blogging-henna.vercel.app",
];
app.use(express.json());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(cookieParser());
app.use("/upload", express.static(path.join(path.resolve(), "upload")));

app.use("/api/auth", UserRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("Hellow from server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
