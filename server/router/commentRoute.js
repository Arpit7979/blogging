import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controller/commentController.js";
import { useAuth } from "../middleware/useAuth.js";

const commentRouter = express.Router();

commentRouter.post("/create-comment/:id", useAuth, createComment);
commentRouter.get("/get-comments/:id", getComments);
commentRouter.delete("/delete-comment/:id", useAuth, deleteComment);

export default commentRouter;
