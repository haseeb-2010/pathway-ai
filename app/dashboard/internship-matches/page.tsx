
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
  Sparkles,
  Search,
  Calendar,
  X,
  Edit2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function InternshipMatchesPage() {
  const [view, setView] = useState<'preferences' | 'matches' | 'tracker'>('preferences');
  const [preferences, setPreferences] = useState({
    role: "",
    type: "Remote",
    countries: [] as string[],
    stipend: "Any"
  });
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Detail Modal State
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [editingApp, setEditingApp] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const roles = ["Software Engineering", "Product Management", "Data Science", "UI/UX Design", "Marketing", "Finance"];
  const types = ["Remote", "On-site", "Hybrid"];
  const countries = ["USA", "Germany", "UK", "Canada", "Singapore", "Australia"];
  const stipendLevels = ["Any", "Paid Only", "High (> $2000/mo)"];

  const toggleCountry = (country: string) => {
    setPreferences(prev => ({
      ...prev,
      countries: prev.countries.includes(country) 
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }));
  };

  const handleRunMatcher = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          type: 'internships',
          preferences 
        })
      });
      const data = await response.json();
      if (data.matches) setMatches(data.matches);
      setView('matches');
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackerData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from('applications')
        .select('*')
        .eq('profile_id', user.id)
        .order('updated_at', { ascending: false });
      if (data) setApplications(data);
    } catch (error) {
      console.error("Error fetching tracker:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'tracker') fetchTrackerData();
  }, [view]);

  const filteredApps = applications.filter(app => 
    app.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-40">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <span className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-[0.4em] block">Professional Pipeline</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Internship <br className="hidden md:block" /> {view === 'preferences' ? 'Goals' : view === 'matches' ? 'Matches' : 'Tracker'}.</h1>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
          <button 
            onClick={() => setView("preferences")}
            className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${view === "preferences" ? "bg-[#c1ff72] text-[#061a12]" : "text-white/40 hover:text-white"}`}
          >
            <Filter className="w-3 h-3" /> Goals
          </button>
          <button 
            onClick={() => setView("matches")}
            disabled={matches.length === 0}
            className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${view === "matches" ? "bg-[#c1ff72] text-[#061a12]" : "text-white/40 hover:text-white disabled:opacity-20"}`}
          >
            <Zap className="w-3 h-3" /> AI Matches
          </button>
          <button 
            onClick={() => setView("tracker")}
            className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${view === "tracker" ? "bg-[#c1ff72] text-[#061a12]" : "text-white/40 hover:text-white"}`}
          >
            <ListTodo className="w-3 h-3" /> Tracker
          </button>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {view === 'preferences' && (
          <motion.div 
            key="prefs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-2 gap-16"
          >
            <div className="space-y-10">
              <div className="space-y-8">
                {/* Role Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-4">Target Role</label>
                  <div className="flex flex-wrap gap-3">
                    {roles.map(r => (
                      <button 
                        key={r}
                        onClick={() => setPreferences({...preferences, role: r})}
                        className={`px-6 py-3 rounded-2xl border font-bold text-sm transition-all ${
                          preferences.role === r 
                          ? "bg-[#c1ff72] border-[#c1ff72] text-[#061a12]" 
                          : "border-white/5 bg-white/5 text-white/40 hover:border-white/10"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-4">Work Preference</label>
                  <div className="flex flex-wrap gap-3">
                    {types.map(t => (
                      <button 
                        key={t}
                        onClick={() => setPreferences({...preferences, type: t})}
                        className={`px-6 py-3 rounded-2xl border font-bold text-sm transition-all ${
                          preferences.type === t 
                          ? "bg-[#c1ff72] border-[#c1ff72] text-[#061a12]" 
                          : "border-white/5 bg-white/5 text-white/40 hover:border-white/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-4">Preferred Countries</label>
                  <div className="flex flex-wrap gap-3">
                    {countries.map(c => (
                      <button 
                        key={c}
                        onClick={() => toggleCountry(c)}
                        className={`px-6 py-3 rounded-2xl border font-bold text-sm transition-all ${
                          preferences.countries.includes(c) 
                          ? "bg-[#c1ff72] border-[#c1ff72] text-[#061a12]" 
                          : "border-white/5 bg-white/5 text-white/40 hover:border-white/10"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleRunMatcher}
                  disabled={loading || !preferences.role}
                  className="w-full bg-[#c1ff72] text-[#061a12] py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(193,255,114,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>Aligning Career Path <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    "Search Opportunities"
                  )}
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="glass p-12 rounded-[60px] border-white/5 h-full flex flex-col justify-center items-center text-center space-y-8">
                <div className="w-24 h-24 rounded-[32px] bg-[#c1ff72]/10 flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-[#c1ff72]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Precision Job RAG</h3>
                  <p className="text-white/30 text-sm leading-relaxed max-w-xs mx-auto">
                    We match your specific skills and preferences against 10,000+ internship opportunities globally.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'matches' && (
          <motion.div 
            key="matches"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center space-y-8">
                 <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-[#c1ff72]/20 border-t-[#c1ff72] animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-[#c1ff72] animate-pulse" />
                 </div>
                 <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-[0.2em]">RAG Engine Pulse</h3>
                    <p className="text-white/30 text-sm font-medium italic">Scouring global databases for your perfect fit...</p>
                 </div>
              </div>
            ) : matches.length > 0 ? (
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

                      <p className="text-xs text-white/40 line-clamp-3 leading-relaxed">
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
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-[#c1ff72] uppercase tracking-widest transition-colors"
                      >
                        Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-40 flex flex-col items-center text-center space-y-6">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/10">
                    <Search className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-bold">No Precise Matches Found</h3>
                    <p className="text-white/30 max-w-sm mx-auto">Try adjusting your preferences or target countries for better alignment.</p>
                 </div>
                 <button onClick={() => setView('preferences')} className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-widest hover:underline">Adjust Goals</button>
              </div>
            )}
          </motion.div>
        )}

        {view === 'tracker' && (
          <motion.div 
            key="tracker"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 max-w-md relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#c1ff72] transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search applications..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-[#c1ff72]/30 transition-all"
                />
              </div>
              <button 
                onClick={() => {
                  setEditingApp(null);
                  setIsModalOpen(true);
                }}
                className="bg-[#c1ff72] text-[#061a12] px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-[#c1ff72]/10"
              >
                <Plus className="w-4 h-4" /> Add Application
              </button>
            </div>

            <div className="space-y-4">
              {filteredApps.length > 0 ? filteredApps.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass p-6 md:p-8 rounded-[32px] border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-white/20">
                      {app.company?.[0] || "J"}
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
                          app.status === 'Interview' ? 'border-[#c1ff72]/20 text-[#c1ff72] bg-[#c1ff72]/5' :
                          'border-[#c1ff72]/20 text-[#c1ff72] bg-[#c1ff72]/5'
                        }`}>
                          {app.status}
                        </span>
                     </div>
                     <div>
                        <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Last Update</p>
                        <p className="text-xs font-bold">{new Date(app.updated_at || app.created_at).toLocaleDateString()}</p>
                     </div>
                     <div className="flex gap-2">
                        <button 
                           onClick={() => {
                              setEditingApp(app);
                              setIsModalOpen(true);
                           }}
                           className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-[#c1ff72] transition-all"
                        >
                           <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                           <ExternalLink className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                </motion.div>
              )) : (
                <div className="glass p-20 rounded-[40px] border-white/5 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white/10">
                    <ListTodo className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No applications tracked</h3>
                  <p className="text-white/30 text-sm max-w-sm mb-8">Start tracking your career journey by adding your first application.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TrackerModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingApp(null);
        }} 
        userId={user?.id} 
        onRefresh={fetchTrackerData}
        initialData={editingApp}
      />

      <InternshipDetailModal 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
        data={selectedJob} 
      />
    </div>
  );
}

function InternshipDetailModal({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#061a12] border border-white/10 w-full max-w-3xl rounded-[40px] overflow-hidden relative z-10 max-h-[90vh] flex flex-col shadow-[0_0_100px_rgba(193,255,114,0.1)]"
      >
        <div className="p-8 md:p-12 border-b border-white/5 flex items-start justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#c1ff72]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center font-black text-[#c1ff72] text-2xl border border-white/10">
                    {data?.company?.[0]}
                 </div>
                 <div>
                    <h3 className="text-3xl font-bold">{data?.role}</h3>
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                       <MapPin className="w-4 h-4" /> {data?.location}
                    </div>
                 </div>
              </div>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all relative z-10 border border-white/10">
             <X className="w-6 h-6 text-white/40" />
           </button>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto space-y-10 custom-scrollbar">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Stipend', value: `${data?.currency} ${data?.stipend?.toLocaleString()}`, icon: DollarSign, color: '#c1ff72' },
                { label: 'Duration', value: data?.duration || '3-6 Months', icon: Clock, color: '#ffe44d' },
                { label: 'Match', value: `${Math.round(data?.similarity * 100)}%`, icon: Zap, color: '#00ff88' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-[28px] bg-white/[0.03] border border-white/5 space-y-3">
                   <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                   <div>
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">AI Matching Insight</h4>
              <div className="p-6 rounded-[28px] bg-[#c1ff72]/5 border border-[#c1ff72]/10">
                 <p className="text-[#c1ff72] leading-relaxed italic text-sm">
                    "{data?.match_why}"
                 </p>
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Job Description</h4>
              <p className="text-white/60 leading-relaxed font-medium">
                 {data?.description}
              </p>
           </div>

           <div className="pt-10 flex gap-4">
              <button className="flex-1 bg-[#c1ff72] text-[#061a12] py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-all">Apply Now</button>
              <button className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all border border-white/10">Add to Tracker</button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
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

    if (initialData) {
      const { error } = await supabase
        .from('applications')
        .update(formData)
        .eq('id', initialData.id);

      if (error) {
        alert("Failed to update application: " + error.message);
      } else {
        onRefresh();
        onClose();
      }
    } else {
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
            <h3 className="text-2xl font-bold">{initialData ? 'Edit application' : 'Add application'}</h3>
            <p className="text-white/40 text-sm mt-1">Keep track of your professional pipeline.</p>
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
                placeholder="e.g. Software Engineer" 
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
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
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

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 bg-white/5 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#c1ff72] text-[#061a12] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : initialData ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {initialData ? 'Save Changes' : 'Add to Tracker'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
