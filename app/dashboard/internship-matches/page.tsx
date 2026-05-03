
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  ChevronRight, 
  Loader2,
  Filter,
  Zap,
  Clock,
  CheckCircle2,
  LayoutGrid,
  ListTodo,
  ExternalLink,
  Plus,
  Sparkles
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function InternshipMatchesPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Matches"); // Matches | Tracker
  const [matches, setMatches] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (activeTab === "Matches") {
        const response = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, type: 'internships' })
        });
        const data = await response.json();
        if (data.matches) setMatches(data.matches);
      } else {
        const { data } = await supabase
          .from('applications')
          .select('*')
          .eq('profile_id', user.id)
          .order('updated_at', { ascending: false });
        if (data) setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-40">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <span className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-[0.4em] block">Professional Pipeline</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Internship <br className="hidden md:block" /> {activeTab}.</h1>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveTab("Matches")}
            className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === "Matches" ? "bg-[#c1ff72] text-[#061a12]" : "text-white/40 hover:text-white"}`}
          >
            <Zap className="w-3 h-3" /> AI Matches
          </button>
          <button 
            onClick={() => setActiveTab("Tracker")}
            className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === "Tracker" ? "bg-[#c1ff72] text-[#061a12]" : "text-white/40 hover:text-white"}`}
          >
            <ListTodo className="w-3 h-3" /> My List
          </button>
        </div>
      </section>

      {loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#c1ff72]" />
          <p className="text-white/20 font-bold uppercase tracking-widest text-[10px]">Processing Pipeline...</p>
        </div>
      ) : activeTab === "Matches" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass group p-8 rounded-[40px] border-white/5 hover:border-[#c1ff72]/30 transition-all flex flex-col relative overflow-hidden"
            >
               <div className="absolute top-6 right-6">
                  <div className="px-3 py-1 rounded-full bg-[#c1ff72]/10 border border-[#c1ff72]/20">
                    <span className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest">
                      {Math.round(job.similarity * 100)}% Match
                    </span>
                  </div>
                </div>

              <div className="space-y-6 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#c1ff72] text-xl">
                  {job.company[0]}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-1">{job.role}</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{job.company}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    <Clock className="w-3 h-3" /> {job.duration}
                  </div>
                </div>

                <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {job.match_why && (
                  <div className="p-4 rounded-2xl bg-[#c1ff72]/5 border border-[#c1ff72]/10 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-[#c1ff72]" />
                      <span className="text-[8px] font-bold text-[#c1ff72] uppercase tracking-widest">Pathway Insight</span>
                    </div>
                    <p className="text-[11px] text-[#c1ff72]/80 leading-relaxed italic">
                      "{job.match_why}"
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="text-[#c1ff72] text-xs font-bold">
                  {job.currency} {job.stipend?.toLocaleString()}
                </div>
                <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-[#c1ff72] uppercase tracking-widest transition-colors">
                  Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-6 md:p-8 rounded-[32px] border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.03] transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-white/20">
                  {app.company[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{app.role}</h3>
                  <p className="text-white/30 text-xs font-medium uppercase tracking-widest">{app.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-12">
                 <div>
                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      app.status === 'Wishlist' ? 'border-white/10 text-white/40' :
                      app.status === 'Applied' ? 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5' :
                      'border-[#c1ff72]/20 text-[#c1ff72] bg-[#c1ff72]/5'
                    }`}>
                      {app.status}
                    </span>
                 </div>
                 <div>
                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Applied Date</p>
                    <p className="text-xs font-bold">{app.applied_at || "Not Applied"}</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                       <ExternalLink className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
          
          <button className="w-full py-10 rounded-[32px] border-2 border-dashed border-white/5 text-white/10 hover:text-[#c1ff72] hover:border-[#c1ff72]/20 transition-all flex flex-col items-center gap-3">
             <Plus className="w-6 h-6" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Add Manual Application</span>
          </button>
        </div>
      )}
    </div>
  );
}
