"use client";
// import { useAuth } from "@/context/AuthContext";
// import axios from "axios";
// import React, { useEffect } from "react";

// const Home = () => {
//   const { token, logout } = useAuth();
//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/profile`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       console.log(response);
//     }
//     fetchData();
//   }, [token]);

//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <button className="p-3 bg-blue-500 rounded-md" onClick={logout}>Logout</button>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import {
  Search,
  Filter,
  Bookmark,
  Heart,
  Share2,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import Header from "@/components/comon/Header";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const articles = [
    {
      id: 1,
      title: "A Tribute to the Art of Dance",
      subtitle: "Dance Authenticity (and Other Facts)",
      category: "dance",
      author: "Mia Rahman",
      date: "May 15, 2024",
      readTime: "6 min read",
      image: "/api/placeholder/400/250",
      description:
        "Why your music is so good - It's not just about the beat. It's about the emotion. It's about the story. It's about the lyrics.",
      tags: ["Music", "Emotion", "Authenticity"],
    },
    {
      id: 2,
      title: "What makes you stand out",
      subtitle: "Finding Your Unique Voice",
      category: "identity",
      author: "Alex Morgan",
      date: "May 12, 2024",
      readTime: "4 min read",
      image: "/api/placeholder/400/250",
      description:
        "Your unique style and personality. Your ability to connect with your audience. Your passion for what you do.",
      tags: ["Style", "Connection", "Passion"],
    },
    {
      id: 3,
      title: "How we can help you",
      subtitle: "Your Creative Journey",
      category: "help",
      author: "Jordan Lee",
      date: "May 10, 2024",
      readTime: "5 min read",
      image: "/api/placeholder/400/250",
      description:
        "We'll listen, understand, and create something special. We'll help you find your voice and express yourself.",
      tags: ["Growth", "Expression", "Dreams"],
    },
  ];

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "dance", label: "Dance" },
    { id: "music", label: "Music" },
    { id: "identity", label: "Identity" },
    { id: "help", label: "Help & Support" },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || article.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 ">
      <Header />
      <div className="mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-blue-700 text-gray-100 py-10 px-24 rounded-3xl text-center">
          <h2 className="font-bold text-3xl">وبلاگ</h2>
          {/* Search Bar */}
          <div className="absolute w-full sm:w-96 top-24 left-80">
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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
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
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h2>

                <h3 className="text-sm text-purple-400 font-medium mb-3">
                  {article.subtitle}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {article.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-300">
                      {article.author}
                    </span>
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
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No articles found matching your search.
            </p>
          </div>
        )}
      </main>

      {/* Footer / Contact Section */}
      <footer className="border-t border-gray-700/50 bg-black/30 backdrop-blur-lg mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                About a1n
              </h3>
              <p className="text-gray-400 text-sm">
                A creative space where art meets authenticity, exploring the
                depths of dance, music, and human expression.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Contact Us
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📧 info@yourwebsite.com</p>
                <p>📞 +1 (555) 1234 5678</p>
                <p>📍 123 Main Street, Anytown, USA</p>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-xs pt-8 mt-8 border-t border-gray-700/50">
            <p>&copy; 2024 a1n Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
