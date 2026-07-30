"use server";
import { loginUser } from "@/services/UserService";
import { loginSchema } from "@/utils/AuthValidation";
import { formatZodErrors } from "@/utils/formatZodErrors";
import { cookies } from "next/headers";

export async function loginAction(formData) {
  // Get form data
  const rawData = Object.fromEntries(formData.entries());

  // Server-side data validation
  const userValidate = loginSchema.safeParse(rawData);

  if (!userValidate.success) {
    const errors = formatZodErrors(userValidate.error);
    return {
      success: false,
      message: "داده‌های ورودی معتبر نیستند",
      errors: errors,
    };
  }
  const { data: validatedData } = userValidate;

  // Post data to the backend
  const data = await loginUser(validatedData);

  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  const token = data.data.token;
  const user = JSON.stringify(data.data.user);
  const cookieStore = await cookies();

  // Token storage
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 day
    path: "/",
  });

  // User storage
  cookieStore.set("user", user, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 day
    path: "/",
  });

  return data;
}

export async function getAuthCookies() {
  const cookieStore = await cookies();
  // Get coockies
  const token = cookieStore.get("token")?.value;
  const user = cookieStore.get("user")?.value;

  return {
    success: true,
    token: token || null,
    user: user ? JSON.parse(user) : null,
  };
}

export async function handleDeleteCookies() {
  const cookieStore = await cookies();
  // Remove coockies
  cookieStore.delete("token");
  cookieStore.delete("user");
  return { success: true };
}
