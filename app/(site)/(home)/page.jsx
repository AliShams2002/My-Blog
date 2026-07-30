import { getAllBlogs } from "@/services/BlogService";
import HomeClient from "./_partials/HomeClient";

export const metadata = {
  title: "وبلاگ من",
  description:
    "جدیدترین مقالات آموزشی در حوزه برنامه‌نویسی، مدیریت، هوش مصنوعی و تکنولوژی.",
  keywords:
    "برنامه‌نویسی, طراحی وب, هوش مصنوعی, آموزش, مقاله, React, Next.js, Tailwind, JavaScript, Python",
  authors: [{ name: "وبلاگ من" }],
  openGraph: {
    title: "وبلاگ من",
    description:
      "جدیدترین مقالات آموزشی در حوزه برنامه‌نویسی، مدیریت، هوش مصنوعی و تکنولوژی",
    url: "https://example.com",
    siteName: "وبلاگ تخصصی برنامه‌نویسی",
    images: [
      {
        url: "/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "وبلاگ تخصصی برنامه‌نویسی",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "وبلاگ من",
    description:
      "جدیدترین مقالات آموزشی در حوزه برنامه‌نویسی، مدیریت، هوش مصنوعی و تکنولوژی",
    images: ["/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://example.com",
  },
};

// Incremental static regeneration rendering (ISR)
export const revalidate = 30;

export default async function HomePage() {
  // Fetch all blogs
  const { data: allBlogs } = await getAllBlogs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-iransans-edit pb-6">
      <HomeClient data={allBlogs} />
    </div>
  );
}
