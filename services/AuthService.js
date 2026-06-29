import toast from "react-hot-toast";
import { clientFetcher } from "./Fetcher";

export const loginUser = async (params, login) => {
  try {
    const data = await clientFetcher(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    toast.success("عملیات ورود با موفقیت انجام شد");
    login({ userData: data.user, accessToken: data.token });
  } catch (error) {
    toast.error(error.message);
  }
};
