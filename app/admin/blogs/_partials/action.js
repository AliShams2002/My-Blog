"use server";

import { deleteBlog, createBlog, updateBlog } from "@/services/BlogService";
import { revalidatePath } from "next/cache";

export async function addBlog(formData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const data = await createBlog(rawData);

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
export async function editBlog(formData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const data = await updateBlog(rawData);

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
export async function removeBlog(formData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const data = await deleteBlog(rawData);

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
