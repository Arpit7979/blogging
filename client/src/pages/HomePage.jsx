import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import API from "../../api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPost = async () => {
    try {
      const { data } = await API.get("/post/all-post");
      setPosts(data.posts);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);

  const deletePost = async (id) => {
    try {
      const { data } = await API.delete(`/post/delete-post/${id}`);
      if (data.Success) {
        toast.success(data.message);
        getAllPost();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading)
    return (
      <div className="bg-slate-900 w-screen h-screen flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Loading....</h1>
      </div>
    );
  if (posts.length === 0)
    return (
      <div className="bg-slate-900 w-screen h-screen flex items-center justify-center">
        <h2 className="text-5xl font-bold text-white">
          There is no Post. Create First Post
        </h2>
        ;
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="h-fit w-full bg-slate-800 flex flex-col items-center justify-center pt-30">
        <div className="bg-slate-700 m-10 rounded-lg  hover:bg-slate-900 transition-all">
          <button
            onClick={() => navigate("/create-post")}
            className="text-4xl p-5 text-white font-bold cursor-pointer"
          >
            Create New Post
          </button>
        </div>
        {posts.map((post) => (
          <PostCard
            post={post}
            key={post._id}
            deletePost={() => deletePost(post._id)}
          />
        ))}
        <div className="bg-slate-700 m-10 rounded-lg  hover:bg-slate-900 transition-all">
          <button
            onClick={() => navigate("/create-post")}
            className="text-4xl p-5 text-white font-bold cursor-pointer"
          >
            Create New Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
