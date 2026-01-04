import { FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function SummaryOverview({ overview }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(overview);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 to-violet-600/5 blur-3xl pointer-events-none"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Executive Overview
            </h3>
          </div>
          
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-zinc-900 transition-all"
            title="Copy overview"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        
        {/* Decorative quote mark */}
        <div className="absolute -left-2 top-12 text-6xl font-serif text-blue-500/10 select-none">
          "
        </div>
        
        <div className="relative bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-5">
          <p className="text-sm text-gray-200 leading-relaxed">
            {overview}
          </p>
          
          {/* Word count indicator */}
          <div className="mt-4 pt-3 border-t border-zinc-800/50 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {overview.split(' ').length} words • {Math.ceil(overview.split(' ').length / 200)} min read
            </span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}