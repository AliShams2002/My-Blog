// Converts a timestamp to a Persian (Solar) date string
export const formatToSolarDate = (timeStamp) => {
  const date = new Date(timeStamp);
  return date.toLocaleDateString("fa-IR");
};
