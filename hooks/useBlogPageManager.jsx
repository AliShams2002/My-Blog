// hooks/useBlogPageManager.jsx
"use client";
import { addComment } from "@/app/admin/comments/_partials/action";
import { useAuth } from "@/context/AuthContext";
import { useCategories } from "@/context/CategoriesContext";
import React, {
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";
import toast from "react-hot-toast";

export function UseBlogPageManager(
  initialBlogDetails,
  initialBlogs,
  initialComments = [],
) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [blogDetails, setBlogDetails] = useState(initialBlogDetails);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isPending, startTransition] = useTransition();
  const { getCategoryName } = useCategories();
  const { isAuthenticated } = useAuth();

  const suggestedBlogs = useMemo(() => {
    if (!blogs.length && !blogDetails?.id) return [];
    return blogs.filter((b) => b.id !== blogDetails.id).slice(0, 3);
  }, [blogs, blogDetails?.id]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newComment.trim()) {
        toast.error("لطفاً متن نظر را وارد کنید");
        return;
      }

      if (!blogDetails?.id) {
        toast.error("خطا در شناسایی مقاله");
        return;
      }

      if(!isAuthenticated) {
        toast.error("برای ثبت نظر ابتدا وارد حساب کاربری خود شوید!");
        return;
      }

      const form = new FormData();
      form.append("content", newComment);
      form.append("articleId", String(blogDetails.id));

      startTransition(async () => {
        try {
          const res = await addComment(form);
          if (res.success) {
            const { data } = res;
            setComments((prev) => [...prev, data.data]);
            toast.success("نظر با موفقیت اضافه شد");
            setNewComment("");
          } else {
            toast.error(res.error || "خطا در ارسال نظر");
          }
        } catch (error) {
          toast.error("خطا در ارتباط با سرور");
        }
      });
    },
    [newComment, blogDetails?.id],
  );

  return {
    suggestedBlogs,
    handleSubmit,
    setNewComment,
    newComment,
    isPending,
    comments,
    getCategoryName,
  };
}
