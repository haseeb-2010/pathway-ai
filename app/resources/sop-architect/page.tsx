
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Sparkles, PenTool, BookOpen } from "lucide-react";

export default function SOPArchitect() {
  return (
    <div className="min-h-screen bg-[#061a12] text-white selection:bg-[#c1ff72] selection:text-[#061a12]">
      <nav className="p-6 md:p-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 text-white/40 hover:text-[#c1ff72] transition-all group font-bold text-[10px] md:text-xs uppercase tracking-widest"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c1ff72] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pb-20 md:pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 md:space-y-24"
        >
          <header className="max-w-3xl space-y-8">
            <div className="w-16 h-16 rounded-3xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              SOP <br /> Architect.
            </h1>
            <p className="text-[#f6f6e9]/60 text-lg md:text-2xl leading-relaxed font-jakarta">
              Your narrative is your greatest asset. We help you find it, refine it, and present it to the world's most prestigious universities.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 md:p-12 rounded-[48px] border-white/5 space-y-8">
               <h3 className="text-2xl font-bold">The Elicitation Protocol.</h3>
               <p className="text-white/40 leading-relaxed font-jakarta">
                 We don't just "write" your SOP. Our AI uses an interactive elicitation protocol to interview you, extracting your unique experiences, challenges, and motivations that standard forms miss.
               </p>
               <div className="space-y-4">
                 {[
                   { icon: Sparkles, text: "Uncover hidden story arcs" },
                   { icon: PenTool, text: "Map experiences to university ethos" },
                   { icon: BookOpen, text: "Ivy-standard structural backbone" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                     <item.icon className="w-5 h-5 text-[#c1ff72]" />
                     <span className="text-sm font-bold">{item.text}</span>
                   </div>
                 ))}
               </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-[#c1ff72]/10 blur-[100px] rounded-full" />
               <div className="glass p-8 md:p-12 rounded-[48px] border-white/5 relative z-10 h-full flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-[0.4em] mb-8">AI Generation Stats</p>
                  <div className="space-y-8">
                    <div>
                      <p className="text-5xl md:text-7xl font-bold tracking-tighter">70%</p>
                      <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-2">Higher Admission Probability</p>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div>
                      <p className="text-5xl md:text-7xl font-bold tracking-tighter">15m</p>
                      <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-2">Average Iteration Time</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
