import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  
  // Initialize modern Supabase SSR client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored in Server Components
          }
        },
      },
    }
  );
  
  // Count how many projects exist in the database
  const { count } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Dashboard Overview</h1>
      <p className="text-slate-400 mb-10 font-light">Welcome back to the command center.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Stat Card 1 */}
        <div className="bg-[#0A0D14]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-colors duration-500"></div>
           <h3 className="text-slate-500 text-sm font-medium mb-3 tracking-wide uppercase">Total Projects</h3>
           <p className="text-4xl font-bold text-white">{count || 0}</p>
        </div>
        
        {/* Stat Card 2 */}
        <div className="bg-[#0A0D14]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-colors duration-500"></div>
           <h3 className="text-slate-500 text-sm font-medium mb-3 tracking-wide uppercase">Site Settings</h3>
           <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
             <p className="text-2xl font-bold text-white">Online</p>
           </div>
        </div>

      </div>
    </div>
  );
}