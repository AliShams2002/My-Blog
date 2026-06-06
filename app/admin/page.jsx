// 'use client'
// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   FileText,
//   MessageCircle,
//   FolderTree,
//   Users,
//   Settings,
//   LogOut,
//   ChevronRight,
//   ChevronLeft,
//   Plus,
//   Search,
//   Filter,
//   MoreVertical,
//   Eye,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Clock,
//   FileIcon,
//   UserCheck,
//   FolderOpen,
//   Star,
//   TrendingUp,
//   MessageSquare,
//   Calendar,
//   User,
// } from "lucide-react";

// const AdminDashboard = () => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Sidebar menu items
//   const menuItems = [
//     { id: "dashboard", label: "داشبورد", icon: LayoutDashboard },
//     { id: "posts", label: "مقالات", icon: FileText, count: 24 },
//     { id: "comments", label: "نظرات", icon: MessageCircle, count: 156 },
//     { id: "categories", label: "دسته بندی‌ها", icon: FolderTree, count: 8 },
//     { id: "users", label: "کاربران", icon: Users, count: 1243 },
//   ];

//   // داده‌های جدید مقالات
//   const posts = [
//     {
//       id: "1",
//       title: "A Tribute to the Art of Dance",
//       content: "Why your music is so good - It's not just about the beat...",
//       image: "/api/placeholder/400/250",
//       categoryId: "dance",
//       author: "Mia Rahman",
//       createdAt: "2024-05-15T10:30:00Z",
//     },
//     {
//       id: "2",
//       title: "What makes you stand out",
//       content:
//         "Your unique style and personality. Your ability to connect with your audience...",
//       image: "/api/placeholder/400/250",
//       categoryId: "identity",
//       author: "Alex Morgan",
//       createdAt: "2024-05-12T14:20:00Z",
//     },
//     {
//       id: "3",
//       title: "How we can help you",
//       content: "We'll listen, understand, and create something special...",
//       image: "/api/placeholder/400/250",
//       categoryId: "help",
//       author: "Jordan Lee",
//       createdAt: "2024-05-10T09:15:00Z",
//     },
//     {
//       id: "4",
//       title: "Express.js - New Smartphones 2024",
//       content:
//         "در این مقاله به معرفی جدیدترین گوشی‌های هوشمند سال ۲۰۲۴ می‌پردازیم...",
//       image: "/api/placeholder/400/250",
//       categoryId: "technology",
//       author: "Sara Mohammadi",
//       createdAt: "2024-05-08T16:45:00Z",
//     },
//     {
//       id: "5",
//       title: "Understanding Modern Web Development",
//       content: "A comprehensive guide to modern web development practices...",
//       image: "/api/placeholder/400/250",
//       categoryId: "programming",
//       author: "John Doe",
//       createdAt: "2024-05-05T11:00:00Z",
//     },
//   ];

//   // داده‌های جدید نظرات
//   const comments = [
//     {
//       id: "1",
//       content: "Very insightful article! Thanks for sharing.",
//       articleId: "article-1",
//       author: "Ali Rezaei",
//       userId: "user-1",
//       createdAt: "2024-05-15T18:30:00Z",
//     },
//     {
//       id: "2",
//       content: "This really helped me understand the concept better.",
//       articleId: "article-2",
//       author: "Narges Karimi",
//       userId: "user-2",
//       createdAt: "2024-05-14T20:15:00Z",
//     },
//     {
//       id: "3",
//       content: "Great content as always! Looking forward to more.",
//       articleId: "article-3",
//       author: "Mohammad Hosseini",
//       userId: "user-3",
//       createdAt: "2024-05-13T15:45:00Z",
//     },
//     {
//       id: "4",
//       content: "Could you please explain more about this topic?",
//       articleId: "article-4",
//       author: "Zahra Ahmadi",
//       userId: "user-4",
//       createdAt: "2024-05-12T10:20:00Z",
//     },
//   ];

//   // داده‌های جدید دسته بندی‌ها
//   const categories = [
//     {
//       id: "1",
//       title: "Dance",
//       description: "Articles about dance, movement, and expression",
//     },
//     {
//       id: "2",
//       title: "Music",
//       description: "Music theory, reviews, and industry insights",
//     },
//     {
//       id: "3",
//       title: "Technology",
//       description: "Latest tech news, reviews, and tutorials",
//     },
//     {
//       id: "4",
//       title: "Programming",
//       description: "Coding tips, best practices, and guides",
//     },
//     {
//       id: "5",
//       title: "Identity",
//       description: "Personal growth, identity, and self-discovery",
//     },
//     {
//       id: "6",
//       title: "Help",
//       description: "Support guides and helpful resources",
//     },
//   ];

