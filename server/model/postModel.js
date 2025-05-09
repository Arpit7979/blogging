import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  category: { type: String, required: true },
});

const postModel = mongoose.model("Post", postSchema);

export default postModel;
