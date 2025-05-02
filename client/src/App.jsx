import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import BookmarksPost from "./pages/BookmarksPost";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose="1000" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmark" element={<BookmarksPost />} />
      </Routes>
    </>
  );
};

export default App;
