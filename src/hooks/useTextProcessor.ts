
import { useState, useEffect } from 'react';
import { checkSpelling } from '@/utils/spellcheck';

export function useTextProcessor() {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (text) {
      const timer = setTimeout(() => {
        processText(text);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setCorrectedText('');
    }
  }, [text]);

  const processText = async (inputText: string) => {
    setIsProcessing(true);
    try {
      // In a real implementation, this would call an actual API
      const result = await checkSpelling(inputText);
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
    processText
  };
}
