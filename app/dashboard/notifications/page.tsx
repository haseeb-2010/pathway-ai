
"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Trash2, 
  Check,
  Loader2,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        fetchNotifications(user.id);
      }
    });
  }, []);

  const fetchNotifications = async (uid: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('profile_id', uid)
      .order('created_at', { ascending: false });

    if (!error) {
      setNotifications(data || []);
    }
    setIsLoading(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (!error) {
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    }
  };

  const deleteNotification = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (!error) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const markAllRead = async () => {
    if (!userId) return;
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('profile_id', userId);

    if (!error) {
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-[#c1ff72]" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Inbox</h2>
          <p className="text-white/40 text-sm mt-1">Stay updated on your journey</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={markAllRead}
            className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest transition-all"
          >
            Mark all read
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#c1ff72]" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="glass p-20 rounded-[40px] border-white/5 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8">
            <Bell className="w-10 h-10 text-white/20" />
          </div>
          <h3 className="text-2xl font-bold mb-4">All caught up!</h3>
          <p className="text-white/30 max-w-sm mx-auto leading-relaxed">
            No new notifications at the moment. We'll alert you here when there are updates on your applications or AI analysis.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {notifications.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`glass p-6 rounded-3xl border border-white/5 group transition-all hover:bg-white/[0.03] ${!n.is_read ? 'bg-white/[0.02] border-l-2 border-l-[#c1ff72]' : ''}`}
              >
                <div className="flex items-start gap-6">
                  <div className="mt-1 p-3 rounded-2xl bg-white/5">
                    {getTypeIcon(n.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-bold ${!n.is_read ? 'text-white' : 'text-white/60'}`}>{n.title}</h4>
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        {new Date(n.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{n.content}</p>
                    
                    <div className="pt-4 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.is_read && (
                        <button 
                          onClick={() => markAsRead(n.id)}
                          className="flex items-center gap-2 text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest hover:underline"
                        >
                          <Check className="w-3 h-3" /> Mark read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(n.id)}
                        className="flex items-center gap-2 text-[10px] font-bold text-red-400/60 hover:text-red-400 uppercase tracking-widest transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/5 mt-1" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
