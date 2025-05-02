import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import API from "../../api";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

const BookmarksPost = () => {
  const [bookmarkPost, setBookmarkPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleBookmarkPost = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/auth/get-bookmarks");
      if (data.Success) {
        setBookmarkPost(data?.bookmarks);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleBookmarkPost();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen w-full bg-slate-800 flex flex-col items-center justify-center pt-30">
      <Navbar />
      <h2 className="text-4xl text-white font-bold">Bookmark</h2>
      {bookmarkPost.map((bookmark) => (
        <PostCard post={bookmark} />
      ))}
    </div>
  );
};

export default BookmarksPost;
