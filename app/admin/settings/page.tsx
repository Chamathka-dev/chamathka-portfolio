"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Save, Loader2, CheckCircle2, Upload, ImageIcon, Hexagon } from "lucide-react";
import Image from "next/image";

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState({
    hero_title: "",
    hero_subtitle: "",
    about_bio_1: "",
    about_bio_2: "",
    about_modern_eng: "",
    about_aesthetic_prec: "",
    about_fluid_int: "",
    contact_email: "",
    contact_whatsapp: "",
    site_logo_url: "",
    portrait_url: "",
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (data) setFormData({ ...data });
      setLoading(false);
    }
    fetchSettings();
  }, [supabase]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "site_logo_url" | "portrait_url") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);
    const fileExt = file.name.split('.').pop();
    const fileName = `${field}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(filePath, file);

    if (uploadError) {
      setMessage({ text: "Upload failed.", type: "error" });
      setUploading(null);
      return;
    }

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(filePath);

    // 3. Update State
    setFormData(prev => ({ ...prev, [field]: publicUrl }));
    setUploading(null);
    setMessage({ text: "Image uploaded! Click 'Save All Settings' to apply.", type: "success" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({ ...formData, updated_at: new Date().toISOString() }).eq("id", 1);
    if (error) setMessage({ text: "Error saving.", type: "error" });
    else setMessage({ text: "All settings saved!", type: "success" });
    setSaving(false);
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-cyan-400" /></div>;

  return (
    <div className="max-w-4xl pb-20 pt-8 animate-in fade-in space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-white">Site Settings</h1>
           <p className="text-slate-400 font-light">Global configuration and assets.</p>
        </div>
        {message && <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}><CheckCircle2 size={16}/> {message.text}</div>}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* BRANDING SECTION */}
        <div className="glass-panel p-8 rounded-3xl space-y-6">
          <h2 className="text-white font-bold text-lg border-b border-white/10 pb-2 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" /> Branding & Assets
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Logo Upload */}
            <div className="space-y-4">
              <label className="text-sm text-slate-400">Site Logo (Icon)</label>
              <div className="relative group aspect-square w-32 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                {formData.site_logo_url ? (
                  <Image src={formData.site_logo_url} alt="Logo" fill className="object-contain p-4" />
                ) : (
                  <Hexagon className="w-8 h-8 text-slate-700" />
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Upload className="w-6 h-6 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'site_logo_url')} />
                </label>
                {uploading === 'site_logo_url' && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
              </div>
            </div>

            {/* Portrait Upload */}
            <div className="space-y-4">
              <label className="text-sm text-slate-400">About Portrait</label>
              <div className="relative group aspect-[4/5] w-32 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                {formData.portrait_url ? (
                  <Image src={formData.portrait_url} alt="Portrait" fill className="object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-700" />
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Upload className="w-6 h-6 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'portrait_url')} />
                </label>
                {uploading === 'portrait_url' && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
              </div>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="glass-panel p-8 rounded-3xl space-y-4">
          <h2 className="text-white font-bold text-lg border-b border-white/10 pb-2">Hero Section</h2>
          <input name="hero_title" value={formData.hero_title} onChange={(e) => setFormData({...formData, hero_title: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none" />
          <textarea name="hero_subtitle" value={formData.hero_subtitle} onChange={(e) => setFormData({...formData, hero_subtitle: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-24 resize-none focus:border-cyan-500/50 focus:outline-none" />
        </div>

        {/* ABOUT BIOS */}
        <div className="glass-panel p-8 rounded-3xl space-y-4">
          <h2 className="text-white font-bold text-lg border-b border-white/10 pb-2">About Bio</h2>
          <textarea name="about_bio_1" value={formData.about_bio_1} onChange={(e) => setFormData({...formData, about_bio_1: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-24 resize-none" placeholder="First Paragraph" />
          <textarea name="about_bio_2" value={formData.about_bio_2} onChange={(e) => setFormData({...formData, about_bio_2: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-32 resize-none" placeholder="Second Paragraph" />
        </div>

        {/* COMPETENCIES */}
        <div className="glass-panel p-8 rounded-3xl space-y-4">
          <h2 className="text-white font-bold text-lg border-b border-white/10 pb-2">Competency Cards</h2>
          <textarea name="about_modern_eng" value={formData.about_modern_eng} onChange={(e) => setFormData({...formData, about_modern_eng: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-20 resize-none" />
          <textarea name="about_aesthetic_prec" value={formData.about_aesthetic_prec} onChange={(e) => setFormData({...formData, about_aesthetic_prec: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-20 resize-none" />
          <textarea name="about_fluid_int" value={formData.about_fluid_int} onChange={(e) => setFormData({...formData, about_fluid_int: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-20 resize-none" />
        </div>

        {/* CONTACT */}
        <div className="glass-panel p-8 rounded-3xl space-y-4">
          <h2 className="text-white font-bold text-lg border-b border-white/10 pb-2">Contact Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="contact_email" value={formData.contact_email} onChange={(e) => setFormData({...formData, contact_email: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white" />
            <input name="contact_whatsapp" value={formData.contact_whatsapp} onChange={(e) => setFormData({...formData, contact_whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-cyan-500 hover:bg-cyan-400 px-10 py-4 rounded-2xl font-bold text-black ml-auto block shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95">
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </form>
    </div>
  );
}