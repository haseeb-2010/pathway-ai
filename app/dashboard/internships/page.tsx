
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { 
  Briefcase, 
  LayoutDashboard, 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  MessageSquare,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Target,
  Trophy,
  History,
  X,
  Loader2,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, supabaseMatching } from "@/lib/supabase";

type Tab = 'Dashboard' | 'Tracker' | 'Opportunities' | 'Interview Practice';

export default function InternshipsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#c1ff72]" /></div>}>
      <InternshipsContent />
    </Suspense>
  );
}

function InternshipsContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') || 'Dashboard') as Tab;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['Dashboard', 'Tracker', 'Opportunities', 'Interview Practice'].includes(tab)) {
      setActiveTab(tab as Tab);
    }
  }, [searchParams]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  return (
    <div className="space-y-8 pb-20">
      {/* Tabs Header */}
      <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-2xl w-full md:w-fit border border-white/5 overflow-x-auto scrollbar-hide">
        {(['Dashboard', 'Tracker', 'Opportunities', 'Interview Practice'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest shrink-0 ${
              activeTab === tab 
              ? "bg-[#c1ff72] text-[#061a12] shadow-lg shadow-[#c1ff72]/10" 
              : "text-white/40 hover:text-white/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Dashboard' && <DashboardTab userId={userId} />}
          {activeTab === 'Tracker' && <TrackerTab userId={userId} />}
          {activeTab === 'Opportunities' && <OpportunitiesTab userId={userId} />}
          {activeTab === 'Interview Practice' && <InterviewTab userId={userId} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Sub-Components ---

function DashboardTab({ userId }: { userId: string | null }) {
  const [stats, setStats] = useState({
    activeApps: 0,
    matchedOpps: 0,
    interviewsDone: 0,
    avgScore: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!userId) return;
      setLoading(true);
      try {
        const [appsRes, sessionsRes, matchRes] = await Promise.all([
          supabase.from('applications').select('id, status').eq('profile_id', userId),
          supabase.from('interview_sessions').select('score').eq('profile_id', userId).not('score', 'is', null),
          fetch('/api/match', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, type: 'internships' })
          }).then(res => res.json()).catch(() => ({ matches: [] }))
        ]);

        const activeApps = appsRes.data?.filter(a => ['Wishlist', 'Applied', 'Interview'].includes(a.status)).length || 0;
        const interviewsDone = sessionsRes.data?.length || 0;
        const scores = sessionsRes.data?.map(s => parseFloat(s.score)).filter(s => !isNaN(s)) || [];
        const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        const matchedOpps = matchRes.matches?.length || 0;

        setStats({
          activeApps,
          matchedOpps,
          interviewsDone,
          avgScore
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [userId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass p-8 rounded-[32px] border-white/5 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Applications" value={stats.activeApps.toString()} icon={<Briefcase className="w-5 h-5" />} color="#c1ff72" />
        <StatCard title="Matched Opps" value={stats.matchedOpps.toString()} icon={<Target className="w-5 h-5" />} color="#ffe44d" />
        <StatCard title="Interviews Done" value={stats.interviewsDone.toString()} icon={<MessageSquare className="w-5 h-5" />} color="#00ff88" />
        <StatCard title="Avg Score" value={stats.avgScore > 0 ? `${stats.avgScore}%` : "N/A"} icon={<Trophy className="w-5 h-5" />} color="#ff4444" />
      </div>

      {stats.activeApps === 0 && stats.interviewsDone === 0 ? (
        <div className="col-span-full">
          <div className="glass p-12 md:p-20 rounded-[40px] border-white/5 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#c1ff72]/10 flex items-center justify-center mb-8">
              <Sparkles className="w-10 h-10 text-[#c1ff72]" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Start Your Journey.</h2>
            <p className="text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
              Begin by searching for opportunities or tracking your existing applications to get AI-powered insights and interview prep.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
           <div className="glass p-8 rounded-[40px] border-white/5 space-y-6">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <div className="space-y-4">
                 <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Stay tuned for detailed analytics</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: any, color: string }) {
  return (
    <div className="glass p-8 rounded-[32px] border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-2xl bg-white/5 text-white/40 group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
      </div>
      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}

function TrackerTab({ userId }: { userId: string | null }) {
  const [apps, setApps] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchApps() {
      if (!userId) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('profile_id', userId)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Fetch Apps Error:", error);
        } else {
          setApps(data || []);
        }
      } catch (err) {
        console.error("Fetch Apps Catch:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchApps();
  }, [userId]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold">Your Applications</h2>
          <p className="text-white/40 text-sm mt-1">Start adding jobs you're interested in</p>
        </div>
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#c1ff72] transition-colors" />
              <input 
                type="text" 
                placeholder="Search role, company..." 
                className="bg-white/5 border border-white/5 rounded-xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-[#c1ff72]/30 w-full md:w-64 transition-all"
              />
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="bg-[#c1ff72] text-[#061a12] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
           >
             <Plus className="w-4 h-4" /> New App
           </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#c1ff72]" />
        </div>
      ) : apps.length === 0 ? (
        <div className="glass p-20 rounded-[40px] border-white/5 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <Briefcase className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-xl font-bold mb-2">No applications yet</h3>
          <p className="text-white/30 text-sm max-w-sm mb-8">Add your first job to start tracking your search. You got this!</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#c1ff72] text-[#061a12] px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add first application
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div key={app.id} className="glass p-8 rounded-[32px] border-white/5 hover:border-white/10 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-xl font-bold text-white/20">
                  {app.company[0]}
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  app.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' :
                  app.status === 'Interview' ? 'bg-[#c1ff72]/20 text-[#c1ff72]' :
                  'bg-white/5 text-white/40'
                }`}>
                  {app.status}
                </div>
              </div>
              <h3 className="text-lg font-bold group-hover:text-[#c1ff72] transition-colors">{app.role}</h3>
              <p className="text-white/40 text-sm mb-6">{app.company}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <MapPin className="w-4 h-4" /> {app.location || 'Remote'}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <Calendar className="w-4 h-4" /> {new Date(app.applied_at).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <button className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Details</button>
                {app.link && (
                  <a href={app.link} target="_blank" className="p-3 bg-white/5 hover:bg-[#c1ff72]/10 hover:text-[#c1ff72] rounded-xl transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <TrackerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={userId} onRefresh={() => {
        setIsLoading(true);
        supabase.from('applications').select('*').eq('profile_id', userId).order('created_at', { ascending: false }).then(({ data }) => {
          setApps(data || []);
          setIsLoading(false);
        });
      }} />
    </div>
  );
}

function TrackerModal({ isOpen, onClose, userId, onRefresh }: { isOpen: boolean, onClose: () => void, userId: string | null, onRefresh: () => void }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    priority: 'Medium',
    location: '',
    link: '',
    applied_at: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || isSubmitting) return;
    setIsSubmitting(true);

    const { error } = await supabase.from('applications').insert({
      ...formData,
      profile_id: userId
    });

    if (error) {
      alert("Failed to add application: " + error.message);
    } else {
      onRefresh();
      onClose();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#061a12] border border-white/10 w-full max-w-2xl rounded-[40px] overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Add a new application</h3>
            <p className="text-white/40 text-sm mt-1">Fill in the basics — you can add more later.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <X className="w-6 h-6 text-white/40" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Job Title *</label>
              <input 
                required
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. Product Manager" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Company *</label>
              <input 
                required
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                placeholder="Company name" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Status</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all appearance-none"
              >
                <option value="Wishlist">Wishlist</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Priority</label>
              <select 
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all appearance-none"
              >
                <option value="Not set">Not set</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Location</label>
              <input 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Remote, Singapore" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Applied on</label>
              <input 
                type="date"
                value={formData.applied_at}
                onChange={e => setFormData({...formData, applied_at: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Job link</label>
            <input 
              value={formData.link}
              onChange={e => setFormData({...formData, link: e.target.value})}
              placeholder="https://..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Notes</label>
            <textarea 
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              placeholder="Quick notes or reminders..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all h-32 resize-none"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 bg-white/5 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#c1ff72] text-[#061a12] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function OpportunitiesTab({ userId }: { userId: string | null }) {
  const [opps, setOpps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMatches = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setOpps(data.matches || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [userId]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Matched Opportunities</h2>
          <p className="text-white/40 text-sm mt-1">AI-powered extraction based on your profile</p>
        </div>
        <button 
          onClick={fetchMatches}
          disabled={isLoading}
          className="bg-[#c1ff72]/10 text-[#c1ff72] border border-[#c1ff72]/20 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#c1ff72]/20 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> 
          {isLoading ? 'Analyzing...' : 'Recalculate Matches'}
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-[#c1ff72]/20 border-t-[#c1ff72] animate-spin" />
            <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-[#c1ff72] animate-pulse" />
          </div>
          <p className="text-white/40 text-sm animate-pulse">Running vector matching across database...</p>
        </div>
      ) : opps.length === 0 ? (
        <div className="glass p-20 rounded-[40px] border-white/5 flex flex-col items-center text-center">
          <p className="text-white/40">No matches found. Try updating your profile skills.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opps.map((opp) => (
            <motion.div 
              key={opp.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-[32px] border-white/5 hover:border-[#c1ff72]/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                 <div className="bg-[#c1ff72]/10 text-[#c1ff72] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                   {opp.match_score}% Match
                 </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-xl font-bold text-white/20 mb-6">
                {opp.company[0]}
              </div>
              <h3 className="text-lg font-bold group-hover:text-[#c1ff72] transition-colors line-clamp-1">{opp.role}</h3>
              <p className="text-white/40 text-sm mb-6">{opp.company}</p>
              
              <p className="text-white/60 text-xs line-clamp-3 mb-6 leading-relaxed">
                {opp.why}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {opp.location && (
                  <span className="px-2 py-1 bg-white/5 rounded-md text-[9px] font-bold text-white/30 uppercase tracking-tighter flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {opp.location}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <a 
                  href={opp.apply_link || "#"} 
                  target="_blank"
                  className="flex-1 bg-[#c1ff72] text-[#061a12] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-center hover:scale-[1.02] transition-all"
                >
                  Apply Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function InterviewTab({ userId }: { userId: string | null }) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSessions() {
      if (!userId) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('interview_sessions')
          .select('*')
          .eq('profile_id', userId)
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Fetch Sessions Error:", error);
        } else {
          setSessions(data || []);
        }
      } catch (err) {
        console.error("Fetch Sessions Catch:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSessions();
  }, [userId]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Sessions" value={sessions.length.toString()} icon={<History className="w-5 h-5" />} color="#c1ff72" />
        <StatCard title="Completion Rate" value="0%" icon={<ChevronRight className="w-5 h-5" />} color="#ffe44d" />
        <StatCard title="Avg Score" value="-" icon={<Trophy className="w-5 h-5" />} color="#00ff88" />
        <StatCard title="Active Sessions" value="0" icon={<Clock className="w-5 h-5" />} color="#ff4444" />
      </div>

      <div className="flex items-center justify-between mt-12">
        <h2 className="text-2xl font-bold">Past Sessions</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#c1ff72] text-[#061a12] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Start Session
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-[#c1ff72]" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="glass p-20 rounded-[40px] border-white/5 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-xl font-bold mb-2">Let's get your first practice on the books</h3>
          <p className="text-white/30 text-sm max-w-sm mb-8">Keep a record of every interview dry run with AI-powered feedback.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#c1ff72] text-[#061a12] px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Start practicing
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map(s => (
            <div key={s.id} className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-bold">{s.role}</h4>
                <p className="text-white/40 text-xs">{s.company}</p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Score</p>
                    <p className="font-bold text-[#c1ff72]">{s.score || 'N/A'}</p>
                 </div>
                 <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                    <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <InterviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={userId} />
    </div>
  );
}

function InterviewModal({ isOpen, onClose, userId }: { isOpen: boolean, onClose: () => void, userId: string | null }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    description: '',
    focus_areas: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || isSubmitting) return;
    setIsSubmitting(true);

    const { data, error } = await supabase.from('interview_sessions').insert({
      ...formData,
      profile_id: userId,
      status: 'In Progress'
    }).select().single();

    if (error) {
      console.error("Session Insert Error:", error);
      alert("Failed to start session: " + error.message);
    } else if (data) {
      console.log("Session created:", data.id);
      router.push(`/dashboard/internships/interview/${data.id}`);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#061a12] border border-white/10 w-full max-w-2xl rounded-[40px] overflow-hidden relative z-10"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Start a new practice session</h3>
            <p className="text-white/40 text-sm mt-1">Share the role details so we can tailor questions to your next interview.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <X className="w-6 h-6 text-white/40" />
          </button>
        </div>

        <form onSubmit={handleStart} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Role</label>
              <input 
                required
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. Senior Backend Engineer" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Company</label>
              <input 
                required
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                placeholder="Who is interviewing?" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Job description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Paste the job description or outline the responsibilities." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all h-32 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Focus areas (optional)</label>
            <textarea 
              value={formData.focus_areas}
              onChange={e => setFormData({...formData, focus_areas: e.target.value})}
              placeholder="Add skills, technologies, or themes you want to emphasize." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all h-24 resize-none"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 bg-white/5 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#c1ff72] text-[#061a12] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Start practicing
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
