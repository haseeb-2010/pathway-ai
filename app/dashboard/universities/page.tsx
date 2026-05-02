
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
  Zap
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function UniversitiesPage() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);
  const [filterCountry, setFilterCountry] = useState("All");

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, type: 'universities' })
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
        </div>
      </section>

      {/* Results Grid */}
      {loading ? (
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
      {!loading && filteredMatches.length === 0 && (
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
