import React from "react";
import {
  LogOut,
  ChevronRight,
  ChevronLeft,
  FileText as FileIcon,
} from "lucide-react";
import Link from "next/link";

const Sidebar = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  menuItems,
  activeTab,
  setActiveTab,
  logout,
}) => {
  return (
    <aside
      className={`fixed right-0 top-0 h-full bg-gray-900/50 backdrop-blur-xl border-l border-gray-700/50 transition-all duration-300 z-20 ${sidebarCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex flex-col h-full">
        <div className="p-5 border-b border-gray-700/50">
          <div
            className={`flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}
          >
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                پنل ادمین
              </h1>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              {sidebarCollapsed ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <Link href={`/admin/${item.href}`} key={item.id}>
                <li>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-400 border border-purple-500/30"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                    } ${sidebarCollapsed ? "justify-center" : "justify-between"}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {!sidebarCollapsed && (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </div>
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        <div className="p-5 border-t border-gray-700/50">
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all cursor-pointer ${sidebarCollapsed ? "justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="text-sm">خروج</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
