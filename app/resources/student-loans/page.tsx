
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, DollarSign, Zap, Globe } from "lucide-react";

export default function StudentLoans() {
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
            <div className="w-16 h-16 rounded-3xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Student <br /> Loans.
            </h1>
            <p className="text-[#f6f6e9]/60 text-lg md:text-2xl leading-relaxed font-jakarta">
              Funding your future, not your background. We integrate with global fintech leaders to provide cosigner-free, collateral-free loans.
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
               <div className="space-y-6">
                 <h2 className="text-3xl font-bold tracking-tight">The Cosigner Barrier.</h2>
                 <p className="text-white/40 leading-relaxed font-jakarta">
                   Most traditional banks require local collateral or a US/UK-based cosigner. Pathway AI bypasses this by partnering with lenders like Prodigy Finance and MPOWER who focus on your **future earning potential**.
                 </p>
               </div>

               <div className="grid gap-6">
                 {[
                   { icon: DollarSign, title: "$20K - $100K", desc: "Covers tuition and living expenses for elite STEM & Business programs." },
                   { icon: Zap, title: "100% Digital", desc: "Apply and get pre-approved in minutes, not months." },
                   { icon: Globe, title: "No Collateral", desc: "Loans based on your career trajectory and university ranking." }
                 ].map((feat, i) => (
                   <div key={i} className="flex gap-6 items-center p-6 rounded-3xl bg-white/5 border border-white/5">
                     <div className="p-3 rounded-2xl bg-[#c1ff72]/10 text-[#c1ff72]">
                       <feat.icon className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="font-bold">{feat.title}</h4>
                       <p className="text-white/30 text-xs mt-1">{feat.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="glass p-10 md:p-16 rounded-[64px] border-white/5 bg-gradient-to-br from-[#c1ff72]/5 to-transparent flex flex-col justify-between">
               <div className="space-y-8">
                 <p className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-[0.4em]">Partner Ecosystem</p>
                 <div className="space-y-12">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold">Prodigy Finance.</h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        Leading fintech lender for international masters students. Specializes in Business, Engineering, and Public Policy.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold">MPOWER Financing.</h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        Focuses on students from 190+ countries, providing fixed-rate loans without requiring a US credit history.
                      </p>
                    </div>
                 </div>
               </div>
               
               <div className="pt-12">
                 <Link 
                   href="/dashboard/copilot"
                   className="w-full bg-[#c1ff72] text-[#061a12] py-6 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center"
                 >
                   Check Loan Eligibility
                 </Link>
               </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
