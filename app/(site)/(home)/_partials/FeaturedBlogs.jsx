"use client";

import BlogCard from "@/components/shared/BlogCard";
import SpinnerLoading from "@/components/shared/SpinnerLoading";
import Link from "next/link";
import React from "react";

const FeaturedBlogs = ({
  getCatById,
  featuredBlog,
  filteredBlogs,
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className="w-full h-full text-center pt-8">
        <SpinnerLoading width="v-8" height="h-8" />
      </div>
    );

  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 lg:px-16 py-2">
        {featuredBlog && (
          <Link href={`/blog/${featuredBlog.id}`} key={featuredBlog.id}>
            <article className="flex items-stretch gap-2 justify-between mb-8 bg-gray-800/10 hover:bg-gray-800/30 backdrop-blur-sm group hover:shadow-xl transition-all duration-300 hover:transform rounded-2xl overflow-hidden">
              <img
                src={featuredBlog.image}
                className="w-1/2 h-72 rounded-lg"
                alt=""
              />
              <div className="w-1/2 flex flex-col justify-between py-4 px-8">
                <small className="font-semibold text-gray-500">
                  {getCatById(featuredBlog.categoryId)}
                </small>
                <h4 className="text-4xl font-bold text-gray-200">
                  {featuredBlog.title}
                </h4>
                <p className="text-gray-400 line-clamp-3">
                  {featuredBlog.content}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    {featuredBlog.author?.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-300">
                    {featuredBlog.author}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((article) => (
            <Link
              href={`/blog/${article.id}`}
              key={article.id}
              className="flex items-stretch"
            >
              <BlogCard article={article} getCatById={getCatById} />
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              هیچ مقاله‌ای مطابق با جستجوی شما یافت نشد.!
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default FeaturedBlogs;
