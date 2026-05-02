
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Globe, Scale, AlertTriangle } from "lucide-react";

export default function VisaCompliance() {
  return (
    <div className="min-h-screen bg-[#061a12] text-white selection:bg-[#c1ff72] selection:text-[#061a12]">
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

      <main className="max-w-6xl mx-auto px-6 pb-20 md:pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 md:space-y-24"
        >
          <header className="max-w-3xl space-y-8">
            <div className="w-16 h-16 rounded-3xl bg-[#ffe44d]/10 border border-[#ffe44d]/20 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#ffe44d]" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Visa <br /> Compliance.
            </h1>
            <p className="text-[#f6f6e9]/60 text-lg md:text-2xl leading-relaxed font-jakarta">
              Navigating immigration is about data, not luck. Our AI triages your profile against real-world visa rejection thresholds.
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass p-8 md:p-16 rounded-[48px] border-white/5 space-y-8">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight">The Traffic-Light System.</h3>
              <p className="text-white/40 leading-relaxed font-jakarta">
                We use predictive analytics to categorize your visa success probability into three tiers. This allows us to focus on high-risk areas before you even book your embassy appointment.
              </p>
              
              <div className="space-y-6">
                {[
                  { color: "bg-green-500", title: "Low Risk", desc: "Strong financial background, consistent academic record, and clear intent." },
                  { color: "bg-yellow-500", title: "Moderate Risk", desc: "Potential gaps in funding or ties to home country. Requires strategic triage." },
                  { color: "bg-red-500", title: "High Risk", desc: "Significant red flags identified. Handled by OISC-certified specialists." }
                ].map((tier, i) => (
                  <div key={i} className="flex gap-6 items-start p-6 rounded-3xl bg-white/5 border border-white/5">
                    <div className={`w-3 h-12 rounded-full ${tier.color} shrink-0`} />
                    <div>
                      <h4 className="font-bold text-lg">{tier.title}</h4>
                      <p className="text-white/30 text-sm mt-1">{tier.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
               <div className="glass p-8 rounded-[40px] border-white/5 bg-gradient-to-br from-[#ffe44d]/5 to-transparent">
                 <AlertTriangle className="w-10 h-10 text-[#ffe44d] mb-6" />
                 <h4 className="text-xl font-bold mb-4">Informational Triage</h4>
                 <p className="text-white/30 text-sm leading-relaxed">
                   IMPORTANT: Pathway AI provides data-driven informational guidance. Complex cases are automatically routed to OISC/RMA certified legal advisors for final review.
                 </p>
               </div>
               
               <div className="glass p-8 rounded-[40px] border-white/5">
                 <Scale className="w-10 h-10 text-white/20 mb-6" />
                 <h4 className="text-xl font-bold mb-4">GTE & SOP Alignment</h4>
                 <p className="text-white/30 text-sm leading-relaxed">
                   We ensure your Statement of Purpose (SOP) perfectly aligns with the Genuine Temporary Entrant (GTE) requirements of your target country.
                 </p>
               </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
