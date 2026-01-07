import { Zap, ArrowRight, AlertCircle, X } from "lucide-react";

export default function TokenLimitMessage({ setTokenExceeded }) {
  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setTokenExceeded(false)}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-300 hover:bg-zinc-900 rounded-lg transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gradient Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-xl mb-6">
            <AlertCircle className="w-8 h-8 text-amber-500" strokeWidth={2} />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-3">
            Token Limit Reached
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            You've used all your available tokens. Upgrade your plan to continue
            summarizing chats or wait for your tokens to reset.
          </p>

          {/* Token Display */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg mb-8">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-gray-300">
              0 tokens remaining
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => (window.location.href = "/pricing")}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
          >
            Get More Tokens
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Help Text */}
          <p className="mt-6 text-xs text-gray-500">
            Need help?{" "}
            <a
              href="/support"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
