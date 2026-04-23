import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

// Using Outfit font for that clean, modern geometric typography
const outfit = Outfit({ subsets: ["latin"] });

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
      <body className={`${outfit.className} bg-[#0A0D14] text-slate-200 antialiased`}>
        
        {/* --- GLOBAL GLASS NAVIGATION BAR --- */}
        <Navbar />

        {/* --- MAIN CONTENT INJECTION --- */}
        <div className="pt-24 min-h-screen flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
        </div>

        {/* --- GLOBAL FOOTER (DASUN STYLE) --- */}
        <footer className="bg-[#0A0D14] relative z-50 pb-12 pt-8">
          <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center gap-2 text-sm text-slate-500 font-light">
            <p>Designed & Built by Chamathka Addarage.</p>
            <p>Built with React, Next.js & Tailwind CSS.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}