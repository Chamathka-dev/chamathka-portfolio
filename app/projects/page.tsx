import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Zap, Code2 } from 'lucide-react';

// ... your other imports ...

// Add this exact line right here:
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ProjectsPage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Archive.</span>
          </h1>
          <p className="text-slate-400 max-w-xl font-light text-lg">
            A comprehensive look at my journey through design and code.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id} className="group block">
              <div className="glass-panel rounded-[2rem] p-4 h-full flex flex-col border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 mb-6">
                  {project.image_url && (
                    <Image 
                      src={project.image_url} 
                      alt={project.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  )}
                </div>
                <div className="px-2 pb-2 flex-grow">
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h2>
                  <p className="text-slate-400 text-sm font-light line-clamp-2 leading-relaxed mb-6">{project.short_description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech_stack?.map((tech: string) => (
                      <span key={tech} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}