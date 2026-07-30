"use server";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/CommentService";
import { formatZodErrors } from "@/utils/formatZodErrors";
import { commentSchema } from "@/utils/FormValidation";
import { revalidatePath } from "next/cache";

// Server action for adding a new comment
export async function addComment(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await createComment(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  // Revalidate the blog page to show the new comment
  revalidatePath(`/blog/${rawData.id}`);

  return data;
}

// Server action for editing a comment
export async function editComment(formData) {
  const rawData = Object.fromEntries(formData.entries());

  // Validate comment data against schema
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

  // Revalidate the admin comments page to reflect changes
  revalidatePath(`/admin/comments`);

  return data;
}

// Server action for deleting a comment
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
