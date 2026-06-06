export default function getblogNameById(blogsData, id) {
  const { title } = blogsData.find((c) => c.id == id);
  return title;
}
