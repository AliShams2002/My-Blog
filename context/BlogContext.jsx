"use client";
import { createContext, useContext } from "react";

const BlogContext = createContext(null);

export default function BlogsProvider({ blogsData, children }) {
  // Return all blogs
  const getAllBlogsdata = () => {
    return blogsData;
  };

  // Return data about an blog by ID
  const getBlogName = (id) => {
    if (!id) return;
    const { title } = blogsData.find((c) => c.id == id);
    return title;
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

// Custom hook to use blog context
export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within an AppProvider");
  }
  return context;
};
