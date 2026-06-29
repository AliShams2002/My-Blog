import { clientFetcher, serverFetcher } from "./Fetcher";

export const getAllBlogs = async () => {
  const data = await clientFetcher("/api/articles");
  return data;
};

export const getBlogById = async (id) => {
  const data = await clientFetcher(`/api/articles/${id}`);
  return data;
};

export const createBlog = async (params) => {
  try {
    const data = await serverFetcher("/api/articles", {
      method: "POST",
      body: JSON.stringify(params),
    });
    return data;
  } catch (error) {
    const serverMassage = error.response?.data?.message;
    return serverMassage;
  }
};
export const updateBlog = async (params) => {
  try {
    const data = await serverFetcher(`/api/articles/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return data;
  } catch (error) {
    const serverMassage = error.response?.data?.message;
    return serverMassage;
  }
};
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
