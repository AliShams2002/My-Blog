"use client";
import ReusableTable from "@/components/admin/ReusableTable";
import React from "react";
import FormModal from "@/components/admin/FormModal";
import { useCommentManager } from "@/hooks/useCommentManager";

const CommentClient = ({ comments: initialComments, categories }) => {
  const {
    comments,
    modalState,
    isPending,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
  } = useCommentManager(initialComments);
  const columns = [
    { key: "author", label: "نویسنده" },
    { key: "content", label: "متن نظر" },
    { key: "articleId", label: "مقاله" },
    { key: "createdAt", label: "تاریخ" },
  ];

  const commentFields = [
    {
      name: "content",
      label: "محتوا",
      type: "textarea",
      required: true,
      rows: 6,
      placeholder: "متن مقاله را وارد کنید",
    },
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        data={comments}
        title="مديريت مقالات"
        searchPlaceholder="جستجو براساس عنوان, نویسنده و متن نظر"
        onView
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isPending}
      />
      <FormModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalState.mode}
        title={modalState.mode === "add" ? "افزودن مقاله جدید" : "ویرایش مقاله"}
        initialData={modalState.selectedComment || {}}
        fields={commentFields}
        isLoading={modalState.isPending}
      />
    </>
  );
};

export default CommentClient;
