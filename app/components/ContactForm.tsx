"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const submissionData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert(submissionData);

      if (error) {
        setErrorMessage("Something went wrong with the database connection.");
      } else {
        setSent(true);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // The Success State UI
  if (sent) return (
    <div className="glass-panel p-10 rounded-[2.5rem] text-center border border-cyan-500/20 shadow-[0_0_50px_-12px_rgba(6,182,212,0.2)] animate-in zoom-in duration-300">
      <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
      <p className="text-slate-400">Thanks for reaching out. I'll get back to you shortly.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Error Message Box */}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 animate-in fade-in">
          <AlertCircle size={18} />
          {errorMessage}
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="name" required placeholder="Name" className="bg-[#0A0D14] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all" />
        <input name="email" type="email" required placeholder="Email" className="bg-[#0A0D14] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all" />
      </div>
      <input name="subject" placeholder="Subject (Optional)" className="w-full bg-[#0A0D14] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all" />
      <textarea name="message" required placeholder="Project Details" className="w-full bg-[#0A0D14] border border-white/10 p-4 rounded-xl text-white h-32 resize-none outline-none focus:border-cyan-500/50 transition-all" />
      
      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-cyan-500 hover:bg-cyan-400 py-4 rounded-xl font-bold text-black flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}