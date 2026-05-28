import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4004",
  timeout: 30000,
  timeoutErrorMessage: "زمان پاسخ بیش از 30 ثانیه طول کشید!",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Accept-Language": "fa-IR",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success === false) {
      const error = new Error(response.data.message || "خطای سرور");
      error.response = response;
      return Promise.reject(error);
    }

    return response;
  },
  (error) => {
    // مدیریت خطاهای شبکه یا سرور// مدیریت خطاهای مختلف
    if (!error.response) {
      // خطای شبکه
      // toast.error(
      //   "خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
      // );
      return Promise.reject(new Error("اتصال به سرور برقرار نیست"));
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Unauthorized - هدایت به صفحه login
        localStorage.removeItem("token");
        window.location.href =
          "/login?redirect=" + encodeURIComponent(window.location.pathname);
        "لطفاً مجدداً وارد شوید";
        break;

      case 404:
        // Not Found
        "منبع مورد نظر یافت نشد";
        break;

      case 500:
        // Server Error
        "خطای داخلی سرور. لطفاً با پشتیبانی تماس بگیرید";
        break;

      default:
        data?.message || "خطای ناشناخته";
    }

    return Promise.reject(error);
  },
);

// تابع retry برای خطاهای شبکه
const retryAxios = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && (!error.response || error.response.status >= 500)) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryAxios(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export { axiosInstance, retryAxios };
