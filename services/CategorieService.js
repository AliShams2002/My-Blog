import { clientFetcher, serverFetcher } from "./Fetcher";

// Fetch all categories
export const getAllCategories = async () => {
  try {
    const result = await clientFetcher("/api/categories");
    if (!result.success) {
      console.error("Error retrieving categories:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in getAllCategories:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در دریافت دسته بندی ها",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Create a new category
export const createCategory = async (params) => {
  try {
    const result = await serverFetcher("/api/categories", {
      method: "POST",
      body: JSON.stringify(params),
    });
    if (!result.success) {
      console.error("Error creating new category:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in createCategory:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در ساخت دسته بندی جدید",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Update an existing category
export const updateCategory = async (params) => {
  try {
    const result = await serverFetcher(`/api/categories/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    if (!result.success) {
      console.error("Error editing category:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in updateCategory:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در ویرایش دسته بندی",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Delete a category by ID
export const deleteCategory = async (params) => {
  try {
    const { id } = params;
    const result = await serverFetcher(`/api/categories/${id}`, {
      method: "DELETE",
    });
    if (!result.success) {
      console.error("Error deleting category:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in deleteCategory:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در حذف دسته بندی",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Fetch all blogs related to a specific category
export const getBlogRelatedOfCategory = async (id) => {
  try {
    const result = await clientFetcher(`/api/categories/${id}/articles`);
    if (!result.success) {
      console.error(
        "Error retrieving the number of articles for each category.:",
        result.error,
      );
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in getBlogRelatedOfCategory:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در دریافت تعداد مقالات هر دسته بندی",
        type: "SERVER_ERROR",
      },
    };
  }
};
