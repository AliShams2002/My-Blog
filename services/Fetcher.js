const { cookies } = require("next/headers");

export const serverFetcher = async (url, option = {}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      ...option,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const data = await res.json();
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
export const clientFetcher = async (url, option = {}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      ...option,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMessage =
        data?.message || `خطا در درخواست: ${response.status}`;
      const error = new Error(errorMessage);
      error.message = errorMessage;
      throw error;
    }
    return data;
  } catch (error) {
    throw {
      message: error.message || "خطا در برقراری ارتباط با سرور",
    };
  }
};
