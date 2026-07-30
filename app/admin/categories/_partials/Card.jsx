"use client";
import React from "react";
import { Edit, FolderOpen, Plus, Trash2 } from "lucide-react";
import SpinnerLoading from "@/components/shared/SpinnerLoading";

const Card = ({ categories, handleEdit, handleDelete, isLoading }) => {
  // Show loading spinner while data is being fetched
  if (isLoading)
    return (
      <div className="text-center pt-4">
        <SpinnerLoading width="v-8" height="h-8" />
      </div>
    );

  // Show empty state when no categories exist
  if (!categories.length)
    return (
      <div className="py-3 text-center text-gray-400">
        <span>هیچ داده‌ای یافت نشد</span>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-purple-400" />
            </div>
          </div>

          <h3 className="font-semibold text-white mb-1">{category.title}</h3>
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">
            {category.description || "توضیحاتی وارد نشده است"}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
            {/* Blog count */}
            <span className="text-xs text-gray-400">
              📄 {category.articlesCount} مقاله
            </span>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(category);
                }}
                className="p-1 hover:text-green-400 transition-colors cursor-pointer"
              >
                <Edit className="w-3 h-3" />
              </button>
              {/* Delete button - disabled if category has articles */}
              <button
                disabled={category.articlesCount}
                onClick={() => handleDelete(category.id)}
                className="p-1 hover:text-red-400 transition-colors cursor-pointer disabled:text-gray-700 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
