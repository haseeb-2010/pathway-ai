
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  DollarSign, 
  GraduationCap, 
  Star, 
  ChevronRight, 
  Loader2,
  Filter,
  Globe,
  Trophy,
  Zap,
  Sparkles
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function UniversitiesPage() {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [filterCountry, setFilterCountry] = useState("All");
  const [hasSearched, setHasSearched] = useState(false);
  
  // Preferences State
  const [prefs, setPrefs] = useState({
    degree: "Bachelors",
    countries: ["USA", "UK", "Canada"],
    budget: "$20,000 - $40,000"
  });

  const fetchMatches = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          type: 'universities',
          preferences: prefs
        })
      });

      const data = await response.json();
      if (data.matches) {
        setMatches(data.matches);
      }
    } catch (error) {
      console.error("Error fetching university matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = filterCountry === "All" 
    ? matches 
    : matches.filter(m => m.country === filterCountry);

  const countries = ["All", ...Array.from(new Set(matches.map(m => m.country)))];

  return (
    <div className="space-y-12 pb-40">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <span className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-[0.4em] block">Curated Academic Path</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">University <br className="hidden md:block" /> Matches.</h1>
          <p className="text-white/40 max-w-xl text-sm font-medium">
            Proprietary vector-analysis matching your unique academic dossier with global institutions using high-fidelity embedding clusters.
          </p>
        </div>

        {hasSearched && (
          <div className="flex gap-3">
            <div className="glass px-6 py-4 rounded-2xl flex items-center gap-4 border-white/5">
              <Filter className="w-4 h-4 text-[#c1ff72]" />
              <select 
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="bg-transparent text-xs font-bold text-white outline-none appearance-none cursor-pointer uppercase tracking-widest"
              >
                {countries.map(c => <option key={c} value={c} className="bg-[#061a12]">{c}</option>)}
              </select>
            </div>
            <button 
              onClick={() => setHasSearched(false)}
              className="glass px-6 py-4 rounded-2xl text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest border-white/5"
            >
              Adjust Prefs
            </button>
          </div>
        )}
      </section>

      {!hasSearched ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-[48px] border-white/5 space-y-10"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#c1ff72]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h2 className="text-3xl font-bold">Set Your Direction.</h2>
            <p className="text-white/40 text-sm">Tell us your goals, and we'll scan the global database for your perfect fit.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Target Degree</label>
              <select 
                value={prefs.degree}
                onChange={e => setPrefs({...prefs, degree: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all appearance-none"
              >
                <option value="Bachelors" className="bg-[#061a12]">Bachelors</option>
                <option value="Masters" className="bg-[#061a12]">Masters</option>
                <option value="PhD" className="bg-[#061a12]">PhD</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Yearly Budget</label>
              <select 
                value={prefs.budget}
                onChange={e => setPrefs({...prefs, budget: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all appearance-none"
              >
                <option value="Under $20,000" className="bg-[#061a12]">Under $20,000</option>
                <option value="$20,000 - $40,000" className="bg-[#061a12]">$20,000 - $40,000</option>
                <option value="$40,000 - $60,000" className="bg-[#061a12]">$40,000 - $60,000</option>
                <option value="Above $60,000" className="bg-[#061a12]">Above $60,000</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Target Countries</label>
              <div className="flex flex-wrap gap-3">
                {["USA", "UK", "Canada", "Germany", "Australia", "Turkey"].map(country => (
                  <button
                    key={country}
                    onClick={() => {
                      const next = prefs.countries.includes(country)
                        ? prefs.countries.filter(c => c !== country)
                        : [...prefs.countries, country];
                      setPrefs({...prefs, countries: next});
                    }}
                    className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      prefs.countries.includes(country)
                        ? "bg-[#c1ff72] text-[#061a12]"
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={fetchMatches}
            disabled={loading || prefs.countries.length === 0}
            className="w-full bg-[#c1ff72] text-[#061a12] py-6 rounded-[32px] font-bold text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {loading ? "Analyzing Database..." : "Find My Perfect Match"}
          </button>
        </motion.div>
      ) : loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#c1ff72]" />
          <p className="text-white/20 font-bold uppercase tracking-widest text-[10px]">Scanning Global Databases...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMatches.map((uni, i) => (
              <motion.div
                key={uni.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="glass group p-8 rounded-[40px] border-white/5 hover:border-[#c1ff72]/30 transition-all flex flex-col relative overflow-hidden"
              >
                {/* Match Strength Badge */}
                <div className="absolute top-6 right-6">
                  <div className="px-3 py-1 rounded-full bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-[#c1ff72]" />
                    <span className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest">
                      {Math.round(uni.similarity * 100)}% Match
                    </span>
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8 text-[#c1ff72]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-[#c1ff72] transition-colors">{uni.name}</h3>
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3" /> {uni.city}, {uni.country}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Tuition</p>
                      <p className="text-xs font-bold text-white">{uni.currency} {uni.tuition_per_year?.toLocaleString() || "N/A"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Acceptance</p>
                      <p className="text-xs font-bold text-white">{uni.acceptance_rate}%</p>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 line-clamp-3 leading-relaxed">
                    {uni.description}
                  </p>

                  {uni.match_why && (
                    <div className="p-4 rounded-2xl bg-[#c1ff72]/5 border border-[#c1ff72]/10 space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#c1ff72]" />
                        <span className="text-[8px] font-bold text-[#c1ff72] uppercase tracking-widest">Pathway Insight</span>
                      </div>
                      <p className="text-[11px] text-[#c1ff72]/80 leading-relaxed italic">
                        "{uni.match_why}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#ffe44d]" />
                    <span className="text-xs font-bold">Rank #{uni.ranking}</span>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest group/btn">
                    Explore Program <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State */}
      {!loading && hasSearched && filteredMatches.length === 0 && (
        <div className="py-40 text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-10 h-10 text-white/10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">No Matches Found</h3>
            <p className="text-white/40 text-sm">Try adjusting your filters or complete more of your profile.</p>
          </div>
        </div>
      )}
    </div>
  );
}
