
import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Home, TriangleAlert, RefreshCcw } from "lucide-react";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05050a] relative overflow-hidden font-sans p-6">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-2xl z-10 flex flex-col items-center text-center">
        
        {/* Error Header Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[11px] font-black uppercase tracking-[0.3em] animate-pulse">
            <TriangleAlert size={14} /> System Error Detected
          </div>
        </div>

        {/* Big Bold 404 - Now using standard flow to avoid overlapping */}
        <div className="relative mb-2">
          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
            404
          </h1>
        </div>

        {/* Error Description Box */}
        <div className="mb-12 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-indigo-500 tracking-tighter uppercase italic">
            Page Not Found
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base font-medium leading-relaxed">
            The resource you are looking for has been moved, deleted, or does not exist in our secure database.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-slate-300 font-bold hover:bg-white/10 hover:text-white transition-all group min-w-[200px] justify-center"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black shadow-[0_15px_40px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all group min-w-[200px] justify-center"
          >
            <Home size={20} />
            Return Home
          </button>
        </div>

        {/* Technical Footer */}
        <div className="mt-20 flex flex-col items-center gap-4 opacity-50">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">
            <RefreshCcw size={12} className="animate-spin-slow" />
            Error Code: 0x404_NULL_GATEWAY
          </div>
        </div>

      </div>

      {/* Grid Background Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </div>
  );
}