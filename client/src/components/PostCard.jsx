import React, { useContext, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import CommentPopup from "./CommentPopup";

const PostCard = ({
  post,
  deletePost,
  getAllPost,
  isActive,
  onOpen,
  onClose,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { title, content } = post;
  const [likedBy, setLikedBy] = useState(post.likedBy || []);
  const [loading, setLoading] = useState(false);
  const hasLiked = likedBy?.some((u) => u === user?._id);

  const [noOfComment, setNoOfComment] = useState(0);

  const handleLike = async () => {
    setLoading(true);
    try {
      const { data } = await API.put(`/post/like-post/${post._id}`);
      if (data.Success) {
        setLikedBy(data.likedBy.map((id) => id.toString()));
        getAllPost();
        toast.success(data.message + " by " + data.name);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[50%] w-[80%] h-[20%] p-10 my-5 bg-slate-900 text-white rounded-lg relative">
      <h4 className="text-xs text-gray-500 absolute right-5 bottom-5">
        Author : {post.author.name.toUpperCase()}
      </h4>
      <img
        src="/pencil.svg"
        alt=""
        className="w-6 h-6 absolute top-5 right-15 cursor-pointer"
        onClick={() => navigate(`/edit-post/${post._id}`)}
      />
      <img
        src="/delete.svg"
        alt=""
        className="w-6 h-6 absolute top-5 right-5 cursor-pointer"
        onClick={deletePost}
      />
      {loading ? (
        <div className="w-4 h-4 border-3 rounded-full border-blue-500 border-t-transparent animate-spin absolute bottom-2 left-13"></div>
      ) : (
        <div
          className="h-6 w-6 absolute bottom-2 left-13 cursor-pointer"
          onClick={handleLike}
        >
          {hasLiked ? (
            <img className="w-6 h-6" src="/like-red.png" />
          ) : (
            <img className="w-6 h-6 " src="/like-white.png" />
          )}
          <h3 className="relative bottom-5 left-8 font-bold">
            {likedBy.length}
          </h3>
        </div>
      )}
      <div
        onClick={onOpen}
        className="absolute bottom-2 left-30 cursor-pointer flex items-center gap-2"
      >
        <img className="w-5 h-5" src="/comment.png" alt="" />
        <h3 className=" font-bold">{noOfComment}</h3>
      </div>

      <div className="p-3">
        <h2 className="text-2xl font-bold ">{title}</h2>
        <p className="text-sm font-semibold text-gray-400">{content}</p>
      </div>
      {isActive && (
        <div className=" md:left-250 flex items-center justify-center z-99 fixed inset-0 bg-black/10 backdrop-blur-sm">
          <CommentPopup
            postId={post._id}
            onClose={onClose}
            setNoOfComment={setNoOfComment}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
