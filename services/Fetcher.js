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

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      return {
        success: false,
        error: {
          message: "سرور پاسخ HTML برگرداند",
          statusCode: res.status,
          type: "SERVER_ERROR",
        },
      };
    }

    if (res.status === 204) {
      return { success: true, data: null };
    }
    const data = await res.json();

    // Handle non-OK responses with appropriate error types
    if (!res.ok) {
      let errorType = "SERVER_ERROR";
      if (res.status === 403) errorType = "UNAUTHORIZED";
      else if (res.status === 401) errorType = "FORBIDDEN";
      else if (res.status === 404) errorType = "NOT_FOUND";

      return {
        success: false,
        error: {
          message: data?.message || `خطا در درخواست: ${res.status}`,
          statusCode: res.status,
          type: errorType,
          data: data,
        },
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Server fetcher error:", error);

    let errorType = "NETWORK_ERROR";
    let message = "خطا در ارتباط با سرور";

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      message = "خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.";
    }

    return {
      success: false,
      error: {
        message: message,
        statusCode: "NETWORK_ERROR",
        type: errorType,
        originalError: error,
      },
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

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      return {
        success: false,
        error: {
          message: "سرور پاسخ HTML برگرداند",
          statusCode: res.status,
          type: "SERVER_ERROR",
        },
      };
    }

    if (res.status === 204) {
      return { success: true, data: null };
    }

    const data = await res.json();

    // Handle non-OK responses with appropriate error types
    if (!res.ok) {
      let errorType = "SERVER_ERROR";
      if (res.status === 403) errorType = "UNAUTHORIZED";
      else if (res.status === 401) errorType = "FORBIDDEN";
      else if (res.status === 404) errorType = "NOT_FOUND";

      return {
        success: false,
        error: {
          message: data?.message || `خطا در درخواست: ${res.status}`,
          statusCode: res.status,
          type: errorType,
          data: data,
        },
      };
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Client fetcher error:", error);

    return {
      success: false,
      error: {
        message: "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.",
        statusCode: "NETWORK_ERROR",
        type: "NETWORK_ERROR",
        originalError: error,
      },
    };
  }
};
