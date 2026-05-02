
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Shield, Rocket, Heart } from "lucide-react";

export default function MissionPage() {
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
              <Target className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Our <br /> Mission.
            </h1>
            <p className="text-[#c1ff72] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Disrupting the Gatekeepers</p>
          </header>

          <div className="glass p-8 md:p-16 rounded-[40px] md:rounded-[64px] border-white/5 space-y-12 font-jakarta">
            <section className="space-y-6">
              <h2 className="text-xl md:text-3xl font-bold text-white">To empower the next generation of global leaders from Pakistan.</h2>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                Our mission is to dismantle the predatory education consultancy model. We provide students with the same high-level strategic guidance used by elite firms—but we do it autonomously, objectively, and for free.
              </p>
            </section>

            <div className="grid gap-6">
              {[
                { 
                  icon: Shield, 
                  title: "Radical Transparency", 
                  desc: "We reveal the hidden metrics of university admissions, from visa rejection thresholds to real-world career placement ROI." 
                },
                { 
                  icon: Rocket, 
                  title: "Accelerated Outcomes", 
                  desc: "By automating the search and SOP iteration process, we save students hundreds of hours and thousands of dollars." 
                },
                { 
                  icon: Heart, 
                  title: "Student Sovereignty", 
                  desc: "Your data stays yours. Your choices stay yours. We are the navigator; you are the captain." 
                }
              ].map((m, i) => (
                <div key={i} className="flex gap-6 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 items-start">
                  <div className="p-3 rounded-2xl bg-[#c1ff72]/10 text-[#c1ff72] shrink-0">
                    <m.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-base md:text-lg">{m.title}</h3>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="space-y-6 border-t border-white/5 pt-12 text-center">
               <h3 className="text-white/20 font-bold uppercase tracking-[0.2em] text-[10px]">The Future of Student Mobility</h3>
               <p className="text-white/40 text-xs italic">
                 "We envision a world where academic talent is the only currency required to cross borders."
               </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
