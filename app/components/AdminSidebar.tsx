"use client";

import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Image as ImageIcon, LogOut, MessageSquare } from "lucide-react"; 

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const activeStyles = "bg-white/[0.05] border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.03)]";
  const inactiveStyles = "text-slate-400 border-transparent hover:text-white hover:bg-white/[0.02]";

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#0A0D14]/50 p-6 flex flex-col shrink-0 relative z-20">
      
      {/* Brand Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
          
          {/* THE FIX: scale-150 added here too */}
          <Image 
            src="/images/mylogo.svg" 
            alt="Admin Logo" 
            width={48} 
            height={48} 
            className="w-8 h-8 object-contain scale-150" 
          />
          
        </div>
        <span className="font-bold text-white tracking-widest text-base uppercase">Control</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2">
        <Link 
          href="/admin" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 font-medium ${
            isActive("/admin") ? activeStyles : inactiveStyles
          }`}
        >
          <LayoutDashboard className={`w-4 h-4 ${isActive("/admin") ? "text-cyan-400" : ""}`} />
          Dashboard
        </Link>
        
        <Link 
          href="/admin/projects" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 font-medium ${
            isActive("/admin/projects") ? activeStyles : inactiveStyles
          }`}
        >
          <ImageIcon className={`w-4 h-4 ${isActive("/admin/projects") ? "text-purple-400" : ""}`} />
          Manage Projects
        </Link>

        <Link 
          href="/admin/messages" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 font-medium ${
            isActive("/admin/messages") ? activeStyles : inactiveStyles
          }`}
        >
          <MessageSquare className={`w-4 h-4 ${isActive("/admin/messages") ? "text-emerald-400" : ""}`} />
          Messages
        </Link>
        
        <Link 
          href="/admin/settings" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 font-medium ${
            isActive("/admin/settings") ? activeStyles : inactiveStyles
          }`}
        >
          <Settings className={`w-4 h-4 ${isActive("/admin/settings") ? "text-blue-400" : ""}`} />
          Site Settings
        </Link>
      </nav>

      {/* Logout / Exit Section */}
      <div className="mt-8 pt-8 border-t border-white/10">
         <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm">
          <LogOut className="w-4 h-4" />
          Exit Admin
        </Link>
      </div>
    </aside>
  );
}