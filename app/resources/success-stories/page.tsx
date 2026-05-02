
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, Star, GraduationCap, MapPin } from "lucide-react";

export default function SuccessStories() {
  const stories = [
    {
      name: "Ahmed Raza",
      program: "MS Computer Science",
      uni: "TU Munich, Germany",
      quote: "Pathway AI identified a scholarship I didn't know existed. The SOP Architect helped me articulate my background in a way that resonated with German faculty.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
    },
    {
      name: "Sara Khan",
      program: "MBA",
      uni: "ETH Zurich, Switzerland",
      quote: "Bypassing the $2,000 consultant fee was the best decision. The AI matches were more objective and tailored than any human advisor I spoke with.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
    },
    {
      name: "Zain Ali",
      program: "MA Public Policy",
      uni: "Oxford University, UK",
      quote: "The visa triage system gave me the confidence to apply. I knew exactly where my risks were and how to mitigate them before my interview.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zain"
    }
  ];

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
          <header className="max-w-3xl space-y-8 text-center md:text-left">
            <div className="w-16 h-16 rounded-3xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center mx-auto md:mx-0">
              <Star className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Success <br /> Stories.
            </h1>
            <p className="text-[#f6f6e9]/60 text-lg md:text-2xl leading-relaxed font-jakarta">
              Real outcomes from real students. See how the Pakistani youth bulge is breaking boundaries with Pathway AI.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-[48px] border-white/5 flex flex-col justify-between hover:bg-white/[0.03] transition-all group"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                        <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                     </div>
                     <div>
                       <h4 className="font-bold text-lg">{s.name}</h4>
                       <p className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest">{s.program}</p>
                     </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-[#c1ff72]/10 -z-10" />
                    <p className="text-white/60 leading-relaxed font-jakarta text-sm italic">
                      "{s.quote}"
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/5 space-y-3">
                   <div className="flex items-center gap-2 text-white/30 text-xs">
                     <GraduationCap className="w-4 h-4" />
                     <span className="font-bold">{s.uni}</span>
                   </div>
                   <div className="flex items-center gap-2 text-white/30 text-xs">
                     <MapPin className="w-4 h-4" />
                     <span className="font-bold">Placed via Pathway AI</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass p-10 md:p-20 rounded-[64px] border-white/5 bg-[#c1ff72]/5 text-center space-y-8">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to be our next story?</h2>
             <p className="text-white/40 max-w-xl mx-auto leading-relaxed font-jakarta">
               The platform is 100% free for students. No hidden fees, no commission bias—just high-fidelity guidance.
             </p>
             <div className="pt-4">
               <Link 
                 href="/onboarding"
                 className="bg-[#c1ff72] text-[#061a12] px-12 py-6 rounded-2xl font-bold text-xl uppercase tracking-widest hover:scale-110 transition-all inline-block shadow-[0_20px_40px_rgba(193,255,114,0.2)]"
               >
                 Start My Journey
               </Link>
             </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
