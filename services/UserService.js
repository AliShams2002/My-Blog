import { clientFetcher, serverFetcher } from "./Fetcher";

// User login - uses client fetcher
export const loginUser = async (params) => {
  try {
    const data = await clientFetcher(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    return data;
  } catch (error) {
    return error;
  }
};

// Fetch all users - uses server fetcher with authentication
export const getAllUsers = async () => {
  const data = await serverFetcher("/api/auth/users");
  return data;
};

// Create a new user (register)
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

// Update a user's role
export const updateUserRole = async (params) => {
  try {
    const data = await serverFetcher(`/api/auth/users/${params.id}/role`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return data;
  } catch (error) {
    return error;
  }
};

// Delete a user by ID
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
