import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

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
            // Safe to ignore in Server Components
          }
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col md:flex-row font-sans selection:bg-cyan-500/30">
      
      {/* Sidebar - Fixed on desktop, top bar on mobile */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 h-screen overflow-y-auto relative z-10">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
        
        {/* Content Container */}
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      
    </div>
  );
}