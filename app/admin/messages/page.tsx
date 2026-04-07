"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Mail, Trash2, Loader2, Calendar, User } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchMessages = async () => {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const deleteMessage = async (id: string) => {
    if (confirm("Delete this message?")) {
      await supabase.from("contact_submissions").delete().eq("id", id);
      fetchMessages();
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-cyan-400" /></div>;

  return (
    <div className="pt-8 pb-20 max-w-5xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
        <Mail className="text-cyan-400" /> Client Inquiries
      </h1>

      <div className="space-y-4">
        {messages.length === 0 && <p className="text-slate-500 text-center py-20 border border-dashed border-white/10 rounded-3xl">No messages yet. Time to market your skills!</p>}
        
        {messages.map((msg) => (
          <div key={msg.id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold">{msg.name}</h3>
                  <p className="text-cyan-400 text-xs font-mono">{msg.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <Calendar size={12} /> {new Date(msg.created_at).toLocaleDateString()}
                </span>
                <button onClick={() => deleteMessage(msg.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-white font-semibold">Subject: {msg.subject || "No Subject"}</p>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}