import { clientFetcher } from "./Fetcher";

export const getAllBlogs = async () => {
  const data = await clientFetcher("/api/articles");
  return data;
};

export const getBlogById = async (id) => {
  const data = await clientFetcher(`/api/articles/${id}`);
  return data;
};
