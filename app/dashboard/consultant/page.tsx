
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ConsultantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your Pathway AI Consultant. I'm here to help you navigate your career and academic journey. Ask me anything about university matches, SOPs, or internship strategies!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-next-80b-a3b-thinking",
          messages: [
            {
              role: "system",
              content: "You are the Pathway App AI consultant, a helpful assistant dedicated to helping students with their career and academic goals. Always identify yourself as the Pathway AI Assistant at the end of each message. Keep your advice practical, data-driven, and encouraging."
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage }
          ],
          temperature: 0.6,
          max_tokens: 4096,
          stream: false
        }),
      });

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Append signature if missing
      const signedContent = content.includes("Pathway AI Assistant") 
        ? content 
        : `${content}\n\n---\nPathway AI Assistant`;

      setMessages(prev => [...prev, { role: "assistant", content: signedContent }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "I'm sorry, I encountered an error. Please try again later.\n\nPathway AI Assistant" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="flex-1 overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  m.role === "user" ? "bg-[#c1ff72]/10 border border-[#c1ff72]/20" : "bg-white/5 border border-white/10"
                }`}>
                  {m.role === "user" ? <User className="w-5 h-5 text-[#c1ff72]" /> : <Bot className="w-5 h-5 text-white/60" />}
                </div>
                <div className={`p-6 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user" 
                  ? "bg-[#c1ff72] text-[#061a12] font-medium" 
                  : "bg-white/5 text-white/80 border border-white/5 whitespace-pre-wrap"
                }`}>
                  {m.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4 items-center bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
              <Loader2 className="w-4 h-4 animate-spin text-[#c1ff72]" />
              <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Assistant is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything about your career..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c1ff72]/50 transition-all pr-24"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-[#c1ff72] text-[#061a12] rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
