"use server";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/CommentService";
import { revalidatePath } from "next/cache";

export async function addComment(formData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const data = await createComment(rawData);

    revalidatePath(`/admin/blogs`);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
export async function editComment(formData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const data = await updateComment(rawData);

    revalidatePath(`/admin/blogs`);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
export async function removeComment(formData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const data = await deleteComment(rawData);

    revalidatePath(`/admin/blogs`);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
