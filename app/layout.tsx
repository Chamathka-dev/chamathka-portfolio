import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // Importing your new interactive client component

// Using Inter font for that clean, Apple-like geometric typography
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chamathka | Portfolio",
  description: "Full-stack developer blending visual design with Next.js engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#07090E] text-slate-200 antialiased`}>
        
        {/* --- GLOBAL GLASS NAVIGATION BAR --- */}
        <Navbar />

        {/* --- MAIN CONTENT INJECTION --- */}
        {/* The min-h-screen ensures short pages still push the footer to the bottom */}
        <div className="pt-24 min-h-screen flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
        </div>

        {/* --- GLOBAL FOOTER --- */}
        <footer className="border-t border-white/[0.05] bg-[#07090E]/80 backdrop-blur-lg relative z-50">
          <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-sm text-slate-500 font-light text-center md:text-left">
              © {new Date().getFullYear()} Chamathka Addarage. All rights reserved.
            </p>
            
            {/* Social / Extra Links */}
            <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-purple-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
            
          </div>
        </footer>

      </body>
    </html>
  );
}