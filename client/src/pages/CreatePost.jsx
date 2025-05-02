import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["All", "Technology", "Lifestyle", "Health", "Education"];

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/post/create-post", {
        title,
        content,
        category,
      });
      if (data.Success) {
        toast.success(data.message);
        navigate("/");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <Navbar />
      <form
        className="w-[80%] md:h-[60%] h-fit flex flex-col items-center justify-center rounded-lg bg-gradient-to-l from-slate-600 to-slate-800 p-10 mt-30 mb-10"
        action=""
      >
        <h2 className="text-5xl font-bold mb-5">Create Post</h2>
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
        <div className="text-white flex gap-4 flex-wrap">
          {categories.map((cat, i) => (
            <button
              type="button"
              key={i}
              onClick={() => {
                setCategory(cat);
              }}
              className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                category === cat ? "bg-indigo-800" : "bg-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          className="p-2 cursor-pointer bg-slate-800 rounded-lg px-8 mt-3"
          type="submit"
          onClick={handleForm}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
