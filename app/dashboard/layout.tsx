"use client";

import { useState } from "react";
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
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Academic Copilot", href: "/dashboard/copilot", icon: BookOpen },
    { name: "Internship Tracker", href: "/dashboard/tracker", icon: Briefcase },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#061a12] text-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 bg-[#061a12]/50 backdrop-blur-xl h-screen sticky top-0">
        <div className="p-8">
          <Link href="/">
            <img src="/logo.svg" alt="Pathway Logo" className="h-8" />
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all group ${
                  isActive 
                  ? "bg-[#c1ff72] text-[#061a12] shadow-[0_20px_40px_rgba(193,255,114,0.15)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-[#061a12]" : "text-white/20 group-hover:text-[#c1ff72]"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-6 py-4 rounded-2xl text-white/40 font-bold text-sm hover:text-red-400 hover:bg-red-400/5 transition-all group"
          >
            <LogOut className="w-5 h-5 text-white/20 group-hover:text-red-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-[#061a12]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo.svg" alt="Pathway Logo" className="h-6" />
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white/60">
          <Menu className="w-6 h-6" />
        </button>
      </div>

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
      <main className="flex-1 min-h-screen pt-24 lg:pt-0">
        {/* Top bar - Desktop */}
        <div className="hidden lg:flex items-center justify-between px-12 py-8 border-b border-white/5 bg-[#061a12]/30 backdrop-blur-md sticky top-0 z-40">
          <h2 className="text-xl font-bold tracking-tight text-white/80 uppercase tracking-[0.2em]">
            {navItems.find(n => n.href === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-white/40 hover:text-[#c1ff72] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#061a12]" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="Avatar" />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
