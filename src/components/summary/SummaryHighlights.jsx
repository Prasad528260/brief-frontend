import { Sparkles } from 'lucide-react';

function SummaryHighlights({ highlights }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Key Highlights
        </h3>
      </div>

      <div className="space-y-4">
        {highlights.map((highlight, index) => (
          <div 
            key={index} 
            className="relative bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-blue-500/30 transition-all group"
          >
            {/* Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-violet-600 rounded-l-lg"></div>
            
            {/* Number Badge */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {index + 1}
            </div>

            {/* Content */}
            <div className="ml-2">
              <p className="text-sm text-gray-200 leading-relaxed mb-2">
                {highlight.text}
              </p>
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-zinc-800"></div>
                <p className="text-xs text-gray-500 font-medium">
                  {highlight.author}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SummaryHighlights;