"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Plus, Edit, Trash2, Loader2, Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- REMOVED THE REVALIDATE LINE FROM HERE ---

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const toggleFeatured = async (id: string, currentState: boolean) => {
    await supabase.from("projects").update({ is_featured: !currentState }).eq("id", id);
    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    if (confirm("Delete this project?")) {
      await supabase.from("projects").delete().eq("id", id);
      fetchProjects();
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-cyan-400" /></div>;

  return (
    <div className="pt-8 pb-20 animate-in fade-in">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">Project Vault</h1>
        <Link href="/admin/projects/new" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
          <Plus size={20} /> Add New
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, index) => (
          <div key={project.id} className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center gap-6 group hover:border-white/20 transition-all">
            <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden relative bg-white/5 border border-white/5">
              {project.image_url && (
                <Image 
                  src={project.image_url} 
                  alt="" 
                  fill 
                  sizes="200px" 
                  priority={index < 2} // Clears the LCP yellow warning
                  className="object-cover" 
                />
              )}
            </div>

            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-slate-500 text-sm font-light line-clamp-1">{project.short_description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech_stack?.map((t: string) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => toggleFeatured(project.id, project.is_featured)}
                className={`p-3 rounded-xl border transition-all ${project.is_featured ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-white/10 text-slate-500'}`}
              >
                {project.is_featured ? <Check size={18} /> : <X size={18} />}
              </button>
              <Link href={`/admin/projects/edit/${project.id}`} className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
                <Edit size={18} />
              </Link>
              <button onClick={() => deleteProject(project.id)} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}