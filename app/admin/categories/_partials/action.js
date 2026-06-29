"use server";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/CategorieService";
import { formatZodErrors } from "@/utils/formatZodErrors";
import { categorieSchema } from "@/utils/FormValidation";
import { revalidatePath } from "next/cache";

export async function addCategory(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const userValidate = categorieSchema.safeParse(rawData);

  if (!userValidate.success) {
    const errors = formatZodErrors(userValidate.error);
    return {
      success: false,
      message: "داده‌های ورودی معتبر نیستند",
      errors: errors,
    };
  }

  const validatedData = userValidate.data;

  const data = await createCategory(validatedData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  revalidatePath(`/admin/categories`);

  return data;
}
export async function editCategory(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const userValidate = categorieSchema.safeParse(rawData);

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
  const data = await updateCategory(params);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  revalidatePath(`/admin/categories`);

  return data;
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

  return data;
}
