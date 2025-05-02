import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import API from "../../api";
import PostCard from "../components/PostCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const getProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile");
      if (data.Success) {
        setUser(data.user);
        setUserPost(data.userPost);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  useEffect(() => {
    const updateProfile = async () => {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("profilePic", selectedFile);
      setLoading(true);
      try {
        const { data } = await API.put("/auth/profile-pic", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data.Success) {
          setUser((prev) => ({ ...prev, profilePic: data.profilePic }));
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    updateProfile();
  }, [selectedFile]);

  return (
    <div className="w-full h-fit bg-slate-800 flex items-center justify-center py-20">
      <Navbar />
      <div className="md:w-[80%] w-[85%] h-fit rounded-lg flex flex-col bg-slate-900 mt-20 md:p-10 p-2 text-white items-center">
        <div className="flex items-center md:p-10 p-4">
          <div className="flex items-baseline">
            {loading ? (
              <div className="w-10 h-10 rounded-full border-5 border-t-transparent animate-spin border-blue-500"></div>
            ) : (
              <img
                className="w-30 h-30 border-2 rounded-full p-1"
                src={
                  import.meta.env.VITE_BACKEND_URL_IMG + user?.profilePic ||
                  "/delete.svg"
                }
                alt=""
              />
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <img
              onClick={handleButtonClick}
              className="w-4 h-5 cursor-pointer"
              src="/pencil.svg"
              alt=""
            />
          </div>
          <div className="pl-10">
            <div className="flex gap-4 items-center">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <img
                className="w-4 h-5 cursor-pointer"
                src="/pencil.svg"
                alt=""
              />
            </div>
            <h3 className="text-lg text-gray-300">{user?.email}</h3>
            <p className="text-xs text-gray-600">This is random bio</p>
          </div>
        </div>

        <h1 className="text-4xl font-bold ">All Posts</h1>
        <div className="flex w-full items-center justify-center flex-col ">
          {userPost.length > 0 ? (
            userPost.map((post) => (
              <div className="bg-slate-800  w-full p-4 rounded-lg my-5">
                <h2 className="md:text-3xl text-2xl font-bold">{post.title}</h2>
                <p className="md:text-lg text-sm text-gray-400">
                  {post.content}
                </p>
              </div>
            ))
          ) : (
            <h2>No post yet!</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
