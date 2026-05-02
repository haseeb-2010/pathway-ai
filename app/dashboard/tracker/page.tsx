"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  MoreVertical, 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Filter,
  LayoutGrid
} from "lucide-react";

type Stage = 'Applied' | 'In Review' | 'Interview' | 'Offer' | 'Rejected';

interface Application {
  id: string;
  company: string;
  role: string;
  location: string;
  stipend: string;
  roi: 'High' | 'Elite' | 'Very High';
  updatedAt: string;
}

export default function TrackerPage() {
  const stages: Stage[] = ['Applied', 'In Review', 'Interview', 'Offer', 'Rejected'];
  
  const [apps, setApps] = useState<Record<Stage, Application[]>>({
    'Applied': [
      { id: '1', company: 'Google', role: 'Software Engineer Intern', location: 'Munich', stipend: '€1,800/mo', roi: 'High', updatedAt: '2d ago' },
      { id: '2', company: 'Palantir', role: 'Forward Deployed Engineer', location: 'London', stipend: '£2,500/mo', roi: 'Elite', updatedAt: '1d ago' }
    ],
    'In Review': [
      { id: '3', company: 'Spotify', role: 'Product Manager Intern', location: 'Stockholm', stipend: '€2,100/mo', roi: 'Very High', updatedAt: '5d ago' }
    ],
    'Interview': [
      { id: '4', company: 'ASML', role: 'Data Scientist', location: 'Eindhoven', stipend: '€1,900/mo', roi: 'High', updatedAt: '3h ago' }
    ],
    'Offer': [],
    'Rejected': []
  });

  const getStageColor = (stage: Stage) => {
    switch(stage) {
      case 'Applied': return 'white';
      case 'In Review': return '#ffe44d';
      case 'Interview': return '#c1ff72';
      case 'Offer': return '#00ff88';
      case 'Rejected': return '#ff4444';
      default: return 'white';
    }
  };

  return (
    <div className="space-y-10">
      {/* Tracker Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-[#ffe44d] text-[10px] font-bold uppercase tracking-widest mb-4 block">Placement Pipeline</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Your Career <br /> Funnel.</h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 border border-white/5 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-[#c1ff72] text-[#061a12] px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all text-xs uppercase tracking-widest">
            <Plus className="w-4 h-4" /> New App
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-12 min-h-[600px] -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
        {stages.map((stage) => (
          <div key={stage} className="flex-shrink-0 w-80 space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: getStageColor(stage) }} 
                />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">{stage}</h3>
              </div>
              <span className="text-[10px] font-bold text-white/20 bg-white/5 px-2 py-1 rounded-md">{apps[stage].length}</span>
            </div>

            <div className="space-y-4">
              {apps[stage].length === 0 && (
                <div className="border border-dashed border-white/5 rounded-[32px] p-8 text-center text-white/10 text-xs font-bold uppercase tracking-widest">
                  Empty Stage
                </div>
              )}
              {apps[stage].map((app) => (
                <motion.div 
                  key={app.id}
                  layoutId={app.id}
                  whileHover={{ y: -4 }}
                  className="glass p-6 rounded-[32px] border-white/5 hover:border-white/10 transition-all cursor-pointer group relative"
                >
                  <button className="absolute top-6 right-6 text-white/10 group-hover:text-white/40 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-white/20">
                      {app.company[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-base leading-tight">{app.company}</h4>
                      <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">{app.role}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3" /> {app.location}
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <Clock className="w-3 h-3" /> {app.updatedAt}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <TrendingUp className="w-3 h-3 text-[#c1ff72]" />
                       <span className="text-[10px] font-black text-[#c1ff72] uppercase tracking-widest">{app.roi} ROI</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/40">{app.stipend}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
