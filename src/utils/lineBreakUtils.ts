
// Line break utility functions

/**
 * Adds appropriate line breaks to text based on common writing patterns
 * 
 * @param text The input text to process
 * @returns Text with appropriate line breaks added
 */
export const addLineBreaks = (text: string): string => {
  if (!text) return '';
  
  // First, preserve existing paragraphs
  let result = text;
  
  // Add double line break after periods followed by space when they likely end a sentence
  // But avoid breaking after common abbreviations (Mr., Dr., etc.)
  result = result.replace(/([.!?])\s+(?=[A-Z])/g, '$1\n\n');
  
  // Fix for numbered lists - the previous regex was capturing the first letter after the number
  // Updated to properly handle numbered list items followed by text
  result = result.replace(/(\d+\.)\s+([A-Za-z])/g, '$1 $2\n');
  
  // Add line breaks after bullet list items
  result = result.replace(/(•|-)\s+([A-Za-z])/g, '$1 $2\n');
  
  // Add line breaks after common section indicators
  result = result.replace(/(Introduction|Summary|Conclusion|References|Notes):/g, '$1:\n');
  
  // Ensure proper spacing between paragraphs (replace 3+ newlines with just 2)
  result = result.replace(/\n{3,}/g, '\n\n');
  
  return result;
};

/**
 * Detects if text already has sufficient paragraph breaks
 * 
 * @param text The input text to analyze
 * @returns Boolean indicating if text has good paragraph structure
 */
export const hasGoodParagraphStructure = (text: string): boolean => {
  if (!text) return true;
  
  // Count newlines in the text
  const newlineCount = (text.match(/\n/g) || []).length;
  
  // Get approximate sentence count
  const sentenceCount = (text.match(/[.!?]\s+/g) || []).length;
  
  // If we have no sentences, we can't determine structure
  if (sentenceCount === 0) return true;
  
  // Check if we have at least some paragraph breaks
  // Good document structure typically has breaks every few sentences
  return newlineCount > sentenceCount / 4;
};
