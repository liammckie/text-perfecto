// Document utility functions
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

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

// Function to export text as a Word document
export const exportAsDocx = async (text: string, filename: string = 'document.docx'): Promise<void> => {
  // Split the text by paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  
  // Create a new document
  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs.map(para => 
        new Paragraph({
          children: [new TextRun(para.trim())],
          spacing: {
            after: 200, // add space after paragraph
          }
        })
      )
    }]
  });

  // Generate the document as a blob
  const blob = await Packer.toBlob(doc);
  
  // Save the document
  saveAs(blob, filename);
};

// Function to parse Word document
export const parseWordDocument = async (file: File): Promise<string> => {
  // This is a simplified implementation
  // In a real app, you would use mammoth.js or similar to extract text with formatting
  
  // For now, we'll just read the text content to keep it simple
  const text = await file.text();
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return text;
};

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
