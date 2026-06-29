"use client";

import {
  editComment,
  removeComment,
} from "@/app/admin/comments/_partials/action";
import { confirmModal } from "@/utils/confirmModal";
import { commentSchema } from "@/utils/FormValidation";
import { useState, useTransition, useCallback } from "react";
import toast from "react-hot-toast";

const TOAST_MESSAGES = {
  editSuccess: "نظر با موفقیت ویرایش شد",
  deleteSuccess: "نظر با موفقیت حذف شد",
  error: "خطا در عملیات",
};

export function useCommentManager(initialComments) {
  const [comments, setComments] = useState(initialComments);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "edit", // فقط ویرایش داریم
    selectedComment: null,
    isLoading: false,
    serverErrors: {},
  });
  const [isPending, startTransition] = useTransition();

  // باز کردن مودال ویرایش
  const openEditModal = useCallback((comment) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      selectedComment: comment,
      isLoading: false,
      serverErrors: {},
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
      isLoading: false,
      serverErrors: {},
    }));
  }, []);

  const handleEdit = useCallback(
    (comment) => {
      openEditModal(comment);
    },
    [openEditModal],
  );

  const handleDelete = useCallback(async (id) => {
    const confirmed = await confirmModal(
      "آیا از حذف این نظر مطمئن هستید؟",
      "حذف",
      "انصراف",
    );

    if (!confirmed.isConfirmed) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);

      const response = await removeComment(formData);

      if (response.success) {
        setComments((prev) => prev.filter((comment) => comment.id !== id));
        toast.success(TOAST_MESSAGES.deleteSuccess);
      } else {
        toast.error(response.error || TOAST_MESSAGES.error);
      }
    });
  }, []);

  const handleSubmit = useCallback(
    async (formData) => {
      const { selectedComment } = modalState;

      if (!selectedComment?.id) {
        toast.error("شناسه نظر یافت نشد");
        return;
      }

      setModalState((prev) => ({ ...prev, isLoading: true, serverErrors: {} }));

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      form.append("id", selectedComment.id);

      startTransition(async () => {
        const response = await editComment(form);
        if (response.success) {
          const { data } = response;
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === selectedComment.id ? data : comment,
            ),
          );
          toast.success(TOAST_MESSAGES.editSuccess);
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
    [modalState.selectedComment, closeModal],
  );

  return {
    comments,
    modalState,
    isPending,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
    commentSchema,
  };
}
