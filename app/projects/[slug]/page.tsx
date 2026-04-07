import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Globe, Code, Layers, ExternalLink } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) notFound();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tighter">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-3">
              {project.tech_stack?.map((tech: string) => (
                <span key={tech} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xl text-slate-400 font-light leading-relaxed">
              {project.short_description}
            </p>

            {/* HIGH-IMPACT LIVE BUTTON */}
            {project.live_url && (
              <div className="pt-4">
                <a 
                  href={project.live_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all hover:-translate-y-1 active:scale-95 shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)]"
                >
                  Visit Live Site <ExternalLink size={20} />
                </a>
              </div>
            )}

            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/5">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 font-bold">Category</span>
                <span className="text-white font-medium text-sm">Digital Solutions</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 font-bold">Project Status</span>
                <span className="text-white font-medium text-sm">Live & Deployed</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            {project.image_url && (
              <Image 
                src={project.image_url} 
                alt={project.title} 
                fill 
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover" 
              />
            )}
          </div>
        </div>

        {/* Find the 'Execution Overview' section in your app/projects/[slug]/page.tsx and replace it with this */}

<div className="glass-panel p-10 md:p-16 rounded-[3rem] border border-white/5">
  <div className="max-w-3xl">
    <h3 className="text-2xl font-bold text-white mb-6">Execution Overview</h3>
    <p className="text-slate-400 leading-relaxed font-light text-lg mb-12">
      {project.overview_text || `The project involved a rigorous development cycle focusing on user experience and speed. By merging high-fidelity design with backend logic, we created a platform that is both aesthetic and functional.`}
    </p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-cyan-500/20 transition-colors">
      <Layers className="text-purple-400 mb-4" size={28} />
      <h4 className="text-white font-bold mb-2">{project.card_1_title || 'Architecture'}</h4>
      <p className="text-xs text-slate-500 font-light leading-relaxed">
        {project.card_1_text || 'Modular design patterns for rapid scalability and future-proof maintenance.'}
      </p>
    </div>

    {/* Card 2 */}
    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-cyan-500/20 transition-colors">
      <Globe className="text-cyan-400 mb-4" size={28} />
      <h4 className="text-white font-bold mb-2">{project.card_2_title || 'Network'}</h4>
      <p className="text-xs text-slate-500 font-light leading-relaxed">
        {project.card_2_text || 'Global deployment with low-latency edge delivery for a seamless experience.'}
      </p>
    </div>

    {/* Card 3 */}
    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-cyan-500/20 transition-colors">
      <Code className="text-blue-400 mb-4" size={28} />
      <h4 className="text-white font-bold mb-2">{project.card_3_title || 'Code Logic'}</h4>
      <p className="text-xs text-slate-500 font-light leading-relaxed">
        {project.card_3_text || 'Clean, documented codebase ensuring a robust and bug-free production environment.'}
      </p>
    </div>
  </div>
</div>

      </div>
    </main>
  );
}