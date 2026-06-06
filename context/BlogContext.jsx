"use client";
import getblogNameById from "@/utils/blogsHelper";
import { createContext, useContext } from "react";

const BlogContext = createContext(null);

export default function BlogsProvider({ blogsData, children }) {
  const getAllBlogsdata = () => {
    return blogsData;
  };

  const getBlogName = (id) => {
    if (!id) return;
    return getblogNameById(blogsData, id);
  };

  return (
    <BlogContext.Provider
      value={{
        getAllBlogsdata,
        getBlogName,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => {
  return useContext(BlogContext);
};
