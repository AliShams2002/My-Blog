import axios from "axios";
import toast from "react-hot-toast";

export const loginService = async (params, login) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      JSON.stringify(params),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const { data } = response;
    toast.success("عملیات ورود با موفقیت انجام شد");
    login({ userData: data.user, accessToken: data.token });
  } catch (error) {
    console.log(error);
    const serverMassage = error.response?.data?.message;
    toast.error(serverMassage);
  }
};
