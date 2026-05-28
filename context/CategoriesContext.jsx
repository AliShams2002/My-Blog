"use client";
import getCategoryNameById from "@/utils/categotyHelpers";
import { createContext, useContext } from "react";

const CategoriesContext = createContext(null);

export default function CategoriesProvider({ categoriesData, children }) {
  const getAllCategories = () => {
    return categoriesData;
  };

  const getCategoriesWithAll = () => {
    const allCategoryOption = { id: "all", title: "همه" };
    return [allCategoryOption, ...categoriesData];
  };

  const getCategoryName = (id) => {
    if (!id) return;
    return getCategoryNameById(categoriesData, id);
  };

  return (
    <CategoriesContext.Provider
      value={{ getAllCategories, getCategoriesWithAll, getCategoryName }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = () => {
  return useContext(CategoriesContext);
};