//   // داده‌های جدید کاربران
//   const users = [
//     {
//       id: "1",
//       username: "mia_rahman",
//       email: "mia@a1n.com",
//       role: "admin",
//       createdAt: "2024-01-15T08:00:00Z",
//     },
//     {
//       id: "2",
//       username: "alex_morgan",
//       email: "alex@a1n.com",
//       role: "editor",
//       createdAt: "2024-01-20T10:30:00Z",
//     },
//     {
//       id: "3",
//       username: "jordan_lee",
//       email: "jordan@a1n.com",
//       role: "author",
//       createdAt: "2024-02-01T14:15:00Z",
//     },
//     {
//       id: "4",
//       username: "sara_mohammadi",
//       email: "sara@a1n.com",
//       role: "author",
//       createdAt: "2024-02-10T09:45:00Z",
//     },
//     {
//       id: "5",
//       username: "john_doe",
//       email: "john@a1n.com",
//       role: "user",
//       createdAt: "2024-03-01T11:20:00Z",
//     },
//   ];

//   // Stats cards data
//   const statsCards = [
//     {
//       title: "مجموع مقالات",
//       value: posts.length.toString(),
//       icon: FileIcon,
//       color: "from-purple-500 to-pink-500",
//       bgGradient: "from-purple-500/10 to-pink-500/10",
//       subtitle: "نوشته شده",
//       trend: "+۳ نسبت به ماه قبل",
//     },
//     {
//       title: "نظرات جدید",
//       value: comments.length.toString(),
//       icon: MessageCircle,
//       color: "from-blue-500 to-cyan-500",
//       bgGradient: "from-blue-500/10 to-cyan-500/10",
//       subtitle: "در انتظار بررسی",
//       trend: "۴۲ تایید شده",
//     },
//     {
//       title: "کاربران فعال",
//       value: users.length.toString(),
//       icon: UserCheck,
//       color: "from-green-500 to-emerald-500",
//       bgGradient: "from-green-500/10 to-emerald-500/10",
//       subtitle: "عضو سایت",
//       trend: "۱۲۴ جدید",
//     },
//     {
//       title: "دسته بندی‌ها",
//       value: categories.length.toString(),
//       icon: FolderOpen,
//       color: "from-orange-500 to-red-500",
//       bgGradient: "from-orange-500/10 to-red-500/10",
//       subtitle: "دسته فعال",
//       trend: "۲ دسته جدید",
//     },
//   ];

