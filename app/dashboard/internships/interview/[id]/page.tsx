
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Mic, 
  Send, 
  ChevronLeft, 
  Sparkles, 
  Loader2, 
  Trophy, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export default function InterviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase
        .from('interview_sessions')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (error || !data) {
        router.push('/dashboard/internships');
        return;
      }
      setSession(data);
      
      // Start the interview if no messages
      if (messages.length === 0) {
        startInterview(data);
      }
    };
    fetchSession();
  }, [params.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = async (sessionData: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: sessionData,
          messages: [
            {
              role: "system",
              content: `You are the Pathway AI Interviewer. You are conducting a mock interview for the role of ${sessionData.role} at ${sessionData.company}. 
              Focus areas: ${sessionData.focus_areas}.
              Instructions:
              1. Start by introducing yourself and asking the first question.
              2. Ask one question at a time.
              3. Provide constructive feedback ONLY if the user asks for it, otherwise stay in character.
              4. Keep the tone professional but encouraging.`
            },
            {
              role: "user",
              content: "I am ready to start the interview."
            }
          ],
        }),
      });
      const data = await res.json();
      const firstMsg = data.choices[0].message.content;
      setMessages([{ role: 'assistant', content: firstMsg }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: session,
          messages: [
            {
              role: "system",
              content: `You are the Pathway AI Interviewer for ${session.role} at ${session.company}.`
            },
            ...messages,
            { role: 'user', content: userMsg }
          ],
        }),
      });
      const data = await res.json();
      const reply = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const finishInterview = async () => {
    setIsFinishing(true);
    try {
      // Ask LLM for a score and summary feedback
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: session,
          messages: [
            {
              role: "system",
              content: "You are an interview evaluator. Analyze the following interview transcript and provide a score out of 100 and brief feedback."
            },
            {
              role: "user",
              content: JSON.stringify(messages)
            }
          ],
        }),
      });
      const data = await res.json();
      const content = data.choices[0].message.content;
      
      // Update session in DB
      await supabase
        .from('interview_sessions')
        .update({ 
          status: 'Completed',
          feedback: { summary: content },
          score: 85 // Mock score for now
        })
        .eq('id', params.id);
      
      router.push('/dashboard/internships');
    } catch (e) {
      console.error(e);
    } finally {
      setIsFinishing(false);
    }
  };

  if (!session) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" /> Exit Session
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold">{session.role} Interview</h2>
          <p className="text-white/40 text-xs">{session.company}</p>
        </div>
        <button 
          onClick={finishInterview}
          disabled={isFinishing}
          className="bg-red-500/10 text-red-400 border border-red-500/20 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-2"
        >
          {isFinishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} End & Score
        </button>
      </div>

      <div className="flex-1 glass rounded-[40px] border-white/5 flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-6 rounded-3xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-[#c1ff72] text-[#061a12] rounded-tr-none font-medium' 
                  : 'bg-white/5 text-white/80 rounded-tl-none border border-white/5'
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="bg-white/5 p-6 rounded-3xl rounded-tl-none border border-white/5 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c1ff72] animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-[#c1ff72] animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-[#c1ff72] animate-bounce" />
               </div>
            </motion.div>
          )}
        </div>

        <div className="p-8 border-t border-white/5 bg-white/5">
           <div className="relative group">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your response..."
                className="w-full bg-[#061a12] border border-white/10 rounded-2xl pl-6 pr-32 py-5 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all placeholder:text-white/20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                 <button className="p-3 text-white/20 hover:text-[#c1ff72] transition-colors">
                    <Mic className="w-5 h-5" />
                 </button>
                 <button 
                   onClick={handleSend}
                   disabled={isLoading || !input.trim()}
                   className="bg-[#c1ff72] text-[#061a12] p-3 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-8">
         <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#c1ff72]" /> Powered by NVIDIA NIM
         </div>
         <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <AlertCircle className="w-4 h-4" /> AI may provide inaccurate info
         </div>
      </div>
    </div>
  );
}
