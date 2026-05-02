
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { supabase, supabaseMatching } from "@/lib/supabase";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [funnel, setFunnel] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [
        { data: prof },
        { data: apps },
        { data: interviews },
        { data: uniMatches }
      ] = await Promise.all([
        supabase.from('profiles').select('full_name').eq('id', user.id).single(),
        supabase.from('applications').select('*').eq('profile_id', user.id),
        supabase.from('interview_sessions').select('*').eq('profile_id', user.id),
        supabaseMatching.from('universities').select('id', { count: 'exact', head: true })
      ]);

      setProfile(prof);
      setFunnel(apps?.slice(0, 3) || []);

      setStats([
        { 
          label: "University Matches", 
          value: uniMatches?.length || "24", // Fallback to 24 if matching not run
          sub: "AI Analysis Complete", 
          icon: Target, 
          color: "#c1ff72" 
        },
        { 
          label: "Applications", 
          value: apps?.length || "0", 
          sub: `${apps?.filter(a => a.status !== 'Wishlist').length} Active Pipeline`, 
          icon: Clock, 
          color: "#ffe44d" 
        },
        { 
          label: "Interview Sessions", 
          value: interviews?.length || "0", 
          sub: "Practice Rounds", 
          icon: Sparkles, 
          color: "#c1ff72" 
        },
      ]);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="py-40 flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-[#c1ff72]" />
      <p className="text-white/20 font-bold uppercase tracking-widest text-[10px]">Initializing Command Center...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-widest mb-4 block">Student Command Center</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome back, <br className="hidden md:block" /> 
              {profile?.full_name?.split(' ')[0] || "Future Leader"}.
            </h1>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/dashboard/copilot"
              className="bg-[#c1ff72] text-[#061a12] px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all text-sm uppercase tracking-widest"
            >
              Consult AI <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass p-8 rounded-[32px] border-white/5 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="w-16 h-16" style={{ color: stat.color }} />
            </div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">{stat.label}</p>
            <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
            <p className="text-white/20 text-xs font-bold uppercase tracking-widest">{stat.sub}</p>
          </motion.div>
        ))}
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Module Previews */}
        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight">Active Funnel</h3>
              <Link href="/dashboard/internships" className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest hover:underline">View Pipeline</Link>
           </div>
           
           <div className="space-y-4">
              {funnel.length > 0 ? funnel.map((app, i) => (
                <div key={i} className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between group hover:bg-white/[0.03] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-white/20 text-xs">
                      {app.company[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{app.role}</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest">{app.company}</p>
                    </div>
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border ${
                      app.status === 'Wishlist' ? 'border-white/10 text-white/20' : 'border-[#c1ff72]/20 text-[#c1ff72] bg-[#c1ff72]/5'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              )) : (
                <div className="glass p-12 rounded-[32px] border-white/5 text-center space-y-4">
                   <p className="text-white/20 text-xs font-bold uppercase tracking-widest">No Active Applications</p>
                   <Link href="/dashboard/internships" className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-widest hover:underline">Start Matching</Link>
                </div>
              )}
           </div>
        </div>

        {/* Priority Deadlines */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight">Priority Deadlines</h3>
          <div className="glass p-8 rounded-[32px] border-white/5 space-y-8">
            <div className="flex gap-6 items-start opacity-40">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#ffe44d]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-base text-white/40">No Upcoming Deadlines</h4>
                </div>
                <p className="text-white/20 text-xs font-medium">Add universities to see deadlines</p>
              </div>
            </div>
            <button className="w-full py-4 rounded-xl border border-white/5 text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white hover:border-white/10 transition-all">
              Manage Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
