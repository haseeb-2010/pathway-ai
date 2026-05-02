
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Sparkles, Code, Brain } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#061a12] text-white selection:bg-[#c1ff72] selection:text-[#061a12]">
      {/* Navigation */}
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

      <main className="max-w-4xl mx-auto px-6 pb-20 md:pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 md:space-y-24"
        >
          {/* Header */}
          <header className="space-y-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-3xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center mx-auto md:mx-0">
              <Sparkles className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Join the <br /> Collective.
            </h1>
            <p className="text-[#c1ff72] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Building the Future of Education</p>
          </header>

          <div className="glass p-10 md:p-20 rounded-[40px] md:rounded-[80px] border-white/5 text-center space-y-10">
             <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Have something to bring to the team?</h2>
                <p className="text-white/40 leading-relaxed font-jakarta text-sm md:text-lg">
                  We aren't looking for traditional resumes. We are looking for builders, dreamers, and disruptors who want to change how the world moves.
                </p>
             </div>

             <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-start gap-4">
                   <Code className="w-5 h-5 text-[#c1ff72] mt-1 shrink-0" />
                   <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Engineers & Data Scientists</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-start gap-4">
                   <Brain className="w-5 h-5 text-[#c1ff72] mt-1 shrink-0" />
                   <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Academic Strategists</p>
                </div>
             </div>

             <div className="pt-8 space-y-6">
                <a 
                  href="mailto:careers@pathway.ai"
                  className="bg-[#c1ff72] text-[#061a12] px-10 py-6 rounded-2xl font-bold text-lg md:text-xl uppercase tracking-widest hover:scale-105 transition-all inline-flex items-center gap-4 shadow-[0_20px_40px_rgba(193,255,114,0.2)]"
                >
                  <Mail className="w-6 h-6" /> Share Your Vision
                </a>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">careers@pathway.ai</p>
             </div>
          </div>
          
          <div className="text-center">
             <p className="text-white/20 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed">
               If you think you got something to be with us then share what you can bring <br className="hidden md:block" /> to the team by sending us an email.
             </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
