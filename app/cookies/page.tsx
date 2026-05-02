
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Cookie, Settings, ShieldCheck, Database } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#061a12] text-white selection:bg-[#c1ff72] selection:text-[#061a12]">
      {/* Navigation */}
      <nav className="p-8 md:p-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 text-white/40 hover:text-[#c1ff72] transition-all group font-bold text-xs uppercase tracking-widest"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c1ff72] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <header className="space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center">
              <Cookie className="w-8 h-8 text-[#c1ff72]" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Cookie <br /> Policy.
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs">Last Updated: May 2026</p>
          </header>

          <div className="glass p-8 md:p-16 rounded-[48px] border-white/5 space-y-12 font-jakarta">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">1. Why we use Cookies</h2>
              <p className="text-white/60 leading-relaxed">
                Pathway AI uses cookies to maintain your session, remember your AI matching preferences, and optimize the speed of our RAG architecture. We use minimal tracking to ensure your experience is as seamless as possible.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-8 rounded-3xl space-y-4">
                <ShieldCheck className="w-6 h-6 text-[#c1ff72]" />
                <h3 className="font-bold">Security Cookies</h3>
                <p className="text-white/40 text-sm">Necessary to protect your account and verify your identity during the application process.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl space-y-4">
                <Settings className="w-6 h-6 text-[#c1ff72]" />
                <h3 className="font-bold">Preference Cookies</h3>
                <p className="text-white/40 text-sm">Remembers your target degree, budget, and preferred countries for the AI matching engine.</p>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">2. Cookie Categories</h2>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">Essential Cookies</h4>
                    <p className="text-white/30 text-xs mt-1">Required for platform stability and authentication.</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest bg-[#c1ff72]/10 px-3 py-1 rounded-full">Always Active</span>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">Analytical Cookies</h4>
                    <p className="text-white/30 text-xs mt-1">Help us understand how students interact with the AI.</p>
                  </div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Optional</span>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#c1ff72]">3. Managing Cookies</h2>
              <p className="text-white/60 leading-relaxed">
                Most browsers allow you to control cookies through their settings. However, disabling essential cookies may prevent you from using certain AI features like real-time SOP refinement or session-based internship tracking.
              </p>
            </section>

            <section className="p-8 rounded-3xl bg-[#c1ff72]/5 border border-[#c1ff72]/10 flex items-start gap-4">
              <Database className="w-6 h-6 text-[#c1ff72] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#c1ff72] mb-1">Local Storage</h4>
                <p className="text-white/40 text-sm">In addition to cookies, we use local storage to cache university match results to save you API costs and provide instant results.</p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
