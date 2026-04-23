import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, Code2, Palette, Zap, Cpu, Briefcase, Globe, Database, Monitor, Server, TrendingUp } from 'lucide-react';

// 1. Import your Client Component
import ContactForm from "./components/ContactForm";

// Force Next.js to always fetch fresh data
export const dynamic = "force-dynamic";

// 2. Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
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
          <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
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
            <a href="#projects" className="glass-panel px-8 py-4 rounded-xl text-white font-medium hover:-translate-y-1.5 active:scale-95 transition-all duration-300 border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              Explore Work
            </a>
            <a href="#contact" className="glass-panel px-8 py-4 rounded-xl text-white font-medium hover:-translate-y-1.5 active:scale-95 transition-all duration-300 border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
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
        
        <div className="glass-panel rounded-2xl p-8 md:p-16 relative overflow-hidden group/container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 items-center">
            
            <div className="lg:col-span-7 order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Bridging the gap between <span className="text-cyan-400">design</span> and <span className="text-purple-400">logic</span>.
              </h3>
              <p className="text-slate-400 leading-relaxed font-light text-lg mb-6">{settings?.about_bio_1}</p>
              <p className="text-slate-400 leading-relaxed font-light text-lg mb-10">{settings?.about_bio_2}</p>
              
              <div className="space-y-4">
                <div className="bg-[#0A0D14] border border-white/5 rounded-xl p-5 flex items-start gap-4">
                  <Code2 className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Modern Engineering</h4>
                    <p className="text-sm text-slate-500 font-light">{settings?.about_modern_eng}</p>
                  </div>
                </div>
                <div className="bg-[#0A0D14] border border-white/5 rounded-xl p-5 flex items-start gap-4">
                  <Palette className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Aesthetic Precision</h4>
                    <p className="text-sm text-slate-500 font-light">{settings?.about_aesthetic_prec}</p>
                  </div>
                </div>
                <div className="bg-[#0A0D14] border border-white/5 rounded-xl p-5 flex items-start gap-4">
                  <Zap className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Fluid Interactions</h4>
                    <p className="text-sm text-slate-500 font-light">{settings?.about_fluid_int}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl transition-all duration-500 group-hover:-translate-x-4 group-hover:translate-y-4"></div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl z-10 transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/10 z-20 shadow-2xl">
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
          TECHNOLOGIES SECTION
          ========================================= */}
      <div id="skills" className="relative max-w-7xl w-full px-6 mt-32 pt-10">
        <h2 className="text-sm font-bold mb-10 text-slate-400 tracking-[0.3em] uppercase text-center relative z-10">Technologies</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
          
          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)] group cursor-default">
            <Cpu className="w-6 h-6 text-cyan-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">Next.js</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Expert</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)] group cursor-default">
            <Code2 className="w-6 h-6 text-purple-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">React</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Advanced</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)] group cursor-default">
            <Code2 className="w-6 h-6 text-cyan-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">JavaScript</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Advanced</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)] group cursor-default">
            <Code2 className="w-6 h-6 text-purple-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">TypeScript</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Advanced</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)] group cursor-default">
            <Monitor className="w-6 h-6 text-cyan-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">Vue</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Intermediate</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)] group cursor-default">
            <Server className="w-6 h-6 text-purple-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">Node.js</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Advanced</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)] group cursor-default">
            <Code2 className="w-6 h-6 text-cyan-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">PHP</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Intermediate</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)] group cursor-default">
            <Database className="w-6 h-6 text-purple-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">Laravel</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Intermediate</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)] group cursor-default">
            <Palette className="w-6 h-6 text-cyan-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">Tailwind CSS</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Expert</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)] group cursor-default">
            <Zap className="w-6 h-6 text-purple-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">Supabase</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Advanced</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)] group cursor-default">
            <Globe className="w-6 h-6 text-cyan-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">WordPress</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Advanced</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)] group cursor-default">
            <TrendingUp className="w-6 h-6 text-purple-400" strokeWidth={1.5}/>
            <h4 className="text-white font-semibold text-sm">SEO</h4>
            <div className="flex gap-1 mt-1">
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              <div className="w-full h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Expert</p>
          </div>
        </div>
      </div>

      {/* =========================================
          CAREER TIMELINE SECTION
          ========================================= */}
      <div id="experience" className="relative max-w-7xl w-full px-6 mt-32 pt-10">
        <h2 className="text-sm font-bold mb-10 text-slate-400 tracking-[0.3em] uppercase text-center relative z-10">My Journey So Far</h2>
        
        <div className="relative z-10 space-y-10 pl-6 border-l border-white/10 ml-4 before:absolute before:left-[-1px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-blue-500 before:shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          
          <div className="relative pl-10 group">
            <div className="absolute left-[-24px] top-1 w-10 h-10 rounded-xl border border-white/10 bg-[#0A0D14] flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all">
              <Briefcase className="w-4 h-4 text-cyan-400"/>
            </div>
            <div className="glass-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)]">
              <span className="text-xs text-cyan-400 font-bold mb-1 block uppercase tracking-wider">May 2024 — Oct 2025</span>
              <h4 className="text-xl font-bold text-white mb-1">Senior Executive - Web Specialist</h4>
              <p className="text-sm text-slate-400 font-medium mb-3">Ikman.lk | Colombo, Sri Lanka</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed">Engineered high-performance, SEO-friendly web applications using React and Next.js. Developed robust backend services and integrated real-time database and authentication solutions using Node.js and Supabase.</p>
            </div>
          </div>

          <div className="relative pl-10 group">
            <div className="absolute left-[-24px] top-1 w-10 h-10 rounded-xl border border-white/10 bg-[#0A0D14] flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all">
              <Code2 className="w-4 h-4 text-purple-400"/>
            </div>
            <div className="glass-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)]">
              <span className="text-xs text-purple-400 font-bold mb-1 block uppercase tracking-wider">Aug 2022 — Mar 2024</span>
              <h4 className="text-xl font-bold text-white mb-1">Full Stack Developer</h4>
              <p className="text-sm text-slate-400 font-medium mb-3">Precision Enterprises Inc | New York, USA</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed">Led the end-to-end development and redesign of the company website, significantly increasing user engagement and SEO rankings. Developed and maintained custom full-stack web applications.</p>
            </div>
          </div>

          <div className="relative pl-10 group">
            <div className="absolute left-[-24px] top-1 w-10 h-10 rounded-xl border border-white/10 bg-[#0A0D14] flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all">
              <TrendingUp className="w-4 h-4 text-cyan-400"/>
            </div>
            <div className="glass-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)]">
              <span className="text-xs text-cyan-400 font-bold mb-1 block uppercase tracking-wider">Jun 2021 — Jul 2022</span>
              <h4 className="text-xl font-bold text-white mb-1">Social Media Strategist</h4>
              <p className="text-sm text-slate-400 font-medium mb-3">Lyceum International Schools | Nugegoda, Sri Lanka</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed">Developed cross-platform social media strategies to increase brand visibility. Tracked performance metrics using Google Analytics and social insights to optimize future strategies.</p>
            </div>
          </div>

          <div className="relative pl-10 group">
            <div className="absolute left-[-24px] top-1 w-10 h-10 rounded-xl border border-white/10 bg-[#0A0D14] flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all">
              <Globe className="w-4 h-4 text-purple-400"/>
            </div>
            <div className="glass-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)]">
              <span className="text-xs text-purple-400 font-bold mb-1 block uppercase tracking-wider">Jan 2019 — Present</span>
              <h4 className="text-xl font-bold text-white mb-1">Web Developer, SEO / Marketing Specialist</h4>
              <p className="text-sm text-slate-400 font-medium mb-3">Freelance</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed">Architected and deployed custom web applications and administrative dashboards using Next.js, React, and Supabase. Boosted organic traffic for global clients by conducting comprehensive SEO audits.</p>
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
            <Link href={`/projects/${project.slug}`} key={project.id} prefetch={false} className="block group">
              <div className="glass-panel rounded-2xl p-3 md:p-4 h-full transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col group-hover:bg-white/[0.04]">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-[#0A0D14] mb-5">
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
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">{project.title}</h3>
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
          <Link href="/projects" prefetch={false} className="group flex items-center gap-3 px-8 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:-translate-y-1 transition-all duration-300 text-slate-300 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]">
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
            <div className="glass-panel rounded-2xl p-8 h-full flex flex-col justify-center relative overflow-hidden group">
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

            <div className="glass-panel rounded-2xl p-8 flex items-center gap-5">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Email directly at</p>
                <a href={`mailto:${settings?.contact_email}`} className="text-white hover:text-cyan-400 transition-colors font-medium">
                  {settings?.contact_email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 glass-panel rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-6">Send an Inquiry</h3>
            <ContactForm /> 
          </div>

        </div>
      </div>
    </main>
  );
}