import React from "react";
import { getAllComments } from "@/services/CommentService";
import { getAllCategories } from "@/services/CategorieService";
import CommentClient from "./_partials/CommentClient";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const Page = async () => {
  // Fetch comments and categories in parallel for better performance
  const [{ data: comments }, { data: categories }] = await Promise.all([
    getAllComments(),
    getAllCategories(),
  ]);

  return (
    <>
      <CommentClient comments={comments} categories={categories} />
    </>
  );
};

export default Page;
