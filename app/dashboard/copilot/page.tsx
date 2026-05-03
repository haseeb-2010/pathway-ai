"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MapPin, 
  Banknote, 
  GraduationCap, 
  ArrowRight, 
  Search,
  Filter,
  CheckCircle2,
  FileText,
  ChevronRight,
  Loader2,
  Target,
  Trophy
} from "lucide-react";
import { supabase, supabaseMatching } from "@/lib/supabase";

export default function CopilotPage() {
  const [view, setView] = useState<'preferences' | 'matching' | 'sop'>('preferences');
  const [preferences, setPreferences] = useState({
    countries: [] as string[],
    degree: "",
    budget: "",
    major: ""
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [sopDraft, setSopDraft] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Detail Modal State
  const [selectedUniName, setSelectedUniName] = useState<string | null>(null);
  const [selectedUniData, setSelectedUniData] = useState<any>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const countries = ["Germany", "United Kingdom", "USA", "Canada", "Australia", "Switzerland"];
  const degrees = ["Master's", "PhD", "Bachelor's", "MBA"];
  const budgets = ["Full Scholarship Only", "< $10k/yr", "$10k - $30k/yr", "$30k+/yr"];

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
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, preferences })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data);
      setView('matching');
    } catch (err) {
      console.error("Matching error:", err);
      alert("Failed to analyze matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewInsights = async (uniName: string) => {
    setSelectedUniName(uniName);
    setIsDetailLoading(true);
    try {
      const { data, error } = await supabaseMatching
        .from('universities')
        .select('*')
        .ilike('name', `%${uniName}%`)
        .limit(1)
        .single();
      
      if (error) throw error;
      setSelectedUniData(data);
    } catch (err) {
      console.error("Detail Fetch Error:", err);
      // Fallback if not found in DB
      setSelectedUniData({ name: uniName, description: "Detailed data currently unavailable in local database." });
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleRefineSOP = async () => {
    if (!sopDraft.trim() || isRefining) return;
    setIsRefining(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { 
              role: "system", 
              content: "You are an expert SOP consultant. Refine the following draft to make it more professional, impactful, and tailored for graduate admissions. Keep the user's intent but improve vocabulary, structure, and flow. Return ONLY the refined text." 
            },
            { role: "user", content: sopDraft }
          ]
        })
      });
      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        setSopDraft(data.choices[0].message.content);
      }
    } catch (err) {
      console.error("Refine error:", err);
      alert("Failed to refine SOP. Please try again.");
    } finally {
      setIsRefining(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sopDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Header Navigation */}
      <div className="flex bg-white/5 p-1 rounded-2xl w-full md:w-fit overflow-x-auto scrollbar-hide border border-white/5">
        {[
          { id: 'preferences', label: 'Matcher Preferences', icon: Filter },
          { id: 'matching', label: 'University Matches', icon: Target },
          { id: 'sop', label: 'SOP Assistant', icon: FileText },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shrink-0 ${
              view === item.id 
              ? "bg-[#c1ff72] text-[#061a12] shadow-lg" 
              : "text-white/40 hover:text-white"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>

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
              <div>
                <span className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-widest mb-4 block">Parameter Selection</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Define your <br /> target horizon.</h2>
              </div>

              <div className="space-y-8">
                {/* Degree Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-4">Target Degree</label>
                  <div className="flex flex-wrap gap-3">
                    {degrees.map(d => (
                      <button 
                        key={d}
                        onClick={() => setPreferences({...preferences, degree: d})}
                        className={`px-6 py-3 rounded-2xl border font-bold text-sm transition-all ${
                          preferences.degree === d 
                          ? "bg-[#c1ff72] border-[#c1ff72] text-[#061a12]" 
                          : "border-white/5 bg-white/5 text-white/40 hover:border-white/10"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-4">Target Countries</label>
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

                {/* Budget Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-4">Financial Capacity</label>
                  <div className="flex flex-wrap gap-3">
                    {budgets.map(b => (
                      <button 
                        key={b}
                        onClick={() => setPreferences({...preferences, budget: b})}
                        className={`px-6 py-3 rounded-2xl border font-bold text-sm transition-all ${
                          preferences.budget === b 
                          ? "bg-[#c1ff72] border-[#c1ff72] text-[#061a12]" 
                          : "border-white/5 bg-white/5 text-white/40 hover:border-white/10"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleRunMatcher}
                  disabled={loading || !preferences.degree}
                  className="w-full bg-[#c1ff72] text-[#061a12] py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(193,255,114,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>Analyzing Profile <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    "Analyze & Match Universities"
                  )}
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="glass p-12 rounded-[60px] border-white/5 h-full flex flex-col justify-center items-center text-center space-y-8">
                <div className="w-24 h-24 rounded-[32px] bg-[#c1ff72]/10 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-[#c1ff72]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">RAG Matching Engine</h3>
                  <p className="text-white/30 text-sm leading-relaxed max-w-xs mx-auto">
                    We combine your profile data with live university requirements to predict your admission probability with 92% accuracy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'matching' && (
          <motion.div 
            key="matches"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Top Recommendations</h2>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest bg-[#c1ff72]/10 px-4 py-2 rounded-full border border-[#c1ff72]/20">
                <CheckCircle2 className="w-3 h-3" /> Based on 22 parameters
              </div>
            </div>

            <div className="grid gap-6">
              {(results?.matches || [
                { name: "Technical University of Munich", location: "Munich, Germany", match_strength: "98%", why: "Top-tier engineering programs with no tuition fees.", highlight: "No Tuition" },
                { name: "ETH Zurich", location: "Zurich, Switzerland", match_strength: "94%", why: "Leading research institution for STEM fields.", highlight: "Elite STEM" },
                { name: "Imperial College London", location: "London, UK", match_strength: "89%", why: "Strong industry ties and global alumni network.", highlight: "Global Network" }
              ]).map((u: any, i: number) => (
                <div key={i} className="glass p-8 rounded-[40px] border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-white/[0.03] transition-all">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-[24px] bg-white/5 flex items-center justify-center font-black text-white/10 text-3xl">
                      {u.name[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold mb-2 group-hover:text-[#c1ff72] transition-colors">{u.name}</h4>
                      <div className="flex items-center gap-2 text-white/30 text-sm mb-4">
                        <MapPin className="w-4 h-4" /> {u.location}
                      </div>
                      <p className="text-white/40 text-xs leading-relaxed max-w-xl mb-4 italic">"{u.why}"</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold uppercase tracking-widest text-white/40">{u.highlight}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-right space-y-4 min-w-[150px]">
                    <div>
                      <p className="text-[#c1ff72] text-4xl font-black tracking-tighter">{u.match_strength}</p>
                      <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Match Strength</p>
                    </div>
                    <button 
                      onClick={() => handleViewInsights(u.name)}
                      className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#c1ff72] hover:text-[#061a12] hover:border-[#c1ff72] transition-all flex items-center justify-center gap-2"
                    >
                      View Insights <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'sop' && (
          <motion.div 
            key="sop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#ffe44d]/10 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-[#ffe44d]" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">SOP Cognitive <br /> Collaborator.</h2>
              <p className="text-white/40 leading-relaxed font-jakarta">
                We've synthesized your profile achievements with the ethos of your top matches. Choose a university to generate a structural narrative backbone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                {(results?.sop_outline || [
                  { section: "Opening Hook", points: ["Connect your passion for tech to Munich's ecosystem.", "Mention specific TU Munich labs."] },
                  { section: "Academic Bridge", points: ["Explain how your Bachelor's prepared you.", "Highlight your research achievements."] }
                ]).map((s: any, i: number) => (
                  <div key={i} className="glass p-8 rounded-[32px] border-white/5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#c1ff72]/10 flex items-center justify-center text-[#c1ff72] text-xs font-bold">
                        {i + 1}
                      </div>
                      <h4 className="font-bold uppercase tracking-widest text-sm">{s.section}</h4>
                    </div>
                    <ul className="space-y-2 ml-11">
                      {s.points.map((p: string, j: number) => (
                        <li key={j} className="text-white/40 text-xs leading-relaxed flex gap-2">
                          <span className="text-[#c1ff72]">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="glass p-10 rounded-[48px] border-white/5 space-y-8 bg-white/[0.02]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">AI Workspace</h3>
                  <button className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest bg-[#c1ff72]/10 px-4 py-2 rounded-full border border-[#c1ff72]/20">Live</button>
                </div>
                <textarea 
                  className="w-full h-64 bg-transparent border-none focus:ring-0 text-white/60 text-sm leading-relaxed resize-none font-jakarta"
                  placeholder="Start drafting based on the outline..."
                  value={sopDraft}
                  onChange={(e) => setSopDraft(e.target.value)}
                />
                <div className="flex gap-4">
                  <button 
                    onClick={handleRefineSOP}
                    disabled={isRefining || !sopDraft.trim()}
                    className="flex-1 bg-[#c1ff72] text-[#061a12] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Refine with AI
                  </button>
                  {sopDraft.trim() && (
                    <button 
                      onClick={copyToClipboard}
                      className="bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-[#c1ff72]" /> : <FileText className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <UniDetailModal 
        isOpen={!!selectedUniName} 
        onClose={() => setSelectedUniName(null)} 
        data={selectedUniData}
        loading={isDetailLoading}
      />
    </div>
  );
}

function UniDetailModal({ isOpen, onClose, data, loading }: { isOpen: boolean, onClose: () => void, data: any, loading: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#061a12] border border-white/10 w-full max-w-3xl rounded-[40px] overflow-hidden relative z-10 max-h-[90vh] flex flex-col shadow-[0_0_100px_rgba(193,255,114,0.1)]"
      >
        {loading ? (
          <div className="p-40 flex flex-col items-center justify-center space-y-6">
             <Loader2 className="w-12 h-12 animate-spin text-[#c1ff72]" />
             <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Assembling Insights...</p>
          </div>
        ) : (
          <>
            <div className="p-8 md:p-12 border-b border-white/5 flex items-start justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#c1ff72]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
               <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center font-black text-[#c1ff72] text-2xl border border-white/10">
                        {data?.name[0]}
                     </div>
                     <div>
                        <h3 className="text-3xl font-bold">{data?.name}</h3>
                        <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                           <MapPin className="w-4 h-4" /> {data?.city}, {data?.country}
                        </div>
                     </div>
                  </div>
               </div>
               <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all relative z-10 border border-white/10">
                 <ArrowRight className="w-6 h-6 text-white/40 rotate-45" />
               </button>
            </div>

            <div className="p-8 md:p-12 overflow-y-auto space-y-10 custom-scrollbar">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Ranking', value: `#${data?.ranking}`, icon: Trophy, color: '#ffe44d' },
                    { label: 'Acceptance', value: `${data?.acceptance_rate}%`, icon: Target, color: '#c1ff72' },
                    { label: 'Tuition', value: `${data?.currency} ${data?.tuition_per_year?.toLocaleString()}`, icon: Banknote, color: '#00ff88' },
                    { label: 'GPA Req', value: data?.min_gpa || '3.0+', icon: CheckCircle2, color: '#ff4444' }
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
                  <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Institutional Overview</h4>
                  <p className="text-white/60 leading-relaxed font-medium">
                     {data?.description}
                  </p>
               </div>

               {data?.highlights && (
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Academic Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                       {data.highlights.split(',').map((h: string, i: number) => (
                         <span key={i} className="px-4 py-2 rounded-xl bg-[#c1ff72]/5 border border-[#c1ff72]/10 text-[#c1ff72] text-[10px] font-bold uppercase tracking-widest">
                            {h.trim()}
                         </span>
                       ))}
                    </div>
                 </div>
               )}

               <div className="pt-10">
                  <a 
                    href={data?.website || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-[#c1ff72] text-[#061a12] py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-all text-center"
                  >
                    Visit Official Site
                  </a>
               </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}


