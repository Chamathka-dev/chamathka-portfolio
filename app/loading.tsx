import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] animate-in fade-in duration-300">
      
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
        
        {/* THE FIX: scale-150 added here for the giant loader */}
        <Image 
          src="/images/mylogo.svg" 
          alt="Loading Logo" 
          width={100} 
          height={100} 
          className="relative z-10 w-20 h-20 object-contain scale-150" 
        />
        
        {/* Sleek Spinning Ring */}
        <div className="absolute inset-0 border-2 border-white/5 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>

      {/* High-end Typography */}
      <p className="text-cyan-500/50 text-[10px] uppercase tracking-[0.4em] font-bold animate-pulse">
        Initializing
      </p>
      
    </div>
  );
}