import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Target, TrendingUp, Users, BarChart3, Zap, MessageSquare, ArrowLeft, Code2, Briefcase, Activity, Sparkles, Award } from 'lucide-react';

// Force Next.js to always fetch fresh data
export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function MetaAdsPage() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single();

  return (
    <main className="relative z-10 flex flex-col items-center w-full overflow-hidden pb-32 pt-24 md:pt-32">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* Back Button */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 mb-6 z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to main portfolio
        </Link>
      </div>

      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-6 z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden border-t-2 border-t-purple-500/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 items-center">
            <div className="order-2 md:order-1 flex flex-col items-start text-left">
              <p className="text-purple-400 font-mono text-sm uppercase tracking-widest mb-3">Specialized Service</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                Data-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Meta Ads</span> Specialist
              </h1>
              <h2 className="text-lg md:text-xl text-slate-300 font-medium mb-6">
                Turning ad spend into measurable revenue.
              </h2>
              <p className="text-slate-400 font-light leading-relaxed max-w-2xl mb-8 text-sm md:text-base">
                I don't just boost posts. I build full-funnel Meta advertising architectures. By combining my background as a Full Stack Developer with performance marketing, I ensure flawless pixel tracking, Conversions API (CAPI) integration, and highly segmented audience targeting that standard marketers miss.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-6 py-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition-all font-medium text-sm">
                  Let's Discuss Your Campaign
                </a>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-start md:justify-end">
               <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                 <Image src={settings?.portrait_url || "/images/portrait.jpg"} alt="Chamathka Addarage" fill className="object-cover" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          2. CORE COMPETENCIES GRID
          ========================================= */}
      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-6 mt-16 z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-6 bg-purple-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-white tracking-wide uppercase">Core Expertise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
            <Target className="w-8 h-8 text-purple-400 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-3">Full-Funnel Strategy</h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Mapping out customer journeys from cold awareness to retargeting and retention. I build campaigns that nurture leads rather than just asking for immediate sales.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group">
            <Code2 className="w-8 h-8 text-cyan-400 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-3">Advanced Tracking & API</h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              My developer background means your Meta Pixel and Conversions API (CAPI) are integrated flawlessly. No lost data, precise event tracking, and accurate ROAS reporting.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
            <TrendingUp className="w-8 h-8 text-blue-400 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-3">A/B Testing & Optimization</h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Continuous multivariate testing of creatives, copy, and audience segments to lower CPA (Cost Per Acquisition) and scale winning ad sets aggressively.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
            <Users className="w-8 h-8 text-emerald-400 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-3">Audience Engineering</h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Creating highly profitable Lookalike Audiences (LALs) and custom remarketing pools based on high-intent user behavior and lifetime value (LTV) data.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          3. PROVEN TRACK RECORD
          ========================================= */}
      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-6 mt-16 z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-6 bg-cyan-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-white tracking-wide uppercase">Proven Track Record</h2>
        </div>

        <div className="space-y-6">
          
          {/* Ikman Case Study */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-white/[0.02] transition-colors">
            <div className="p-4 bg-cyan-500/10 rounded-2xl shrink-0">
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-1">Ikman.lk</h3>
              <p className="text-sm text-slate-400 font-medium mb-3">Enterprise Event Tracking & Re-marketing</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
                Integrated advanced Server-Side Tracking (CAPI) for a platform generating 5M+ monthly visitors. Restructured dynamic retargeting catalogs, significantly improving ad relevance and event match quality (EMQ).
              </p>
            </div>
            <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
              <div className="text-3xl font-extrabold text-cyan-400 tracking-tight">-22%</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Cost Per Acquisition</div>
            </div>
          </div>

          {/* Precision Enterprises Case Study */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-white/[0.02] transition-colors">
            <div className="p-4 bg-purple-500/10 rounded-2xl shrink-0">
              <Briefcase className="w-8 h-8 text-purple-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-1">Precision Enterprises Inc</h3>
              <p className="text-sm text-slate-400 font-medium mb-3">B2B Lead Generation Scaling</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
                Managed high-volume ad budgets for corporate lead generation. Built custom, high-converting landing pages seamlessly integrated with the Meta Pixel to feed accurate conversion data back to the ad algorithm.
              </p>
            </div>
            <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
              <div className="text-3xl font-extrabold text-purple-400 tracking-tight">+315%</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Increase in ROAS</div>
            </div>
          </div>

          {/* Pramuditha Case Study - Personal Branding */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-white/[0.02] transition-colors">
            <div className="p-4 bg-pink-500/10 rounded-2xl shrink-0">
              <Sparkles className="w-8 h-8 text-pink-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-1">Pramuditha Dissanayaka</h3>
              <p className="text-sm text-slate-400 font-medium mb-3">Personal Branding & Creative Authority</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
                Scaled personal brand awareness for a creative professional. Utilized highly targeted visual ad campaigns and engagement retargeting to build a loyal audience and drive high-value service inquiries.
              </p>
            </div>
            <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
              <div className="text-3xl font-extrabold text-pink-400 tracking-tight">12.5k+</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Targeted Followers</div>
            </div>
          </div>

          {/* Senali Case Study - Personal Branding */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-white/[0.02] transition-colors">
            <div className="p-4 bg-orange-500/10 rounded-2xl shrink-0">
              <Award className="w-8 h-8 text-orange-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-1">Senali Fonseka</h3>
              <p className="text-sm text-slate-400 font-medium mb-3">Influencer Growth & Audience Retention</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
                Developed a full-funnel engagement strategy to rapidly boost personal brand authority. Leveraged advanced Lookalike Audiences (LALs) to connect with high-intent demographics across Meta platforms.
              </p>
            </div>
            <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
              <div className="text-3xl font-extrabold text-orange-400 tracking-tight">3.2x</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Engagement Multiplier</div>
            </div>
          </div>

          {/* Lyceum Case Study */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-white/[0.02] transition-colors">
            <div className="p-4 bg-blue-500/10 rounded-2xl shrink-0">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-1">Lyceum International</h3>
              <p className="text-sm text-slate-400 font-medium mb-3">Targeted Enrollment Campaigns</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
                Executed a precision-targeted enrollment campaign for the academic year. Engineered highly profitable Lookalike Audiences (LALs) based on past alumni data to drive qualified parent leads.
              </p>
            </div>
            <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
              <div className="text-3xl font-extrabold text-blue-400 tracking-tight">1,200+</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Qualified Leads</div>
            </div>
          </div>

          {/* Freelance Scaling Case Study */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-white/[0.02] transition-colors">
            <div className="p-4 bg-emerald-500/10 rounded-2xl shrink-0">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-1">E-Commerce Brand Scaling</h3>
              <p className="text-sm text-slate-400 font-medium mb-3">Direct-to-Consumer (DTC) Growth</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
                Scaled an independent e-commerce brand's monthly recurring revenue in 6 months using dynamic product ads (DPA), aggressive creative testing, and highly segmented cart-abandonment retargeting funnels.
              </p>
            </div>
            <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
              <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">8x</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Revenue Multiplier</div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================
          4. MY APPROACH (STATS/WORKFLOW)
          ========================================= */}
      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-6 mt-16 z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="py-4 md:py-0 px-4">
              <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-3" />
              <h4 className="text-2xl font-bold text-white mb-1">Data-First</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Decision Making</p>
            </div>
            
            <div className="py-4 md:py-0 px-4">
              <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
              <h4 className="text-2xl font-bold text-white mb-1">Rapid</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Creative Testing</p>
            </div>

            <div className="py-4 md:py-0 px-4">
              <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
              <h4 className="text-2xl font-bold text-white mb-1">Scalable</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest">ROAS Focus</p>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================
          5. CONTACT
          ========================================= */}
      <div id="contact" className="relative w-full max-w-5xl mx-auto px-4 md:px-6 mt-16 z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-12 h-full flex flex-col items-center justify-center text-center border border-white/5 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to scale your business?</h3>
          <p className="text-slate-400 text-sm md:text-base font-light mb-8 max-w-lg">
            Let's jump on a quick call to audit your current ad account or discuss the strategy for your upcoming campaign.
          </p>
          
          <a 
            href={`https://wa.me/${settings?.contact_whatsapp?.replace(/\+/g, '').replace(/\s/g, '')}`} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
          >
            <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      </div>

    </main>
  );
}