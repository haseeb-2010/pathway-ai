"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, University, Briefcase, FileEdit, CheckCircle2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "elicitation" | "matches" | "sop";

export default function CopilotPage() {
  const [step, setStep] = useState<Step>("elicitation");
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEliticationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsProcessing(true);
    // Simulate RAG retrieval delay
    setTimeout(() => {
      setIsProcessing(false);
      setStep("matches");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-sans">
      {/* Remove gradient overlay */}
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-white" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold">Pathway Copilot</span>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium">
          <div className={cn("px-3 py-1 rounded-lg", step === "elicitation" ? "bg-primary text-white" : "text-muted-foreground")}>1. Profile</div>
          <div className="w-8 h-[1px] bg-white/10" />
          <div className={cn("px-3 py-1 rounded-lg", step === "matches" ? "bg-primary text-white" : "text-muted-foreground")}>2. Matches</div>
          <div className="w-8 h-[1px] bg-white/10" />
          <div className={cn("px-3 py-1 rounded-lg", step === "sop" ? "bg-primary text-white" : "text-muted-foreground")}>3. SOP Builder</div>
        </div>
        
        <Link href="/tracker" className="text-sm font-semibold hover:text-accent transition-colors">
          Go to Tracker →
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {step === "elicitation" && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full animate-in fade-in zoom-in-95 duration-500">
            <div className="glass w-full rounded-3xl p-8 border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              
              <h2 className="font-heading text-3xl font-bold mb-2">Let's build your profile.</h2>
              <p className="text-muted-foreground mb-8">Drop your "Brag Sheet" below. Include your grades, interests, and budget.</p>
              
              <form onSubmit={handleEliticationSubmit} className="space-y-4 relative z-10">
                <div className="relative">
                  <textarea 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., I have 85% in FSc Pre-Medical, scored 1450 on the SAT, and my budget is $10k/year. I want to study biotech..."
                    className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="flex gap-2">
                        <span className="w-3 h-3 bg-primary rounded-full animate-bounce" />
                        <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={!query || isProcessing}
                  className="w-full bg-[#f6f6e9] text-[#061a12] font-bold py-4 rounded-lg hover:bg-[#f6f6e9]/90 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? "Analyzing Profile & Searching DB..." : "Find My Matches"}
                </button>
              </form>
            </div>
          </div>
        )}

        {step === "matches" && (
          <div className="flex-1 p-6 max-w-5xl mx-auto w-full animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-2 text-white">Top Matches</h2>
                <p className="text-muted-foreground">Based on your profile, we found these high-probability fits.</p>
              </div>
              <button 
                onClick={() => setStep("sop")}
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(235,72,153,0.2)]"
              >
                Start SOP <FileEdit className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Universities */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold mb-4">
                  <University className="w-5 h-5" /> Universities
                </div>
                {[
                  { name: "TU Munich", loc: "Germany", fee: "0 Tuition", match: "98%" },
                  { name: "KU Leuven", loc: "Belgium", fee: "€1,092/yr", match: "94%" },
                  { name: "Aalto University", loc: "Finland", fee: "Scholarship", match: "89%" }
                ].map((uni, i) => (
                  <div key={i} className="kollegio-card p-5 hover:scale-[1.02] transition-transform group cursor-pointer border-none mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading font-bold text-lg">{uni.name}</h3>
                      <span className="bg-[#008d00]/10 text-[#008d00] text-xs px-2 py-1 rounded-full font-bold border border-[#008d00]/20">{uni.match} Match</span>
                    </div>
                    <div className="text-sm text-[#061a12]/60 flex items-center gap-4">
                      <span>{uni.loc}</span>
                      <span className="w-1 h-1 rounded-full bg-black/10" />
                      <span className="text-[#008d00] font-bold">{uni.fee}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Internships */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold mb-4">
                  <Briefcase className="w-5 h-5" /> Relevant Internships
                </div>
                {[
                  { name: "BioTech Research Intern", company: "Bayer", loc: "Berlin", match: "95%" },
                  { name: "Data Analyst Intern", company: "Siemens Healthineers", loc: "Munich", match: "91%" },
                  { name: "Summer Associate", company: "Novartis", loc: "Basel", match: "88%" }
                ].map((job, i) => (
                  <div key={i} className="kollegio-card p-5 hover:scale-[1.02] transition-transform group cursor-pointer border-none mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading font-bold text-lg">{job.name}</h3>
                      <span className="bg-[#008d00]/10 text-[#008d00] text-xs px-2 py-1 rounded-full font-bold border border-[#008d00]/20">{job.match} Match</span>
                    </div>
                    <div className="text-sm text-[#061a12]/60 flex items-center gap-4">
                      <span>{job.company}</span>
                      <span className="w-1 h-1 rounded-full bg-black/10" />
                      <span>{job.loc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "sop" && (
          <div className="flex-1 flex flex-col md:flex-row h-full animate-in slide-in-from-right-8 fade-in duration-500 overflow-hidden">
            {/* Left: Chat Side */}
            <div className="w-full md:w-[400px] border-r border-white/5 bg-white/5 flex flex-col h-[calc(100vh-73px)]">
              <div className="p-4 border-b border-white/5 bg-black/20">
                <h3 className="font-heading font-bold flex items-center gap-2 text-white">
                  <Bot className="w-5 h-5 text-primary" /> Cognitive Collaborator
                </h3>
                <p className="text-xs text-muted-foreground">Let's craft your narrative.</p>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="bg-secondary/50 p-3 rounded-2xl rounded-tl-sm text-sm border border-white/5 max-w-[90%]">
                  I see you're applying to TU Munich for Biotech. What was the most challenging project you worked on during FSc? Let's use that for the intro hook.
                </div>
              </div>
              
              <div className="p-4 border-t border-white/5 bg-black/20">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Reply here..." 
                    className="w-full bg-black border border-white/10 rounded-full px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  />
                  <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                    <Send className="w-3 h-3 text-white ml-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Rich Text Editor */}
            <div className="flex-1 flex flex-col h-[calc(100vh-73px)] bg-background">
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileEdit className="w-4 h-4" /> TU Munich - Statement of Purpose
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_25px_rgba(235,72,153,0.3)] active:scale-95 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-foreground" /> Saved
                </button>
              </div>
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto w-full min-h-[800px] glass p-10 rounded-lg outline-none focus:ring-1 ring-primary/30" contentEditable suppressContentEditableWarning>
                  <h1 className="font-heading text-2xl font-bold mb-6 text-white">[Title: Statement of Purpose]</h1>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    [Start your hook here. Your AI collaborator will help generate paragraphs based on your discussion on the left...]
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
