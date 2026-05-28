import { Search } from "lucide-react";
import React from "react";

const Categories = ({
  initialCategories,
  setActiveFilter,
  setSearchTerm,
  searchTerm,
  activeFilter,
}) => {
  return (
    <section>
      {/* Search Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-24 py-4">
        <div className="relative bg-[url('/images/bg-pattern.svg')] bg-cover bg-no-repeat text-gray-100 py-14 px-24 rounded-3xl text-center">
          <h2 className="font-bold text-3xl">وبلاگ</h2>
          {/* Search Bar */}
          <div className="absolute left-1/2 -translate-x-1/2 w-full sm:w-96 top-32">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-3xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container w-full flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {initialCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
