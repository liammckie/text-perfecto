
// Function to count words in text
export const countWords = (text: string): number => {
  return text.split(/\s+/).filter(word => word.length > 0).length;
};

// Function to count characters in text
export const countCharacters = (text: string): number => {
  return text.length;
};

// Function to estimate reading time (in minutes)
export const estimateReadingTime = (text: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const words = countWords(text);
  return Math.ceil(words / wordsPerMinute);
};

// Function to get text statistics
export const getTextStatistics = (text: string) => {
  return {
    words: countWords(text),
    characters: countCharacters(text),
    readingTime: estimateReadingTime(text),
  };
};
