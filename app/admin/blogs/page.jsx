import React from "react";
import { getAllBlogs } from "@/services/BlogService";
import { getAllCategories } from "@/services/CategorieService";
import BlogClient from "./_partials/BlogClient";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const Page = async () => {
  // Fetch blogs and categories data
  const [{ data: blogs }, { data: categories }] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
  ]);

  // Show skeleton loading if both blogs and categories data are not available
  if (!blogs && !categories) return <Skeleton />;

  return <BlogClient blogs={blogs} categories={categories} />;
};

export default Page;
