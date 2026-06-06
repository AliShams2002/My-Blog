const { cookies } = require("next/headers");

export const serverFetcher = async (url, option = {}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    ...option,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  // console.log(await res.json());
  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error(data.message || "خطا در درخواست");
  }
  return data;
};
export const clientFetcher = async (url, option = {}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    ...option,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در درخواست");
  }
  return data;
};
