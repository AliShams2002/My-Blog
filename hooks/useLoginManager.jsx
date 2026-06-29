"use client";
import { useState, useTransition, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { loginAction } from "@/app/login/_partials/action";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/AuthValidation";
import { useRouter } from "next/navigation";

const TOAST_MESSAGES = {
  loginSuccess: "عملیات ورود با موفقیت انجام شد",
  error: "خطا در عملیات",
};

export function useLoginManager() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { user, isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();
  const [modalState, setModalState] = useState({
    isLoading: false,
    serverErrors: {},
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmitForm = useCallback(async (formData) => {
    setModalState((prev) => ({ ...prev, isLoading: true }));

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        form.append(key, value);
      }
    });
    startTransition(async () => {
      const response = await loginAction(form);
      if (response.success) {
        const { data } = response;
        login({ userData: data.user, accessToken: data.token });
        toast.success(TOAST_MESSAGES.loginSuccess);
        router.push("admin/dashboard");
      } else {
        setModalState((prev) => ({
          ...prev,
          isLoading: false,
          serverErrors: response.errors || {},
        }));
        toast.error(response.message || TOAST_MESSAGES.error);
      }
    });
  }, []);

  return {
    modalState,
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
