"use client";

import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import FeaturedBlogs from "./FeaturedBlogs";
import { useCategories } from "@/context/CategoriesContext";
import SpinnerLoading from "@/components/shared/SpinnerLoading";

const HomeClient = ({ data }) => {
  const { getCategoriesWithAll, getCategoryName } = useCategories();
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(null);

  const catsWithAllOption = getCategoriesWithAll();

  useEffect(() => {
    setIsLoading(true);
    setCategoriesData([]);
    setBlogs(data);
    setFeaturedBlog(data.at(-1));
    setIsLoading(false);
  }, [data]);

  const filteredArticles = blogs.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || article.categoryId === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <SpinnerLoading width="v-8" height="h-8" />;

  return (
    <>
      {/* Advanced Section */}
      <Categories
        initialCategories={catsWithAllOption}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />

      {/* Articles Grid */}
      <FeaturedBlogs
        getCatById={getCategoryName}
        featuredBlog={featuredBlog}
        activeFilter={activeFilter}
        filteredArticles={filteredArticles}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default HomeClient;
