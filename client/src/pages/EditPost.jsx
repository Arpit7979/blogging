import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
import Navbar from "../components/Navbar";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getSinglePost = async () => {
    try {
      const { data } = await API.get(`/post/single-post/${id}`);
      if (data.Success) {
        const { title, content } = data.post;
        setTitle(title);
        setContent(content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getSinglePost();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`post/update-post/${id}`, {
        title,
        content,
      });
      if (data.Success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center">
      <Navbar />
      <form
        className="w-[80%] h-[60%] flex flex-col items-center justify-center rounded-lg bg-gradient-to-l from-slate-600 to-slate-800 p-10"
        action=""
      >
        <h2 className="text-5xl font-bold mb-5">Update Post</h2>
        <input
          className="outline-none p-4 rounded-lg text-lg bg-gray-100 text-black w-full"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="outline-none p-4 rounded-lg text-lg bg-gray-100 text-black my-5 w-full"
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="p-2 cursor-pointer bg-slate-800 rounded-lg px-8 mt-3"
          type="submit"
          onClick={handleForm}
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
