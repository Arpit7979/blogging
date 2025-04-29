import React from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, deletePost }) => {
  const navigate = useNavigate();
  const { title, content } = post;

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
      <div>
        <h2 className="text-2xl font-bold ">{title}</h2>
        <p className="text-sm font-semibold text-gray-400">{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
