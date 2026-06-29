"use server";
import { loginUser } from "@/services/UserService";
import { loginSchema } from "@/utils/AuthValidation";
import { formatZodErrors } from "@/utils/formatZodErrors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  const rawData = Object.fromEntries(formData.entries());

  //   const userValidate = loginSchema.safeParse(rawData);

  //   console.log(userValidate);
  //   if (!userValidate.success) {
  //     const errors = formatZodErrors(userValidate.error);
  //     return {
  //       success: false,
  //       message: "داده‌های ورودی معتبر نیستند",
  //       errors: errors,
  //     };
  //   }
  //   const validatedData = userValidate.data;
  //   console.log(validatedData);
  const data = await loginUser(rawData);
  console.log(data);
  if (!data.success) {
    return {
      success: false,
      error: data.message,
    };
  }
  const token = data.data.token;
  const user = JSON.stringify(data.data.user);
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 روز
    path: "/",
  });

  cookieStore.set("user", user, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 روز
    path: "/",
  });

  return data;
}

export async function getAuthCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const user = cookieStore.get("user");
  return { success: true, token, user };
}

export async function handleDeleteCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  return { success: true };
}
