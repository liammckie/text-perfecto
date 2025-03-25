
import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  handlePaste: () => void;
  handleUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  enableLineBreaks?: boolean;
  setEnableLineBreaks?: (enabled: boolean) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  text,
  setText,
  handlePaste,
  handleUploadClick,
  fileInputRef,
  handleFileUpload,
  enableLineBreaks = true,
  setEnableLineBreaks
}) => {
  return (
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
      
      {setEnableLineBreaks && (
        <div className="flex items-center gap-2">
          <Checkbox 
            id="enable-line-breaks" 
            checked={enableLineBreaks}
            onCheckedChange={(checked) => setEnableLineBreaks(checked === true)}
          />
          <label 
            htmlFor="enable-line-breaks" 
            className="text-sm cursor-pointer"
          >
            Auto-format paragraphs and line breaks
          </label>
        </div>
      )}
    </div>
  );
};

export default TextInput;
