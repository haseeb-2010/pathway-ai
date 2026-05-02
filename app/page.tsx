"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Search, Briefcase, Globe, TrendingUp, Plus } from "lucide-react";

const faqs = [
  {
    question: "Is Pathway AI really free for students?",
    answer: "Yes. Our model disrupts the traditional consultancy fee structure. We provide high-fidelity university matching, SOP assistance, and financial aid tracking for free, sustaining ourselves through institutional partnerships."
  },
  {
    question: "How do you handle the 4% visa rejection threshold?",
    answer: "Our RAG architecture analyzes real-time immigration data and embassy traffic-light systems. We triage applicants based on risk profile and route high-stakes cases to OMARA/OISC-certified advisors to ensure compliance."
  },
  {
    question: "Can I get a loan without a US/UK cosigner?",
    answer: "Absolutely. We integrate directly with specialized fintech lenders like Prodigy Finance and MPOWER, who offer collateral-free loans based on your future earning potential rather than historical family wealth."
  },
  {
    question: "Does the AI write my entire SOP for me?",
    answer: "No. We operate as a 'Cognitive Collaborator'. Our generator uses an interactive elicitation protocol to extract your unique narrative, mapping it against university ethos to draft a structural backbone that you refine."
  },
  {
    question: "How accurate are the university matches?",
    answer: "Our matching engine uses multi-parameter predictive analytics (similar to Pro-CaRE) that accounts for coursework, major, and background, achieving over 70% variance accuracy in successful student outcomes."
  }
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Navigation - Capsule Style */}
      <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[85%] md:w-[95%] max-w-5xl">
        <nav className="glass px-3 md:px-8 py-6 md:py-3 flex items-center justify-between rounded-full border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
          <div className="flex items-center shrink-0">
            <img src="/logo.svg" alt="Pathway Logo" className="h-7 md:h-8 w-auto object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold text-white/50 uppercase tracking-[0.25em] font-jakarta">
            <Link href="#matching" className="hover:text-[#c1ff72] transition-colors">Education</Link>
            <Link href="#internships" className="hover:text-[#c1ff72] transition-colors">Internships</Link>
            <Link href="#why-us" className="hover:text-[#c1ff72] transition-colors">Why Us?</Link>
            <Link href="#faq" className="hover:text-[#c1ff72] transition-colors">FAQs</Link>
          </div>
          <Link 
            href="/onboarding"
            className="bg-[#c1ff72] hover:bg-[#c1ff72]/90 text-[#061a12] px-2 md:px-6 py-1.5 md:py-2.5 rounded-xl font-bold text-[8px] md:text-xs transition-all flex items-center gap-1 md:gap-2 uppercase tracking-widest active:scale-95 shrink-0"
          >
            Get Started <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </nav>
      </div>

      <main className="pt-20">
        {/* HERO SECTION: AI Student Copilot */}
        <motion.section 
          id="matching" 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 md:py-16 px-6"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-4 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <span className="section-label mx-auto lg:mx-0">AI Student Copilot</span>
              <h1 className="text-4xl md:text-8xl font-bold tracking-tight leading-[1.1] md:leading-[0.9] text-white mb-6 md:mb-8">
                Bypass the consultant. <br className="hidden md:block" />
                Land your dream uni.
              </h1>
              <p className="text-[#f6f6e9]/60 text-lg md:text-xl leading-relaxed mb-2 md:mb-10 max-w-lg mx-auto lg:mx-0 font-jakarta">
                The first autonomous AI engine designed for the Pakistani youth bulge. We match your profile to global programs and secure your future—completely for free.
              </p>
              <Link 
                href="/onboarding"
                className="bg-[#f6f6e9] text-[#061a12] px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all inline-flex items-center gap-3 w-full md:w-auto justify-center"
              >
                Start My Journey <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>

            <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-end scale-[0.85] md:scale-100">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="cream-card w-full max-w-[340px] md:max-w-[400px] p-0 z-10 border border-black/5"
              >
                <div className="bg-[#061a12] p-4 md:p-6 text-white">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 md:w-5 md:h-5 text-[#c1ff72]" />
                    <span className="font-bold text-xs md:text-sm tracking-tight uppercase">Best Matches</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                  {[
                    { name: "TU Munich", loc: "Germany", match: "98%", type: "Tech" },
                    { name: "ETH Zurich", loc: "Switzerland", match: "94%", type: "STEM" },
                    { name: "University of Sydney", loc: "Australia", match: "89%", type: "Business" }
                  ].map((u, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-[#061a12]/5 pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold text-base md:text-lg text-[#061a12] tracking-tight line-clamp-1">{u.name}</p>
                        <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest mt-1 text-[#061a12]">{u.loc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[#008d00] font-bold text-lg md:text-xl block leading-none">{u.match}</span>
                        <span className="text-[9px] font-bold opacity-30 uppercase tracking-tighter text-[#061a12]">{u.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: 0 }}
                whileInView={{ opacity: 1, x: 0, rotate: 12 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="yellow-card w-[200px] h-[200px] md:w-[240px] md:h-[240px] absolute -bottom-6 right-0 md:right-0 lg:-right-10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-4 border-[#061a12]"
              >
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] opacity-60">Visa Success</p>
                <div className="mt-auto">
                  <p className="text-5xl md:text-7xl font-bold tracking-tighter">92%</p>
                  <div className="h-1 bg-[#061a12]/10 rounded-full overflow-hidden mt-4 md:mt-6">
                    <div className="h-full bg-[#061a12] w-[92%]" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SECTION: Internship Module */}
        <motion.section 
          id="internships" 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-10 md:py-32 px-6 bg-[#c1ff72]/[0.02] border-y border-[#c1ff72]/5"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
              <div>
                <span className="section-label">Global Career Placement</span>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] md:leading-[0.9] text-white mb-8">
                  Work before you <br /> even graduate.
                </h2>
                <p className="text-[#f6f6e9]/60 text-lg md:text-xl leading-relaxed mb-12 font-jakarta">
                  Our Career Copilot doesn't just match you to degrees—it matches you to integrated internship tracks in Munich, London, and Singapore.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                  {[
                    { title: "Munich Tech Hub", desc: "Direct pipelines to Siemens and BMW junior associate tracks." },
                    { title: "London Finance", desc: "Early-entry quant and analyst roles for STEM graduates." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#c1ff72]/10 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-[#c1ff72]" />
                      </div>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="glass p-6 md:p-10 rounded-[40px] border-white/5"
                >
                  <TrendingUp className="w-6 h-6 text-[#c1ff72] mb-4 mx-auto lg:mx-0" />
                  <h3 className="text-white font-bold text-xl md:text-2xl text-center lg:text-left mb-8 md:mb-10">Internship Yield</h3>
                  <div className="space-y-6 md:space-y-8">
                    {[
                      { city: "Munich", role: "AI Research Intern", pay: "€1,800/mo" },
                      { city: "Singapore", role: "Data Analyst", pay: "$2,400/mo" },
                      { city: "London", role: "Fintech Associate", pay: "£2,100/mo" }
                    ].map((job, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                        viewport={{ once: true }}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="text-white font-bold text-sm md:text-base">{job.role}</p>
                          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{job.city}</p>
                        </div>
                        <span className="text-[#c1ff72] font-black text-sm md:text-base">{job.pay}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -50, rotate: 0 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="yellow-card w-[220px] h-[220px] md:w-[260px] md:h-[260px] absolute -top-10 left-0 md:left-0 lg:-left-12 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-4 border-[#061a12]"
                >
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-40">Placement ROI</p>
                  <div className="mt-auto">
                    <p className="text-5xl md:text-7xl font-bold tracking-tighter">14x</p>
                    <p className="text-[10px] font-bold uppercase opacity-30 mt-4 tracking-widest text-[#061a12]">Income Multiple</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 3: Financial Aid */}
        <motion.section 
          id="funding" 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-10 md:py-32 px-6 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="order-2 lg:order-1 relative h-[450px] md:h-[500px] w-full flex items-center justify-center lg:justify-start scale-[0.85] md:scale-100">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="yellow-card w-[240px] h-[300px] md:w-[280px] md:h-[340px] absolute left-0 lg:-left-12 z-0 p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-4 border-[#061a12]"
              >
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Cosigner-Free</p>
                <div className="mt-auto">
                  <p className="text-5xl md:text-6xl font-bold tracking-tight leading-none">$</p>
                  <p className="text-7xl md:text-9xl font-bold tracking-tight -mt-4">20K</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: 0 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="cream-card w-full max-w-[340px] md:max-w-[420px] p-6 md:p-8 absolute right-0 z-10 shadow-[0_60px_120px_rgba(0,0,0,0.6)] border border-[#061a12]/5"
              >
                <p className="text-[#061a12]/20 text-[9px] md:text-[10px] font-bold mb-6 uppercase tracking-[0.2em]">Fintech Partners: Prodigy & MPOWER</p>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { label: "NO COSIGNER", title: "Global Talent Loan for STEM Students", type: "recommended" },
                    { label: "COLLATERAL-FREE", title: "Future Earning Potential Grant", type: "default" },
                    { label: " Pakistani Special", title: "Outbound Mobility Scholarship", type: "default", secondLabel: "NEW" }
                  ].map((s, i) => (
                    <div key={i} className="border-t border-[#061a12]/5 pt-4 md:pt-6 space-y-2 md:space-y-3">
                      <div className="flex gap-2">
                        <span className={`pill-label ${s.type === 'recommended' ? 'pill-recommended' : ''}`}>{s.label}</span>
                        {s.secondLabel && <span className="pill-label pill-merit">{s.secondLabel}</span>}
                      </div>
                      <p className="font-bold text-base md:text-lg tracking-tight leading-tight text-[#061a12] line-clamp-1">{s.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <span className="section-label mx-auto lg:mx-0">Institutional Capital Integration</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white mb-8">
                Funding that <br /> skips the collateral.
              </h2>
              <p className="text-[#f6f6e9]/60 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-2 md:mb-10 font-jakarta">
                Bypass the cosigner barrier. We integrate with global fintech lenders who fund your degree based on where you're going, not where you're from.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SECTION: How it Works (Dual-Engine Architecture) */}
        <motion.section 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-10 md:py-32 px-6 bg-[#061a12]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-24">
              <span className="section-label mx-auto">The Architecture</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white">
                Dual-Engine <br /> Intelligence.
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Academic Module */}
              <div className="glass p-4 md:p-14 rounded-[40px] md:rounded-[50px] border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 md:p-10">
                   <Globe className="w-8 h-8 md:w-12 md:h-12 text-[#c1ff72]/20" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-10 flex items-center gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-[#c1ff72] flex items-center justify-center text-[#061a12] text-sm md:text-base">1</div>
                  Academic Copilot
                </h3>
                <div className="space-y-6 md:space-y-12">
                  {[
                    { step: "Profile Ingestion", desc: "Upload your transcripts and goals. Our RAG engine parses your academic DNA." },
                    { step: "Predictive Matching", desc: "We map your major against 50,000+ global programs for the highest admission probability." },
                    { step: "SOP Architecture", desc: "Collaborate with our AI to elicit your unique narrative for an Ivy-standard SOP." }
                  ].map((item, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#c1ff72]" />
                      <h4 className="text-white font-bold text-lg mb-2">{item.step}</h4>
                      <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Module */}
              <div className="glass p-4 md:p-14 rounded-[40px] md:rounded-[50px] border-[#ffe44d]/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 md:p-10">
                   <Briefcase className="w-8 h-8 md:w-12 md:h-12 text-[#ffe44d]/20" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-10 flex items-center gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-[#ffe44d] flex items-center justify-center text-[#061a12] text-sm md:text-base">2</div>
                  Career Copilot
                </h3>
                <div className="space-y-6 md:space-y-12">
                  {[
                    { step: "01. Intake", desc: "Our RAG system ingests your academic profile, extracurriculars, and financial ceiling." },
                    { step: "02. Mapping", desc: "Analysis against 50,000+ programs across 40 countries using predictive ROI scoring." },
                    { step: "03. Matching", desc: "Hyper-specific selection of unis that guarantee the highest career placement ROI." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + (i * 0.15) }}
                      viewport={{ once: true }}
                      className="relative pl-10"
                    >
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#ffe44d]" />
                      <h4 className="text-white font-bold text-lg mb-2">{item.step}</h4>
                      <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION: The Comparison (Pathway vs Legacy) */}
        <motion.section 
          id="why-us" 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-10 md:py-32 px-6 bg-[#061a12] border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto text-center">
            <span className="section-label mx-auto">Market Disruption</span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tight leading-[1.1] md:leading-[0.9] text-white mb-12 md:mb-20">
              Legacy Consultants <br /> vs. <span className="font-bold text-[#c1ff72]">Pathway AI.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Legacy Column */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/5 p-4 md:p-14 text-left border border-white/10 rounded-[32px] md:rounded-[48px] hover:bg-white/[0.07] transition-all"
              >
                <h3 className="text-white font-bold text-lg md:text-2xl mb-6 md:mb-12 flex items-center gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-500 text-sm md:text-lg">✕</span>
                  </div>
                  Legacy Consultants
                </h3>
                <div className="space-y-6 md:space-y-10">
                  {[
                    { label: "COST", val: "$1,500 - $3,000 Platform Fees" },
                    { label: "BIAS", val: "Limited to 'Partner' Universities" },
                    { label: "SPEED", val: "3-4 Weeks for SOP Feedback" },
                    { label: "DATA", val: "Human-led, high error variance" }
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1 md:mb-3 group-hover:text-white/40 transition-colors">{item.label}</p>
                      <p className="text-white/40 font-bold text-base md:text-xl line-through decoration-red-500/40">{item.val}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Pathway Column */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-[#c1ff72]/5 p-4 md:p-14 text-left border border-[#c1ff72]/20 rounded-[32px] md:rounded-[48px] relative overflow-hidden group hover:bg-[#c1ff72]/10 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 md:mb-12">
                  <h3 className="text-[#c1ff72] font-black text-lg md:text-2xl flex items-center gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#c1ff72] flex items-center justify-center text-[#061a12] text-xs md:text-sm">
                      ✓
                    </div>
                    Pathway AI
                  </h3>
                  <div className="bg-[#c1ff72] text-[#061a12] px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter w-fit">Recommended</div>
                </div>
                <div className="space-y-6 md:space-y-10">
                  {[
                    { label: "COST", val: "$0.00 — Purely Free for Students" },
                    { label: "BIAS", val: "Objective Matching (50,000+ Unis)" },
                    { label: "SPEED", val: "Real-time AI Iterations" },
                    { label: "DATA", val: "Proprietary RAG & Predictive ROI" }
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-bold text-[#c1ff72]/40 uppercase tracking-[0.2em] mb-1 md:mb-3">{item.label}</p>
                      <p className="text-white font-black text-lg md:text-2xl">{item.val}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SECTION: Professional Case Study */}
        <motion.section 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-10 md:py-32 px-6 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#061a12] rounded-[32px] md:rounded-[60px] p-4 md:p-24 relative overflow-hidden border border-white/5 shadow-[0_80px_160px_rgba(0,0,0,0.8)]">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c1ff72]/5 to-transparent" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-20 items-center">
                <div>
                  <span className="bg-[#c1ff72] text-[#061a12] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 md:mb-10 inline-block">Impact Study 01</span>
                  <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] md:leading-[0.9] mb-6 md:mb-8">
                    From Lahore to <br /> Munich in 45 days.
                  </h2>
                  <p className="text-white/50 text-sm md:text-xl leading-relaxed mb-6 md:mb-12 font-jakarta italic">
                    "I had the grades but zero direction. Legacy consultants only wanted to send me to their partners. Pathway matched me to TU Munich based on my specific major and secured my funding in weeks."
                  </p>
                  
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#c1ff72]/20 border border-[#c1ff72]/30 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" alt="Ahmed" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-base md:text-lg">Ahmed R.</p>
                      <p className="text-white/30 text-[10px] md:text-sm font-bold uppercase tracking-widest">M.Sc Computer Science, TU Munich</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-1 md:p-8 rounded-[32px] border-white/5 overflow-hidden">
                  <div className="flex flex-col">
                    {[
                      { label: "Scholarship Secured", val: "$32,000", sub: "Annual Merit Grant" },
                      { label: "Time Saved", val: "220h", sub: "Consultant Hours" },
                      { label: "Visa Probability", val: "94%", sub: "Risk Assessment" },
                      { label: "ROI Match", val: "High", sub: "Career Trajectory" }
                    ].map((stat, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                        viewport={{ once: true }}
                        className={`p-4 md:p-8 ${i !== 3 ? 'border-b border-white/5' : ''}`}
                      >
                        <div className="flex flex-col items-start md:block">
                          <p className="text-[#c1ff72] text-3xl md:text-4xl font-black tracking-tighter mb-1 md:mb-2">{stat.val}</p>
                          <div className="text-left">
                            <p className="text-white font-bold text-xs md:text-sm mb-0.5 md:mb-1">{stat.label}</p>
                            <p className="text-white/20 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">{stat.sub}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION: The Trust Layer (Institutional Grade Security) */}
        <motion.section 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-10 md:py-32 px-6 border-y border-white/5 bg-[#061a12] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="section-label">Enterprise Security</span>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] md:leading-[0.9] text-white mb-8 md:mb-10">
                  Built for Security. <br />
                  Scaled for Trust.
                </h2>
                <p className="text-white/40 text-xl leading-relaxed mb-12 font-jakarta">
                  Pathway AI is more than a copilot—it's an institutional-grade infrastructure designed to protect student data and ensure 100% regulatory compliance in international education.
                </p>
                
                <div className="space-y-8">
                  {[
                    { title: "Data Sovereignty", desc: "Military-grade encryption for all student profiles and documentation." },
                    { title: "Expert Triage", desc: "Automated hand-off to OMARA/OISC-certified legal advisors for high-stakes cases." },
                    { title: "Live Intelligence", desc: "Direct API integration with global immigration and embassy traffic-light systems." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] mt-2.5 shrink-0" />
                      <div>
                        <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                        <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="glass p-4 md:p-12 rounded-[32px] md:rounded-[60px] border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#c1ff72]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-[#c1ff72]/20 flex items-center justify-center mx-auto mb-6 md:mb-10">
                       <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-[#c1ff72]" />
                    </div>
                    <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 md:mb-6">Security Certified</h3>
                    <p className="text-white/30 text-xs md:text-sm mb-6 md:mb-10 font-jakarta px-4">Operating under the highest global standards for international student data management.</p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                       <div className="bg-white/5 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">GDPR Compliant</div>
                       <div className="bg-white/5 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">AES-256 Encrypted</div>
                       <div className="bg-white/5 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">ISO 27001 Ready</div>
                       <div className="bg-white/5 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">SOC2 Type II</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#c1ff72]/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#ffe44d]/10 rounded-full blur-[100px] -z-10" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION: Interactive FAQ */}
        <motion.section 
          id="faq" 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-10 md:py-40 px-6 bg-white/[0.01]"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24">
            <div className="text-center lg:text-left">
              <span className="section-label mx-auto lg:mx-0">Expert Triage</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] md:leading-[0.9] text-white mb-8">Compliance & <br /> Clarity.</h2>
              <p className="text-[#f6f6e9]/60 text-lg md:text-xl leading-relaxed mb-12 font-jakarta">
                Navigating international immigration law requires precision. We act as a compliant triage engine before hand-off to certified legal advisors.
              </p>
              <div className="p-6 rounded-2xl bg-[#ffe44d]/10 border border-[#ffe44d]/20 text-[#ffe44d] text-xs font-bold font-jakarta leading-relaxed mx-auto lg:mx-0 max-w-md">
                IMPORTANT: We provide informational guidance via RAG. Strategic legal interpretation is routed to certified RMAs and OISC advisors.
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/5">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className={`text-lg md:text-xl font-bold transition-colors ${openFaq === i ? 'text-[#c1ff72]' : 'text-white/60 group-hover:text-white'}`}>
                      {faq.question}
                    </span>
                    <Plus className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-45 text-[#c1ff72]' : 'text-white/20'}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-white/40 leading-relaxed font-jakarta">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION: Final CTA */}
        <section className="py-20 md:py-40 px-6 bg-gradient-to-b from-transparent to-[#c1ff72]/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-9xl font-bold tracking-tighter text-white mb-12 leading-[0.85]">
              Your Future. <br /> <span className="text-[#c1ff72]">Optimized.</span>
            </h2>
            <Link 
              href="/onboarding"
              className="bg-[#c1ff72] text-[#061a12] px-6 md:px-12 py-3 md:py-6 rounded-xl md:rounded-2xl font-bold text-base md:text-xl hover:scale-110 transition-all shadow-[0_20px_50px_rgba(193,255,114,0.3)] uppercase tracking-widest active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20 md:mb-32">
            <img src="/logo.svg" alt="Pathway Logo" className="h-10 w-auto" />
            <Link 
              href="/onboarding"
              className="bg-[#c1ff72] text-[#061a12] px-6 md:px-12 py-3 md:py-6 rounded-xl md:rounded-2xl font-bold text-base md:text-xl hover:scale-110 transition-all shadow-[0_20px_50px_rgba(193,255,114,0.3)] uppercase tracking-widest active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12 md:mb-32 border-t border-white/5 pt-12 md:pt-20 text-left">
            <div>
              <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-8">Platform</h4>
              <ul className="space-y-4 text-white/40 font-bold text-sm">
                <li><Link href="#matching" className="hover:text-[#c1ff72] transition-colors">Education Matching</Link></li>
                <li><Link href="#internships" className="hover:text-[#c1ff72] transition-colors">Global Internships</Link></li>
                <li><Link href="#why-us" className="hover:text-[#c1ff72] transition-colors">Why Us?</Link></li>
                <li><Link href="#faq" className="hover:text-[#c1ff72] transition-colors">Compliance & FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-8">Resources</h4>
              <ul className="space-y-4 text-white/40 font-bold text-sm">
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">SOP Architect</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Visa Compliance</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Student Loans</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-8">Company</h4>
              <ul className="space-y-4 text-white/40 font-bold text-sm">
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">About Pathway</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Mission</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-8">Connect</h4>
              <ul className="space-y-4 text-white/40 font-bold text-sm">
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Instagram</Link></li>
                <li><Link href="#" className="hover:text-[#c1ff72] transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
            <p className="text-[10px] text-white/10 font-bold uppercase tracking-[0.2em]">
              © 2026 Pathway AI. Designed for the global student exodus.
            </p>
            <div className="flex gap-10 text-[10px] text-white/10 font-bold uppercase tracking-[0.2em]">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
