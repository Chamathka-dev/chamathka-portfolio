"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react"; 
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    // FIX 1: Added w-full and px-4 for mobile safety
    <header className="fixed top-4 md:top-8 left-0 right-0 w-full px-4 z-[100] flex justify-center pointer-events-none">
      
      {/* FIX 2: Added pointer-events-auto so clicks work on the pill, but space around it is transparent */}
      <div className="glass-panel rounded-2xl px-4 md:px-8 h-14 md:h-20 w-full max-w-5xl flex items-center justify-between border border-white/5 bg-[#0A0D14]/80 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] pointer-events-auto transition-all">
        
        {/* 1. Logo & Name */}
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 shrink group relative z-10 min-w-0">
          <span className="font-bold text-base md:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors truncate">
            chamathka<span className="text-cyan-400">.dev</span>
          </span>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300 absolute left-1/2 -translate-x-1/2">
          <Link href="#about" className="hover:text-white hover:-translate-y-0.5 transition-all">About</Link>
          <Link href="#skills" className="hover:text-white hover:-translate-y-0.5 transition-all">Tech Stack</Link>
          <Link href="#projects" className="hover:text-white hover:-translate-y-0.5 transition-all">Projects</Link>
          <Link href="#experience" className="hover:text-white hover:-translate-y-0.5 transition-all">Timeline</Link>
        </nav>

        {/* 3. CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          
          <Link href="#contact" className="hidden md:flex px-5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all text-sm font-medium">
            Contact Me
          </Link>

          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 glass-panel rounded-2xl border border-white/5 bg-[#0A0D14]/98 backdrop-blur-3xl p-6 flex flex-col gap-5 shadow-2xl animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <Link href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 border-b border-white/5 pb-2">About</Link>
          <Link href="#skills" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 border-b border-white/5 pb-2">Tech Stack</Link>
          <Link href="#projects" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 border-b border-white/5 pb-2">Projects</Link>
          <Link href="#experience" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 border-b border-white/5 pb-2">Timeline</Link>
          <Link href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-bold text-cyan-400 pt-2">Contact Me</Link>
        </div>
      )}
    </header>
  );
}