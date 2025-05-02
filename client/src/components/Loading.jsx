import React from "react";

const Loading = () => {
  return (
    <div className="bg-slate-900 w-screen h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
