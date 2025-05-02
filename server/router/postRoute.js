import express from "express";
import {
  createPost,
  deletePost,
  getPostsByCategory,
  getAllPost,
  getSinglePost,
  likePost,
  updatePost,
} from "../controller/postController.js";
import { useAuth } from "../middleware/useAuth.js";

const postRouter = express.Router();

postRouter.post("/create-post", useAuth, createPost);
postRouter.get("/all-post", getAllPost);
postRouter.get("/single-post/:id", getSinglePost);
postRouter.put("/update-post/:id", useAuth, updatePost);
postRouter.delete("/delete-post/:id", useAuth, deletePost);
postRouter.put("/like-post/:id", useAuth, likePost);
postRouter.get("/category/:category", getPostsByCategory);

export default postRouter;
