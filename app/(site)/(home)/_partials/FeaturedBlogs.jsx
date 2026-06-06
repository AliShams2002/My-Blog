"use client";

import BlogCard from "@/components/shared/BlogCard";
import Link from "next/link";
import React from "react";

const FeaturedBlogs = ({
  getCatById,
  featuredBlog,
  activeFilter,
  filteredArticles,
  searchTerm,
}) => {
  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 lg:px-16 py-2">
        {featuredBlog && activeFilter === "all" && searchTerm === "" && (
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
                <h4 className="text-5xl font-bold text-gray-200 max-w-5/6">
                  {featuredBlog.title}
                </h4>
                <p className="text-gray-400 line-clamp-3">
                  {featuredBlog.content}
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/image1.jpg"
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <span className="font-bold text-gray-200">
                    {featuredBlog.author}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
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
        {filteredArticles.length === 0 && (
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
