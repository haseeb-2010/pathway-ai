"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "University Matches", value: "12", sub: "3 High Probability", icon: Target, color: "#c1ff72" },
    { label: "Applications", value: "4", sub: "2 In Progress", icon: Clock, color: "#ffe44d" },
    { label: "Success Rate", value: "92%", sub: "Visa Prediction", icon: Sparkles, color: "#c1ff72" },
  ];

  const deadlines = [
    { title: "TU Munich Application", date: "June 15, 2026", status: "Urgent", color: "#ef4444" },
    { title: "SOP Review - ETH Zurich", date: "June 20, 2026", status: "Upcoming", color: "#ffe44d" },
  ];

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
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Welcome back, <br className="hidden md:block" /> Future Leader.</h1>
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
              <Link href="/dashboard/tracker" className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest hover:underline">View Pipeline</Link>
           </div>
           
           <div className="space-y-4">
              {[
                { name: "Software Engineer Intern", company: "Google", stage: "Interview", color: "#c1ff72" },
                { name: "Product Analyst", company: "Spotify", stage: "Applied", color: "#ffe44d" },
                { name: "Data Science", company: "ASML", stage: "Draft", color: "white" }
              ].map((app, i) => (
                <div key={i} className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between group hover:bg-white/[0.03] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-white/20 text-xs">
                      {app.company[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{app.name}</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest">{app.company}</p>
                    </div>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border"
                    style={{ borderColor: `${app.color}20`, color: app.color, backgroundColor: `${app.color}05` }}
                  >
                    {app.stage}
                  </span>
                </div>
              ))}
           </div>
        </div>

        {/* Deadlines & Tasks */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight">Priority Deadlines</h3>
          <div className="glass p-8 rounded-[32px] border-white/5 space-y-8">
            {deadlines.map((d, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  {d.status === "Urgent" ? <AlertCircle className="w-6 h-6 text-red-500" /> : <Clock className="w-6 h-6 text-[#ffe44d]" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-base">{d.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: d.color }}>{d.status}</span>
                  </div>
                  <p className="text-white/40 text-xs font-medium">{d.date}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-4 rounded-xl border border-white/5 text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white hover:border-white/10 transition-all">
              Manage Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
