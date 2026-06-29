"use client";
import ReusableTable from "@/components/admin/ReusableTable";
import React from "react";
import FormModal from "@/components/admin/FormModal";
import { useUserManager } from "@/hooks/useUserManager";

const UserClient = ({ users: initialUsers }) => {
  const {
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
  } = useUserManager(initialUsers);
  const columns = [
    { key: "username", label: "نام کاربری" },
    { key: "email", label: "ایمیل" },
    { key: "role", label: "نقش" },
    { key: "createdAt", label: "تاریخ ایجاد" },
  ];

  const userRols = [
    { id: "admin", value: "admin", title: "مدیر", label: "مدیر" },
    { id: "user", value: "user", title: "کاربر", label: "کاربر" },
  ];

  const addUserFields = [
    {
      name: "username",
      label: "نام کاربری",
      type: "text",
      required: true,
      placeholder: "نام کاربری را وارد کنید",
    },
    {
      name: "email",
      label: "ایمیل",
      type: "email",
      required: true,
      rows: 6,
      placeholder: "ایمیل را وارد کنید",
    },
    {
      name: "password",
      label: "رمز عبور",
      type: "password",
      required: true,
      placeholder: "رمز عبور را وارد کنید",
    },
    {
      name: "role",
      label: "نقش",
      type: "select",
      required: true,
      options: userRols,
    },
  ];

  const editUserFields = [
    {
      name: "role",
      label: "نقش",
      type: "select",
      required: true,
      options: userRols,
    },
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        data={users}
        selectBoxData={userRols}
        title="مديريت کاربران"
        searchPlaceholder="جستجو براساس نام کاربری و ایمیل"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isPending}
      />
      <FormModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalState.mode}
        title={
          modalState.mode === "add" ? "افزودن کاربر جدید" : "ویرایش نقش کاربر"
        }
        initialData={modalState.selectedUser || {}}
        fields={modalState.mode === "add" ? addUserFields : editUserFields}
        isLoading={modalState.isPending}
        serverErrors={modalState.serverErrors}
        schema={modalState.mode === "add" ? userSchema : profileUpdateSchema}
      />
    </>
  );
};

export default UserClient;
