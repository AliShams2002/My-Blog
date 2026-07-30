import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useDebounce } from "./useDebound";
import { useCategories } from "@/context/CategoriesContext";
import { useBlog } from "@/context/BlogContext";
import { handelSearch } from "@/utils/searchLib";
import { formatToSolarDate } from "@/utils/FormatDate";
import Image from "next/image";

export function useTableManager(data, itemsPerPage) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const debouncedFilter = useDebounce(activeFilter, 300);
  const { getCategoryName } = useCategories();
  const { getBlogName } = useBlog();
  const isFirstRender = useRef(true);

  // ✅ فیلتر کردن داده‌ها
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (!debouncedSearch && debouncedFilter === "all") return data;
    return handelSearch(data, debouncedSearch, debouncedFilter);
  }, [data, debouncedSearch, debouncedFilter]);

  // ✅ محاسبه صفحه‌بندی
  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage) || 1;
  }, [filteredData.length, itemsPerPage]);

  // ✅ محاسبه startIndex و paginatedData
  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, startIndex, itemsPerPage]);

  // ✅ مدیریت لودینگ
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedFilter, debouncedSearch]);

  // ✅ تنظیم صفحه هنگام تغییر داده
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const maxPage = Math.ceil(data.length / itemsPerPage) || 1;
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [data.length, itemsPerPage, currentPage]);

  // Navigate to a specific page with bounds checking
  const goToPage = useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages],
  );

  // Renders cell content based on column configuration
  const renderCell = useCallback(
    (item, column) => {
      const value = item[column.key];

      if (column.render) {
        return column.render(value, item);
      }

      if (column.key === "image") {
        return (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${value}`}
            className="rounded-xl"
            width={50}
            height={50}
            quality={80}
            alt=""
          />
        );
      }

      if (column.key === "createdAt") {
        return formatToSolarDate(value);
      }

      if (column.key === "categoryId") {
        return getCategoryName(value);
      }

      if (column.key === "articleId") {
        return getBlogName(value);
      }

      return value;
    },
    [getCategoryName, getBlogName],
  );

  return {
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    currentPage,
    setCurrentPage,
    isLoading,
    filteredData,
    paginatedData,
    totalPages,
    startIndex,
    goToPage,
    renderCell,
  };
}
