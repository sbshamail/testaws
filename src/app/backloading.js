import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300/20 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white-500"></div>
    </div>
  );
};

export default Loading;
