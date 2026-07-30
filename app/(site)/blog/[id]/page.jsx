import React from "react";
import { getAllBlogs, getBlogById } from "@/services/BlogService";
import BlogClient from "./_partials/BlogClient";
import { getCommentsByBlogId } from "@/services/CommentService";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: blog } = await getBlogById(id);

  if (!blog) {
    return {
      title: "مقاله یافت نشد",
      description: "متأسفیم، مقاله مورد نظر شما پیدا نشد",
    };
  }

  // ساخت متادیتا بر اساس مقاله
  const title = `${blog.title} | وبلاگ من`;
  const description =
    blog.content ||
    `مطالعه مقاله کامل ${blog.title} در وبلاگ من. آموزش جامع و تخصصی با مثال‌های عملی`;
  const keywords =
    blog.categoryId ||
    "برنامه‌نویسی, آموزش, مقاله, وبلاگ, هوش مصنوعی, مدیریت, تکنولوژی";

  return {
    title: title,
    description: description,
    keywords: keywords,
    authors: [{ name: blog.author || "وبلاگ من" }],
    openGraph: {
      title: title,
      description: description,
      url: `https://example.com/blog/${id}`,
      siteName: "وبلاگ من",
      images: [
        {
          url: blog.image || "/og-image-default.jpg",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "fa_IR",
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.createdAt,
      authors: blog.author ? [blog.author] : undefined,
      tags: blog.categoryId || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [blog.image || "/og-image-default.jpg"],
    },
    alternates: {
      canonical: `https://example.com/blog/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Incremental static regeneration rendering (ISR)
export const revalidate = 60;

export async function generateStaticParams() {
  const { data: allBlogs } = await getAllBlogs();

  return allBlogs.map((blog) => ({
    id: String(blog.id),
  }));
}

const Blog = async ({ params }) => {
  const { id } = await params;

  // Fetch all blogs & single blog by id & comments of blog
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
