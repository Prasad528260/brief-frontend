import React from "react";
import { Zap } from "lucide-react";

const Logo = ({heading, paragraph}) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-11 h-11 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg mb-4 shadow-lg shadow-blue-500/20">
          <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
          {heading}
        </h1>
        <p className="text-gray-400 text-sm">{paragraph}</p>
      </div>
    </>
  );
};

export default Logo;
