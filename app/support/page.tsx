
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, LifeBuoy, HelpCircle, MessageSquare } from "lucide-react";

export default function SupportPage() {
  const emojis = [
    { char: "🛠️", label: "Tech Support" },
    { char: "🎓", label: "Academic Help" },
    { char: "✈️", label: "Visa Queries" },
    { char: "💡", label: "General Info" }
  ];

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

      <main className="max-w-4xl mx-auto px-6 pb-20 md:pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 md:space-y-24"
        >
          {/* Header */}
          <header className="space-y-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-3xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center mx-auto md:mx-0">
              <LifeBuoy className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Support <br /> Center.
            </h1>
            <p className="text-[#c1ff72] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">We're here to help you navigate</p>
          </header>

          <div className="glass p-10 md:p-20 rounded-[40px] md:rounded-[80px] border-white/5 text-center space-y-10">
             <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Facing an issue?</h2>
                <p className="text-white/40 leading-relaxed font-jakarta text-sm md:text-lg">
                  Whether it's a technical glitch or a query about your application, our team is ready to jump in.
                </p>
             </div>

             {/* Interactive Emojis Section */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {emojis.map((e, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-3 cursor-default"
                  >
                    <span className="text-3xl md:text-4xl block">{e.char}</span>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{e.label}</p>
                  </motion.div>
                ))}
             </div>

             <div className="pt-8 space-y-6">
                <a 
                  href="mailto:help@pathway.ai"
                  className="bg-[#c1ff72] text-[#061a12] px-10 py-6 rounded-2xl font-bold text-lg md:text-xl uppercase tracking-widest hover:scale-105 transition-all inline-flex items-center gap-4 shadow-[0_20px_40px_rgba(193,255,114,0.2)]"
                >
                  <Mail className="w-6 h-6" /> help@pathway.ai
                </a>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Response time: ~2 hours</p>
             </div>
          </div>
          
          <div className="text-center">
             <p className="text-white/20 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed">
               Email us your query and we'll get back to you <br className="hidden md:block" /> with a high-fidelity solution.
             </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
