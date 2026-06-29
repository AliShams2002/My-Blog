"use server";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/CommentService";
import { formatZodErrors } from "@/utils/formatZodErrors";
import { commentSchema } from "@/utils/FormValidation";
import { revalidatePath } from "next/cache";

export async function addComment(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const commentValidate = commentSchema.parse(rawData);

  if (!commentValidate) return;

  const data = await createComment(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/blog/${rawData.id}`);

  return data;
}
export async function editComment(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const userValidate = commentSchema.safeParse(rawData);

  if (!userValidate.success) {
    const errors = formatZodErrors(userValidate.error);
    return {
      success: false,
      message: "داده‌های ورودی معتبر نیستند",
      errors: errors,
    };
  }

  const validatedData = userValidate.data;
  const params = {
    id: rawData.id,
    data: validatedData,
  };
  const data = await updateComment(params);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/admin/comments`);

  return data;
}
export async function removeComment(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await deleteComment(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/admin/comments`);

  return data;
}
