import { Loader2 } from "lucide-react";

export default function Processing() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">Processing Document</h3>
      <p className="text-sm text-gray-400">Analyzing and generating summary...</p>
    </div>
  );
}
