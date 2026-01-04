import { Upload, FileText } from "lucide-react";

import { useState } from 'react';


// UploadBox Component
export default function UploadBox({ selectedFile, onFileSelect, onUpload, onDrop, onDragOver }) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Upload Area */}
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-xl p-12 text-center hover:border-zinc-700 transition-all"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Upload Text File</h3>
            <p className="text-sm text-gray-400 mb-4">
              Drag and drop your .txt file here, or click to browse
            </p>
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".txt"
              onChange={onFileSelect}
              className="hidden"
            />
            <span className="inline-block py-2.5 px-6 bg-zinc-900 border border-zinc-800 text-white text-sm font-semibold rounded-lg hover:border-zinc-700 transition-all">
              Choose File
            </span>
          </label>
        </div>
      </div>

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mt-6 bg-zinc-950 border border-zinc-900 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-white">{selectedFile.name}</p>
                <p className="text-xs text-gray-400">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={onUpload}
              className="py-2 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all"
            >
              Generate Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}