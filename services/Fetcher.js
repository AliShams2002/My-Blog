const { cookies } = require("next/headers");

// Server-side fetcher with authentication token from cookies
export const serverFetcher = async (url, option = {}) => {
  try {
    const isFormData = option.body instanceof FormData;
    // Get token from cookies for server-side requests
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      ...option,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...option.headers,
      },
    });
    const data = await res.json();

    // Handle non-OK responses
    if (!res.ok) {
      const errorMessage =
        data?.message || `خطا در درخواست: ${response.status}`;
      const error = new Error(errorMessage);
      error.message = errorMessage;
      throw error;
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    throw {
      success: false,
      message: error.message || "خطا در برقراری ارتباط با سرور",
    };
  }
};

// Client-side fetcher without authentication
export const clientFetcher = async (url, option = {}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      ...option,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    // Handle non-OK responses
    if (!res.ok) {
      const errorMessage =
        data?.message || `خطا در درخواست: ${response.status}`;
      const error = new Error(errorMessage);
      error.message = errorMessage;
      throw error;
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    throw {
      success: false,
      message: error.message || "خطا در برقراری ارتباط با سرور",
    };
  }
};
