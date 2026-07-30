"use client";
import { createContext, useContext } from "react";

const CategoriesContext = createContext(null);

export default function CategoriesProvider({ categoriesData, children }) {
  // Return all categories
  const getAllCategories = () => {
    return categoriesData;
  };

  // Return all categories and add an "All" category
  const getCategoriesWithAll = () => {
    const allCategoryOption = { id: "all", title: "همه" };
    return [allCategoryOption, ...categoriesData];
  };

  // Return data about an category by ID
  const getCategoryName = (id) => {
    if (!id) return;
    const { title } = categoriesData.find((c) => c.id == id);
    return title;
  };

  return (
    <CategoriesContext.Provider
      value={{
        getAllCategories,
        getCategoriesWithAll,
        getCategoryName,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = () => {
  return useContext(CategoriesContext);
};
