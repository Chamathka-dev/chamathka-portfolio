import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, Code2, Palette, Zap } from 'lucide-react';

// 1. Import your Client Component
import ContactForm from "./components/ContactForm";

// 2. Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
  // 3. Fetch Projects AND Site Settings from Database
  const [projectsResponse, settingsResponse] = await Promise.all([
    supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: true }),
    supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()
  ]);

  const projects = projectsResponse.data;
  const settings = settingsResponse.data;

  if (settingsResponse.error) {
    console.error("Error fetching settings:", settingsResponse.error);
  }

  // 4. Title Splitting Logic for the Gradient Effect
  const fullTitle = settings?.hero_title || "Building digital architecture, with aesthetic precision.";
  const titleParts = fullTitle.includes(',') ? fullTitle.split(',') : [fullTitle, ""];

  return (
    <main className="relative z-10 flex flex-col items-center w-full overflow-hidden">
      
      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <div className="relative w-full max-w-5xl mx-auto mt-12 md:mt-16 text-center flex flex-col items-center px-6 pt-8 md:pt-12 pb-20">
        
        {/* Animated Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-900/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-2xl leading-tight">
            {titleParts[0].trim()}{titleParts[1] && ","} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              {titleParts[1]?.trim()}
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {settings?.hero_subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#projects" className="glass-panel px-8 py-4 rounded-full text-white font-medium hover:-translate-y-1.5 active:scale-95 transition-all duration-300 border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
              Explore Work
            </a>
            <a href="#contact" className="glass-panel px-8 py-4 rounded-full text-white font-medium hover:-translate-y-1.5 active:scale-95 transition-all duration-300 border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              Discuss a Project
            </a>
          </div>
        </div>
      </div>

      {/* =========================================
          2. ABOUT SECTION
          ========================================= */}
      <div id="about" className="relative max-w-7xl w-full px-6 mt-20 pt-20">
        <h2 className="text-sm font-bold mb-10 text-slate-400 tracking-[0.3em] uppercase text-center relative z-10">The Architect</h2>
        
        <div className="glass-panel rounded-[2rem] p-8 md:p-16 relative overflow-hidden group/container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 items-center">
            
            <div className="lg:col-span-7">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Bridging the gap between <span className="text-cyan-400">design</span> and <span className="text-purple-400">logic</span>.
              </h3>
              <p className="text-slate-400 leading-relaxed font-light text-lg mb-6">{settings?.about_bio_1}</p>
              <p className="text-slate-400 leading-relaxed font-light text-lg mb-10">{settings?.about_bio_2}</p>
              
              <div className="space-y-4">
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                  <Code2 className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Modern Engineering</h4>
                    <p className="text-sm text-slate-500 font-light">{settings?.about_modern_eng}</p>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                  <Palette className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Aesthetic Precision</h4>
                    <p className="text-sm text-slate-500 font-light">{settings?.about_aesthetic_prec}</p>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                  <Zap className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Fluid Interactions</h4>
                    <p className="text-sm text-slate-500 font-light">{settings?.about_fluid_int}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] aspect-[4/5] group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-xl transition-all duration-500 group-hover:-translate-x-4 group-hover:translate-y-4"></div>
                <div className="absolute inset-0 border border-white/10 rounded-[2rem] z-10 transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-[#0A0D14] border border-white/10 z-20 shadow-2xl">
                  <Image 
                    src={settings?.portrait_url || "/images/portrait.jpg"} 
                    alt="Portrait" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          3. SELECTED WORK GRID
          ========================================= */}
      <div id="projects" className="relative max-w-7xl w-full px-6 mt-32 pt-10">
        <h2 className="text-sm font-bold mb-10 text-slate-400 tracking-[0.3em] uppercase text-center relative z-10">Selected Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {projects?.map((project) => (
            /* ---> ADDED prefetch={false} HERE <--- */
            <Link href={`/projects/${project.slug}`} key={project.id} prefetch={false} className="block group">
              <div className="glass-panel rounded-3xl p-3 md:p-4 h-full transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col group-hover:bg-white/[0.05]">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0D14] mb-5">
                   <div className="absolute top-0 inset-x-0 h-8 bg-white/[0.02] backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-1.5 z-20">
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  </div>
                  <div className="absolute inset-0 pt-8 z-10 overflow-hidden">
                    {project.image_url && (
                      <Image 
                        src={project.image_url} 
                        alt={project.title} 
                        fill 
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                      />
                    )}
                  </div>
                </div>
                
                <div className="px-3 pb-2 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">{project.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-3 font-light leading-relaxed">{project.short_description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tech_stack?.map((tech: string) => (
                        <span key={tech} className="text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 backdrop-blur-md whitespace-nowrap hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-default">
                          {tech}
                        </span>
                      )) || (
                        <span className="text-[10px] text-slate-600 font-light italic">Details pending</span>
                      )}
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-20 flex justify-center">
          {/* ---> ADDED prefetch={false} HERE <--- */}
          <Link href="/projects" prefetch={false} className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/[0.02] border border-white/10 hover:-translate-y-1.5 transition-all duration-300 text-slate-300 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <span className="text-sm font-medium tracking-wide">View All Projects</span>
            <Zap className="w-4 h-4 group-hover:text-cyan-400" />
          </Link>
        </div>
      </div>

      {/* =========================================
          4. CONTACT SECTION
          ========================================= */}
      <div id="contact" className="relative max-w-7xl w-full px-6 mt-32 mb-32 pt-10">
        <h2 className="text-sm font-bold mb-10 text-slate-400 tracking-[0.3em] uppercase text-center relative z-10">Initiate a Project</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-8 h-full flex flex-col justify-center relative overflow-hidden group">
              <h3 className="text-2xl font-bold text-white mb-2">Let's talk directly.</h3>
              <p className="text-slate-400 font-light mb-8">Skip the form. Send me a message on WhatsApp for the fastest response.</p>
              
              <a 
                href={`https://wa.me/${settings?.contact_whatsapp?.replace(/\+/g, '').replace(/\s/g, '')}`} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold transition-all hover:-translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>

            <div className="glass-panel rounded-3xl p-8 flex items-center gap-5">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Email directly at</p>
                <a href={`mailto:${settings?.contact_email}`} className="text-white hover:text-cyan-400 transition-colors font-medium">
                  {settings?.contact_email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 glass-panel rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-6">Send an Inquiry</h3>
            <ContactForm /> 
          </div>

        </div>
      </div>
    </main>
  );
}