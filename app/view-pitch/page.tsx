
"use client";

import { useState, useEffect } from "react";
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
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: "title",
    title: "Pathway AI",
    subtitle: "The Future of Student Career Engineering",
    content: (
      <div className="space-y-12">
        <div className="space-y-6">
          <span className="text-[#c1ff72] text-[12px] font-bold uppercase tracking-[0.4em] block">The Problem</span>
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            The Student Discovery <br /> <span className="text-white/40 italic text-3xl md:text-6xl">Gap is Widening.</span>
          </h2>
          <p className="text-white/40 text-lg md:text-2xl max-w-2xl leading-relaxed">
            Millions of students in emerging markets face a fragmented career pipeline. Expensive consultants, opaque requirements, and high-stakes decisions without data-driven guidance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {[
            { label: "Consultant Cost", value: "$2,000+", desc: "Average fee per student" },
            { label: "Match Accuracy", value: "24%", desc: "Success rate of manual search" },
            { label: "Career Pivot", value: "65%", desc: "Students unsure of next steps" }
          ].map((stat, i) => (
            <div key={i} className="glass p-8 rounded-[32px] border-white/5 space-y-2">
              <p className="text-[#c1ff72] text-3xl font-black">{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
              <p className="text-[11px] text-white/20 italic">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    image: "/pitch/hero.png"
  },
  {
    id: "solution",
    title: "The Solution",
    subtitle: "A Frictionless AI Ecosystem",
    content: (
      <div className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Pathway AI: <br /> <span className="text-[#c1ff72]">Total Career Autonomy.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-xl">
            We've built the first autonomous engine designed for the youth bulge. A 360° suite that handles everything from discovery to execution.
          </p>
        </div>
        <div className="space-y-6">
          {[
            { icon: Target, title: "Precision RAG Matching", desc: "Proprietary vector search aligning student profiles with global opportunities." },
            { icon: Cpu, title: "Cognitive SOP Engine", desc: "LLM-driven statement generation that bypasses the writer's block." },
            { icon: ShieldCheck, title: "Interview Simulation", desc: "Real-time AI voice/text practice to master high-stakes conversations." }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-6 p-6 rounded-[32px] bg-white/5 border border-white/5 hover:border-[#c1ff72]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#c1ff72]/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-[#c1ff72]" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    image: "/pitch/dashboard.png"
  },
  {
    id: "tech",
    title: "The Tech Stack",
    subtitle: "Built for Scale & Intelligence",
    content: (
      <div className="space-y-12">
        <div className="grid grid-cols-2 gap-6">
          {[
            { category: "Frontend", tools: ["Next.js 14", "TailwindCSS", "Framer Motion"], icon: Layers },
            { category: "AI Engine", tools: ["NVIDIA Embeddings", "Qwen 72B", "Custom RAG"], icon: Sparkles },
            { category: "Backend", tools: ["Supabase", "PostgreSQL", "Node.js"], icon: Database },
            { category: "Deployment", tools: ["Vercel", "GitHub Actions", "CDN Edge"], icon: Zap }
          ].map((stack, i) => (
            <div key={i} className="glass p-8 rounded-[40px] border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  <stack.icon className="w-6 h-6 text-[#c1ff72]" />
                </div>
                <h3 className="font-bold text-xl">{stack.category}</h3>
              </div>
              <ul className="space-y-3">
                {stack.tools.map((tool, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/40 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72]" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
    image: "/pitch/features.png"
  },
  {
    id: "diagram",
    title: "System Architecture",
    subtitle: "Data Flow & Processing",
    content: (
      <div className="space-y-12 flex flex-col justify-center h-full">
        <div className="relative p-12 glass rounded-[60px] border-white/5 flex flex-col items-center justify-center space-y-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c1ff72]/5 blur-[100px] rounded-full" />
          
          <div className="flex items-center gap-12 relative z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center">
                <Users className="w-10 h-10 text-white/20" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Student Input</p>
            </div>
            
            <ArrowRight className="w-8 h-8 text-white/10" />

            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-[40px] bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center shadow-[0_0_50px_rgba(193,255,114,0.1)]">
                <Cpu className="w-14 h-14 text-[#c1ff72]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#c1ff72]">AI RAG Engine</p>
            </div>

            <ArrowRight className="w-8 h-8 text-white/10" />

            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center">
                <Database className="w-10 h-10 text-white/20" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Vector DB</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 w-full">
            {[
              { label: "University Index", count: "5,000+" },
              { label: "Internship Index", count: "10,000+" },
              { label: "Student Profiles", count: "Secure" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                <p className="text-[#c1ff72] font-black text-xl mb-1">{item.count}</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-white/20">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    image: "/pitch/matches.png"
  },
  {
    id: "demo",
    title: "Live Product Experience",
    subtitle: "Witness the Engine in Action",
    content: (
      <div className="space-y-12">
        <div className="aspect-video glass rounded-[40px] border-white/5 flex flex-col items-center justify-center space-y-6 relative overflow-hidden bg-black/40">
          <div className="absolute inset-0 bg-[#c1ff72]/5 flex items-center justify-center">
            <Zap className="w-24 h-24 text-[#c1ff72] opacity-20 animate-pulse" />
          </div>
          <div className="relative z-10 text-center space-y-4">
            <h3 className="text-2xl font-bold uppercase tracking-[0.2em]">Video Placeholder</h3>
            <p className="text-white/40 text-sm italic">The founding team will integrate the live walkthrough here.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <h4 className="font-bold mb-2">Cognitive Chat</h4>
            <p className="text-xs text-white/40 leading-relaxed">Real-time career advisor with context-aware responses and resource linking.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <h4 className="font-bold mb-2">Smart Tracker</h4>
            <p className="text-xs text-white/40 leading-relaxed">End-to-end application management from discovery to offer acceptance.</p>
          </div>
        </div>
      </div>
    ),
    image: "/pitch/consultant.png"
  },
  {
    id: "team",
    title: "The Founding Team",
    subtitle: "A Balanced Cartel of Operators",
    content: (
      <div className="space-y-8 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Abdul Haseeb", role: "Team Lead", bio: "Orchestrating product vision and business model execution. Developed the entire product architecture, UI, and RAG integration." },
            { name: "Rehma", role: "AI & NLP", bio: "MPhil in Linguistics. Architected our hallucination-free RAG pipeline and cognitive SOP generator." },
            { name: "Khalid", role: "Data & ML", bio: "Managing vector database infrastructure and semantic recommendation engine. Built the core uni/internship datasets." },
            { name: "Huzaifa", role: "Frontend", bio: "Owning Next.js/React architecture, translating complex AI workflows into a frictionless UI." },
            { name: "Hania", role: "UI/UX Designer", bio: "Crafting the visual identity, intuitive design system, and investor-grade aesthetics." },
            { name: "Areeba", role: "Backend / RAG", bio: "Deep collaboration on backend components and optimization of the RAG retrieval flow." }
          ].map((member, i) => (
            <div key={i} className="p-6 rounded-[32px] bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c1ff72]/10 flex items-center justify-center font-bold text-[#c1ff72]">
                  {member.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{member.name}</h4>
                  <p className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
              <p className="text-xs text-white/30 leading-relaxed italic">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    image: "/pitch/interview.png"
  },
  {
    id: "links",
    title: "Pathway AI",
    subtitle: "Let's Build the Future.",
    content: (
      <div className="space-y-16 flex flex-col justify-center h-full">
        <div className="space-y-8">
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter">
            JOIN THE <br /> <span className="text-[#c1ff72]">COHORT.</span>
          </h2>
          <p className="text-white/40 text-xl max-w-xl">
            Pathway AI is now live and open-source. Help us bridge the gap for the next billion students.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <Link 
            href="https://pathway-ai-app.vercel.app/" 
            target="_blank"
            className="flex-1 glass p-10 rounded-[40px] border-white/5 hover:border-[#c1ff72]/30 transition-all group"
          >
            <Globe className="w-12 h-12 text-[#c1ff72] mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-2xl font-bold mb-2">Live App</h4>
            <p className="text-white/40 text-sm mb-6 uppercase tracking-widest font-bold">pathway-ai-app.vercel.app</p>
            <div className="flex items-center gap-2 text-[#c1ff72] text-[10px] font-bold uppercase tracking-[0.2em]">
              Launch Now <ExternalLink className="w-3 h-3" />
            </div>
          </Link>

          <Link 
            href="https://github.com/haseeb-2010/pathway-ai" 
            target="_blank"
            className="flex-1 glass p-10 rounded-[40px] border-white/5 hover:border-[#c1ff72]/30 transition-all group"
          >
            <Github className="w-12 h-12 text-white/20 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-2xl font-bold mb-2">Source Code</h4>
            <p className="text-white/40 text-sm mb-6 uppercase tracking-widest font-bold">github.com/pathway-ai</p>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
              Explore Repository <ExternalLink className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </div>
    ),
    image: "/pitch/hero.png"
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
    <div className="fixed inset-0 bg-[#061a12] text-white overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c1ff72]/[0.02] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c1ff72]/[0.02] blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-12 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#c1ff72] rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#061a12] fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase italic">Pathway AI</span>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden md:flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Investor Pitch 2026</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c1ff72]">{slides[currentSlide].id}</span>
           </div>
        </div>
      </header>

      {/* Main Slide Content */}
      <main className="h-full pt-40 pb-20 px-12 max-w-[1600px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 h-full items-center">
          {/* Left Content */}
          <div className="relative h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="space-y-12"
              >
                <div className="space-y-2">
                  <span className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-[0.5em] block">
                    {slides[currentSlide].subtitle}
                  </span>
                  <div className="h-1 w-12 bg-[#c1ff72]" />
                </div>
                {slides[currentSlide].content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:block relative h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="relative h-full w-full"
              >
                <div className="absolute inset-0 bg-[#c1ff72]/5 blur-[100px] rounded-[60px]" />
                <div className="relative h-full w-full glass rounded-[60px] border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                   <Image 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    fill
                    className="object-cover object-top opacity-80"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#061a12] via-transparent to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-12 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? "w-12 bg-[#c1ff72]" : "w-6 bg-white/10 hover:bg-white/20"}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c1ff72] hover:text-[#061a12] transition-all group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-14 h-14 rounded-2xl bg-[#c1ff72] text-[#061a12] flex items-center justify-center hover:scale-105 transition-all group shadow-[0_10px_40px_rgba(193,255,114,0.2)]"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </footer>

      <style jsx global>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(193, 255, 114, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(193, 255, 114, 0.4);
        }
      `}</style>
    </div>
  );
}
