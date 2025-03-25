
import React, { useState } from 'react';
import { useTextProcessor } from '@/hooks/useTextProcessor';
import { useDocumentExport } from '@/hooks/useDocumentExport';
import { Button } from '@/components/ui/button';
import EditorTabs from './editor/EditorTabs';
import TextInput from './editor/TextInput';
import TextOutput from './editor/TextOutput';

const Editor = () => {
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
  const { 
    text, 
    setText, 
    correctedText, 
    isProcessing, 
    setIsProcessing 
  } = useTextProcessor();
  
  const {
    exportFormat,
    setExportFormat,
    fileInputRef,
    handleExport: exportDocument,
    handleFileUpload: fileUploadHandler,
    handleUploadClick,
    handlePaste: pasteHandler
  } = useDocumentExport();

  const handlePaste = () => pasteHandler(setText);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    fileUploadHandler(event, setText, setIsProcessing);
  };

  const handleExport = () => exportDocument(correctedText);

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
            <EditorTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="p-6">
              {activeTab === 'input' ? (
                <>
                  <TextInput
                    text={text}
                    setText={setText}
                    handlePaste={handlePaste}
                    handleUploadClick={handleUploadClick}
                    fileInputRef={fileInputRef}
                    handleFileUpload={handleFileUpload}
                  />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => setActiveTab('output')}
                      disabled={!text || isProcessing}
                      className="px-5 py-2.5"
                      variant={text && !isProcessing ? "default" : "secondary"}
                    >
                      {isProcessing ? 'Processing...' : 'Check & Correct'}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <TextOutput
                    correctedText={correctedText}
                    isProcessing={isProcessing}
                    exportFormat={exportFormat}
                    setExportFormat={setExportFormat}
                    handleExport={handleExport}
                  />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => setActiveTab('input')}
                      className="px-5 py-2.5"
                      variant="secondary"
                    >
                      Back to Input
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editor;
