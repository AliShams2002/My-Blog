import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

const MobileMenu = ({
  menuItems,
  isAuthenticated,
  user,
  logout,
  isMenuOpen,
  closeMenu,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 w-2/3 h-screen bg-gray-800 flex flex-col items-start gap-3 p-6 z-50 border-l border-gray-700 transition-all duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="w-full flex items-center justify-between pb-4 border-b border-gray-700">
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            وبلاگ من
          </h2>
          <span
            className="bg-gray-700/30 hover:bg-gray-700/70 text-red-900 py-1 px-2 text-sm rounded-sm cursor-pointer transition-all duration-100"
            onClick={closeMenu}
          >
            X
          </span>
        </div>
        <div className="w-full flex flex-col justify-start gap-2">
          {menuItems.map((i) => (
            <a
              key={Math.random()}
              href={i.href}
              className="w-full hover:bg-gray-900/50 text-gray-200 hover:text-blue-500 duration-150 p-2 rounded-lg"
            >
              {i.lable}
            </a>
          ))}
        </div>
        {isAuthenticated && (
          <div className="w-full mt-auto pt-2 border-t border-gray-700">
            {user?.role === "admin" && (
              <Link className="w-full" href="/admin/dashboard">
                <button className="w-full flex items-center gap-2 hover:bg-gray-900/50 hover:text-blue-500 text-gray-200 p-2 text-start transition-all duration-100 rounded-lg cursor-pointer">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>داشبورد</span>
                </button>
              </Link>
            )}
            <button
              className="w-full flex items-center gap-2 hover:bg-red-950/40 text-red-600 p-2 text-start transition-all duration-100 rounded-lg cursor-pointer"
              onClick={logout}
            >
              <LogOut className="w-4 h-4" />
              <span>خروج از حساب کاربری</span>
            </button>
          </div>
        )}
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 h-screen bg-black/40 backdrop-blur-xl z-40 transition-all duration-300"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
