import React from "react";
import { getAllBlogs } from "@/services/BlogService";
import { getAllCategories } from "@/services/CategorieService";
import HomeClient from "./_partials/HomeClient";

export const revalidate = 30;

const BlogPage = async () => {
  const data = await getAllBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 pb-4">
      <HomeClient data={data} />
    </div>
  );
};

export default BlogPage;
