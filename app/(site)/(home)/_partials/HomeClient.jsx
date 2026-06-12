"use client";

import React, { useEffect, useMemo, useState } from "react";
import Categories from "./Categories";
import FeaturedBlogs from "./FeaturedBlogs";
import { useCategories } from "@/context/CategoriesContext";
import SpinnerLoading from "@/components/shared/SpinnerLoading";
import { useDebounce } from "@/hooks/useDebound";
import { handelSearch } from "@/utils/searchLib";

const HomeClient = ({ data }) => {
  const { getCategoriesWithAll, getCategoryName } = useCategories();
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const debouncedFilter = useDebounce(activeFilter, 800);
  const [isLoading, setIsLoading] = useState(null);
  const [isFilterLoading, setIsFilterLoading] = useState(null);

  const catsWithAllOption = getCategoriesWithAll();

  useEffect(() => {
    setIsFilterLoading(true);
    const timer = setTimeout(() => {
      setIsFilterLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch, debouncedFilter]);

  const handleFilter = useMemo(() => {
    if (!debouncedFilter) return data;
    const dataFiltered = handelSearch(data, searchTerm, activeFilter);
    return dataFiltered;
  }, [blogs, categoriesData, debouncedFilter, debouncedSearch]);

  useEffect(() => {
    setIsLoading(true);
    setCategoriesData([]);
    setBlogs(data);
    setFeaturedBlog(data.at(-1));
    setIsLoading(false);
  }, [data]);

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
        filteredBlogs={handleFilter}
        searchTerm={searchTerm}
        blogCardLoading={isFilterLoading}
      />
    </>
  );
};

export default HomeClient;
