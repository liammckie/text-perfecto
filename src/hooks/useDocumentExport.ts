
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  exportAsText, 
  exportAsHTML, 
  exportAsDocx, 
  parseWordDocument 
} from '@/utils/documentUtils';

export function useDocumentExport() {
  const [exportFormat, setExportFormat] = useState('text');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = async (correctedText: string) => {
    if (!correctedText) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No text to export"
      });
      return;
    }
    
    try {
      if (exportFormat === 'html') {
        exportAsHTML(correctedText, 'corrected-document.html');
        toast({
          title: "Success",
          description: "Document exported as HTML"
        });
      } else if (exportFormat === 'docx') {
        await exportAsDocx(correctedText, 'corrected-document.docx');
        toast({
          title: "Success",
          description: "Document exported as Word"
        });
      } else {
        exportAsText(correctedText, 'corrected-document.txt');
        toast({
          title: "Success",
          description: "Document exported as text"
        });
      }
    } catch (error) {
      console.error('Error exporting document:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to export the document"
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, setText: (text: string) => void, setIsProcessing: (isProcessing: boolean) => void) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      if (file.name.endsWith('.docx')) {
        const content = await parseWordDocument(file);
        setText(content);
        toast({
          title: "Success",
          description: "Word document uploaded successfully"
        });
      } else {
        // Handle text files
        const content = await file.text();
        setText(content);
        toast({
          title: "Success",
          description: "Text file uploaded successfully"
        });
      }
    } catch (error) {
      console.error('Error reading file:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to read the uploaded file"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePaste = (setText: (text: string) => void) => {
    navigator.clipboard.readText()
      .then(clipText => {
        setText(clipText);
      })
      .catch(err => {
        console.error('Failed to read clipboard:', err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to read from clipboard"
        });
      });
  };

  return {
    exportFormat,
    setExportFormat,
    fileInputRef,
    handleExport,
    handleFileUpload,
    handleUploadClick,
    handlePaste
  };
}
