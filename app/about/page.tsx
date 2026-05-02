
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Zap, Users, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#061a12] text-white selection:bg-[#c1ff72] selection:text-[#061a12]">
      {/* Navigation */}
      <nav className="p-8 md:p-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 text-white/40 hover:text-[#c1ff72] transition-all group font-bold text-xs uppercase tracking-widest"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c1ff72] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-24"
        >
          {/* Hero */}
          <header className="max-w-3xl space-y-8">
            <span className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-[0.4em]">About Pathway</span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Democratizing <br /> Global Education.
            </h1>
            <p className="text-[#f6f6e9]/60 text-lg md:text-2xl leading-relaxed font-jakarta">
              Pathway AI is the first autonomous student copilot designed to bypass the traditional consultant gatekeepers. We believe information shouldn't have a $3,000 price tag.
            </p>
          </header>

          {/* Core Values Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-10 rounded-[48px] border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#c1ff72]/10 flex items-center justify-center text-[#c1ff72]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Autonomous AI</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Powered by proprietary RAG architectures that analyze 50,000+ global programs in real-time.
              </p>
            </div>
            <div className="glass p-10 rounded-[48px] border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#c1ff72]/10 flex items-center justify-center text-[#c1ff72]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Global Access</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Focused on the Pakistani youth bulge, opening doors to Germany, UK, USA, and beyond.
              </p>
            </div>
            <div className="glass p-10 rounded-[48px] border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#c1ff72]/10 flex items-center justify-center text-[#c1ff72]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Student First</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                We sustain ourselves through institutional partnerships, keeping the platform 100% free for students.
              </p>
            </div>
          </div>

          {/* Narrative Section */}
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">The Origin Story.</h2>
              <div className="space-y-6 text-white/60 leading-relaxed font-jakarta">
                <p>
                  Every year, thousands of brilliant students from Pakistan are held back by high consultancy fees and biased advice. Legacy consultants often push students toward "partner universities" where they earn the highest commission, not where the student fits best.
                </p>
                <p>
                  We built Pathway AI to fix this. By combining real-time immigration data, predictive ROI scoring, and an interactive SOP elicitation protocol, we've created a system that is faster, more accurate, and completely objective.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#c1ff72]/20 blur-[120px] rounded-full" />
              <div className="glass p-12 rounded-[64px] border-white/10 relative z-10">
                <blockquote className="text-2xl font-bold italic leading-relaxed text-[#c1ff72]">
                  "Our goal is to ensure that no student's potential is limited by their ability to pay a consultant."
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10" />
                  <div>
                    <p className="font-bold text-sm">Founder Team</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Pathway AI</p>
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
