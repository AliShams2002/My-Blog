"use client";
import React from "react";
import FormModal from "@/components/admin/FormModal";
import Card from "./Card";
import { useCategoryManager } from "@/hooks/useCategoryManager";
import Header from "./Header";

const CategoriesClient = ({ categories: initialCategories }) => {
  // Initialize category management hook with initial data
  const {
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
  } = useCategoryManager(initialCategories);

  // Form fields for adding/editing categories
  const categoryFields = [
    {
      name: "title",
      label: "عنوان دسته بندی",
      type: "text",
      required: true,
      placeholder: "عنوان دسته بندی را وارد کنید",
    },
    {
      name: "description",
      label: "توضیحات",
      type: "textarea",
      required: true,
      rows: 4,
      placeholder: "توضیحات دسته بندی را وارد کنید",
    },
  ];

  return (
    <>
      <div className="space-y-4">
        {/* Header with search and add button */}
        <Header
          handleAdd={handleAdd}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />

        {/* Cards grid displaying filtered categories */}
        <Card
          categories={filteredCategories}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      {/* Modal for adding or editing categories */}
      <FormModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalState.mode}
        title={
          modalState.mode === "add"
            ? "افزودن دسته بندی جدید"
            : "ویرایش دسته بندی"
        }
        initialData={modalState.selectedCategory || {}}
        fields={categoryFields}
        isLoading={modalState.isLoading}
        serverErrors={modalState.serverErrors}
        schema={categorieSchema}
      />
    </>
  );
};

export default CategoriesClient;
