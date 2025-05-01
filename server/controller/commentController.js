import commentModel from "../model/commentModel.js";

//create comment
export const createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) return res.json({ Success: false, message: "Enter comment" });
    const userId = req.user._id;
    const postId = req.params.id;
    if (!postId) return res.json({ Success: false, message: "Post not found" });
    const newComment = new commentModel({ comment, userId, postId });
    await newComment.save();
    res.json({ Success: true, message: "New comment added" });
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};

//get all comment for a post
export const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await commentModel
      .find({ postId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    res.json({ Success: true, comments });
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};

//delete comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params; //comment id
    const userId = req.user._id;
    const comment = await commentModel.findById(id);
    if (!comment)
      return res.json({ Success: false, message: "No comment found" });
    if (comment.userId.toString() !== userId.toString())
      return res.json({ Success: false, message: "You are not admin" });
    await comment.deleteOne();
    res.json({ Success: true, message: "comment deleted" });
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};
