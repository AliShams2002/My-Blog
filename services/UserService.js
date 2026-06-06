import { serverFetcher } from "./Fetcher";

export const getAllUsers = async () => {
  const data = await serverFetcher("/api/auth/users");
  return data;
};