//   // تابع کمکی برای فرمت تاریخ
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("fa-IR", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // تابع کمکی برای گرفتن عنوان دسته بندی
//   const getCategoryTitle = (categoryId) => {
//     const category = categories.find((c) => c.id === categoryId);
//     return category ? category.title : categoryId;
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "published":
//         return "bg-green-500/20 text-green-400 border-green-500/30";
//       case "draft":
//         return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
//       case "pending":
//         return "bg-orange-500/20 text-orange-400 border-orange-500/30";
//       case "spam":
//         return "bg-red-500/20 text-red-400 border-red-500/30";
//       default:
//         return "bg-gray-500/20 text-gray-400 border-gray-500/30";
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case "published":
//         return "منتشر شده";
//       case "draft":
//         return "پیش‌نویس";
//       case "pending":
//         return "در انتظار";
//       case "spam":
//         return "اسپم";
//       default:
//         return status;
//     }
//   };

//   const getRoleColor = (role) => {
//     switch (role) {
//       case "admin":
//         return "bg-purple-500/20 text-purple-400";
//       case "editor":
//         return "bg-blue-500/20 text-blue-400";
//       case "author":
//         return "bg-green-500/20 text-green-400";
//       default:
//         return "bg-gray-500/20 text-gray-400";
//     }
//   };

//   const getRoleText = (role) => {
//     switch (role) {
//       case "admin":
//         return "مدیر";
//       case "editor":
//         return "ویرایشگر";
//       case "author":
//         return "نویسنده";
//       default:
//         return "کاربر عادی";
//     }
//   };

//   // فیلتر شده بر اساس سرچ
//   const filteredPosts = posts.filter(
//     (post) =>
//       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.author.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const filteredComments = comments.filter(
//     (comment) =>
//       comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       comment.author.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const filteredCategories = categories.filter(
//     (category) =>
//       category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       category.description.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const filteredUsers = users.filter(
//     (user) =>
//       user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const renderContent = () => {
//     const SearchBar = () => (
//       <div className="relative flex-1">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//         <input
//           type="text"
//           placeholder="جستجو..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm text-white placeholder-gray-500"
//         />
//       </div>
//     );

//     switch (activeTab) {
//       case "posts":
//         return (
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//               <h2 className="text-xl font-bold text-white">مدیریت مقالات</h2>
//               <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2">
//                 <Plus className="w-4 h-4" />
//                 مقاله جدید
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <SearchBar />
//               <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center gap-2">
//                 <Filter className="w-4 h-4" />
//                 فیلتر
//               </button>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="border-b border-gray-700">
//                   <tr className="text-right text-sm text-gray-400">
//                     <th className="pb-3 text-right">عنوان</th>
//                     <th className="pb-3 text-right">نویسنده</th>
//                     <th className="pb-3 text-right">دسته بندی</th>
//                     <th className="pb-3 text-right">تاریخ</th>
//                     <th className="pb-3 text-right">وضعیت</th>
//                     <th className="pb-3 text-right">عملیات</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredPosts.map((post) => (
//                     <tr
//                       key={post.id}
//                       className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
//                     >
//                       <td className="py-4 text-sm font-medium text-white">
//                         {post.title}
//                       </td>
//                       <td className="py-4 text-sm text-gray-300">
//                         {post.author}
//                       </td>
//                       <td className="py-4 text-sm text-gray-300">
//                         {getCategoryTitle(post.categoryId)}
//                       </td>
//                       <td className="py-4 text-sm text-gray-400">
//                         {formatDate(post.createdAt)}
//                       </td>
//                       <td className="py-4">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-green-500/20 text-green-400 border-green-500/30">
//                           <CheckCircle className="w-3 h-3" />
//                           منتشر شده
//                         </span>
//                       </td>
//                       <td className="py-4">
//                         <div className="flex gap-2">
//                           <button className="p-1 hover:text-blue-400 transition-colors">
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button className="p-1 hover:text-green-400 transition-colors">
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button className="p-1 hover:text-red-400 transition-colors">
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case "comments":
//         return (
//           <div className="space-y-4">
//             <h2 className="text-xl font-bold text-white mb-6">مدیریت نظرات</h2>
//             <div className="mb-6">
//               <SearchBar />
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="border-b border-gray-700">
//                   <tr className="text-right text-sm text-gray-400">
//                     <th className="pb-3 text-right">نویسنده</th>
//                     <th className="pb-3 text-right">متن نظر</th>
//                     <th className="pb-3 text-right">تاریخ</th>
//                     <th className="pb-3 text-right">وضعیت</th>
//                     <th className="pb-3 text-right">عملیات</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredComments.map((comment) => (
//                     <tr
//                       key={comment.id}
//                       className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
//                     >
//                       <td className="py-4 text-sm text-white">
//                         {comment.author}
//                       </td>
//                       <td className="py-4 text-sm text-gray-400 max-w-md truncate">
//                         {comment.content}
//                       </td>
//                       <td className="py-4 text-sm text-gray-400">
//                         {formatDate(comment.createdAt)}
//                       </td>
//                       <td className="py-4">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-green-500/20 text-green-400 border-green-500/30">
//                           <CheckCircle className="w-3 h-3" />
//                           تایید شده
//                         </span>
//                       </td>
//                       <td className="py-4">
//                         <div className="flex gap-2">
//                           <button className="p-1 hover:text-red-400 transition-colors">
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case "categories":
//         return (
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//               <h2 className="text-xl font-bold text-white">
//                 مدیریت دسته بندی‌ها
//               </h2>
//               <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2">
//                 <Plus className="w-4 h-4" />
//                 دسته بندی جدید
//               </button>
//             </div>
//             <div className="mb-6">
//               <SearchBar />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {filteredCategories.map((category) => (
//                 <div
//                   key={category.id}
//                   className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
//                       <FolderOpen className="w-5 h-5 text-purple-400" />
//                     </div>
//                     <button className="text-gray-400 hover:text-gray-300">
//                       <MoreVertical className="w-4 h-4" />
//                     </button>
//                   </div>
//                   <h3 className="font-semibold text-white mb-1">
//                     {category.title}
//                   </h3>
//                   <p className="text-xs text-gray-400 mb-3 line-clamp-2">
//                     {category.description}
//                   </p>
//                   <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
//                     <span className="text-xs text-gray-400">
//                       ID: {category.id}
//                     </span>
//                     <div className="flex gap-2">
//                       <button className="p-1 hover:text-green-400 transition-colors">
//                         <Edit className="w-3 h-3" />
//                       </button>
//                       <button className="p-1 hover:text-red-400 transition-colors">
//                         <Trash2 className="w-3 h-3" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case "users":
//         return (
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//               <h2 className="text-xl font-bold text-white">مدیریت کاربران</h2>
//               <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2">
//                 <Plus className="w-4 h-4" />
//                 کاربر جدید
//               </button>
//             </div>
//             <div className="mb-6">
//               <SearchBar />
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="border-b border-gray-700">
//                   <tr className="text-right text-sm text-gray-400">
//                     <th className="pb-3 text-right">نام کاربری</th>
//                     <th className="pb-3 text-right">ایمیل</th>
//                     <th className="pb-3 text-right">نقش</th>
//                     <th className="pb-3 text-right">تاریخ عضویت</th>
//                     <th className="pb-3 text-right">عملیات</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUsers.map((user) => (
//                     <tr
//                       key={user.id}
//                       className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
//                     >
//                       <td className="py-4 text-sm font-medium text-white">
//                         {user.username}
//                       </td>
//                       <td className="py-4 text-sm text-gray-300">
//                         {user.email}
//                       </td>
//                       <td className="py-4">
//                         <span
//                           className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
//                         >
//                           {getRoleText(user.role)}
//                         </span>
//                       </td>
//                       <td className="py-4 text-sm text-gray-400">
//                         {formatDate(user.createdAt)}
//                       </td>
//                       <td className="py-4">
//                         <div className="flex gap-2">
//                           <button className="p-1 hover:text-blue-400 transition-colors">
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button className="p-1 hover:text-green-400 transition-colors">
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button className="p-1 hover:text-red-400 transition-colors">
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-white mb-6">داشبورد</h2>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {statsCards.map((stat, index) => (
//                 <div
//                   key={index}
//                   className="group relative overflow-hidden p-5 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
//                 >
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                   ></div>
//                   <div className="relative z-10">
//                     <div className="flex items-center justify-between mb-4">
//                       <div
//                         className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center shadow-lg`}
//                       >
//                         <stat.icon className="w-6 h-6 text-white" />
//                       </div>
//                     </div>
//                     <h3 className="text-3xl font-bold text-white mb-1">
//                       {stat.value}
//                     </h3>
//                     <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Recent Activity Grid - با داده‌های جدید */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* آخرین مقالات */}
//               <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold text-white flex items-center gap-2">
//                     <FileText className="w-4 h-4 text-purple-400" />
//                     آخرین مقالات
//                   </h3>
//                   <a
//                     href="#"
//                     className="text-xs text-purple-400 hover:text-purple-300"
//                   >
//                     مشاهده همه
//                   </a>
//                 </div>
//                 <div className="space-y-3">
//                   {posts.slice(0, 4).map((post) => (
//                     <div
//                       key={post.id}
//                       className="flex items-start gap-3 p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
//                     >
//                       <img
//                         src={post.image}
//                         alt={post.title}
//                         className="w-12 h-12 rounded-lg object-cover"
//                       />
//                       <div className="flex-1">
//                         <p className="text-sm text-white font-medium line-clamp-1">
//                           {post.title}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-0.5">
//                           {post.author} • {formatDate(post.createdAt)}
//                         </p>
//                         <p className="text-xs text-gray-500 line-clamp-1 mt-1">
//                           {post.content.substring(0, 60)}...
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* آخرین نظرات */}
//               <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold text-white flex items-center gap-2">
//                     <MessageSquare className="w-4 h-4 text-purple-400" />
//                     آخرین نظرات
//                   </h3>
//                   <a
//                     href="#"
//                     className="text-xs text-purple-400 hover:text-purple-300"
//                   >
//                     مشاهده همه
//                   </a>
//                 </div>
//                 <div className="space-y-3">
//                   {comments.slice(0, 4).map((comment) => (
//                     <div
//                       key={comment.id}
//                       className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
//                     >
//                       <div className="flex items-center justify-between mb-1">
//                         <p className="text-sm font-medium text-white">
//                           {comment.author}
//                         </p>
//                         <span className="text-xs text-gray-500">
//                           {formatDate(comment.createdAt)}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-400 line-clamp-2">
//                         {comment.content}
//                       </p>
//                       <p className="text-xs text-purple-400 mt-1">
//                         مقاله: {comment.articleId}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* آخرین دسته بندی‌ها */}
//               <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold text-white flex items-center gap-2">
//                     <FolderTree className="w-4 h-4 text-purple-400" />
//                     آخرین دسته بندی‌ها
//                   </h3>
//                   <a
//                     href="#"
//                     className="text-xs text-purple-400 hover:text-purple-300"
//                   >
//                     مشاهده همه
//                   </a>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {categories.slice(0, 4).map((category) => (
//                     <div
//                       key={category.id}
//                       className="p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
//                     >
//                       <div className="flex items-start gap-2">
//                         <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <FolderOpen className="w-3 h-3 text-purple-400" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-xs font-medium text-white line-clamp-1">
//                             {category.title}
//                           </p>
//                           <p className="text-xs text-gray-400 line-clamp-1">
//                             {category.description.substring(0, 40)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* آخرین کاربران */}
//               <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold text-white flex items-center gap-2">
//                     <Users className="w-4 h-4 text-purple-400" />
//                     آخرین کاربران
//                   </h3>
//                   <a
//                     href="#"
//                     className="text-xs text-purple-400 hover:text-purple-300"
//                   >
//                     مشاهده همه
//                   </a>
//                 </div>
//                 <div className="space-y-3">
//                   {users.slice(0, 4).map((user) => (
//                     <div
//                       key={user.id}
//                       className="flex items-center justify-between p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                           <User className="w-4 h-4 text-white" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-white">
//                             {user.username}
//                           </p>
//                           <p className="text-xs text-gray-400">{user.email}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <span
//                           className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(user.role)}`}
//                         >
//                           {getRoleText(user.role)}
//                         </span>
//                         <p className="text-xs text-gray-500 mt-1">
//                           {formatDate(user.createdAt)}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <aside
//           className={`fixed right-0 top-0 h-full bg-gray-900/50 backdrop-blur-xl border-l border-gray-700/50 transition-all duration-300 z-20 ${sidebarCollapsed ? "w-20" : "w-64"}`}
//         >
//           <div className="flex flex-col h-full">
//             <div className="p-5 border-b border-gray-700/50">
//               <div
//                 className={`flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}
//               >
//                 {!sidebarCollapsed && (
//                   <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                     a1n Admin
//                   </h1>
//                 )}
//                 <button
//                   onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//                   className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
//                 >
//                   {sidebarCollapsed ? (
//                     <ChevronLeft className="w-4 h-4" />
//                   ) : (
//                     <ChevronRight className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <nav className="flex-1 py-6">
//               <ul className="space-y-2 px-3">
//                 {menuItems.map((item) => (
//                   <li key={item.id}>
//                     <button
//                       onClick={() => setActiveTab(item.id)}
//                       className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
//                         activeTab === item.id
//                           ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-400 border border-purple-500/30"
//                           : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
//                       } ${sidebarCollapsed ? "justify-center" : "justify-between"}`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <item.icon className="w-5 h-5" />
//                         {!sidebarCollapsed && (
//                           <span className="text-sm">{item.label}</span>
//                         )}
//                       </div>
//                       {!sidebarCollapsed && item.count && (
//                         <span className="text-xs px-1.5 py-0.5 bg-gray-800 rounded-full">
//                           {item.count}
//                         </span>
//                       )}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>

//             <div className="p-5 border-t border-gray-700/50">
//               <ul className="space-y-2">
//                 <li>
//                   <button
//                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-all ${sidebarCollapsed ? "justify-center" : ""}`}
//                   >
//                     <Settings className="w-5 h-5" />
//                     {!sidebarCollapsed && (
//                       <span className="text-sm">تنظیمات</span>
//                     )}
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all ${sidebarCollapsed ? "justify-center" : ""}`}
//                   >
//                     <LogOut className="w-5 h-5" />
//                     {!sidebarCollapsed && <span className="text-sm">خروج</span>}
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main
//           className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "mr-20" : "mr-64"} p-6 min-h-screen`}
//         >
//           <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700/50">
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 {menuItems.find((item) => item.id === activeTab)?.label ||
//                   "داشبورد"}
//               </h1>
//               <p className="text-sm text-gray-400 mt-1">
//                 به پنل مدیریت خوش آمدید
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="text-left">
//                 <p className="text-sm font-medium text-white">مدیر سیستم</p>
//                 <p className="text-xs text-gray-400">admin@a1n.com</p>
//               </div>
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                 <Star className="w-5 h-5 text-white" />
//               </div>
//             </div>
//           </div>

//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
