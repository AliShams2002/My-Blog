import { z } from "zod";

// Username validation rules
export const userNameValidation = z
  .string()
  .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد")
  .max(16, "نام کاربری باید حداکثر 16 کاراکتر باشد");

// Password validation rules
export const passwordValidation = z
  .string()
  .min(6, "رمز عبوز حداقل 6 کاراکتر است")
  .max(12, "رمز عبور حداکثر 12 کاراکتر است");

// Login form validation schema
export const loginSchema = z.object({
  username: userNameValidation,
  password: passwordValidation,
});
