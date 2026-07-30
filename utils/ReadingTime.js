// Calculates estimated reading time for HTML content
export default function ReadingTime(content) {
  // Remove HTML tags and trim whitespace
  const text = content.replace(/<[^>]*>/g, " ").trim();

  // Count words by splitting on whitespace and filtering empty strings
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time (average reading speed: 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);

  const timeText =
    readingTime < 1 ? "کمتر از یک دقیقه" : `${readingTime} دقیقه`;
  return timeText;
}
