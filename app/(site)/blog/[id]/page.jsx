import React from "react";
import { getAllBlogs, getBlogById } from "@/services/BlogService";
import BlogClient from "./_partials/BlogClient";
import { getCommentsByBlogId } from "@/services/CommentService";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: allBlogs } = await getAllBlogs();

  return allBlogs.map((blog) => ({
    id: String(blog.id),
  }));
}

const Blog = async ({ params }) => {
  const { id } = await params;
  const [{ data: allBlogs }, { data: blogDetails }, { data: comments }] =
    await Promise.all([
      getAllBlogs(),
      getBlogById(id),
      getCommentsByBlogId(id),
    ]);

  return (
    <BlogClient
      initialBlogDetails={blogDetails}
      initialBlogs={allBlogs}
      initialComments={comments}
    />
  );
};

export default Blog;
