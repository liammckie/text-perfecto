
// Document utility functions

// Function to export text as a plain text file
export const exportAsText = (text: string, filename: string = 'document.txt'): void => {
  const element = document.createElement('a');
  const file = new Blob([text], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// Function to export text as HTML to preserve formatting
export const exportAsHTML = (text: string, filename: string = 'document.html'): void => {
  // Create a simple HTML wrapper to maintain whitespace formatting
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Formatted Document</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      white-space: pre-wrap;
      padding: 20px;
    }
  </style>
</head>
<body>
${text}
</body>
</html>`;

  const element = document.createElement('a');
  const file = new Blob([htmlContent], {type: 'text/html'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// In a real implementation, these functions would handle more complex document operations
// like parsing Word or PDF documents and preserving formatting

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
