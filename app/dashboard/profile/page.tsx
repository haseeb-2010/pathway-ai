
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Pencil, 
  Save, 
  X, 
  Loader2, 
  User, 
  MapPin, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FileBadge,
  Plus,
  Trash2,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Profile Data
  const [profile, setProfile] = useState<any>({});
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [certs, setCerts] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      
      const [
        { data: prof },
        { data: edu },
        { data: exp },
        { data: sk },
        { data: ct },
        { data: ach }
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('education').select('*').eq('profile_id', user.id).order('start_date', { ascending: false }),
        supabase.from('experience').select('*').eq('profile_id', user.id).order('start_date', { ascending: false }),
        supabase.from('skills').select('*').eq('profile_id', user.id),
        supabase.from('certificates').select('*').eq('profile_id', user.id),
        supabase.from('achievements').select('*').eq('profile_id', user.id)
      ]);

      if (prof) setProfile(prof);
      if (edu) setEducation(edu);
      if (exp) setExperience(exp);
      if (sk) setSkills(sk);
      if (ct) setCerts(ct);
      if (ach) setAchievements(ach);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    
    try {
      // 1. Update Profile
      await supabase.from('profiles').update({
        full_name: profile.full_name,
        phone: profile.phone,
        location: profile.location,
        updated_at: new Date().toISOString()
      }).eq('id', userId);

      // 2. Update Education (Clear & Re-insert)
      await supabase.from('education').delete().eq('profile_id', userId);
      if (education.length > 0) {
        await supabase.from('education').insert(education.map(e => {
          const { id, created_at, profile_id, ...rest } = e;
          return { ...rest, profile_id: userId };
        }));
      }

      // 3. Update Experience
      await supabase.from('experience').delete().eq('profile_id', userId);
      if (experience.length > 0) {
        await supabase.from('experience').insert(experience.map(e => {
          const { id, created_at, profile_id, ...rest } = e;
          return { ...rest, profile_id: userId };
        }));
      }

      // 4. Update Skills
      await supabase.from('skills').delete().eq('profile_id', userId);
      if (skills.length > 0) {
        await supabase.from('skills').insert(skills.map(s => ({ name: s.name, profile_id: userId })));
      }

      // 5. Update Certs
      await supabase.from('certificates').delete().eq('profile_id', userId);
      if (certs.length > 0) {
        await supabase.from('certificates').insert(certs.map(c => ({ 
          name: c.name, 
          issuer: c.issuer, 
          certificate_id: c.certificate_id,
          profile_id: userId 
        })));
      }

      setIsEditing(false);
      await fetchProfileData(); // Refresh
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-[#c1ff72]" />
      <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Loading Dossier...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 pb-40 px-4 md:px-0">
      {/* Profile Header Hero */}
      <div className="relative glass p-4 md:p-16 rounded-[24px] md:rounded-[48px] border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c1ff72]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10">
          <div className="relative group">
            <div className="w-24 h-24 md:w-48 md:h-48 rounded-[24px] md:rounded-[40px] bg-[#c1ff72]/10 border border-[#c1ff72]/20 flex items-center justify-center overflow-hidden shadow-2xl">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.full_name}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-4 -right-4 bg-[#c1ff72] text-[#061a12] p-4 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"
              >
                <Pencil className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="text-center md:text-left space-y-3 md:space-y-4 flex-1">
            <div className="space-y-1 md:space-y-2">
              <span className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-[0.4em]">Academic Dossier</span>
              <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white break-words">{profile.full_name}</h1>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-xs">
                <MapPin className="w-3 h-3" /> {profile.location || "Location Not Set"}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-xs">
                <Phone className="w-3 h-3" /> {profile.phone || "Phone Not Set"}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4">
              <button 
                onClick={() => setIsEditing(false)}
                className="p-4 rounded-2xl border border-white/10 text-white/40 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-[#c1ff72] text-[#061a12] px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          {/* Identity & Contact */}
          <div className="glass p-4 md:p-12 rounded-[24px] md:rounded-[48px] border-white/5 space-y-8 md:space-y-10 overflow-hidden">
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-[#c1ff72]" />
              <h2 className="text-2xl font-bold">Personal Identification</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Full Legal Name</label>
                <input 
                  disabled={!isEditing}
                  value={profile.full_name}
                  onChange={e => setProfile({...profile, full_name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all disabled:opacity-50"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  disabled={!isEditing}
                  value={profile.phone}
                  onChange={e => setProfile({...profile, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all disabled:opacity-50"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">Current City</label>
                <input 
                  disabled={!isEditing}
                  value={profile.location}
                  onChange={e => setProfile({...profile, location: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c1ff72]/50 transition-all disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="glass p-4 md:p-12 rounded-[24px] md:rounded-[48px] border-white/5 space-y-8 md:space-y-10 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <GraduationCap className="w-6 h-6 text-[#c1ff72]" />
                <h2 className="text-2xl font-bold">Academic Journey</h2>
              </div>
              {isEditing && (
                <button 
                  onClick={() => setEducation([{ institution: "", degree: "" }, ...education])}
                  className="p-2 rounded-xl bg-[#c1ff72]/10 text-[#c1ff72] border border-[#c1ff72]/20 hover:bg-[#c1ff72]/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i} className="p-6 md:p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative group">
                  {isEditing && (
                    <button 
                      onClick={() => setEducation(education.filter((_, idx) => idx !== i))}
                      className="absolute top-6 right-6 text-white/10 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div className="grid gap-4">
                    <input 
                      disabled={!isEditing}
                      placeholder="Institution (e.g. LUMS)"
                      value={edu.institution}
                      onChange={e => {
                        const next = [...education];
                        next[i].institution = e.target.value;
                        setEducation(next);
                      }}
                      className="bg-transparent text-xl font-bold text-white outline-none placeholder:text-white/10 border-none p-0"
                    />
                    <input 
                      disabled={!isEditing}
                      placeholder="Degree (e.g. B.Sc Computer Science)"
                      value={edu.degree}
                      onChange={e => {
                        const next = [...education];
                        next[i].degree = e.target.value;
                        setEducation(next);
                      }}
                      className="bg-transparent text-white/60 text-sm outline-none placeholder:text-white/5 border-none p-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="glass p-4 md:p-12 rounded-[24px] md:rounded-[48px] border-white/5 space-y-8 md:space-y-10 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Briefcase className="w-6 h-6 text-[#c1ff72]" />
                <h2 className="text-2xl font-bold">Professional Path</h2>
              </div>
              {isEditing && (
                <button 
                  onClick={() => setExperience([{ company: "", position: "" }, ...experience])}
                  className="p-2 rounded-xl bg-[#c1ff72]/10 text-[#c1ff72] border border-[#c1ff72]/20 hover:bg-[#c1ff72]/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="p-6 md:p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative group">
                  {isEditing && (
                    <button 
                      onClick={() => setExperience(experience.filter((_, idx) => idx !== i))}
                      className="absolute top-6 right-6 text-white/10 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div className="grid gap-4">
                    <input 
                      disabled={!isEditing}
                      placeholder="Company"
                      value={exp.company}
                      onChange={e => {
                        const next = [...experience];
                        next[i].company = e.target.value;
                        setExperience(next);
                      }}
                      className="bg-transparent text-xl font-bold text-white outline-none placeholder:text-white/10 border-none p-0"
                    />
                    <input 
                      disabled={!isEditing}
                      placeholder="Position"
                      value={exp.position}
                      onChange={e => {
                        const next = [...experience];
                        next[i].position = e.target.value;
                        setExperience(next);
                      }}
                      className="bg-transparent text-white/60 text-sm outline-none placeholder:text-white/5 border-none p-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6 md:space-y-8">
          {/* Skills */}
          <div className="glass p-4 md:p-10 rounded-[24px] md:rounded-[48px] border-white/5 space-y-6 md:space-y-8 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="font-bold uppercase text-[10px] tracking-widest text-white/20">Competencies</h3>
              {isEditing && (
                <button 
                  onClick={() => setSkills([...skills, { name: "" }])}
                  className="text-[#c1ff72] hover:scale-110 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <div key={i} className="group relative">
                  {isEditing ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                      <input 
                        value={skill.name}
                        onChange={e => {
                          const next = [...skills];
                          next[i].name = e.target.value;
                          setSkills(next);
                        }}
                        className="bg-transparent text-[10px] font-bold text-white outline-none w-20"
                      />
                      <button onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}>
                        <X className="w-3 h-3 text-white/20 hover:text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="px-4 py-2 rounded-xl bg-[#c1ff72]/5 border border-[#c1ff72]/20 text-[#c1ff72] text-[10px] font-bold uppercase tracking-widest">
                      {skill.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="glass p-4 md:p-10 rounded-[24px] md:rounded-[48px] border-white/5 space-y-6 md:space-y-8 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="font-bold uppercase text-[10px] tracking-widest text-white/20">Certifications</h3>
              {isEditing && (
                <button 
                  onClick={() => setCerts([{ name: "", issuer: "" }, ...certs])}
                  className="text-[#c1ff72] hover:scale-110 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {certs.map((cert, i) => (
                <div key={i} className="flex gap-4 items-start relative group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <FileBadge className="w-5 h-5 text-white/20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="space-y-1">
                        <input 
                          value={cert.name}
                          placeholder="Cert Name"
                          onChange={e => {
                            const next = [...certs];
                            next[i].name = e.target.value;
                            setCerts(next);
                          }}
                          className="bg-transparent text-xs font-bold text-white outline-none w-full border-b border-white/5 focus:border-[#c1ff72]/30"
                        />
                        <input 
                          value={cert.issuer}
                          placeholder="Issuer"
                          onChange={e => {
                            const next = [...certs];
                            next[i].issuer = e.target.value;
                            setCerts(next);
                          }}
                          className="bg-transparent text-[10px] text-white/30 outline-none w-full"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-white truncate">{cert.name}</p>
                        <p className="text-[10px] text-white/30 truncate">{cert.issuer}</p>
                      </>
                    )}
                  </div>
                  {isEditing && (
                    <button 
                      onClick={() => setCerts(certs.filter((_, idx) => idx !== i))}
                      className="text-white/10 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Readiness Card */}
          <div className="glass p-8 rounded-[40px] border-white/5 bg-gradient-to-br from-[#c1ff72]/10 to-transparent">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#c1ff72] flex items-center justify-center">
                   <Award className="w-6 h-6 text-[#061a12]" />
                </div>
                <h4 className="font-bold">AI Match Readiness</h4>
             </div>
             <div className="space-y-4">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-[#c1ff72] w-[85%]" />
                </div>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Profile is 85% optimized for Copilot</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
