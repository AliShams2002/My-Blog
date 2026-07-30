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

  // Convert server errors to react-hook-form errors
  useEffect(() => {
    if (initialServerErrors && Object.keys(initialServerErrors).length > 0) {
      clearErrors();

      // Set each server error on the corresponding form field
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

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        reset(initialData);
      } else {
        reset(getEmptyFormData(fields));
      }

      // Clear errors when form opens
      clearErrors();
    }
  }, [isOpen, mode, initialData, fields, reset, clearErrors]);

  // Handle file input changes (convert to base64)
  const handleFileChange = (name, file) => {
    setValue(name, file, {
      shouldValidate: true,
    });
  };

  // Handle regular input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files?.[0]) {
      handleFileChange(name, files[0]);
    } else {
      setValue(name, value, { shouldValidate: true });
    }

    // Clear server error for this field when user makes changes
    if (initialServerErrors[name]) {
      clearErrors(name);
    }
  };

  // Handle form submission
  const onFormSubmit = async (data) => {
    try {
      // Clear previous errors before submission
      clearErrors();

      const result = await onSubmit(data);

      if (result?.success) {
        reset();
        onClose?.();
        return { success: true };
      }

      // Handle server validation errors
      if (result?.errors) {
        // Set server errors on form fields
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

  // Get value of a specific field
  const getFieldValue = (name) => watch(name);

  // Set value of a specific field
  const setFieldValue = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

  // Get error message for a specific field (combines client and server errors)
  const getFieldError = (fieldName) => {
    return errors[fieldName]?.message || null;
  };

  // Check if a field has an error
  const hasFieldError = (fieldName) => {
    return !!errors[fieldName];
  };

  return {
    // Form states
    formData: watch(),
    errors,
    isSubmitting,
    isValid,

    // Form handlers
    handleSubmit: handleSubmit(onFormSubmit),
    handleChange,
    handleFileChange,

    // Form utilities
    register,
    setError,
    clearErrors,
    setFieldValue,
    getFieldValue,
    reset,

    // New error handling utilities
    getFieldError,
    hasFieldError,

    // status
    isEditMode: mode === "edit",

    // Server errors for UI display
    serverErrors: initialServerErrors,
    serverMessage: initialServerMessage,
  };
};
