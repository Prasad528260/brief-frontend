import { useState } from 'react';
import { Plus, Zap, Menu, X, Upload, FileText } from 'lucide-react';


export default function SummarySidebar({ summaries, onSelect, onNew, isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-zinc-900">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-sm">SummaryAI</span>
            </div>
            <button
              onClick={onNew}
              className="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3 h-3" />
              New Summary
            </button>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto p-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-2">
              History
            </p>

            {summaries.length > 0 ? (
              <div className="space-y-1">
                {summaries.map((summary) => (
                  <button
                    key={summary._id}
                    onClick={() => onSelect(summary)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-zinc-900 transition-all truncate"
                  >
                    {summary.title}
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm italic">
                No summaries yet. Click <span className="font-semibold">New Summary</span> to create one.
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-zinc-900">
            <button className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-400 hover:bg-zinc-900 hover:text-gray-300 transition-all">
              Profile Settings
            </button>
          </div>
        </>
      )}
    </>
  );
}