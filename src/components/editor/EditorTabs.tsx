
import React from 'react';
import { cn } from '@/lib/utils';

interface EditorTabsProps {
  activeTab: 'input' | 'output';
  setActiveTab: (tab: 'input' | 'output') => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default EditorTabs;
