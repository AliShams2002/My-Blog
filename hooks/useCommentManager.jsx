"use client";

import {
  editComment,
  removeComment,
} from "@/app/admin/comments/_partials/action";
import { confirmModal } from "@/utils/confirmModal";
import { commentSchema } from "@/utils/FormValidation";
import { recentData } from "@/utils/recentHelpers";
import { useState, useTransition, useCallback } from "react";
import toast from "react-hot-toast";

// Centralized toast message configuration
const TOAST_MESSAGES = {
  editSuccess: "نظر با موفقیت ویرایش شد",
  deleteSuccess: "نظر با موفقیت حذف شد",
  error: "خطا در عملیات",
};

export function useCommentManager(initialComments) {
  const [comments, setComments] = useState(recentData(initialComments));
  // Manages modal state - only edit mode is available for comments
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "edit",
    selectedComment: null,
    isLoading: false,
    serverErrors: {},
  });
  const [isPending, startTransition] = useTransition();

  // Opens the edit modal with the selected comment data
  const openEditModal = useCallback((comment) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      selectedComment: comment,
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

  const handleEdit = useCallback(
    (comment) => {
      openEditModal(comment);
    },
    [openEditModal],
  );

  // Handles comment deletion with confirmation dialog
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

  // Handles comment edit form submission
  const handleSubmit = useCallback(
    async (formData) => {
      const { selectedComment } = modalState;

      // Validate that a comment ID exists
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

      // Append the comment ID for the edit operation
      form.append("id", selectedComment.id);

      startTransition(async () => {
        const response = await editComment(form);
        if (response.success) {
          const { data } = response;
          // Update the specific comment in the list
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
