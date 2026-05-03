
"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Zap, 
  Database, 
  Cpu, 
  Layers, 
  Users, 
  ExternalLink,
  Github,
  Globe,
  ArrowRight,
  TrendingUp,
  Fingerprint
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: "mission",
    title: "The Mission",
    subtitle: "Pathway AI: Engineering the Future",
    content: (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#c1ff72]/10 border border-[#c1ff72]/20">
            <Sparkles className="w-4 h-4 text-[#c1ff72]" />
            <span className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-[0.2em]">Phase 1: Discovery</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            Bypass the <br /> <span className="text-[#c1ff72]">Gatekeepers.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-lg">
            We are replacing $2,000 consultants with an autonomous AI engine that matches students to global opportunities with 98% precision.
          </p>
          <div className="flex gap-4 pt-4">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[#c1ff72] text-2xl font-black">98%</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">Match Accuracy</p>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[#c1ff72] text-2xl font-black">Zero</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">Consultant Fees</p>
             </div>
          </div>
        </div>
        <div className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          <Image src="/pitch/hero.png" alt="Hero" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061a12] via-transparent to-transparent opacity-60" />
        </div>
      </div>
    )
  },
  {
    id: "problem",
    title: "The Problem",
    subtitle: "A Broken Pipeline",
    content: (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            The <span className="text-white/20 italic">Manual</span> Era <br /> is Obsolete.
          </h2>
          <div className="space-y-4">
            {[
              { label: "Opaque Requirements", desc: "Students are blind to the 'hidden' criteria of top unis." },
              { label: "Fragmented Data", desc: "Scattered sources make discovery a 3-month nightmare." },
              { label: "High Stakes", desc: "One wrong choice costs years of time and thousands in debt." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                   <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <div>
                   <h4 className="font-bold text-sm">{item.label}</h4>
                   <p className="text-xs text-white/30">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          <Image src="/pitch/features.png" alt="Features" fill className="object-cover" />
        </div>
      </div>
    )
  },
  {
    id: "solution",
    title: "Our Solution",
    subtitle: "Precision Engineering",
    content: (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Total <br /><span className="text-[#c1ff72]">Career Stack.</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Cpu, title: "Vector Matching", desc: "Aligning deep profile parameters with global databases." },
              { icon: Fingerprint, title: "SOP Generator", desc: "Context-aware statement generation that sounds human." },
              { icon: Zap, title: "Application Tracker", desc: "Unified CRM for all your career moves." }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-[#c1ff72]/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-[#c1ff72]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                   <item.icon className="w-6 h-6 text-[#c1ff72]" />
                </div>
                <div>
                   <h4 className="font-bold">{item.title}</h4>
                   <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[400px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          <Image src="/pitch/dashboard.png" alt="Dashboard" fill className="object-cover object-top" />
        </div>
      </div>
    )
  },
  {
    id: "architecture",
    title: "Architecture",
    subtitle: "The RAG Pipeline",
    content: (
      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold">Intelligent Data Flow</h2>
          <p className="text-white/30 text-sm italic">How we process 15,000+ data points in real-time.</p>
        </div>
        <div className="relative p-10 glass rounded-[50px] border-white/5 flex flex-col items-center justify-center space-y-10">
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-white/20" />
              </div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">Student Data</p>
            </div>
            <ArrowRight className="w-6 h-6 text-white/10" />
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-[36px] bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center shadow-[0_0_40px_rgba(193,255,114,0.1)]">
                <Cpu className="w-12 h-12 text-[#c1ff72]" />
              </div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#c1ff72]">RAG Engine</p>
            </div>
            <ArrowRight className="w-6 h-6 text-white/10" />
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center">
                <Database className="w-8 h-8 text-white/20" />
              </div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">Vector Store</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
             {[
               { label: "NVIDIA Embeddings", icon: Layers },
               { label: "Qwen 72B Reasoning", icon: Sparkles },
               { label: "Supabase Vector", icon: Database }
             ].map((item, i) => (
               <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center gap-2">
                 <item.icon className="w-4 h-4 text-[#c1ff72]" />
                 <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: "demo",
    title: "Product Demo",
    subtitle: "Real-world Performance",
    content: (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="aspect-video glass rounded-[40px] border-white/10 flex flex-col items-center justify-center relative overflow-hidden bg-black/40">
           <Zap className="w-20 h-20 text-[#c1ff72] opacity-10 animate-pulse" />
           <p className="text-white/20 text-xs font-bold uppercase tracking-widest mt-4">Video Placeholder</p>
        </div>
        <div className="space-y-6">
           <h3 className="text-3xl font-bold">Fast. Accurate. <br /> Private.</h3>
           <div className="space-y-4">
              {[
                { title: "Smart Consultant", desc: "24/7 access to career expertise.", img: "/pitch/consultant.png" },
                { title: "Interview Ready", desc: "Live simulation with instant feedback.", img: "/pitch/interview.png" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                   <div className="w-16 h-12 relative rounded-lg overflow-hidden border border-white/10">
                      <Image src={item.img} alt={item.title} fill className="object-cover" />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-[10px] text-white/40">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    )
  },
  {
    id: "team",
    title: "The Founders",
    subtitle: "Engineers & Operators",
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { name: "Abdul Haseeb", role: "Team Lead & Architect", bio: "Product visionary and primary developer." },
          { name: "Rehma", role: "AI & NLP Specialist", bio: "Linguistics expert architecting RAG flows." },
          { name: "Khalid", role: "Data Scientist", bio: "Vector DB and semantic engine specialist." },
          { name: "Huzaifa", role: "Frontend Lead", bio: "Frictionless UI implementation expert." },
          { name: "Hania", role: "UI/UX Designer", bio: "Crafting the premium visual identity." },
          { name: "Areeba", role: "Backend / RAG", bio: "Retrieval flow optimization specialist." }
        ].map((member, i) => (
          <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-[#c1ff72]/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#c1ff72]/10 flex items-center justify-center font-bold text-[#c1ff72] mb-3">
              {member.name[0]}
            </div>
            <h4 className="font-bold text-sm mb-1">{member.name}</h4>
            <p className="text-[9px] font-bold text-[#c1ff72] uppercase tracking-widest mb-3">{member.role}</p>
            <p className="text-[10px] text-white/30 leading-relaxed italic">{member.bio}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: "links",
    title: "Get Started",
    subtitle: "Launch Pathway AI",
    content: (
      <div className="flex flex-col items-center justify-center text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-7xl font-black italic tracking-tighter">
            JOIN THE <span className="text-[#c1ff72]">FUTURE.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            Ready to deploy? Access the platform or explore the source code below.
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="https://pathway-ai-app.vercel.app/" target="_blank" className="px-10 py-5 rounded-2xl bg-[#c1ff72] text-[#061a12] font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[#c1ff72]/10">
            <Globe className="w-4 h-4" /> Live Platform
          </Link>
          <Link href="https://github.com/haseeb-2010/pathway-ai" target="_blank" className="px-10 py-5 rounded-2xl bg-white/5 text-white font-black uppercase tracking-widest text-xs flex items-center gap-3 border border-white/10 hover:bg-white/10 transition-all">
            <Github className="w-4 h-4" /> GitHub Repo
          </Link>
        </div>
      </div>
    )
  }
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#061a12] text-white overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c1ff72]/[0.02] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c1ff72]/[0.02] blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* FIXED HEADER (Outside Boundary) */}
      <header className="p-8 md:p-12 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
           <div className="relative w-48 h-12">
              <Image 
                src="/logo.png" 
                alt="Pathway Logo" 
                fill 
                className="object-contain object-left scale-150 transform translate-x-4" 
                priority
              />
           </div>
        </div>
        <div className="flex flex-col items-end gap-1">
           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c1ff72]">Investor Pitch 2026</span>
           <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 italic">{slides[currentSlide].id}</span>
        </div>
      </header>

      {/* SLIDE BOUNDARY (Centered, No Scroll) */}
      <main className="flex-1 flex items-center justify-center px-12 relative z-10">
        <div className="w-full max-w-6xl max-h-[70vh] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="space-y-1">
                <span className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-[0.6em] block mb-2">
                  {slides[currentSlide].subtitle}
                </span>
                <div className="h-[2px] w-16 bg-[#c1ff72] mb-10" />
              </div>
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* FIXED FOOTER (Outside Boundary) */}
      <footer className="p-8 md:p-12 flex items-end justify-between z-50">
        {/* Progress & Slide No (Bottom Left) */}
        <div className="flex flex-col gap-4">
           <div className="flex gap-2">
              {slides.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${i === currentSlide ? "w-10 bg-[#c1ff72]" : "w-4 bg-white/10 hover:bg-white/20"}`}
                />
              ))}
           </div>
           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-3">
              <span className="text-[#c1ff72]">{String(currentSlide + 1).padStart(2, '0')}</span>
              <div className="w-4 h-[1px] bg-white/10" />
              <span>{String(slides.length).padStart(2, '0')}</span>
           </span>
        </div>

        {/* Nav Buttons (Bottom Right) */}
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c1ff72] hover:text-[#061a12] transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-2xl bg-[#c1ff72] text-[#061a12] flex items-center justify-center hover:scale-105 transition-all group shadow-[0_10px_40px_rgba(193,255,114,0.1)]"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </footer>

      <style jsx global>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        body {
          background-color: #061a12;
        }
      `}</style>
    </div>
  );
}
