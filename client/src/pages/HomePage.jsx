import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import API from "../../api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const HomePage = () => {
  const categories = ["All", "Technology", "Lifestyle", "Health", "Education"];
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActivePostId, setIsActivePostId] = useState(null);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  //fetch post on selected category
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const endPoint =
          category === "All" ? "/post/all-post" : `/post/category/${category}`;
        const { data } = await API.get(endPoint);
        if (data.Success) setPosts(data.posts);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchPost();
  }, [category]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const { data } = await API.get(`/post/search-post?query=${searchTerm}`);
        if (data.Success) {
          setPosts(data.posts);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

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

  if (loading) return <Loading />;
  if (posts.length === 0)
    return (
      <div className="bg-slate-900 w-screen h-screen flex items-center justify-center flex-col text-center">
        <h2 className="md:text-5xl text-3xl font-bold text-white">
          There is no Post. Create First Post
        </h2>
        <div className="bg-slate-700 m-10 rounded-lg  hover:bg-slate-800 transition-all">
          <button
            onClick={() => navigate("/create-post")}
            className="text-4xl p-5 text-white font-bold cursor-pointer"
          >
            Create New Post
          </button>
        </div>
        ;
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full bg-slate-800 flex flex-col items-center justify-center pt-30">
        <div className="bg-slate-700 m-10 rounded-lg  hover:bg-slate-900 transition-all">
          <button
            onClick={() => navigate("/create-post")}
            className="text-4xl p-5 text-white font-bold cursor-pointer"
          >
            Create New Post
          </button>
        </div>
        <div className="text-white flex gap-4 flex-wrap w-full items-center justify-center">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                category === cat ? "bg-indigo-800" : "bg-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="w-[50%] bg-gray-300 outline-none rounded-lg p-3 mt-3 text-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Post!"
        />
        {posts.map((post) => (
          <PostCard
            post={post}
            key={post._id}
            deletePost={() => deletePost(post._id)}
            getAllPost={getAllPost}
            isActive={isActivePostId === post._id}
            onOpen={() => setIsActivePostId(post._id)}
            onClose={() => setIsActivePostId(null)}
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
