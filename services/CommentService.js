import { serverFetcher } from "./Fetcher";

export const getAllComments = async () => {
  const data = await serverFetcher("/api/comments");
  return data;
};

export const getCommentsByBlogId = async (blogId) => {
  const data = await serverFetcher(`/api/articles/${blogId}/comments`);
  return data;
};

export const postComment = async (params) => {
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
