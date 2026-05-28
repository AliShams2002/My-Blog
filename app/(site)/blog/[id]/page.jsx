import React from "react";
import { getAllBlogs, getBlogById } from "@/services/BlogService";
import BlogClient from "./_partials/BlogClient";
import { getCommentsByBlogId } from "@/services/CommentService";

export const revalidate = 60;

export async function generateStaticParams() {
  const allBlogs = await getAllBlogs();

  return allBlogs.map((blog) => ({
    id: String(blog.id),
  }));
}

const Blog = async ({ params }) => {
  const { id } = await params;
  const [allBlogs, blogDetails, comments] = await Promise.all([
    getAllBlogs(),
    getBlogById(id),
    getCommentsByBlogId(id),
  ]);

  const suggestedBlogs = allBlogs
    .filter((b) => b.id !== blogDetails.id)
    .slice(0, 3);

  return (
    <BlogClient
      blogDetails={blogDetails}
      suggestedBlogs={suggestedBlogs}
      comments={comments}
    />
  );
};

export default Blog;
