import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

export default function Navbar() {
  const {user} = useSelector((state) => state.user);
  return (
    <nav className="relative bg-zinc-950 border-b border-zinc-900 h-16 px-6 flex items-center overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan"></div>
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-violet-600/20 to-transparent animate-scan-delayed"></div>
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-blue-500/5 to-transparent animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-violet-600/5 to-transparent animate-pulse-slow"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      {/* Left: Logo */}
      <div className="relative flex items-center gap-3 z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <h1 className="text-white font-bold text-lg tracking-tight">
          Brief AI
        </h1>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Right: Premium */}
      {user && user?.plan !== "premium" ? (
        <Link
          to="/premium"
          className="relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold
               bg-gradient-to-r from-yellow-400 to-orange-500 text-black
               hover:from-yellow-300 hover:to-orange-400 transition"
      >
        ✨ Premium
      </Link>
      ) : null}
    </nav>
  );
}
