"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter, useParams } from "next/navigation";
import { Save, Loader2, Upload, ArrowLeft, X, Plus, Image as ImageIcon, CheckCircle2, Globe, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Basic Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [image, setImage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Execution Overview State
  const [overviewText, setOverviewText] = useState("");
  const [c1Title, setC1Title] = useState("");
  const [c1Text, setC1Text] = useState("");
  const [c2Title, setC2Title] = useState("");
  const [c2Text, setC2Text] = useState("");
  const [c3Title, setC3Title] = useState("");
  const [c3Text, setC3Text] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;
      const { data } = await supabase.from("projects").select("*").eq("id", id).single();
      if (data) {
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setLiveUrl(data.live_url || "");
        setShortDesc(data.short_description || "");
        setImage(data.image_url || "");
        setIsFeatured(data.is_featured || false);
        setTags(Array.isArray(data.tech_stack) ? data.tech_stack : []);
        // Load Overview Fields
        setOverviewText(data.overview_text || "");
        setC1Title(data.card_1_title || "Architecture");
        setC1Text(data.card_1_text || "");
        setC2Title(data.card_2_title || "Network");
        setC2Text(data.card_2_text || "");
        setC3Title(data.card_3_title || "Code Logic");
        setC3Text(data.card_3_text || "");
      }
      setLoading(false);
    }
    fetchProject();
  }, [id, supabase]);

  const handleSaveAll = async () => {
    setSaving(true);
    const { error } = await supabase.from("projects").update({
      title, slug, live_url: liveUrl, short_description: shortDesc, image_url: image, 
      is_featured: isFeatured, tech_stack: tags,
      overview_text: overviewText,
      card_1_title: c1Title, card_1_text: c1Text,
      card_2_title: c2Title, card_2_text: c2Text,
      card_3_title: c3Title, card_3_text: c3Text
    }).eq("id", id);

    if (error) {
      alert("Save failed: " + error.message);
      setSaving(false);
    } else {
      setSaveSuccess(true);
      setTimeout(() => { 
        router.push("/admin/projects");
        router.refresh(); 
      }, 800);
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-cyan-400" /></div>;

  return (
    <div className="max-w-5xl pb-20 pt-8 animate-in fade-in">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Edit Project Details</h1>
        </div>
        {saveSuccess && <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">Updated Successfully</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: MEDIA & SETTINGS */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] block mb-4 font-bold">Project Thumbnail</label>
            <div className="relative aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-6 group">
              {image && <Image src={image} alt="" fill sizes="400px" priority className="object-cover" />}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <p className="text-white text-xs font-bold uppercase tracking-widest">Replace Image</p>
              </div>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploading(true);
                const { data } = await supabase.storage.from('portfolio-assets').upload(`img-${Date.now()}`, file);
                if (data) {
                  const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(data.path);
                  setImage(publicUrl);
                }
                setUploading(false);
              }} />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-sm text-slate-300">Feature on Home</span>
              <button type="button" onClick={() => setIsFeatured(!isFeatured)} className={`w-12 h-6 rounded-full transition-colors relative ${isFeatured ? 'bg-cyan-500' : 'bg-white/10'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isFeatured ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: CONTENT FIELDS */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Basic Info */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
            <h2 className="text-white font-bold flex items-center gap-2"><Plus size={18} className="text-cyan-400" /> General Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">Title</label>
                <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-cyan-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">Live Link</label>
                <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-cyan-400 outline-none focus:border-cyan-500/50 font-mono text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">Short Description</label>
              <textarea required value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-24 resize-none outline-none focus:border-cyan-500/50" />
            </div>
          </div>

          {/* Section 2: Execution Overview (The New Part) */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
            <h2 className="text-white font-bold flex items-center gap-2"><Cpu size={18} className="text-purple-400" /> Execution Overview</h2>
            <div className="space-y-2">
              <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">Main Paragraph</label>
              <textarea 
                value={overviewText} 
                onChange={(e) => setOverviewText(e.target.value)} 
                placeholder="The project involved a rigorous development cycle..."
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-32 resize-none outline-none focus:border-purple-500/50" 
              />
            </div>

            {/* Detail Cards Edit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <input value={c1Title} onChange={(e) => setC1Title(e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 text-cyan-400 font-bold text-sm outline-none" placeholder="Card 1 Title" />
                <textarea value={c1Text} onChange={(e) => setC1Text(e.target.value)} className="w-full bg-transparent text-xs text-slate-500 h-20 resize-none outline-none" placeholder="Card 1 Text..." />
              </div>
              <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <input value={c2Title} onChange={(e) => setC2Title(e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 text-purple-400 font-bold text-sm outline-none" placeholder="Card 2 Title" />
                <textarea value={c2Text} onChange={(e) => setC2Text(e.target.value)} className="w-full bg-transparent text-xs text-slate-500 h-20 resize-none outline-none" placeholder="Card 2 Text..." />
              </div>
              <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <input value={c3Title} onChange={(e) => setC3Title(e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 text-blue-400 font-bold text-sm outline-none" placeholder="Card 3 Title" />
                <textarea value={c3Text} onChange={(e) => setC3Text(e.target.value)} className="w-full bg-transparent text-xs text-slate-500 h-20 resize-none outline-none" placeholder="Card 3 Text..." />
              </div>
            </div>
          </div>

          <button onClick={handleSaveAll} disabled={saving || uploading} className="w-full bg-cyan-500 hover:bg-cyan-400 py-4 rounded-2xl font-bold text-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-30 shadow-xl">
            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {saving ? "Processing..." : "Update Everything"}
          </button>
        </div>
      </div>
    </div>
  );
}