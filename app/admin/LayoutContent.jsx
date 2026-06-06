"use client";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  FolderTree,
  LayoutDashboard,
  MessageCircle,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const LayoutContent = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, logout } = useAuth();
  const pathName = usePathname();

  // Sidebar menu items
  const menuItems = [
    {
      id: "dashboard",
      href: "dashboard",
      label: "داشبورد",
      icon: LayoutDashboard,
    },
    { id: "blogs", href: "blogs", label: "مقالات", icon: FileText },
    {
      id: "comments",
      href: "comments",
      label: "نظرات",
      icon: MessageCircle,
    },
    {
      id: "categories",
      href: "categories",
      label: "دسته بندی‌ها",
      icon: FolderTree,
    },
    { id: "users", href: "users", label: "کاربران", icon: Users },
  ];

  useEffect(() => {
    switch (pathName) {
      case "/admin/blogs":
        setActiveTab("blogs");
        break;
      case "/admin/comments":
        setActiveTab("comments");
        break;
      case "/admin/categories":
        setActiveTab("categories");
        break;
      case "/admin/users":
        setActiveTab("users");
        break;
      default:
        setActiveTab("dashboard");
        break;
    }
  }, [pathName]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          menuItems={menuItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logout={logout}
        />

        {/* Main Content */}
        <Header
          user={user}
          sidebarCollapsed={sidebarCollapsed}
          menuItems={menuItems}
          activeTab={activeTab}
          logout={logout}
        >
          {children}
        </Header>
      </div>
    </div>
  );
};

export default LayoutContent;
