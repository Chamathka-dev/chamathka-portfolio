"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Save, Loader2, Upload, ArrowLeft, Plus, X, Image as ImageIcon, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [image, setImage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
  };

  const handlePushTag = () => {
    const val = tagInput.trim();
    if (val && !tags.includes(val)) {
      setTags((prev) => [...prev, val]);
      setTagInput("");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `project-${Math.random().toString(36).substring(7)}-${file.name}`;
    const { data } = await supabase.storage.from('portfolio-assets').upload(fileName, file);
    if (data) {
      const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(data.path);
      setImage(publicUrl);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("projects").insert({
      title,
      slug,
      live_url: liveUrl,
      short_description: shortDesc,
      image_url: image,
      is_featured: isFeatured,
      tech_stack: tags,
    });

    if (error) {
      alert("Error: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin/projects");
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl pb-20 pt-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/admin/projects" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <label className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Featured Image</label>
            <div className="relative aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center group">
              {image ? <Image src={image} alt="" fill sizes="400px" className="object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-700" />}
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Upload className="w-6 h-6 text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
              {uploading && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="animate-spin text-cyan-400" /></div>}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-sm text-slate-300">Show on Home</span>
              <button type="button" onClick={() => setIsFeatured(!isFeatured)} className={`w-12 h-6 rounded-full transition-colors relative ${isFeatured ? 'bg-cyan-500' : 'bg-white/10'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isFeatured ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Title</label>
              <input required value={title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-cyan-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400 flex items-center gap-2"><Globe size={14}/> Live URL</label>
              <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-cyan-400 outline-none focus:border-cyan-500/50 font-mono text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Slug</label>
            <input required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-slate-500 font-mono text-sm outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Short Description</label>
            <textarea required value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white h-24 resize-none outline-none" />
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <label className="text-sm text-slate-400 font-medium">Tech Stack</label>
            <div className="flex flex-wrap gap-2 min-h-[30px]">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                  {tag}
                  <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))}><X size={12} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handlePushTag(); }}} className="flex-grow bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" placeholder="Add tag..." />
              <button type="button" onClick={handlePushTag} className="p-3 bg-white/10 rounded-xl text-white hover:bg-cyan-500 hover:text-black transition-all"><Plus size={20} /></button>
            </div>
          </div>

          <button type="submit" disabled={loading || uploading} className="w-full bg-cyan-500 hover:bg-cyan-400 py-4 rounded-2xl font-bold text-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-30">
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {loading ? "Publishing..." : "Publish Project"}
          </button>
        </div>
      </form>
    </div>
  );
}