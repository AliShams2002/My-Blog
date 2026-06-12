import { clientFetcher, serverFetcher } from "./Fetcher";

export const getAllCategories = async () => {
  const data = await clientFetcher("/api/categories");
  return data;
};
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

export const updateCategory = async (params) => {
  const { id } = params;
  try {
    const data = await serverFetcher(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    });
    return data;
  } catch (error) {
    const serverMassage = error.response?.data?.message;
    return serverMassage;
  }
};
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
export const getBlogRelatedOfCategory = async (id) => {
  const data = await clientFetcher(`/api/categories/${id}/articles`);
  return data;
};
