import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import React from "react";
import Image from "next/image";

const Categories = ({
  initialCategories,
  filteredBlogs,
  setActiveFilter,
  setSearchTerm,
  searchTerm,
  activeFilter,
  setSortBy,
  sortBy,
}) => {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <Image
          src="/images/bg-patterns.svg"
          className="object-cover"
          fill
          sizes="100vw"
          quality={80}
          alt="تصویر هیرو سکشن"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>جدیدترین مطالب و آموزش‌ها</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              وبلاگ تخصصی
              <span className="block bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                برنامه‌نویسی و فناوری
              </span>
            </h1>

            <p className="text-base md:text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              جدیدترین مقالات، آموزش‌ها و مطالب تخصصی در حوزه برنامه‌نویسی،
              طراحی وب و هوش مصنوعی
            </p>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative group">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder="جستجوی مقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-12 pl-6 py-3.5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/60 text-base transition-all"
                />
              </div>

              {/* Search bar results dropdown */}
              {searchTerm && filteredBlogs.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20 max-h-64 overflow-y-auto">
                  {filteredBlogs.slice(0, 5).map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${blog?.image}`}
                        className="rounded-lg object-cover line-clamp-1"
                        width={48}
                        height={48}
                        quality={65}
                        alt={blog.title}
                      />
                      <div className="text-right">
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {blog.title}
                        </p>
                        <p className="text-xs text-gray-500">{blog.author}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categries & Filters */}
      <section className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {initialCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/30"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{category.title}</span>
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 pr-10 bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">جدیدترین</option>
              <option value="oldest">قدیمی‌ترین</option>
            </select>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
