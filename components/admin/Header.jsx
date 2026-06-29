import { formatToSolarDate } from "@/utils/FormatDate";
import React, { useState } from "react";

const Header = ({
  user,
  sidebarCollapsed,
  menuItems,
  activeTab,
  logout,
  children,
}) => {
  const [showUserCard, setShowUserCard] = useState(false);

  return (
    <main
      className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "mr-20" : "mr-64"} p-6 min-h-screen`}
    >
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700/50">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {menuItems.find((item) => item.id === activeTab)?.label ||
              "داشبورد"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">به پنل مدیریت خوش آمدید</p>
        </div>

        {/* User Profile - با Hover Card */}
        <div className="relative">
          {user && (
            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200"
              onMouseEnter={() => setShowUserCard(true)}
              onMouseLeave={() => setShowUserCard(false)}
            >
              <div className="text-left">
                <p className="text-sm font-medium text-white">
                  {user.username}
                </p>
                <p className="text-xs text-gray-400">
                  {user?.role === "admin" ? "مدیر سیستم" : user.role}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium shadow-lg">
                <span>{user?.username?.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          )}

          {/* User Info Card - Hover Card */}
          {showUserCard && (
            <div
              className="absolute left-0 top-full mt-2 w-72 bg-[#1F1F24] rounded-xl border border-[#3F3F46] shadow-2xl z-50 overflow-hidden"
              onMouseEnter={() => setShowUserCard(true)}
              onMouseLeave={() => setShowUserCard(false)}
            >
              {/* Header Card */}
              <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-[#3F3F46]">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {user.username}
                    </h3>
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 mt-1">
                      {user.role === "admin"
                        ? "مدیر سیستم"
                        : user.role === "editor"
                          ? "ویرایشگر"
                          : user.role === "author"
                            ? "نویسنده"
                            : "کاربر عادی"}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-4 space-y-3">
                {/* Email */}
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2A2A30] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">ایمیل</p>
                    <p className="text-sm text-white">{user.email}</p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2A2A30] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">تاریخ عضویت</p>
                    <p className="text-sm text-white">
                      {formatToSolarDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                {/* User ID */}
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2A2A30] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">شناسه کاربری</p>
                    <p className="text-sm text-white font-mono">{user.id}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 border-t border-[#3F3F46] bg-[#1A1A1E]">
                <div className="flex gap-2">
                  <button
                    onClick={logout}
                    className="w-full px-3 py-2 text-sm text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
                  >
                    خروج
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {children}
    </main>
  );
};

export default Header;
