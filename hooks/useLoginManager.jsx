"use client";
import { useState, useTransition, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { loginAction } from "@/app/login/_partials/action";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/AuthValidation";
import { useRouter } from "next/navigation";

// Centralized toast message configuration
const TOAST_MESSAGES = {
  loginSuccess: "عملیات ورود با موفقیت انجام شد",
  error: "خطا در عملیات",
};

export function useLoginManager() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    clearErrors,
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { user, isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Converts server-side errors to react-hook-form field errors
  const handleErrors = (errors = null) => {
    if (errors && Object.keys(errors).length > 0) {
      clearErrors();

      Object.keys(errors).forEach((fieldName) => {
        if (fieldName !== "_form") {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName],
          });
        }
      });
    }
  };

  // Handles login form submission
  const handleSubmitForm = useCallback(async (formData) => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        form.append(key, value);
      }
    });
    startTransition(async () => {
      setIsLoadingState(true);
      const response = await loginAction(form);
      if (response.success) {
        const { data } = response;
        // Update auth context with user data and token
        login({ userData: data.user, accessToken: data.token });
        toast.success(TOAST_MESSAGES.loginSuccess);
        setIsLoadingState(false);
        router.push("admin/dashboard");
      } else {
        handleErrors(response.errors);
        setIsLoadingState(false);
        toast.error(response.data.data.message || TOAST_MESSAGES.error);
      }
    });
  }, []);

  return {
    handleSubmit: handleSubmit(handleSubmitForm),
    isPending,
    register,
    isSubmitting,
    errors,
    user,
    isAuthenticated,
    isLoading,
    router,
  };
}
