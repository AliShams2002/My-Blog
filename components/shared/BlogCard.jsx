import { formatToSolarDate } from "@/utils/FormatDate";
import ReadingTime from "@/utils/ReadingTime";
import { Bookmark, Calendar, Clock, Heart, Share2, User } from "lucide-react";
import React from "react";

const BlogCard = ({ article, getCatById }) => {
  return (
    <article className="group w-full bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
      {/* Article Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-purple-600 transition-colors">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Article Content */}
      <div className="p-6 h-fit">
        <div className="flex items-center justify-between gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatToSolarDate(article.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <small>{ReadingTime(article.content)}</small>
          </span>
        </div>

        <h2 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
          {article.title}
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">
            {getCatById(article.categoryId)}
          </span>
        </div>

        {/* Author & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              {article.author.charAt(0)}
            </div>
            <span className="text-sm text-gray-300">{article.author}</span>
          </div>

          <div className="flex gap-3">
            <button className="text-gray-400 hover:text-red-400 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-green-400 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
