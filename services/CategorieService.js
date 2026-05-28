import {  serverFetcher } from "./Fetcher";

export const getAllCategories = async () => {
  const data = await serverFetcher("/api/categories");
  return data;
};
