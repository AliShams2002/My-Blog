"use server";

import {
  createCategory,
  deleteCategory,
  getBlogRelatedOfCategory,
  updateCategory,
} from "@/services/CategorieService";
import { revalidatePath } from "next/cache";

export async function addCategory(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await createCategory(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  revalidatePath(`/admin/categories`);

  return {
    success: true,
    data,
  };
}
export async function editCategory(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await updateCategory(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  revalidatePath(`/admin/categories`);

  return {
    success: true,
    data,
  };
}
export async function removeCategory(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await deleteCategory(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  revalidatePath(`/admin/categories`);

  return {
    success: true,
    data,
  };
}
