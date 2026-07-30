"use client";

import {
  addCategory,
  editCategory,
  removeCategory,
} from "@/app/admin/categories/_partials/action";
import { confirmModal } from "@/utils/confirmModal";
import { handelSearch } from "@/utils/searchLib";
import {
  useState,
  useTransition,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { useDebounce } from "./useDebound";
import { categorieSchema } from "@/utils/FormValidation";

// Centralized toast message configuration
const TOAST_MESSAGES = {
  addSuccess: "دسته بندی با موفقیت اضافه شد",
  editSuccess: "دسته بندی با موفقیت ویرایش شد",
  deleteSuccess: "دسته بندی با موفقیت حذف شد",
  error: "خطا در عملیات",
};

export function useCategoryManager(initialCategories) {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 800);
  const [isLoading, setIsLoading] = useState(false);
  // Manages modal state including open/close, mode, selected category, loading, and server errors
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    selectedCategory: null,
    isLoading: false,
    serverErrors: {},
  });
  const [isPending, startTransition] = useTransition();

  // Opens the modal with specified mode and optional category data for editing
  const openModal = useCallback((mode, category = null) => {
    setModalState({
      isOpen: true,
      mode,
      selectedCategory: category,
      isLoading: false,
      serverErrors: {},
    });
  }, []);

  // Closes the modal and resets its state
  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
      isLoading: false,
      serverErrors: {},
    }));
  }, []);

  const handleAdd = useCallback(() => openModal("add"), [openModal]);
  const handleEdit = useCallback(
    (category) => openModal("edit", category),
    [openModal],
  );

  // Simulates loading state during search operations
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [debouncedSearch]);

  // Filters categories based on search term
  const filteredCategories = useMemo(() => {
    if (!debouncedSearch) return categories;
    const dataFiltered = handelSearch(categories, searchTerm);
    return dataFiltered;
  }, [categories, searchTerm, debouncedSearch]);

  // Handles category deletion with confirmation dialog
  const handleDelete = useCallback(async (id) => {
    const confirmed = await confirmModal(
      "آیا از حذف این دسته بندی مطمئن هستید؟",
      "حذف",
      "انصراف",
    );

    if (!confirmed.isConfirmed) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);

      const response = await removeCategory(formData);

      if (response.success) {
        setCategories((prev) => prev.filter((category) => category.id !== id));
        toast.success(TOAST_MESSAGES.deleteSuccess);
      } else {
        toast.error(response.error || TOAST_MESSAGES.error);
      }
    });
  }, []);

  // Handles both add and edit form submissions
  const handleSubmit = useCallback(
    async (formData) => {
      const { mode, selectedCategory } = modalState;
      const isAddMode = mode === "add";

      setModalState((prev) => ({ ...prev, isLoading: true }));

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      // Append the category ID for edit operations
      if (!isAddMode && selectedCategory?.id) {
        form.append("id", selectedCategory.id);
      }

      startTransition(async () => {
        const response = isAddMode
          ? await addCategory(form)
          : await editCategory(form);

        if (response.success) {
          const { data } = response;
          // Update the categories list based on operation type
          setCategories((prev) =>
            isAddMode
              ? [...prev, data]
              : prev.map((category) =>
                  category.id === selectedCategory?.id ? data : category,
                ),
          );
          toast.success(
            isAddMode ? TOAST_MESSAGES.addSuccess : TOAST_MESSAGES.editSuccess,
          );
          closeModal();
        } else {
          setModalState((prev) => ({
            ...prev,
            isLoading: false,
            serverErrors: response.errors || {},
          }));
          toast.error(response.message || TOAST_MESSAGES.error);
        }
      });
    },
    [modalState.mode, modalState.selectedCategory, closeModal],
  );

  return {
    categories,
    setSearchTerm,
    searchTerm,
    filteredCategories,
    modalState,
    isPending,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
    isLoading,
    categorieSchema,
  };
}
