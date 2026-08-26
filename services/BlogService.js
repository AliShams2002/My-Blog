import { clientFetcher, serverFetcher } from "./Fetcher";

// Fetch all blogs
export const getAllBlogs = async () => {
  try {
    const result = await clientFetcher("/api/articles");
    if (!result.success) {
      console.error("Error fetching blogs:", result.error);
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
    console.error("Unexpected error in getAllBlogs:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در دریافت مقالات",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Fetch a single blog by ID
export const getBlogById = async (id) => {
  try {
    const result = await clientFetcher(`/api/articles/${id}`);
    if (!result.success) {
      console.error("Error fetching blog:", result.error);
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
    console.error("Unexpected error in getBlogById:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در دریافت مقاله",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Create a new blog
export const createBlog = async (params) => {
  const formData = new FormData();

  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const result = await serverFetcher("/api/articles/with-image", {
      method: "POST",
      body: formData,
    });
    if (!result.success) {
      console.error("Error creating new blog:", result.error);
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
    console.error("Unexpected error in createBlog:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در ساخت مقاله جدید",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Update an existing blog
export const updateBlog = async (params) => {
  const formData = new FormData();

  Object.entries(params.data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const result = await serverFetcher(
      `/api/articles/${params.id}/with-image`,
      {
        method: "PUT",
        body: formData,
      },
    );
    if (!result.success) {
      console.error("Error editing the blog:", result.error);
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
    console.error("Unexpected error in updateBlog:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در ویرایش مقاله",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Delete a blog by ID
export const deleteBlog = async (params) => {
  try {
    const { id } = params;
    const result = await serverFetcher(`/api/articles/${id}`, {
      method: "DELETE",
    });
    if (!result.success) {
      console.error("Error deleting the blog:", result.error);
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
    console.error("Unexpected error in deleteBlog:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در حذف مقاله",
        type: "SERVER_ERROR",
      },
    };
  }
};
