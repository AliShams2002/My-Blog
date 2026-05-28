const { cookies } = require("next/headers");

export const serverFetcher = async (url, option = {}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`http://localhost:4004${url}`, {
    ...option,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در درخواست");
  }
  return data;
};
export const clientFetcher = async (url, option = {}) => {
  const res = await fetch(`http://localhost:4004${url}`, {
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
