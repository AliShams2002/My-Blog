import { Plus, Search } from "lucide-react";
import React from "react";

const Header = ({ handleAdd, setSearchTerm, searchTerm }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="text-xl font-bold text-white flex-1">
        مدیریت دسته بندی‌ها
      </h2>

      {/* Search input field */}
      <div className="relative flex-1 sm:w-64 flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="جستجو براساس عنوان و توضیحات"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm text-white placeholder-gray-500"
        />
      </div>

      {/* Add new category button */}
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        دسته بندی جدید
      </button>
    </div>
  );
};

export default Header;
