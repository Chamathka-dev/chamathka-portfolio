"use client";

import Link from "next/link";
import Image from "next/image"; 
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
    <header className="fixed top-0 inset-x-0 z-50 bg-[#07090E]/80 backdrop-blur-2xl border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between relative z-50">
        
        {/* 1. Logo & Name */}
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 md:gap-4 group shrink-0">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 shrink-0 overflow-hidden">
            
            {/* THE FIX: Added scale-150 to force the SVG to zoom in */}
            <Image 
              src="/images/mylogo.svg" 
              alt="Logo" 
              width={80} 
              height={80} 
              className="w-10 h-10 md:w-14 md:h-14 object-contain scale-150" 
            />
            
          </div>
          <span className="font-bold text-sm sm:text-base md:text-xl tracking-[0.1em] md:tracking-[0.2em] text-white group-hover:text-cyan-100 transition-colors">
            CHAMATHKA ADDARAGE
          </span>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400 tracking-wide">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#contact" className="px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:text-white hover:-translate-y-0.5 active:scale-95 hover:border-white/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            Let's Talk
          </Link>
        </nav>

        {/* 3. Mobile Navigation Controls */}
        <div className="flex items-center gap-3 sm:gap-4 md:hidden">
          <Link href="#contact" onClick={() => setIsOpen(false)} className="px-4 py-2 text-[11px] sm:text-xs font-medium rounded-full bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 active:scale-95 active:bg-white/20 transition-all shadow-sm">
            Let's Talk
          </Link>
          
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 -mr-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 pointer-events-none" /> : <Menu className="w-6 h-6 pointer-events-none" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-[#07090E]/95 backdrop-blur-3xl border-t border-white/5 animate-in slide-in-from-top-2 fade-in duration-200 z-40 overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-6">
            <Link href="#about" onClick={() => setIsOpen(false)} className="text-xl font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="#projects" onClick={() => setIsOpen(false)} className="text-xl font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              Projects
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}