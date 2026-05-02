
"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Globe, 
  CreditCard,
  Check,
  Loader2,
  Camera,
  Save,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type SettingTab = 'Profile' | 'Preferences' | 'Account';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>('Profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>({
    full_name: '',
    location: '',
    onboarding_completed: true
  });
  const [preferences, setPreferences] = useState({
    degree: '',
    countries: [] as string[],
    budget: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (prof) setProfile(prof);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    if (!userId) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userId);
    
    if (error) alert("Failed to save profile: " + error.message);
    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#c1ff72]" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex bg-white/5 p-1 rounded-2xl w-full md:w-fit overflow-x-auto scrollbar-hide border border-white/5">
        {(['Profile', 'Preferences', 'Account'] as SettingTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shrink-0 ${
              activeTab === tab 
              ? "bg-[#c1ff72] text-[#061a12] shadow-lg" 
              : "text-white/40 hover:text-white"
            }`}
          >
            {tab === 'Profile' && <User className="w-4 h-4" />}
            {tab === 'Preferences' && <Globe className="w-4 h-4" />}
            {tab === 'Account' && <Shield className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === 'Profile' && (
              <motion.div 
                key="profile" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="glass p-10 rounded-[48px] border-white/5 space-y-8">
                  <div className="flex items-center gap-8 mb-4">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-3xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center overflow-hidden">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.full_name || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-2 bg-[#c1ff72] text-[#061a12] rounded-xl shadow-xl hover:scale-110 transition-all">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Public Profile</h3>
                      <p className="text-white/40 text-xs mt-1">This information will be used for AI matches.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        value={profile.full_name}
                        onChange={e => setProfile({...profile, full_name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Current Location</label>
                      <input 
                        value={profile.location}
                        onChange={e => setProfile({...profile, location: e.target.value})}
                        placeholder="e.g. Lahore, Pakistan"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-[#c1ff72] text-[#061a12] px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-[#c1ff72]/10 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'Preferences' && (
              <motion.div 
                key="prefs" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }}
                className="glass p-10 rounded-[48px] border-white/5 space-y-8"
              >
                <div className="space-y-6">
                   <h3 className="text-xl font-bold tracking-tight">Academic Intent</h3>
                   <p className="text-white/40 text-sm">These settings refine your AI Matching algorithms.</p>
                   
                   <div className="space-y-4">
                     <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Preferred Countries</label>
                     <div className="flex flex-wrap gap-3">
                       {['Germany', 'UK', 'USA', 'Canada'].map(c => (
                         <button key={c} className="px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-white/40 text-xs font-bold hover:border-[#c1ff72]/30 transition-all">
                           {c}
                         </button>
                       ))}
                     </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Account' && (
              <motion.div 
                key="account" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="glass p-10 rounded-[48px] border-white/5 space-y-6">
                  <h3 className="text-xl font-bold text-red-400">Danger Zone</h3>
                  <p className="text-white/40 text-sm">Permanently delete your account and all associated data.</p>
                  <button className="bg-red-500/10 text-red-400 border border-red-500/20 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-500/20 transition-all">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column - Info Cards */}
        <div className="space-y-6">
           <div className="glass p-8 rounded-[40px] border-white/5 bg-gradient-to-br from-[#c1ff72]/5 to-transparent">
              <Shield className="w-10 h-10 text-[#c1ff72] mb-6" />
              <h4 className="text-lg font-bold mb-2">Privacy First.</h4>
              <p className="text-white/30 text-xs leading-relaxed">
                Your data is encrypted and only used to provide high-fidelity university matches. We never sell your personal information.
              </p>
           </div>
           
           <div className="glass p-8 rounded-[40px] border-white/5">
              <CreditCard className="w-10 h-10 text-white/20 mb-6" />
              <h4 className="text-lg font-bold mb-2">Student Plan</h4>
              <p className="text-white/30 text-xs mb-6">You are currently on the <span className="text-white font-bold">Free Forever</span> plan.</p>
              <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Upgrade to Pro
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
