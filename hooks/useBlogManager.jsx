"use client";

import {
  addBlog,
  editBlog,
  removeBlog,
} from "@/app/admin/blogs/_partials/action";
import { confirmModal } from "@/utils/confirmModal";
import { blogSchema } from "@/utils/FormValidation";
import { useState, useTransition, useCallback } from "react";
import toast from "react-hot-toast";

const TOAST_MESSAGES = {
  addSuccess: "مقاله با موفقیت اضافه شد",
  editSuccess: "مقاله با موفقیت ویرایش شد",
  deleteSuccess: "مقاله با موفقیت حذف شد",
  error: "خطا در عملیات",
};

export function useBlogManager(initialBlogs) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    selectedBlog: null,
    isLoading: false,
    serverErrors: {},
  });
  const [isPending, startTransition] = useTransition();

  const openModal = useCallback((mode, blog = null) => {
    setModalState({
      isOpen: true,
      mode,
      selectedBlog: blog,
      isLoading: false,
      serverErrors: {},
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
      isLoading: false,
      selectedBlog: null,
      serverErrors: {},
    }));
  }, []);

  const handleAdd = useCallback(() => openModal("add"), [openModal]);
  const handleEdit = useCallback(
    (blog) => openModal("edit", blog),
    [openModal],
  );

  const handleDelete = useCallback(async (id) => {
    const confirmed = await confirmModal(
      "آیا از حذف این مقاله مطمئن هستید؟",
      "حذف",
      "انصراف",
    );

    if (!confirmed.isConfirmed) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);

      const response = await removeBlog(formData);

      if (response.success) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        toast.success(TOAST_MESSAGES.deleteSuccess);
      } else {
        toast.error(response.error || TOAST_MESSAGES.error);
      }
    });
  }, []);

  const handleSubmit = useCallback(
    async (formData) => {
      const { mode, selectedBlog } = modalState;
      const isAddMode = mode === "add";

      setModalState((prev) => ({ ...prev, isLoading: true, serverErrors: {} }));

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      if (!isAddMode && selectedBlog?.id) {
        form.append("id", selectedBlog.id);
      }

      startTransition(async () => {
        const response = isAddMode ? await addBlog(form) : await editBlog(form);
        if (response.success) {
          const { data } = response;
          setBlogs((prev) =>
            isAddMode
              ? [...prev, data]
              : prev.map((blog) =>
                  blog.id === selectedBlog?.id ? data : blog,
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
    [modalState.mode, modalState.selectedBlog, closeModal],
  );

  return {
    blogs,
    modalState,
    isPending,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
    blogSchema,
  };
}
