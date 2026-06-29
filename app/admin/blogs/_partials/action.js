"use server";

import { deleteBlog, createBlog, updateBlog } from "@/services/BlogService";
import { blogSchema } from "@/utils/FormValidation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formatZodErrors = (error) => {
  const errors = {};
  error.errors.forEach((err) => {
    if (err.path) {
      errors[err.path[0]] = err.message;
    }
  });
  return errors;
};

export async function addBlog(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const blogValidate = blogSchema.safeParse(rawData);

  if (!blogValidate.success) {
    const errors = formatZodErrors(blogValidate.error);
    return {
      success: false,
      message: "داده‌های ورودی معتبر نیستند",
      errors: errors,
    };
  }

  const validatedData = blogValidate.data;

  const data = await createBlog(validatedData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/admin/blogs`);

  return {
    success: true,
    data,
  };
}
export async function editBlog(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const blogValidate = blogSchema.safeParse(rawData);

  if (!blogValidate.success) {
    const errors = formatZodErrors(blogValidate.error);
    return {
      success: false,
      message: "داده‌های ورودی معتبر نیستند",
      errors: errors,
    };
  }

  const validatedData = blogValidate.data;
  const params = {
    id: rawData.id,
    data: validatedData,
  };
  const data = await updateBlog(params);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/admin/blogs`);

  return {
    success: true,
    data,
  };
}
export async function removeBlog(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await deleteBlog(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/admin/blogs`);

  return {
    success: true,
    data,
  };
}
