export default function getCategoryNameById(categoriesData, id) {
  const { title } = categoriesData.find((c) => c.id == id);
  return title;
}
