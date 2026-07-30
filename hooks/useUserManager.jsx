"use client";

import {
  addUser,
  editUserRole,
  removeUser,
} from "@/app/admin/users/_partials/action";
import { confirmModal } from "@/utils/confirmModal";
import { profileUpdateSchema, userSchema } from "@/utils/FormValidation";
import { recentData } from "@/utils/recentHelpers";
import { useState, useTransition, useCallback } from "react";
import toast from "react-hot-toast";

// Centralized toast message configuration
const TOAST_MESSAGES = {
  addSuccess: "کاربر با موفقیت اضافه شد",
  editSuccess: "کاربر با موفقیت ویرایش شد",
  deleteSuccess: "کاربر با موفقیت حذف شد",
  error: "خطا در عملیات",
};

export function useUserManager(initialUsers) {
  const [users, setUsers] = useState(recentData(initialUsers));
  // Manages modal state including open/close, mode, selected user, loading, and server errors
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    selectedUser: null,
    isLoading: false,
    serverErrors: {},
  });
  const [isPending, startTransition] = useTransition();

  // Opens the modal with specified mode and optional user data for editing
  const openModal = useCallback((mode, user = null) => {
    setModalState({
      isOpen: true,
      mode,
      selectedUser: user,
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
    (user) => openModal("edit", user),
    [openModal],
  );

  // Handles user deletion with confirmation dialog
  const handleDelete = useCallback(async (id) => {
    const confirmed = await confirmModal(
      "آیا از حذف این کاربر مطمئن هستید؟",
      "حذف",
      "انصراف",
    );

    if (!confirmed.isConfirmed) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);

      const response = await removeUser(formData);
      if (response.success) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        toast.success(TOAST_MESSAGES.deleteSuccess);
      } else {
        toast.error(response.error || TOAST_MESSAGES.error);
      }
    });
  }, []);

  // Handles both add and edit form submissions
  const handleSubmit = useCallback(
    async (formData) => {
      const { mode, selectedUser } = modalState;
      const isAddMode = mode === "add";

      setModalState((prev) => ({ ...prev, isLoading: true }));

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      // Append the user ID for edit operations
      if (!isAddMode && selectedUser?.id) {
        form.append("id", selectedUser.id);
      }

      startTransition(async () => {
        const response = isAddMode
          ? await addUser(form)
          : await editUserRole(form);
        if (response.success) {
          const { user } = response.data;
          // Update the users list based on operation type
          setUsers((prev) =>
            isAddMode
              ? [user, ...prev]
              : prev.map((prevUser) =>
                  prevUser.id === selectedUser?.id ? user : prevUser,
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
    [modalState.mode, modalState.selectedUser, closeModal],
  );

  return {
    users,
    modalState,
    isPending,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
    userSchema,
    profileUpdateSchema,
  };
}
