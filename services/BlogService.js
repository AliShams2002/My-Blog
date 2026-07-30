import { clientFetcher, serverFetcher } from "./Fetcher";

// Fetch all blogs
export const getAllBlogs = async () => {
  const data = await clientFetcher("/api/articles");
  return data;
};

// Fetch a single blog by ID
export const getBlogById = async (id) => {
  const data = await clientFetcher(`/api/articles/${id}`);
  return data;
};

// Create a new blog
export const createBlog = async (params) => {
  const formData = new FormData();

  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const data = await serverFetcher("/api/articles/with-image", {
      method: "POST",
      body: formData,
    });
    return data;
  } catch (error) {
    const serverMassage = error.response?.data?.message;
    return serverMassage;
  }
};

// Update an existing blog
export const updateBlog = async (params) => {
  const formData = new FormData();

  Object.entries(params.data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const data = await serverFetcher(`/api/articles/${params.id}/with-image`, {
      method: "PUT",
      body: formData,
    });
    return data;
  } catch (error) {
    const serverMassage = error.response?.data?.message;
    return serverMassage;
  }
};

// Delete a blog by ID
export const deleteBlog = async (params) => {
  const { id } = params;
  try {
    const data = await serverFetcher(`/api/articles/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    return error;
  }
};
