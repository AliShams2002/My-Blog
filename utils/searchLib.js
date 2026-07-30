// Filters data by search term and category/role filter
export const handelSearch = (data, searchTerm, activeFilter = "all") => {
  return data?.filter((item) => {
    // Check if item matches the search term across multiple fields
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if item matches the active filter (category)
    const matchesFilter =
      activeFilter === "all" ||
      (item.categoryId && item.categoryId === activeFilter) ||
      (item.role && item.role === activeFilter);
    return matchesSearch && matchesFilter;
  });
};
