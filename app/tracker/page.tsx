"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, MoreHorizontal, Briefcase, University } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const initialColumns = [
  { id: "wishlist", title: "Wishlist" },
  { id: "applied", title: "Applied" },
  { id: "assessment", title: "Assessment" },
  { id: "interview", title: "Interview" },
  { id: "offer", title: "Offer" },
  { id: "accepted", title: "Accepted" },
];

const initialCards = [
  { id: "1", colId: "wishlist", title: "TU Munich - MSc Biotech", type: "uni" },
  { id: "2", colId: "wishlist", title: "Bayer - Research Intern", type: "job" },
  { id: "3", colId: "applied", title: "Aalto University - Bio", type: "uni" },
  { id: "4", colId: "interview", title: "Siemens Healthineers - Data", type: "job" },
  { id: "5", colId: "offer", title: "KU Leuven", type: "uni" },
];

export default function TrackerPage() {
  const [cards, setCards] = useState(initialCards);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-sans">
      {/* Remove gradient overlay */}
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link href="/copilot" className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-white" />
          </Link>
          <div>
            <h1 className="font-heading font-bold text-lg text-white">Momentum Tracker</h1>
            <p className="text-xs text-muted-foreground">Auto-saved to Supabase</p>
          </div>
        </div>
        
        <button className="bg-[#f6f6e9] hover:bg-[#f6f6e9]/90 text-[#061a12] px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Application
        </button>
      </header>

      {/* Kanban Board */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex gap-6 h-full min-w-max pb-4">
          {initialColumns.map((col) => (
            <div key={col.id} className="w-[320px] flex flex-col h-full glass rounded-xl border-white/5 overflow-hidden">
              <div className={cn("px-4 py-3 border-b border-black/10 flex justify-between items-center bg-[#061a12]")}>
                <h3 className="font-heading font-bold text-sm text-white">{col.title}</h3>
                <span className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-full border border-white/10">
                  {cards.filter((c) => c.colId === col.id).length}
                </span>
              </div>
              
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {cards
                  .filter((card) => card.colId === col.id)
                  .map((card) => (
                    <div 
                      key={card.id} 
                      className="kollegio-card p-4 cursor-grab hover:scale-[1.02] transition-transform group relative border-none"
                      draggable
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {card.type === "uni" ? (
                            <University className="w-4 h-4 text-[#008d00]" />
                          ) : (
                            <Briefcase className="w-4 h-4 text-[#008d00]" />
                          )}
                          <span className="text-xs text-[#061a12]/40 uppercase tracking-wider font-bold">
                            {card.type === "uni" ? "University" : "Internship"}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#061a12]">{card.title}</h4>
                    </div>
                  ))}
                  
                  <button className="w-full py-3 border border-dashed border-white/10 rounded-lg text-muted-foreground hover:text-white hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm">
                    <Plus className="w-4 h-4" /> Add card
                  </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
