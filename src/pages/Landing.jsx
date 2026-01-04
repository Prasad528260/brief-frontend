import { Zap, Upload, Calendar, FileText, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-grid-fade opacity-30"></div>
        
        {/* Moving Gradient Orbs */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Rotating Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-slide-right"></div>
          <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent animate-slide-left"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-slide-right-delayed"></div>
        </div>
        
        {/* Spotlight Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-blue-500/10 via-violet-600/5 to-transparent rounded-full blur-3xl animate-spotlight"></div>
        </div>
        
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-40"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full mb-6 animate-fade-in-down">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm text-gray-400">AI-Powered Chat Summarization</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Turn Chat Logs Into
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent animate-gradient">
              Clear Summaries
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in">
            Upload your chat transcripts, select date ranges, and get comprehensive AI-generated summaries instantly
          </p>

          <button onClick={()=>navigate('/login')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 mx-auto animate-fade-in hover:scale-105 hover:shadow-blue-500/40">
            Start Summarizing Free
            <ArrowRight className="w-5 h-5 animate-bounce-horizontal" />
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">
              Three simple steps to get your summary
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group animate-slide-up">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Upload className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse-number">
                  1
                </div>

                <h3 className="text-xl font-bold text-white mb-3">Upload Chat File</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Simply drag and drop your chat transcript (.txt file) or browse to select it. We'll analyze the entire conversation history.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>WhatsApp, Telegram, Discord</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Secure & private</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Calendar className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse-number" style={{animationDelay: '0.2s'}}>
                  2
                </div>

                <h3 className="text-xl font-bold text-white mb-3">Select Date Range</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Choose the specific time period from your chat history you want to summarize. Perfect for reviewing specific conversations.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-violet-500" />
                    <span>Filter by date</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-violet-500" />
                    <span>Custom time ranges</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <FileText className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse-number" style={{animationDelay: '0.4s'}}>
                  3
                </div>

                <h3 className="text-xl font-bold text-white mb-3">Get Chat Summary</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Receive a comprehensive summary with key topics discussed, important highlights, and conversation insights instantly.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Key topics extracted</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Important highlights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-600/10 blur-3xl"></div>
            <div className="relative bg-zinc-950 border border-zinc-900 rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Summarize Your Chats?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Join thousands of users who save hours reviewing chat conversations with Brief AI
              </p>
              <button onClick={()=>navigate('/login')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 mx-auto">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}