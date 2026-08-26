import { clientFetcher, serverFetcher } from "./Fetcher";

// Fetch all comments
export const getAllComments = async () => {
  try {
    const result = await clientFetcher("/api/comments");
    if (!result.success) {
      console.error("Error retrieving comments:", result.error);
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
    console.error("Unexpected error in getAllComments:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در دریافت نظرات",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Fetch comments by blog/article ID
export const getCommentsByBlogId = async (blogId) => {
  try {
    const result = await clientFetcher(`/api/articles/${blogId}/comments`);
    if (!result.success) {
      console.error(
        "Error retrieving comments for each article:",
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
    console.error("Unexpected error in getCommentsByBlogId:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در دریافت نظرات هر مقاله",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Create a new comment
export const createComment = async (params) => {
  try {
    const result = await serverFetcher("/api/comments", {
      method: "POST",
      body: JSON.stringify(params),
    });
    if (!result.success) {
      console.error("Error adding comment:", result.error);
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
    console.error("Unexpected error in createComment:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در افزودن نظر",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Update an existing comment
export const updateComment = async (params) => {
  try {
    const result = await serverFetcher(`/api/comments/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    if (!result.success) {
      console.error("Error editing comment:", result.error);
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
    console.error("Unexpected error in updateComment:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در ویرایش نظر",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Delete a comment by ID
export const deleteComment = async (params) => {
  try {
    const { id } = params;
    const result = await serverFetcher(`/api/comments/${id}`, {
      method: "DELETE",
    });
    if (!result.success) {
      console.error("Error deleting comment:", result.error);
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
    console.error("Unexpected error in deleteComment:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در حذف نظر",
        type: "SERVER_ERROR",
      },
    };
  }
};
