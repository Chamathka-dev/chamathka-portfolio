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
    <header className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50">
      
      <div className="glass-panel rounded-2xl px-6 md:px-8 h-16 md:h-20 flex items-center justify-between border border-white/5 bg-[#0A0D14]/80 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all">
        
        {/* 1. Logo & Name */}
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 shrink-0 group">
          <span className="font-bold text-lg md:text-xl tracking-wide text-white group-hover:text-cyan-400 transition-colors">
            chamathka<span className="text-cyan-400">.dev</span>
          </span>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#about" className="hover:text-white hover:-translate-y-0.5 transition-all">About</Link>
          <Link href="#skills" className="hover:text-white hover:-translate-y-0.5 transition-all">Tech Stack</Link>
          <Link href="#projects" className="hover:text-white hover:-translate-y-0.5 transition-all">Projects</Link>
          <Link href="#experience" className="hover:text-white hover:-translate-y-0.5 transition-all">Timeline</Link>
        </nav>

        {/* 3. Mobile Navigation Controls */}
        <div className="flex items-center md:hidden">
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
        <div className="md:hidden absolute top-24 left-0 w-full glass-panel rounded-2xl border border-white/5 bg-[#0A0D14]/95 backdrop-blur-3xl p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-2">
          <Link href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors">
            About
          </Link>
          <Link href="#skills" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors">
            Tech Stack
          </Link>
          <Link href="#projects" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors">
            Projects
          </Link>
          <Link href="#experience" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors">
            Timeline
          </Link>
          <Link href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-cyan-400 hover:text-cyan-300 transition-colors mt-2 pt-6 border-t border-white/10">
            Contact Me
          </Link>
        </div>
      )}
    </header>
  );
}