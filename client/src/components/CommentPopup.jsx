import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";

const CommentPopup = ({ postId, onClose }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const createComment = async () => {
    try {
      const { data } = await API.post(`/comment/create-comment/${postId}`, {
        comment,
      });
      if (data.Success) {
        toast.success(data.message);
        setComment("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //get all comment
  const getAllComments = async () => {
    try {
      const { data } = await API.get(`/comment/get-comments/${postId}`);
      if (data.Success) {
        setAllComments(data.comments);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllComments();
  }, [comment]);

  //delete comment
  const deleteComment = async (id) => {
    try {
      const { data } = await API.delete(`/comment/delete-comment/${id}`);
      if (data.Success) {
        toast.success(data.message);
        getAllComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="h-100 w-80 bg-slate-900 rounded-lg flex items-center justify-between flex-col relative">
      <h3 className="text-2xl font-bold p-1">Comments</h3>
      <div
        className="bg-slate-700 w-70 h-80 overflow-y-auto flex flex-col items-center gap-3 p-4 rounded-lg scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {allComments.map((comment) => (
          <div className="flex items-center w-full ">
            <div
              className="bg-slate-900 w-full min-h-10 p-3 max-h-20  rounded-lg flex items-center justify-between overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <h4 key={comment._id}>{comment.comment}</h4>
              <h6 className="text-xs text-gray-400">{comment.userId.name}</h6>
            </div>
            <img
              src="/delete.svg"
              onClick={() => deleteComment(comment._id)}
              className="pl-2 w-8 h-8 cursor-pointer"
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 py-5">
        <input
          type="text"
          className="outline-none bg-slate-800 rounded-lg p-2"
          placeholder="COMMENT!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={createComment}
          className="bg-slate-800 p-2 rounded-lg font-bold cursor-pointer"
        >
          Send
        </button>
      </div>
      <button
        onClick={onClose}
        className="text-2xl absolute top-0 right-3 font-bold text-red-700 cursor-pointer"
      >
        x
      </button>
    </div>
  );
};

export default CommentPopup;
