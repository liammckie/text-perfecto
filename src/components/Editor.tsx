
import React, { useState, useEffect, useRef } from 'react';
import { checkSpelling } from '@/utils/spellcheck';
import { cn } from '@/lib/utils';
import { exportAsText, exportAsHTML, exportAsDocx, parseWordDocument } from '@/utils/documentUtils';
import { useToast } from '@/hooks/use-toast';

const Editor = () => {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const [exportFormat, setExportFormat] = useState('text');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handlePaste = () => {
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleExport = async () => {
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

  return (
    <section id="editor" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Editor
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Magic
          </h2>
          <p className="text-lg text-foreground/80">
            Paste your text or upload a Word document to see how our tool transforms your document.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl shadow-xl overflow-hidden">
            <div className="flex border-b border-border">
              <button 
                onClick={() => setActiveTab('input')}
                className={cn(
                  "flex-1 py-4 px-6 text-center font-medium transition-colors",
                  activeTab === 'input' 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-foreground/60 hover:text-foreground/80"
                )}
              >
                Input
              </button>
              <button 
                onClick={() => setActiveTab('output')}
                className={cn(
                  "flex-1 py-4 px-6 text-center font-medium transition-colors",
                  activeTab === 'output' 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-foreground/60 hover:text-foreground/80"
                )}
              >
                Corrected Output
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'input' ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Your Text</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={handlePaste}
                        className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
                      >
                        Paste from Clipboard
                      </button>
                      <button 
                        onClick={handleUploadClick}
                        className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
                      >
                        Upload Document
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".txt,.docx"
                        className="hidden"
                      />
                    </div>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type, paste, or upload your text here..."
                    className="w-full h-64 p-4 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 whitespace-pre-wrap"
                    style={{ whiteSpace: 'pre-wrap' }}
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setActiveTab('output')}
                      disabled={!text || isProcessing}
                      className={cn(
                        "px-5 py-2.5 rounded-lg bg-primary text-primary-foreground transition-all",
                        (text && !isProcessing) 
                          ? "hover:bg-primary/90" 
                          : "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isProcessing ? 'Processing...' : 'Check & Correct'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Corrected Text</h3>
                    <div className="flex items-center gap-2">
                      <select
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-background border border-border text-sm"
                        disabled={!correctedText}
                      >
                        <option value="text">Plain Text (.txt)</option>
                        <option value="html">Formatted HTML (.html)</option>
                        <option value="docx">Word Document (.docx)</option>
                      </select>
                      <button 
                        onClick={handleExport}
                        disabled={!correctedText}
                        className={cn(
                          "px-4 py-2 rounded-lg bg-secondary text-secondary-foreground transition-colors text-sm",
                          correctedText ? "hover:bg-secondary/80" : "opacity-50 cursor-not-allowed"
                        )}
                      >
                        Export Document
                      </button>
                    </div>
                  </div>
                  <div 
                    className="w-full h-64 p-4 rounded-xl border border-border bg-background/50 overflow-auto"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {correctedText ? (
                      <pre className="whitespace-pre-wrap font-sans">{correctedText}</pre>
                    ) : (
                      <div className="h-full flex items-center justify-center text-foreground/50">
                        {isProcessing ? 
                          <p className="animate-pulse">Processing your text...</p> : 
                          <p>Corrected text will appear here</p>
                        }
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setActiveTab('input')}
                      className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      Back to Input
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editor;
