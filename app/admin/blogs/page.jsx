import React from "react";
import { getAllBlogs } from "@/services/BlogService";
import { getAllCategories } from "@/services/CategorieService";
import BlogClient from "./_partials/BlogClient";

export const dynamic = "force-dynamic";
const Page = async () => {
  const blogs = await getAllBlogs();
  const categories = await getAllCategories();

  if (!blogs && !categories) return <Skeleton />;

  return <BlogClient blogs={blogs} categories={categories} />;
};

export default Page;
