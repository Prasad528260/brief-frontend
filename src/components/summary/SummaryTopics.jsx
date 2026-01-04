import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function SummaryTopics({ topics }) {
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (index) => {
    setExpandedTopics(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const colors = [
    { border: 'border-blue-500/50', bg: 'bg-blue-500/10', dot: 'bg-blue-500', glow: 'shadow-blue-500/20' },
    { border: 'border-violet-500/50', bg: 'bg-violet-500/10', dot: 'bg-violet-500', glow: 'shadow-violet-500/20' },
    { border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
    { border: 'border-amber-500/50', bg: 'bg-amber-500/10', dot: 'bg-amber-500', glow: 'shadow-amber-500/20' },
    { border: 'border-cyan-500/50', bg: 'bg-cyan-500/10', dot: 'bg-cyan-500', glow: 'shadow-cyan-500/20' },
    { border: 'border-pink-500/50', bg: 'bg-pink-500/10', dot: 'bg-pink-500', glow: 'shadow-pink-500/20' },
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Key Topics & Discussions
        </h3>
        <span className="ml-auto text-xs text-gray-500 font-medium">
          {topics.length} {topics.length === 1 ? 'Topic' : 'Topics'}
        </span>
      </div>
      
      <div className="space-y-3">
        {topics.map((item, index) => {
          const color = colors[index % colors.length];
          const isExpanded = expandedTopics[index];
          
          return (
            <div
              key={index}
              className={`relative bg-zinc-900/50 border ${color.border} rounded-lg overflow-hidden transition-all ${color.glow} shadow-lg`}
            >
              {/* Topic Header - Clickable */}
              <button
                onClick={() => toggleTopic(index)}
                className="w-full text-left p-4 hover:bg-zinc-900/70 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 ${color.dot} rounded-full`}></span>
                    <span className="text-sm font-semibold text-gray-200">
                      {item.topic}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Discussion Content - Expandable */}
              {isExpanded && (
                <div className={`px-4 pb-4 pt-2 border-t border-zinc-800 ${color.bg}`}>
                  <div className="flex gap-2">
                    <div className={`w-0.5 ${color.dot} rounded-full flex-shrink-0`}></div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.discussion}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
