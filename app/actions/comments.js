"use server";

import { postComment } from "@/services/CommentService";
import { revalidatePath } from "next/cache";

export async function addComment(formData) {
  const content = formData.get("content");
  const articleId = formData.get("articleId");

  if (!content || !articleId) {
    return { success: false, error: "متن مقاله الزامی است!" };
  }

  const newComment = await postComment({
    content,
    articleId,
  });

  if (!newComment) return { success: false, error: "خطا در ارسال درخواست!" };

  revalidatePath(`/blog/${articleId}`);

  return {
    success: true,
    newComment,
  };
}
