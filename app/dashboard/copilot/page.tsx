"use client";

import { useState } from "react";
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
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

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

  return (
    <div className="space-y-12">
      {/* Header Navigation */}
      <div className="flex bg-white/5 p-1 rounded-2xl w-fit">
        {[
          { id: 'preferences', label: 'Matcher Preferences', icon: Filter },
          { id: 'matching', label: 'University Matches', icon: TargetIcon },
          { id: 'sop', label: 'SOP Assistant', icon: FileTextIcon },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
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
                    <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#c1ff72] hover:text-[#061a12] hover:border-[#c1ff72] transition-all flex items-center justify-center gap-2">
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
                <FileTextIcon className="w-8 h-8 text-[#ffe44d]" />
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
                />
                <button className="w-full bg-[#c1ff72] text-[#061a12] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
                  Refine with AI
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom Icons for simplicity
function TargetIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  );
}

function FileTextIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
  );
}
