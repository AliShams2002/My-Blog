"use client";
import ReusableTable from "@/components/admin/ReusableTable";
import React from "react";
import FormModal from "@/components/admin/FormModal";
import { useBlogManager } from "@/hooks/useBlogManager";

const BlogClient = ({ blogs: initialBlogs, categories }) => {
  const {
    blogs,
    modalState,
    isPending,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal,
  } = useBlogManager(initialBlogs);
  const columns = [
    { key: "image", label: "تصویر" },
    { key: "title", label: "عنوان" },
    { key: "author", label: "نویسنده" },
    { key: "categoryId", label: "دسته بندی" },
    { key: "createdAt", label: "تاریخ" },
  ];

  const blogFields = [
    {
      name: "title",
      label: "عنوان مقاله",
      type: "text",
      required: true,
      placeholder: "عنوان مقاله را وارد کنید",
    },
    {
      name: "content",
      label: "محتوا",
      type: "textarea",
      required: true,
      rows: 6,
      placeholder: "متن مقاله را وارد کنید",
    },
    {
      name: "author",
      label: "نویسنده",
      type: "text",
      required: true,
      placeholder: "نام نویسنده",
    },
    {
      name: "categoryId",
      label: "دسته بندی",
      type: "select",
      required: true,
      options: categories.map((c) => ({ value: c.id, label: c.title })),
    },
    {
      name: "image",
      label: "تصویر شاخص",
      type: "file",
      accept: "image/*",
      hint: "فرمت‌های مجاز: jpg, png, webp",
    },
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        data={blogs}
        selectBoxData={categories}
        title="مديريت مقالات"
        searchPlaceholder="جستجو براساس عنوان و نویسنده"
        onAdd={handleAdd}
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
        initialData={modalState.selectedBlog || {}}
        fields={blogFields}
        isLoading={modalState.isPending}
      />
    </>
  );
};

export default BlogClient;
