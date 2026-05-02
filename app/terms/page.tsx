
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Scale, Gavel, FileText, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
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

      <main className="max-w-4xl mx-auto px-6 pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <header className="space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center">
              <Scale className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Terms of <br /> Service.
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs">Last Updated: May 2026</p>
          </header>

          <div className="glass p-8 md:p-16 rounded-[48px] border-white/5 space-y-12 font-jakarta">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">1. Acceptance of Terms</h2>
              <p className="text-white/60 leading-relaxed">
                By accessing Pathway AI, you agree to be bound by these terms. Our platform is designed to provide autonomous academic guidance. While our AI is state-of-the-art, its outputs should be treated as high-fidelity recommendations, not final legal advice.
              </p>
            </section>

            <div className="p-8 rounded-3xl bg-yellow-400/5 border border-yellow-400/10">
              <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Compliance Disclaimer
              </h4>
              <p className="text-white/40 text-sm italic">
                Pathway AI is an information triage engine. Strategic legal interpretation for visa applications is routed to certified RMAs (Registered Migration Agents) or OISC advisors. We do not provide direct legal representation.
              </p>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">2. User Responsibility</h2>
              <p className="text-white/60 leading-relaxed">
                You are responsible for the accuracy of the data provided to the AI.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Check className="w-4 h-4 text-[#c1ff72]" /> Authenticity
                  </div>
                  <p className="text-white/30 text-xs">All transcripts and identity documents must be genuine and unaltered.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Check className="w-4 h-4 text-[#c1ff72]" /> Compliance
                  </div>
                  <p className="text-white/30 text-xs">Usage must comply with local laws in Pakistan and your target destination.</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">3. Intellectual Property</h2>
              <p className="text-white/60 leading-relaxed">
                The AI-generated SOP outlines and university matches are licensed to you for personal use in your academic applications. The underlying RAG architecture and proprietary ROI algorithms remain the sole property of Pathway AI.
              </p>
            </section>

            <section className="space-y-6 border-t border-white/5 pt-12">
              <div className="flex items-center gap-4 text-white/20">
                <Gavel className="w-6 h-6 shrink-0" />
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                  Pathway AI reserves the right to terminate access for users attempting to bypass security protocols or provide fraudulent academic records.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
