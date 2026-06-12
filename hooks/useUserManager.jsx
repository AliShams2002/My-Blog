"use client";

import {
  addUser,
  editUserRole,
  removeUser,
} from "@/app/admin/users/_partials/action";
import { confirmModal } from "@/utils/confirmModal";
import { useState, useTransition, useCallback } from "react";
import toast from "react-hot-toast";

const TOAST_MESSAGES = {
  addSuccess: "کاربر با موفقیت اضافه شد",
  editSuccess: "کاربر با موفقیت ویرایش شد",
  deleteSuccess: "کاربر با موفقیت حذف شد",
  error: "خطا در عملیات",
};

export function useUserManager(initialUsers) {
  const [users, setUsers] = useState(initialUsers);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    selectedUser: null,
    isLoading: false,
  });
  const [isPending, startTransition] = useTransition();

  const openModal = useCallback((mode, user = null) => {
    setModalState({
      isOpen: true,
      mode,
      selectedUser: user,
      isLoading: false,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false, isLoading: false }));
  }, []);

  const handleAdd = useCallback(() => openModal("add"), [openModal]);
  const handleEdit = useCallback(
    (user) => openModal("edit", user),
    [openModal],
  );

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
      console.log(response);
      if (response.success) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        toast.success(TOAST_MESSAGES.deleteSuccess);
      } else {
        toast.error(response.error || TOAST_MESSAGES.error);
      }
    });
  }, []);

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

      if (!isAddMode && selectedUser?.id) {
        form.append("id", selectedUser.id);
      }

      startTransition(async () => {
        const response = isAddMode
          ? await addUser(form)
          : await editUserRole(form);
        if (response.success) {
          const { data } = response.data;
          setUsers((prev) =>
            isAddMode
              ? [...prev, data.user]
              : prev.map((user) =>
                  user.id === selectedUser?.id ? data.user : user,
                ),
          );
          toast.success(
            isAddMode ? TOAST_MESSAGES.addSuccess : TOAST_MESSAGES.editSuccess,
          );
          closeModal();
        } else {
          setModalState((prev) => ({ ...prev, isLoading: false }));
          toast.error(response.error || TOAST_MESSAGES.error);
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
  };
}
