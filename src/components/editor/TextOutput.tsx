
import React from 'react';
import { cn } from '@/lib/utils';

interface TextOutputProps {
  correctedText: string;
  isProcessing: boolean;
  exportFormat: string;
  setExportFormat: (format: string) => void;
  handleExport: () => void;
}

const TextOutput: React.FC<TextOutputProps> = ({
  correctedText,
  isProcessing,
  exportFormat,
  setExportFormat,
  handleExport
}) => {
  return (
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
    </div>
  );
};

export default TextOutput;
