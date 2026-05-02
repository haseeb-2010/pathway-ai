
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, DollarSign, Clock, LayoutGrid } from "lucide-react";

export default function ProblemPage() {
  return (
    <div className="min-h-screen bg-[#061a12] text-white selection:bg-[#c1ff72] selection:text-[#061a12]">
      {/* Navigation */}
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

      <main className="max-w-5xl mx-auto px-6 pb-20 md:pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 md:space-y-24"
        >
          {/* Header */}
          <header className="space-y-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto md:mx-0">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              The <br /> Problem.
            </h1>
            <p className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Predatory Gatekeeping</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
             {[
               {
                 icon: DollarSign,
                 title: "Extortionate Fees",
                 desc: "Legacy consultants charge up to $3,000 for information that should be accessible to everyone.",
                 color: "text-red-400"
               },
               {
                 icon: LayoutGrid,
                 title: "Commission Bias",
                 desc: "Students are pushed to 'partner' unis where consultants earn the most, not where the student fits best.",
                 color: "text-orange-400"
               },
               {
                 icon: Clock,
                 title: "Manual Delays",
                 desc: "SOP iterations and university research that take weeks manually are prone to human error and outdated data.",
                 color: "text-yellow-400"
               }
             ].map((item, i) => (
               <div key={i} className="glass p-8 md:p-10 rounded-[40px] border-white/5 space-y-6 hover:bg-white/[0.03] transition-all">
                 <div className={`p-4 rounded-2xl bg-white/5 ${item.color} w-fit`}>
                   <item.icon className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold">{item.title}</h3>
                 <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>

          <div className="glass p-10 md:p-20 rounded-[48px] md:rounded-[80px] border-white/5 bg-gradient-to-br from-red-500/[0.03] to-transparent">
             <div className="max-w-2xl space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The "Partner Uni" Trap.</h2>
                <div className="space-y-6 text-white/60 leading-relaxed font-jakarta">
                  <p>
                    The traditional consultancy business model is fundamentally misaligned with student success. Because consultants rely on commissions from universities, they act as sales agents for the institutions rather than advisors for the students.
                  </p>
                  <p className="font-bold text-white/80">
                    This creates a systemic barrier where talented students from Pakistan are funneled into low-tier programs simply because the kickbacks are higher.
                  </p>
                </div>
                <div className="pt-8">
                  <Link 
                    href="/dashboard"
                    className="bg-[#c1ff72] text-[#061a12] px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all inline-block"
                  >
                    Bypass the Trap
                  </Link>
                </div>
             </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
