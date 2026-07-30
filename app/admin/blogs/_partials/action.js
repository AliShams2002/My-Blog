"use server";

import { deleteBlog, createBlog, updateBlog } from "@/services/BlogService";
import { getAllCategories } from "@/services/CategorieService";
import { formatZodErrors } from "@/utils/formatZodErrors";
import { blogSchema } from "@/utils/FormValidation";
import { revalidatePath } from "next/cache";

// Server action for adding a new blog
export async function addBlog(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const handleCategoriesId = async () => {
    let categoriesArray = [];
    const { data: res } = await getAllCategories();
    for (const element of res) {
      categoriesArray.push(element.id);
    }
    return categoriesArray;
  };
  const categoryItems = await handleCategoriesId();

  // Validate blog data against schema
  const blogValidate = blogSchema(categoryItems).safeParse(rawData);

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
  if (!data?.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  // Revalidate the blogs page to reflect changes
  revalidatePath(`/admin/blogs`);

  return data;
}

// Server action for editing an existing blog
export async function editBlog(formData) {
  const rawData = Object.fromEntries(formData.entries());
  
  const handleCategoriesId = async () => {
    let categoriesArray = [];
    const { data: res } = await getAllCategories();
    for (const element of res) {
      categoriesArray.push(element.id);
    }
    return categoriesArray;
  };
  const categoryItems = await handleCategoriesId();

  // Validate blog data against schema
  const blogValidate = blogSchema(categoryItems).safeParse(rawData);

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

  // Revalidate the blogs page to reflect changes
  revalidatePath(`/admin/blogs`);

  return data;
}

// Server action for deleting a blog
export async function removeBlog(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await deleteBlog(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  // Revalidate the blogs page to reflect changes
  revalidatePath(`/admin/blogs`);

  return data;
}
