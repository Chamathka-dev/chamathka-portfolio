import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare } from 'lucide-react';

// 1. Import your Client Component
import ContactForm from "./components/ContactForm";

// Force Next.js to always fetch fresh data
export const dynamic = "force-dynamic";

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
    <main className="relative z-10 flex flex-col items-center w-full overflow-hidden bg-[#050505]">
      
      {/* =========================================
          1. HERO SECTION (EDITORIAL STYLE)
          ========================================= */}
      <div className="relative w-full max-w-5xl mx-auto mt-20 md:mt-32 text-center flex flex-col items-center px-6 pt-8 md:pt-12 pb-20">
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          {/* Magazine-style Heading */}
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8 text-white leading-tight">
            {titleParts[0].trim()}{titleParts[1] && ","} <br/>
            <span className="italic text-slate-400 font-light">
              {titleParts[1]?.trim()}
            </span>
          </h1>
          
          <p className="text-sm text-slate-400 mb-12 max-w-xl mx-auto font-mono uppercase tracking-[0.2em] leading-relaxed">
            {settings?.hero_subtitle || "Full-stack developer blending professional visual design with high-performance engineering."}
          </p>
          
          {/* Sharp, Brutalist Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#projects" className="px-8 py-4 border border-white text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300">
              Explore Work
            </a>
            <a href="#contact" className="px-8 py-4 border border-white/20 text-slate-300 font-mono text-xs uppercase tracking-[0.2em] hover:border-white transition-colors duration-300">
              Discuss a Project
            </a>
          </div>
        </div>
      </div>

      {/* =========================================
          2. ABOUT SECTION (MINIMALIST)
          ========================================= */}
      <div id="about" className="relative max-w-7xl w-full px-6 mt-20 pt-20">
        <div className="border-t border-white/20 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-5 order-1">
              <div className="relative w-full aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700 border border-white/10">
                <Image 
                  src={settings?.portrait_url || "/images/portrait.jpg"} 
                  alt="Portrait" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-2 flex flex-col justify-center h-full">
              <h2 className="text-xs font-mono mb-8 text-slate-400 tracking-[0.3em] uppercase">The Architect</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-8 leading-snug">
                Bridging the gap between <br/><span className="italic text-slate-400">design and logic.</span>
              </h3>
              <div className="space-y-6 text-slate-400 font-light text-lg leading-relaxed max-w-2xl">
                <p>{settings?.about_bio_1}</p>
                <p>{settings?.about_bio_2}</p>
              </div>
            </div>
        </div>
      </div>

      {/* =========================================
          3. TECHNOLOGIES SECTION (GRID LIST)
          ========================================= */}
      <div id="skills" className="relative max-w-7xl w-full px-6 mt-32 pt-10">
        <h2 className="text-xs font-mono mb-10 text-slate-400 tracking-[0.3em] uppercase border-b border-white/20 pb-4">Technologies</h2>
        
        {/* Stark, crisp 1px borders creating a tight grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1px] bg-white/20 border border-white/20">
          {[
            { name: "Next.js", level: "Expert" },
            { name: "React", level: "Advanced" },
            { name: "JavaScript", level: "Advanced" },
            { name: "TypeScript", level: "Advanced" },
            { name: "Vue", level: "Intermediate" },
            { name: "Node.js", level: "Advanced" },
            { name: "PHP", level: "Intermediate" },
            { name: "Laravel", level: "Intermediate" },
            { name: "Tailwind CSS", level: "Expert" },
            { name: "Supabase", level: "Advanced" },
            { name: "WordPress", level: "Advanced" },
            { name: "SEO", level: "Expert" }
          ].map((tech) => (
            <div key={tech.name} className="bg-[#050505] p-6 flex flex-col justify-center items-center text-center hover:bg-white hover:text-black transition-colors duration-300 group cursor-default">
              <h4 className="font-serif text-lg mb-2 text-white group-hover:text-black transition-colors">{tech.name}</h4>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-black/60 transition-colors">{tech.level}</p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================
          4. CAREER TIMELINE (EDITORIAL)
          ========================================= */}
      <div id="experience" className="relative max-w-7xl w-full px-6 mt-32 pt-10">
        <h2 className="text-xs font-mono mb-10 text-slate-400 tracking-[0.3em] uppercase border-b border-white/20 pb-4">My Journey So Far</h2>
        
        <div className="relative space-y-12 pl-4 border-l border-white/20 ml-2">
          
          {[
            { date: "May 2024 — Oct 2025", title: "Senior Executive - Web Specialist", company: "Ikman.lk | Colombo, Sri Lanka", desc: "Engineered high-performance, SEO-friendly web applications using React and Next.js. Developed robust backend services and integrated real-time database and authentication solutions using Node.js and Supabase." },
            { date: "Aug 2022 — Mar 2024", title: "Full Stack Developer", company: "Precision Enterprises Inc | New York, USA", desc: "Led the end-to-end development and redesign of the company website, significantly increasing user engagement and SEO rankings. Developed and maintained custom full-stack web applications." },
            { date: "Jun 2021 — Jul 2022", title: "Social Media Strategist", company: "Lyceum International Schools | Nugegoda, Sri Lanka", desc: "Developed cross-platform social media strategies to increase brand visibility. Tracked performance metrics using Google Analytics and social insights to optimize future strategies." },
            { date: "Jan 2019 — Present", title: "Web Developer & SEO Specialist", company: "Freelance", desc: "Architected and deployed custom web applications and administrative dashboards using Next.js, React, and Supabase. Boosted organic traffic for global clients by conducting comprehensive SEO audits." }
          ].map((job, i) => (
            <div key={i} className="relative pl-10 group">
              {/* Stark white square node instead of glowing circles */}
              <div className="absolute left-[-21px] top-1.5 w-2 h-2 bg-white outline outline-4 outline-[#050505] group-hover:scale-150 transition-transform duration-300"></div>
              
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">{job.date}</span>
              <h4 className="text-2xl font-serif text-white mb-1 group-hover:text-slate-300 transition-colors">{job.title}</h4>
              <p className="text-xs font-mono text-slate-400 mb-4">{job.company}</p>
              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-3xl">{job.desc}</p>
            </div>
          ))}

        </div>
      </div>

      {/* =========================================
          5. SELECTED WORK GRID (SHARP EDGES)
          ========================================= */}
      <div id="projects" className="relative max-w-7xl w-full px-6 mt-32 pt-10">
        <h2 className="text-xs font-mono mb-10 text-slate-400 tracking-[0.3em] uppercase border-b border-white/20 pb-4">Selected Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects?.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id} prefetch={false} className="block group">
              <div className="flex flex-col h-full">
                
                {/* Image Container - Grayscale by default, color on hover */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0A0A] border border-white/10 mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                  {project.image_url && (
                    <Image 
                      src={project.image_url} 
                      alt={project.title} 
                      fill 
                      className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
                    />
                  )}
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-2xl font-serif text-white mb-3 group-hover:underline underline-offset-4 decoration-1">{project.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-3 font-light leading-relaxed">{project.short_description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tech_stack?.map((tech: string) => (
                        <span key={tech} className="text-[9px] font-mono uppercase tracking-widest text-slate-500 border border-white/10 px-2 py-1 whitespace-nowrap">
                          {tech}
                        </span>
                      ))}
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/projects" prefetch={false} className="px-8 py-4 border border-white/20 text-slate-300 font-mono text-xs uppercase tracking-[0.2em] hover:border-white hover:text-white transition-colors duration-300">
            View All Projects
          </Link>
        </div>
      </div>

      {/* =========================================
          6. CONTACT SECTION
          ========================================= */}
      <div id="contact" className="relative max-w-7xl w-full px-6 mt-32 mb-32 pt-10 border-t border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-10">
          
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-serif text-white mb-6">Let's talk directly.</h2>
            <p className="text-slate-400 font-light mb-10 text-lg leading-relaxed max-w-md">
              Skip the form. Send me a message on WhatsApp for the fastest response, or drop an email to discuss your next big idea.
            </p>
            
            <div className="space-y-6 font-mono text-sm uppercase tracking-widest text-white">
              <a href={`https://wa.me/${settings?.contact_whatsapp?.replace(/\+/g, '').replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-slate-400 transition-colors w-fit">
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
              <a href={`mailto:${settings?.contact_email}`} className="flex items-center gap-4 hover:text-slate-400 transition-colors w-fit">
                <Mail className="w-4 h-4" /> {settings?.contact_email}
              </a>
            </div>
          </div>

          <div className="border border-white/20 p-8 md:p-12">
            <h3 className="text-xs font-mono text-slate-400 tracking-[0.3em] uppercase mb-8">Send an Inquiry</h3>
            <ContactForm /> 
          </div>

        </div>
      </div>
    </main>
  );
}