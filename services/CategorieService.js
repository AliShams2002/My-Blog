import { clientFetcher } from "./Fetcher";

export const getAllCategories = async () => {
  const data = await clientFetcher("/api/categories");
  return data;
};
