import postModel from "../model/postModel.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category)
      return res.json({ Success: false, message: "Missing fields" });
    const newPost = new postModel({
      title,
      content,
      author: req.user._id,
      category,
    });
    await newPost.save();
    return res.json({
      Success: true,
      message: "Post created",
    });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json({ Success: true, posts: posts });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await postModel
      .findById(req.params.id)
      .populate("author", "name");
    if (!post)
      return res.json({ Success: false, message: "Post does not found" });
    res.json({ Success: true, post: post });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};

//update psot

export const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.json({ Success: false, message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.json({ Success: false, message: "Only admin can update" });
    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.json({ Success: true, message: "Post updated" });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};

//delete post

export const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.json({ Success: false, message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.json({
        Success: false,
        message: "You are not the admin of this post",
      });
    await post.deleteOne();
    res.json({ Success: true, message: "post deleted" });
  } catch (error) {
    return res.json({ Success: false, message: error.message });
  }
};

//some extra featue

//like post
export const likePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.json({ Success: false, message: "Post not found" });
    const userId = req.user._id;
    let message = "";
    const alreadyLiked = post.likedBy.includes(userId);
    if (alreadyLiked) {
      //remove like
      post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
      message = "Post Unliked";
    } else {
      //like
      post.likedBy.push(userId);
      message = "Post liked";
    }
    await post.save();
    const updatedPost = await post.populate("likedBy", "name");
    res.json({
      Success: true,
      likedBy: updatedPost.likedBy,
      name: req.user.name,
      message,
    });
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};

//filter category
export const getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await postModel.find({ category });
    res.json({ Success: true, posts });
  } catch (error) {
    res.json({ Success: false, message: error.message });
  }
};
