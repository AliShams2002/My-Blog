import toast from "react-hot-toast";
import { clientFetcher } from "./Fetcher";

export const loginService = async (params, login) => {
  try {
    const data = await clientFetcher(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    toast.success("عملیات ورود با موفقیت انجام شد");
    login({ userData: data.user, accessToken: data.token });
  } catch (error) {
    console.log(error);
    const serverMassage = error.response?.data?.message;
    toast.error(serverMassage);
  }
};
