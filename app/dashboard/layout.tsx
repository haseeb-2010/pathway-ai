"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  PanelLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userName, setUserName] = useState("Student User");
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (profile?.full_name) {
          setUserName(profile.full_name);
        }
      }
    };
    fetchProfile();
  }, []);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Academic Copilot", href: "/dashboard/copilot", icon: BookOpen },
    { name: "Internships", href: "/dashboard/internships", icon: Briefcase },
    { name: "Consultant", href: "/dashboard/consultant", icon: BookOpen },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="h-screen bg-[#061a12] text-white flex flex-col overflow-hidden">
      {/* Unified Top Header */}
      <header className="h-20 border-b border-white/5 bg-[#061a12]/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-12 shrink-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.svg" alt="Pathway Logo" className="h-12 md:h-16 w-auto object-contain -ml-6 md:-ml-10 scale-125 origin-left" />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2 text-white/40 hover:text-[#c1ff72] transition-colors">
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#061a12]" />
            </button>
            <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-white/5">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-white">{userName}</p>
              </div>
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-white/60 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <motion.aside 
          animate={{ width: isCollapsed ? 96 : 288 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="hidden lg:flex flex-col border-r border-white/5 bg-[#061a12]/30 backdrop-blur-xl h-full overflow-hidden"
        >
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center rounded-2xl font-bold text-sm transition-all group relative ${
                    isCollapsed ? "justify-center p-4" : "gap-3 px-6 py-4"
                  } ${
                    isActive 
                    ? "bg-[#c1ff72] text-[#061a12] shadow-[0_10px_20px_rgba(193,255,114,0.1)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#061a12]" : "text-white/20 group-hover:text-[#c1ff72]"}`} />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                  {isCollapsed && isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#c1ff72] rounded-2xl -z-10"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 space-y-2 border-t border-white/5">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`flex items-center gap-3 w-full rounded-2xl text-white/40 font-bold text-sm hover:text-[#c1ff72] hover:bg-[#c1ff72]/5 transition-all group ${
                isCollapsed ? "justify-center p-4" : "px-6 py-4"
              }`}
            >
              <PanelLeft className={`w-5 h-5 text-white/20 group-hover:text-[#c1ff72] shrink-0 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
              {!isCollapsed && <span>Collapse</span>}
            </button>
            <button 
              onClick={handleSignOut}
              className={`flex items-center gap-3 w-full rounded-2xl text-white/40 font-bold text-sm hover:text-red-400 hover:bg-red-400/5 transition-all group ${
                isCollapsed ? "justify-center p-4" : "px-6 py-4"
              }`}
            >
              <LogOut className="w-5 h-5 text-white/20 group-hover:text-red-400 shrink-0" />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </motion.aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.aside 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 w-[80%] h-full bg-[#061a12] z-[70] p-8 border-r border-white/10 lg:hidden"
              >
                <div className="flex items-center justify-between mb-12">
                  <img src="/logo.svg" alt="Pathway Logo" className="h-8" />
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <X className="w-6 h-6 text-white/40" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                          isActive ? "bg-[#c1ff72] text-[#061a12]" : "text-white/40"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
                <div className="absolute bottom-8 left-8 right-8">
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-white/40 font-bold transition-all border border-white/5"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <div className="p-6 md:p-12 max-w-7xl mx-auto">
            {/* Context Title for Main Area */}
            <div className="mb-10 md:mb-16">
              <p className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-[0.3em] mb-3">Dashboard / Navigation</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {navItems.find(n => n.href === pathname)?.name || "Overview"}
              </h1>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
