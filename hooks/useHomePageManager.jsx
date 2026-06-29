//useHpmePageManager.jsx
"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useDebounce } from "./useDebound";
import { useCategories } from "@/context/CategoriesContext";
import { handelSearch } from "@/utils/searchLib";

export function useHomePageManager(initialBlogs) {
  const [pageState, setPageState] = useState({
    featuredBlog: initialBlogs.at(-1),
    searchTerm: "",
    activeFilter: "all",
  });

  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(pageState.searchTerm, 1000);
  const debouncedFilter = useDebounce(pageState.activeFilter, 800);

  const { getCategoriesWithAll, getCategoryName } = useCategories();
  const catsWithAllOption = getCategoriesWithAll();

  useEffect(() => {
    if (pageState.searchTerm !== "" || pageState.activeFilter !== "all") {
      setIsLoading(true);
    }
  }, [pageState.searchTerm, pageState.activeFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [debouncedSearch, debouncedFilter]);

  // استفاده از useMemo برای محاسبه داده‌ها (همون کد خودتون)
  const handleFilter = useMemo(() => {
    if (!debouncedFilter) return initialBlogs;

    if (pageState.searchTerm === "" && pageState.activeFilter === "all") {
      return initialBlogs;
    }

    const dataFiltered = handelSearch(
      initialBlogs,
      pageState.searchTerm,
      pageState.activeFilter,
    );

    return dataFiltered;
  }, [
    initialBlogs,
    debouncedFilter,
    debouncedSearch,
    pageState.searchTerm,
    pageState.activeFilter,
  ]);

  // به‌روزرسانی featuredBlog
  useEffect(() => {
    if (pageState.searchTerm === "" && pageState.activeFilter === "all") {
      setPageState((prev) => ({
        ...prev,
        featuredBlog: initialBlogs.at(-1),
      }));
    } else {
      setPageState((prev) => ({
        ...prev,
        featuredBlog: null,
      }));
    }
  }, [debouncedSearch, debouncedFilter, initialBlogs]);

  const handleSearchFilter = useCallback((value) => {
    setPageState((prev) => ({
      ...prev,
      searchTerm: value,
      featuredBlog: null,
    }));
  }, []);

  const handleActiveFilter = useCallback((value) => {
    setPageState((prev) => ({
      ...prev,
      activeFilter: value,
      featuredBlog: null,
    }));
  }, []);

  return {
    catsWithAllOption,
    handleSearchFilter,
    handleActiveFilter,
    handleFilter,
    pageState,
    getCategoryName,
    isLoading,
  };
}
