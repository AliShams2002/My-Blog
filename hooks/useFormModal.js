// components/ui/FormModal/useFormModal.js
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const getEmptyFormData = (fieldsArray) => {
  const emptyData = {};
  fieldsArray.forEach((field) => {
    emptyData[field.name] = "";
  });
  return emptyData;
};

export const useFormModal = ({
  mode = "add",
  initialData = {},
  fields = [],
  schema = null,
  onSubmit,
  onClose,
  isOpen,
  // ✅ اضافه کردن props جدید برای خطاهای سرور
  serverErrors: initialServerErrors = {},
  serverMessage: initialServerMessage = "",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
    setError,
    clearErrors,
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: mode === "edit" ? initialData : getEmptyFormData(fields),
    mode: "onChange",
  });

  // ✅ تبدیل خطاهای سرور به خطاهای react-hook-form
  useEffect(() => {
    if (initialServerErrors && Object.keys(initialServerErrors).length > 0) {
      // پاک کردن خطاهای قبلی
      clearErrors();

      // تنظیم خطاهای جدید
      Object.keys(initialServerErrors).forEach((fieldName) => {
        if (fieldName !== "_form") {
          setError(fieldName, {
            type: "server",
            message: initialServerErrors[fieldName],
          });
        }
      });
    }
  }, [initialServerErrors, setError, clearErrors]);

  // Reset فرم هنگام باز/بسته شدن
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        reset(initialData);
      } else {
        reset(getEmptyFormData(fields));
      }

      // ✅ پاک کردن خطاها هنگام باز شدن فرم
      clearErrors();
    }
  }, [isOpen, mode, initialData, fields, reset, clearErrors]);

  // مدیریت تغییرات فایل (تبدیل به base64)
  const handleFileChange = (name, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(name, reader.result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    } else {
      setValue(name, "", { shouldValidate: true });
    }
  };

  // مدیریت تغییرات معمولی
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files?.[0]) {
      handleFileChange(name, files[0]);
    } else {
      setValue(name, value, { shouldValidate: true });
    }

    // ✅ پاک کردن خطای سرور برای این فیلد هنگام تغییر
    if (initialServerErrors[name]) {
      clearErrors(name);
    }
  };

  // submit فرم
  const onFormSubmit = async (data) => {
    try {
      // ✅ پاک کردن خطاهای قبلی قبل از submit
      clearErrors();

      const result = await onSubmit(data);

      if (result?.success) {
        reset();
        onClose?.();
        return { success: true };
      }

      // ❌ اگر خطا از سمت سرور برگشت
      if (result?.errors) {
        // تنظیم خطاهای سرور در فرم
        Object.keys(result.errors).forEach((fieldName) => {
          if (fieldName !== "_form") {
            setError(fieldName, {
              type: "server",
              message: result.errors[fieldName],
            });
          }
        });

        return { success: false, errors: result.errors };
      }

      return { success: false, error: result?.error || "خطا در ارسال فرم" };
    } catch (error) {
      console.error("Submit error:", error);
      return { success: false, error };
    }
  };

  // گرفتن مقدار یک فیلد
  const getFieldValue = (name) => watch(name);

  // تنظیم مقدار یک فیلد
  const setFieldValue = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

  // ✅ تابع برای دریافت خطای یک فیلد (ترکیب کلاینت و سرور)
  const getFieldError = (fieldName) => {
    return errors[fieldName]?.message || null;
  };

  // ✅ تابع برای بررسی وجود خطا در یک فیلد
  const hasFieldError = (fieldName) => {
    return !!errors[fieldName];
  };

  return {
    // فرم states
    formData: watch(),
    errors,
    isSubmitting,
    isValid,

    // فرم handlers
    handleSubmit: handleSubmit(onFormSubmit),
    handleChange,
    handleFileChange,

    // فرم utilities
    register,
    setError,
    clearErrors,
    setFieldValue,
    getFieldValue,
    reset,

    // ✅ توابع جدید برای مدیریت خطاها
    getFieldError,
    hasFieldError,

    // status
    isEditMode: mode === "edit",

    // ✅ خطاهای سرور (برای نمایش در UI)
    serverErrors: initialServerErrors,
    serverMessage: initialServerMessage,
  };
};
