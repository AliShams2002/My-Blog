import {
  getAllCategories,
  getBlogRelatedOfCategory,
} from "@/services/CategorieService";
import React from "react";
import CategoriesClient from "./_partials/CategorieClient";
import Skeleton from "@/components/admin/SkeletonLoading";

export const dynamic = "force-dynamic";
const Page = async () => {
  const { data: categories } = await getAllCategories();

  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      try {
        const { data: articles } = await getBlogRelatedOfCategory(category.id);
        return {
          ...category,
          articlesCount: articles?.length || 0,
        };
      } catch (error) {
        console.error(`Error: ${error}`);
        return { ...category, articlesCount: 0 };
      }
    }),
  );

  if (!categories) return <Skeleton type="card" />;

  return <CategoriesClient categories={categoriesWithCount} />;
};

export default Page;
