"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Search, FileText, Layout, Sparkles, Briefcase, Globe, TrendingUp } from "lucide-react";

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
    <div className="min-h-screen relative">
      {/* Navigation - Capsule Style */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <nav className="glass px-8 py-3 flex items-center justify-between rounded-full border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
          <div className="flex items-center">
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
            className="bg-[#c1ff72] hover:bg-[#c1ff72]/90 text-[#061a12] px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-widest active:scale-95"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </div>

      <main className="pt-20">
        {/* HERO SECTION: AI Student Copilot */}
        <section id="matching" className="py-10 md:py-16 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="text-center lg:text-left">
              <span className="section-label mx-auto lg:mx-0">AI Student Copilot</span>
              <h1 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9] text-white mb-8">
                Bypass the consultant. <br className="hidden md:block" />
                Land your dream uni.
              </h1>
              <p className="text-[#f6f6e9]/60 text-lg md:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 font-jakarta">
                The first autonomous AI engine designed for the Pakistani youth bulge. We match your profile to global programs and secure your future—completely for free.
              </p>
              <Link 
                href="/onboarding"
                className="bg-[#f6f6e9] text-[#061a12] px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all inline-flex items-center gap-3 w-full md:w-auto justify-center"
              >
                Start My Journey <ArrowRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-end scale-[0.85] md:scale-100">
              <div className="cream-card w-full max-w-[340px] md:max-w-[400px] p-0 transform -rotate-3 z-10 border border-black/5">
                <div className="bg-[#061a12] p-4 md:p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 md:w-5 md:h-5 text-[#c1ff72]" />
                    <span className="font-bold text-xs md:text-sm tracking-tight uppercase">Best Matches</span>
                  </div>
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#c1ff72]" />
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
              </div>
              <div className="yellow-card w-[200px] h-[200px] md:w-[240px] md:h-[240px] absolute -bottom-6 -right-4 md:-bottom-10 md:right-0 lg:-right-10 transform rotate-12 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-4 border-[#061a12]">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] opacity-60">Visa Success</p>
                <div className="mt-auto">
                  <p className="text-5xl md:text-7xl font-bold tracking-tighter">92%</p>
                  <div className="h-1 bg-[#061a12]/10 rounded-full overflow-hidden mt-4 md:mt-6">
                    <div className="h-full bg-[#061a12] w-[92%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Internship Module */}
        <section id="internships" className="py-20 md:py-32 px-6 bg-[#c1ff72]/[0.02] border-y border-[#c1ff72]/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
             <div className="text-center lg:text-left">
              <span className="section-label mx-auto lg:mx-0">Global Career Placement</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-[#c1ff72] mb-8">
                Market Match. <br />
                Career Acceleration.
              </h2>
              <p className="text-[#f6f6e9]/60 text-lg md:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 font-jakarta">
                Our AI aligns your hyper-specific academic trajectory with precise global market demands. Find internships at Fortune 500 companies that predict your learning gains.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
                <div className="glass p-6 rounded-2xl">
                  <Globe className="w-6 h-6 text-[#c1ff72] mb-4 mx-auto lg:mx-0" />
                  <h4 className="font-bold text-sm text-white mb-2">20+ Countries</h4>
                  <p className="text-white/40 text-xs font-medium">From Finance in London to Media in Sydney.</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-[#c1ff72] mb-4 mx-auto lg:mx-0" />
                  <h4 className="font-bold text-sm text-white mb-2">Predictive ROI</h4>
                  <p className="text-white/40 text-xs font-medium">Modeled after Pro-CaRE analytics for career growth.</p>
                </div>
              </div>
            </div>

            <div className="relative h-[450px] md:h-[500px] flex items-center justify-center scale-[0.9] md:scale-100">
              <div className="glass p-6 md:p-8 rounded-[32px] w-full max-w-[440px] shadow-[0_40px_80px_rgba(0,0,0,0.4)] border-white/5">
                <p className="text-[#c1ff72] text-[10px] font-bold mb-6 uppercase tracking-widest text-center md:text-left">Active Internship Matches</p>
                <div className="space-y-4">
                  {[
                    { role: "Software Engineer", company: "Google", loc: "Munich", stipend: "€1,800/mo", roi: "High" },
                    { role: "Investment Analyst", company: "Goldman Sachs", loc: "London", stipend: "£2,200/mo", roi: "Elite" },
                    { role: "Product Manager", company: "Spotify", loc: "Stockholm", stipend: "€2,100/mo", roi: "Very High" }
                  ].map((job, i) => (
                    <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-[#c1ff72] transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-xs md:text-sm text-white">{job.role}</p>
                        <p className="text-[10px] md:text-xs text-white/30 font-bold">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#c1ff72] font-bold text-[10px] md:text-xs">{job.stipend}</p>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">{job.roi} ROI</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Financial Aid */}
        <section id="funding" className="py-20 md:py-32 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="order-2 lg:order-1 relative h-[450px] md:h-[500px] w-full flex items-center justify-center lg:justify-start scale-[0.85] md:scale-100">
              <div className="yellow-card w-[240px] h-[300px] md:w-[280px] md:h-[340px] absolute left-0 lg:-left-12 z-0 p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] transform -rotate-6">
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Cosigner-Free</p>
                <div className="mt-auto">
                  <p className="text-5xl md:text-6xl font-bold tracking-tight leading-none">$</p>
                  <p className="text-7xl md:text-9xl font-bold tracking-tight -mt-4">20K</p>
                </div>
              </div>
              
              <div className="cream-card w-full max-w-[340px] md:max-w-[420px] p-6 md:p-8 absolute right-0 z-10 shadow-[0_60px_120px_rgba(0,0,0,0.6)] transform rotate-3">
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
              </div>
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <span className="section-label mx-auto lg:mx-0">Institutional Capital Integration</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white mb-8">
                Funding that <br /> skips the collateral.
              </h2>
              <p className="text-[#f6f6e9]/60 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 font-jakarta">
                Bypass the cosigner barrier. We integrate with global fintech lenders who fund your degree based on where you're going, not where you're from.
              </p>
            </div>
          </div>
        </section>
        {/* SECTION: How it Works (Dual-Engine Architecture) */}
        <section className="py-32 px-6 bg-[#061a12]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="section-label mx-auto">The Architecture</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white">
                Dual-Engine <br /> Intelligence.
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Academic Module */}
              <div className="glass p-10 md:p-14 rounded-[50px] border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10">
                   <Globe className="w-12 h-12 text-[#c1ff72]/20" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#c1ff72] flex items-center justify-center text-[#061a12]">1</div>
                  Academic Copilot
                </h3>
                <div className="space-y-12">
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
              <div className="glass p-10 md:p-14 rounded-[50px] border-[#ffe44d]/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10">
                   <Briefcase className="w-12 h-12 text-[#ffe44d]/20" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#ffe44d] flex items-center justify-center text-[#061a12]">2</div>
                  Career Copilot
                </h3>
                <div className="space-y-12">
                  {[
                    { step: "Market Alignment", desc: "We identify global labor shortages in your field (e.g., Tech in Munich, Finance in London)." },
                    { step: "ROI Prediction", desc: "Calculate your post-grad earning potential based on real-time placement data." },
                    { step: "Placement Bridge", desc: "Direct matching with internship partners who fund your learning journey." }
                  ].map((item, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#ffe44d]" />
                      <h4 className="text-white font-bold text-lg mb-2">{item.step}</h4>
                      <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION: The Comparison (Pathway vs Legacy) */}
        <section id="why-us" className="py-32 px-6 bg-[#061a12] border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <span className="section-label mx-auto">Market Disruption</span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tight leading-[0.9] text-white mb-20">
              Legacy Consultants <br /> vs. <span className="font-bold text-[#c1ff72]">Pathway AI.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Legacy Column */}
              <div className="bg-white/5 p-10 md:p-14 text-left border border-white/10 rounded-[48px] hover:bg-white/[0.07] transition-all">
                <h3 className="text-white font-bold text-xl md:text-2xl mb-12 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-500 text-lg">✕</span>
                  </div>
                  Legacy Consultants
                </h3>
                <div className="space-y-10">
                  {[
                    { label: "COST", val: "$1,500 - $3,000 Platform Fees" },
                    { label: "BIAS", val: "Limited to 'Partner' Universities" },
                    { label: "SPEED", val: "3-4 Weeks for SOP Feedback" },
                    { label: "DATA", val: "Human-led, high error variance" }
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3 group-hover:text-white/40 transition-colors">{item.label}</p>
                      <p className="text-white/40 font-bold text-lg md:text-xl line-through decoration-red-500/40">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pathway Column */}
              <div className="bg-[#c1ff72]/5 p-10 md:p-14 text-left border border-[#c1ff72]/20 rounded-[48px] relative overflow-hidden group hover:bg-[#c1ff72]/10 transition-all">
                <div className="absolute top-0 right-0 p-8">
                   <div className="bg-[#c1ff72] text-[#061a12] px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter">Recommended</div>
                </div>
                <h3 className="text-[#c1ff72] font-black text-xl md:text-2xl mb-12 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c1ff72] flex items-center justify-center text-[#061a12] text-sm">
                    ✓
                  </div>
                  Pathway AI Copilot
                </h3>
                <div className="space-y-10">
                  {[
                    { label: "COST", val: "$0.00 — Purely Free for Students" },
                    { label: "BIAS", val: "Objective Matching (50,000+ Unis)" },
                    { label: "SPEED", val: "Real-time AI Iterations" },
                    { label: "DATA", val: "Proprietary RAG & Predictive ROI" }
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-bold text-[#c1ff72]/40 uppercase tracking-[0.2em] mb-3">{item.label}</p>
                      <p className="text-white font-black text-xl md:text-2xl">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Professional Case Study */}
        <section className="py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#061a12] rounded-[60px] p-8 md:p-24 relative overflow-hidden border border-white/5 shadow-[0_80px_160px_rgba(0,0,0,0.8)]">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c1ff72]/5 to-transparent" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <span className="bg-[#c1ff72] text-[#061a12] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 inline-block">Impact Study 01</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[0.9] mb-8">
                    From Lahore to <br /> Munich in 45 days.
                  </h2>
                  <p className="text-white/50 text-xl leading-relaxed mb-12 font-jakarta italic">
                    "I had the grades but zero direction. Legacy consultants only wanted to send me to their partners. Pathway matched me to TU Munich based on my specific major and secured my funding in weeks."
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#c1ff72]/20 border border-[#c1ff72]/30 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" alt="Ahmed" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Ahmed R.</p>
                      <p className="text-white/30 text-sm font-bold uppercase tracking-widest">M.Sc Computer Science, TU Munich</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Scholarship Secured", val: "$32,000", sub: "Annual Merit Grant" },
                    { label: "Time Saved", val: "220h", sub: "Consultant Hours" },
                    { label: "Visa Probability", val: "94%", sub: "Risk Assessment" },
                    { label: "ROI Match", val: "High", sub: "Career Trajectory" }
                  ].map((stat, i) => (
                    <div key={i} className="glass p-8 rounded-[32px] border-white/5">
                      <p className="text-[#c1ff72] text-4xl font-black tracking-tighter mb-2">{stat.val}</p>
                      <p className="text-white font-bold text-sm mb-1">{stat.label}</p>
                      <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: The Trust Layer (Institutional Grade Security) */}
        <section className="py-32 px-6 border-y border-white/5 bg-[#061a12]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="section-label">Enterprise Security</span>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white mb-10">
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
                <div className="glass p-12 rounded-[60px] border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#c1ff72]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-3xl bg-[#c1ff72]/20 flex items-center justify-center mx-auto mb-10">
                       <CheckCircle2 className="w-12 h-12 text-[#c1ff72]" />
                    </div>
                    <h3 className="text-white font-bold text-3xl mb-6">Security Certified</h3>
                    <p className="text-white/30 text-sm mb-10 font-jakarta">Operating under the highest global standards for international student data management.</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white/5 px-6 py-4 rounded-2xl text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">GDPR Compliant</div>
                       <div className="bg-white/5 px-6 py-4 rounded-2xl text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">AES-256 Encrypted</div>
                       <div className="bg-white/5 px-6 py-4 rounded-2xl text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">ISO 27001 Ready</div>
                       <div className="bg-white/5 px-6 py-4 rounded-2xl text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">SOC2 Type II</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#c1ff72]/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#ffe44d]/10 rounded-full blur-[100px] -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Interactive FAQ */}
        <section id="faq" className="py-20 md:py-40 px-6 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24">
            <div className="text-center lg:text-left">
              <span className="section-label mx-auto lg:mx-0">Expert Triage</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white mb-8">Compliance & <br /> Clarity.</h2>
              <p className="text-[#f6f6e9]/60 text-lg md:text-xl leading-relaxed mb-12 font-jakarta">
                Navigating international immigration law requires precision. We act as a compliant triage engine before hand-off to certified legal advisors.
              </p>
              <div className="p-6 rounded-2xl bg-[#ffe44d]/10 border border-[#ffe44d]/20 text-[#ffe44d] text-xs font-bold font-jakarta leading-relaxed mx-auto lg:mx-0 max-w-md">
                IMPORTANT: We provide informational guidance via RAG. Strategic legal interpretation is routed to certified RMAs and OISC advisors.
              </div>
            </div>
            
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} className="border-t border-white/10 first:border-0 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-6 md:py-8 flex justify-between items-center group cursor-pointer transition-all px-2 md:px-4 hover:bg-white/[0.02]"
                  >
                    <span className="text-white text-lg md:text-xl font-bold tracking-tight text-left font-jakarta pr-4">{faq.question}</span>
                    <motion.div 
                      animate={{ rotate: openFaq === i ? 90 : 0 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#c1ff72] group-hover:border-[#c1ff72] transition-all"
                    >
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/30 group-hover:text-[#061a12] transition-colors" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-2 md:px-4 pb-8 text-[#f6f6e9]/60 text-sm md:text-base leading-relaxed font-jakarta">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </section>
      </main>

      {/* WORLD CLASS FOOTER */}
      <footer className="bg-[#061a12] pt-40 pb-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Branding Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12 text-left">
            <div className="max-w-2xl">
              <img src="/logo.svg" alt="Pathway Logo" className="h-20 md:h-28 w-auto mb-10 -ml-2" />
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[0.9]">
                The first autonomous <br /> AI Student Copilot.
              </h2>
            </div>
            <Link 
              href="/onboarding"
              className="bg-[#c1ff72] text-[#061a12] px-12 py-6 rounded-2xl font-bold text-xl hover:scale-110 transition-all shadow-[0_20px_50px_rgba(193,255,114,0.3)] uppercase tracking-widest active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32 border-t border-white/5 pt-20 text-left">
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
