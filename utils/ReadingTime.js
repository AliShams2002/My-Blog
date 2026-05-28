export default function ReadingTime(content) {
  const text = content.replace(/<[^>]*>/g, " ").trim();

  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  const readingTime = Math.ceil(wordCount / 200);

  const timeText =
    readingTime < 1 ? "کمتر از یک دقیقه" : `${readingTime} دقیقه`;
  return timeText;
}
