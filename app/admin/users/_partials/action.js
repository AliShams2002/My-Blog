"use server";

import { createUser, deleteUser, updateUserRole } from "@/services/UserService";
import { formatZodErrors } from "@/utils/formatZodErrors";
import { profileUpdateSchema, userSchema } from "@/utils/FormValidation";
import { revalidatePath } from "next/cache";

// Server action for adding a new user
export async function addUser(formData) {
  const rawData = Object.fromEntries(formData.entries());

  // Validate user data against schema
  const userValidate = userSchema.safeParse(rawData);

  if (!userValidate.success) {
    const errors = formatZodErrors(userValidate.error);
    return {
      success: false,
      message: "داده‌های ورودی معتبر نیستند",
      errors: errors,
    };
  }

  const validatedData = userValidate.data;

  const data = await createUser(validatedData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  // Revalidate the users page to reflect changes
  revalidatePath(`/admin/users`);
  return data;
}

// Server action for editing a user's role
export async function editUserRole(formData) {
  const rawData = Object.fromEntries(formData.entries());

  // Validate role data against profile update schema
  const userValidate = profileUpdateSchema.safeParse(rawData);

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
  const data = await updateUserRole(params);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  // Revalidate the users page to reflect changes
  revalidatePath(`/admin/users`);

  return data;
}

// Server action for deleting a user
export async function removeUser(formData) {
  const rawData = Object.fromEntries(formData.entries());
  const data = await deleteUser(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }

  // Revalidate the users page to reflect changes
  revalidatePath(`/admin/users`);

  return {
    success: true,
    data,
  };
}
