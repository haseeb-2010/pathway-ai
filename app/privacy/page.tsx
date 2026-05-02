
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Server } from "lucide-react";

export default function PrivacyPolicy() {
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
              <Shield className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Privacy <br /> Policy.
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs">Last Updated: May 2026</p>
          </header>

          <div className="glass p-8 md:p-16 rounded-[48px] border-white/5 space-y-12 font-jakarta">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">1. Our Commitment</h2>
              <p className="text-white/60 leading-relaxed">
                At Pathway AI, we are committed to disrupting the education consultancy industry without compromising your personal data. We believe your academic journey is yours alone. This policy outlines how we handle the "Academic DNA" you share with our AI engines.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-8 rounded-3xl space-y-4">
                <Lock className="w-6 h-6 text-[#c1ff72]" />
                <h3 className="font-bold">Encrypted Storage</h3>
                <p className="text-white/40 text-sm">All transcripts and personal identification data are encrypted at rest using AES-256 standards.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl space-y-4">
                <Eye className="w-6 h-6 text-[#c1ff72]" />
                <h3 className="font-bold">Zero-Sale Policy</h3>
                <p className="text-white/40 text-sm">We never sell student data to third-party advertisers. Our revenue comes from institutional partnerships.</p>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">2. Data Collection</h2>
              <p className="text-white/60 leading-relaxed">
                We collect information necessary to perform high-fidelity matching:
              </p>
              <ul className="space-y-4 text-white/40">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] mt-2 shrink-0" />
                  <span>Academic records and test scores for matching.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] mt-2 shrink-0" />
                  <span>Financial constraints for scholarship and loan triage.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] mt-2 shrink-0" />
                  <span>Interactive chat logs to refine SOP generation.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">3. AI Processing</h2>
              <p className="text-white/60 leading-relaxed">
                Our RAG (Retrieval-Augmented Generation) system processes your data locally on our secure cloud instances. We use anonymous identifiers when querying global university databases to protect your identity.
              </p>
            </section>

            <section className="p-8 rounded-3xl bg-[#c1ff72]/5 border border-[#c1ff72]/10">
              <h4 className="font-bold text-[#c1ff72] mb-2 flex items-center gap-2">
                <Server className="w-4 h-4" /> Data Location
              </h4>
              <p className="text-white/40 text-sm">Your data is stored on secure servers located in the EU and North America, complying with GDPR and international data protection standards.</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
