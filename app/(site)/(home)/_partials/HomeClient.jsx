"use client";

import React from "react";
import Categories from "./Categories";
import FeaturedBlogs from "./FeaturedBlogs";
import { useHomePageManager } from "@/hooks/useHomePageManager";

const HomeClient = ({ data: initialBlogs }) => {
  const {
    catsWithAllOption,
    handleSearchFilter,
    handleActiveFilter,
    handleFilter,
    pageState,
    getCategoryName,
    isLoading,
  } = useHomePageManager(initialBlogs);

  return (
    <>
      {/* Advanced Section */}
      <Categories
        initialCategories={catsWithAllOption}
        setActiveFilter={handleActiveFilter}
        activeFilter={pageState.activeFilter}
        setSearchTerm={handleSearchFilter}
        searchTerm={pageState.searchTerm}
      />

      {/* Articles Grid */}
      <FeaturedBlogs
        getCatById={getCategoryName}
        featuredBlog={pageState.featuredBlog}
        activeFilter={pageState.activeFilter}
        filteredBlogs={handleFilter}
        searchTerm={pageState.searchTerm}
        isLoading={isLoading}
      />
    </>
  );
};

export default HomeClient;
