
import { useState, useEffect } from 'react';
import { checkSpelling } from '@/utils/spellcheck';
import { addLineBreaks, hasGoodParagraphStructure } from '@/utils/lineBreakUtils';

export function useTextProcessor() {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [enableLineBreaks, setEnableLineBreaks] = useState(true);

  useEffect(() => {
    if (text) {
      const timer = setTimeout(() => {
        processText(text);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setCorrectedText('');
    }
  }, [text, enableLineBreaks]);

  const processText = async (inputText: string) => {
    setIsProcessing(true);
    try {
      // First run spell check
      let result = await checkSpelling(inputText);
      
      // Then add line breaks if enabled and needed
      if (enableLineBreaks && !hasGoodParagraphStructure(result)) {
        result = addLineBreaks(result);
      }
      
      setCorrectedText(result);
    } catch (error) {
      console.error('Error processing text:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    text,
    setText,
    correctedText,
    setCorrectedText,
    isProcessing,
    setIsProcessing,
    processText,
    enableLineBreaks,
    setEnableLineBreaks
  };
}
