import { clientFetcher, serverFetcher } from "./Fetcher";

export const getAllComments = async () => {
  const data = await clientFetcher("/api/comments");
  return data;
};

export const getCommentsByBlogId = async (blogId) => {
  const data = await clientFetcher(`/api/articles/${blogId}/comments`);
  return data;
};

export const createComment = async (params) => {
  try {
    const data = await serverFetcher("/api/comments", {
      method: "POST",
      body: JSON.stringify(params),
    });
    return data;
  } catch (error) {
    const serverMassage = error.response?.data?.message;
    return serverMassage;
  }
};

export const updateComment = async (params) => {
  try {
    const data = await serverFetcher(`/api/comments/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteComment = async (params) => {
  const { id } = params;
  try {
    const data = await serverFetcher(`/api/comments/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    return error;
  }
};
