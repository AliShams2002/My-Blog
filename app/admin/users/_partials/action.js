"use server";

import { createUser, deleteUser, updateUserRole } from "@/services/UserService";
import { revalidatePath } from "next/cache";

export async function addUser(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await createUser(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/admin/users`);

  return {
    success: true,
    data,
  };
}
export async function editUserRole(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const data = await updateUserRole(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/admin/users`);

  return {
    success: true,
    data,
  };
}
export async function removeUser(formData) {
  const rawData = Object.fromEntries(formData.entries());
  console.log(rawData)
  const data = await deleteUser(rawData);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  revalidatePath(`/admin/users`);

  return {
    success: true,
    data,
  };
}
