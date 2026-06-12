import { serverFetcher } from "./Fetcher";

export const getAllUsers = async () => {
  const data = await serverFetcher("/api/auth/users");
  return data;
};
export const createUser = async (params) => {
  try {
    const data = await serverFetcher("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(params),
    });
    return data;
  } catch (error) {
    return error;
  }
};
export const updateUserRole = async (params) => {
  const { id } = params;
  try {
    const data = await serverFetcher(`/api/auth/users/${id}/role`, {
      method: "PUT",
      body: JSON.stringify(params),
    });
    return data;
  } catch (error) {
    return error;
  }
};
export const deleteUser = async (params) => {
  const { id } = params;
  try {
    const data = await serverFetcher(`/api/auth/users/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    return error;
  }
};
