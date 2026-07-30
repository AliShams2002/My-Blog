export const recentData = (data) => {
  if (!data || data.length === 0) return [];

  // کپی، مرتب‌سازی و گرفتن ۳ تای اول
  return [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
};
