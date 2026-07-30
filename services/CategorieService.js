import { clientFetcher, serverFetcher } from "./Fetcher";

// Fetch all categories
export const getAllCategories = async () => {
  const data = await clientFetcher("/api/categories");
  return data;
};

// Create a new category
export const createCategory = async (params) => {
  try {
    const data = await serverFetcher("/api/categories", {
      method: "POST",
      body: JSON.stringify(params),
    });
    return data;
  } catch (error) {
    const serverMassage = error.response?.data?.message;
    return serverMassage;
  }
};

// Update an existing category
export const updateCategory = async (params) => {
  try {
    const data = await serverFetcher(`/api/categories/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return data;
  } catch (error) {
    const serverMassage = error.response?.data?.message;
    return serverMassage;
  }
};

// Delete a category by ID
export const deleteCategory = async (params) => {
  const { id } = params;
  try {
    const data = await serverFetcher(`/api/categories/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    return error;
  }
};

// Fetch all blogs related to a specific category
export const getBlogRelatedOfCategory = async (id) => {
  const data = await clientFetcher(`/api/categories/${id}/articles`);
  return data;
};
