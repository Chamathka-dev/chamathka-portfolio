import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, Briefcase, Code2, TrendingUp, Globe, Zap } from 'lucide-react';
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi';

import ContactForm from "./components/ContactForm";

export const dynamic = "force-dynamic";

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

  return (
    <main className="relative z-10 flex flex-col items-center w-full px-4 md:px-6 pb-32">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* =========================================
          1. COMBINED HERO & ABOUT SECTION
          ========================================= */}
      <div id="about" className="relative w-full max-w-5xl mx-auto z-10">
        {/* FIX: Reduced mobile padding (p-5) and increased desktop padding (p-12) */}
        <div className="glass-panel rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden border-t-2 border-t-cyan-500/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 items-center">
            
            {/* Portrait - Centered on Mobile */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
               <div className="relative w-28 h-28 sm:w-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                 <Image 
                    src={settings?.portrait_url || "/images/portrait.jpg"} 
                    alt="Chamathka Addarage" 
                    fill 
                    className="object-cover" 
                  />
               </div>
            </div>

            {/* Text Content - Responsive Alignment */}
            <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-cyan-400 font-mono text-xs md:text-sm uppercase tracking-widest mb-3">Hi, I'm</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight leading-tight">
                Chamathka <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Addarage</span>
              </h1>
              <h2 className="text-lg md:text-xl text-slate-300 font-medium mb-6">
                Full Stack Developer
              </h2>
              <p className="text-slate-400 font-light leading-relaxed max-w-2xl mb-8 text-sm md:text-base">
                {settings?.about_bio_1 || "Dynamic Full Stack Developer and Senior Executive architecting scalable web applications. Combines technical engineering with deep expertise in SEO, Ad campaigns, and elegant UI/UX design."}
              </p>

              {/* Action Buttons - No wrapping squish */}
              <div className="flex flex-row gap-3 mb-8 w-full justify-center md:justify-start">
                <a href="#projects" className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all font-medium text-sm whitespace-nowrap">
                  Projects
                </a>
                <a href="#contact" className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all font-medium text-sm whitespace-nowrap">
                  Contact
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 transition-all"><FiLinkedin size={18} /></a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"><FiGithub size={18} /></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 transition-all"><FiFacebook size={18} /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-pink-400 transition-all"><FiInstagram size={18} /></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================
          2. TECHNICAL STACK
          ========================================= */}
      <div id="skills" className="relative w-full max-w-5xl mx-auto mt-16 z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-6 bg-cyan-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-white tracking-wide">Technical Stack</h2>
        </div>
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 shadow-lg">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div>
                 <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Programming & Frameworks</h3>
                 <div className="flex flex-wrap gap-2.5">
                   {['React', 'Next.js', 'Node.js', 'Vite', 'TypeScript', 'HTML5', 'CSS3', 'PHP', 'Laravel', 'Tailwind CSS'].map(t => (
                     <span key={t} className="bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:border-cyan-500/30 hover:text-cyan-400 transition-all">{t}</span>
                   ))}
                 </div>
             </div>
             <div>
                 <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Database & Backend</h3>
                 <div className="flex flex-wrap gap-2.5">
                   {['Supabase', 'MySQL', 'PostgreSQL', 'Firebase', 'WordPress'].map(t => (
                     <span key={t} className="bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:border-cyan-500/30 hover:text-cyan-400 transition-all">{t}</span>
                   ))}
                 </div>
             </div>
             <div>
                 <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Design & Multimedia</h3>
                 <div className="flex flex-wrap gap-2.5">
                   {['UI/UX Design', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe After Effects'].map(t => (
                     <span key={t} className="bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:border-purple-500/30 hover:text-purple-400 transition-all">{t}</span>
                   ))}
                 </div>
             </div>
             <div>
                 <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Digital Marketing & SEO</h3>
                 <div className="flex flex-wrap gap-2.5">
                   {['Google Analytics', 'Sitemap Creation', 'Meta Ads Management', 'Lead Generation', 'Social Media Strategy', 'Technical SEO'].map(t => (
                     <span key={t} className="bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:border-purple-500/30 hover:text-purple-400 transition-all">{t}</span>
                   ))}
                 </div>
             </div>
           </div>
        </div>
      </div>

      {/* =========================================
          3. SELECTED WORK GRID
          ========================================= */}
      <div id="projects" className="relative w-full max-w-5xl mx-auto mt-16 z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-6 bg-cyan-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-white tracking-wide">Selected Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {projects?.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id} prefetch={false} className="block group">
              <div className="glass-panel rounded-2xl p-4 h-full transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col hover:border-white/10">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-[#0A0D14] mb-5">
                   {project.image_url && <Image src={project.image_url} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                </div>
                <div className="px-2 pb-2 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-3 font-light leading-relaxed">{project.short_description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tech_stack?.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-500">{tech}</span>
                      ))}
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/projects" prefetch={false} className="px-6 py-2.5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all font-medium text-sm">View All Projects</Link>
        </div>
      </div>

      {/* =========================================
          4. CAREER JOURNEY / TIMELINE
          ========================================= */}
      <div id="experience" className="relative w-full max-w-5xl mx-auto mt-16 z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-6 bg-cyan-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-white tracking-wide">Journey & Timeline</h2>
        </div>
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5">
          <div className="relative space-y-10 pl-6 border-l border-white/10 ml-2">
            
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute left-[-33px] top-1 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-[10px] text-cyan-400 font-mono font-bold mb-3 uppercase tracking-wider border border-cyan-500/20">May 2024 — Oct 2025</span>
              <h4 className="text-lg font-bold text-white mb-1">Senior Executive - Web Specialist</h4>
              <p className="text-sm text-slate-400 font-medium mb-3">Ikman.lk | Colombo, Sri Lanka</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-3xl">Engineered high-performance web applications using React and Next.js. Developed robust backend services and integrated authentication solutions.</p>
            </div>

            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute left-[-33px] top-1 w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-[10px] text-purple-400 font-mono font-bold mb-3 uppercase tracking-wider border border-purple-500/20">Aug 2022 — Mar 2024</span>
              <h4 className="text-lg font-bold text-white mb-1">Full Stack Developer</h4>
              <p className="text-sm text-slate-400 font-medium mb-3">Precision Enterprises Inc | New York, USA</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-3xl">Led end-to-end redesign of the company website, significantly increasing engagement and SEO rankings.</p>
            </div>

            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute left-[-33px] top-1 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-[10px] text-cyan-400 font-mono font-bold mb-3 uppercase tracking-wider border border-cyan-500/20">Jun 2021 — Jul 2022</span>
              <h4 className="text-lg font-bold text-white mb-1">Social Media Strategist</h4>
              <p className="text-sm text-slate-400 font-medium mb-3">Lyceum International Schools</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-3xl">Developed cross-platform social strategies to increase brand visibility and optimized performance metrics.</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* =========================================
          5. CONTACT SECTION
          ========================================= */}
      <div id="contact" className="relative w-full max-w-5xl mx-auto px-4 md:px-0 mt-16 z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-6 bg-cyan-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-white tracking-wide">Initiate a Project</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-panel rounded-2xl p-8 h-full flex flex-col justify-center border border-white/5 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-2">Let's talk directly.</h3>
              <p className="text-slate-400 text-sm font-light mb-8">Skip the form. Send me a message on WhatsApp for the fastest response.</p>
              <a href={`https://wa.me/${settings?.contact_whatsapp?.replace(/\+/g, '').replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium text-sm transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
            <div className="glass-panel rounded-2xl p-5 flex items-center gap-4 border border-white/5 shadow-lg overflow-hidden">
              <div className="p-3 bg-purple-500/10 rounded-xl shrink-0"><Mail className="w-5 h-5 text-purple-400" /></div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">Email directly at</p>
                <a href={`mailto:${settings?.contact_email}`} className="text-white hover:text-cyan-400 transition-colors text-sm font-medium truncate block">{settings?.contact_email}</a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 glass-panel rounded-2xl p-6 sm:p-8 md:p-10 border border-white/5 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6">Send an Inquiry</h3>
            <ContactForm /> 
          </div>
        </div>
      </div>
    </main>
  );
}