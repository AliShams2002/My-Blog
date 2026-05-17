import React from "react";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-700/50 bg-black/30 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            AI_BLOG
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
            <button>HOME</button>
            <button>HOME</button>
            <button>HOME</button>
            <button>HOME</button>
          </div>
          <button className="px-4 py-2 rounded-3xl text-sm font-medium transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 text-white ">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
