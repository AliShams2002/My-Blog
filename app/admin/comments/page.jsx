import React from "react";
import { getAllComments } from "@/services/CommentService";
import { getAllCategories } from "@/services/CategorieService";
import CommentClient from "./_partials/CommentClient";

export const dynamic = "force-dynamic";
const Page = async () => {
  const comments = await getAllComments();
  const categories = await getAllCategories();

  return (
    <>
      <CommentClient comments={comments} categories={categories} />
    </>
  );
};

export default Page;
