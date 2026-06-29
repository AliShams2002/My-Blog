import {
  MessageCircle,
  FolderTree,
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  FileText as FileIcon,
  UserCheck,
  FolderOpen,
  Star,
  TrendingUp,
  MessageSquare,
  FileText,
  User,
} from "lucide-react";
import { getAllBlogs } from "@/services/BlogService";
import { getAllCategories } from "@/services/CategorieService";
import { getAllComments } from "@/services/CommentService";
import { getAllUsers } from "@/services/UserService";
import { formatToSolarDate } from "@/utils/FormatDate";
import Link from "next/link";
import Skeleton from "@/components/admin/SkeletonLoading";

export const dynamic = "force-dynamic";

const AdminDashboard = async () => {
  const [blogs, categories, comments, users] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
    getAllComments(),
    getAllUsers(),
  ]);

  const statsCards = [
    {
      title: "مجموع مقالات",
      value: blogs.data.length,
      icon: FileIcon,
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "نظرات جدید",
      value: comments.data.length,
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "کاربران فعال",
      value: users.data.length,
      icon: UserCheck,
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "دسته بندی‌ها",
      value: categories.data.length,
      icon: FolderOpen,
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
    },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/20 text-purple-400";
      case "editor":
        return "bg-blue-500/20 text-blue-400";
      case "author":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "مدیر";
      default:
        return "کاربر عادی";
    }
  };

  if (!blogs) return <Skeleton type="cards" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">داشبورد</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden p-5 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col items-end">
                  <h3 className="text-3xl font-bold text-white">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Grid - با داده‌های جدید */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* آخرین مقالات */}
        <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              آخرین مقالات
            </h3>
            <Link
              className="text-xs text-purple-400 hover:text-purple-300"
              href={`/admin/blogs`}
            >
              مشاهده همه
            </Link>
          </div>
          <div className="space-y-3">
            {blogs.data.slice(-3).map((post) => (
              <div
                key={post.id}
                className="flex items-start gap-3 p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-white font-medium line-clamp-1">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {post.author} • {formatToSolarDate(post.createdAt)}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                    {post.content.substring(0, 60)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* آخرین نظرات */}
        <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              آخرین نظرات
            </h3>
            <Link
              className="text-xs text-purple-400 hover:text-purple-300"
              href={`/admin/comments`}
            >
              مشاهده همه
            </Link>
          </div>
          <div className="space-y-3">
            {comments.data.slice(-3).map((comment) => (
              <div
                key={comment.id}
                className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-white">
                    {comment.author}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatToSolarDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {comment.content}
                </p>
                <p className="text-xs text-purple-400 mt-1">
                  مقاله: {comment.articleId}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* آخرین دسته بندی‌ها */}
        <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-purple-400" />
              آخرین دسته بندی‌ها
            </h3>
            <Link
              className="text-xs text-purple-400 hover:text-purple-300"
              href={`/admin/categories`}
            >
              مشاهده همه
            </Link>
          </div>
          <div className="space-y-3">
            {categories.data.slice(-3).map((category) => (
              <div
                key={category.id}
                className="p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FolderOpen className="w-3 h-3 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-white line-clamp-1">
                      {category.title}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {category.description.substring(0, 40)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* آخرین کاربران */}
        <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              آخرین کاربران
            </h3>
            <Link
              className="text-xs text-purple-400 hover:text-purple-300"
              href={`/admin/users`}
            >
              مشاهده همه
            </Link>
          </div>
          <div className="space-y-3">
            {users.data.slice(-3).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(user.role)}`}
                  >
                    {getRoleText(user.role)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatToSolarDate(user.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
