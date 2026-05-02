"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Plus, 
  Trash2, 
  BookOpen, 
  Briefcase, 
  Award, 
  FileBadge, 
  FileText,
  User,
  MapPin,
  Phone,
  CloudUpload
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Education = {
  institution: string;
  degree: string;
  start_date: string;
  end_date: string;
  description: string;
};

type Experience = {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
};

type Skill = string;

type Cert = {
  name: string;
  issuer: string;
  id: string;
  date: string;
};

type Achievement = {
  title: string;
  issuer: string;
  description: string;
  date: string;
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Form State
  const [personal, setPersonal] = useState({
    fullName: "",
    phone: "",
    location: ""
  });
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certs, setCerts] = useState<Cert[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [resume, setResume] = useState<File | null>(null);

  // Modal States
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);

  useEffect(() => {
    const checkProfile = async (session: any) => {
      if (session?.user) {
        // 1. Check if onboarding is completed
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.onboarding_completed) {
          router.push('/dashboard');
          return;
        }

        // 2. Load existing data if any
        if (profile) {
          setPersonal({
            fullName: profile.full_name || "",
            phone: profile.phone || "",
            location: profile.location || ""
          });
        }

        const [
          { data: eduData },
          { data: expData },
          { data: skillsData },
          { data: certsData },
          { data: achData }
        ] = await Promise.all([
          supabase.from('education').select('*').eq('profile_id', session.user.id),
          supabase.from('experience').select('*').eq('profile_id', session.user.id),
          supabase.from('skills').select('*').eq('profile_id', session.user.id),
          supabase.from('certificates').select('*').eq('profile_id', session.user.id),
          supabase.from('achievements').select('*').eq('profile_id', session.user.id),
        ]);

        if (eduData) setEducation(eduData as any);
        if (expData) setExperience(expData as any);
        if (skillsData) setSkills(skillsData.map(s => s.name));
        if (certsData) setCerts(certsData.map(c => ({ name: c.name, issuer: c.issuer, id: c.certificate_id, date: "" })));
        if (achData) setAchievements(achData as any);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkProfile(session);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const saveCurrentStepData = async (targetStep: number) => {
    if (!user) return;
    
    try {
      if (targetStep === 1) {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: personal.fullName,
          phone: personal.phone,
          location: personal.location,
          updated_at: new Date().toISOString()
        });
      } else if (targetStep === 2) {
        // Simple strategy: Clear and re-insert for education/experience/skills
        // This is safer for partial updates during onboarding
        await supabase.from('education').delete().eq('profile_id', user.id);
        if (education.length > 0) {
          await supabase.from('education').insert(education.map(e => ({ ...e, profile_id: user.id })));
        }
        await supabase.from('experience').delete().eq('profile_id', user.id);
        if (experience.length > 0) {
          await supabase.from('experience').insert(experience.map(e => ({ ...e, profile_id: user.id })));
        }
      } else if (targetStep === 3) {
        await supabase.from('skills').delete().eq('profile_id', user.id);
        if (skills.length > 0) {
          await supabase.from('skills').insert(skills.map(s => ({ name: s, profile_id: user.id })));
        }
      } else if (targetStep === 4) {
        await supabase.from('certificates').delete().eq('profile_id', user.id);
        if (certs.length > 0) {
          await supabase.from('certificates').insert(certs.map(c => ({ 
            profile_id: user.id, 
            name: c.name, 
            issuer: c.issuer, 
            certificate_id: c.id 
          })));
        }
      } else if (targetStep === 5) {
        await supabase.from('achievements').delete().eq('profile_id', user.id);
        if (achievements.length > 0) {
          await supabase.from('achievements').insert(achievements.map(a => ({ ...a, profile_id: user.id })));
        }
      }
    } catch (error) {
      console.error("Error auto-saving step:", error);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!personal.fullName || !personal.phone || !personal.location) {
        alert("Please fill in all identification fields to proceed.");
        return false;
      }
    } else if (step === 2) {
      if (education.length === 0 || !education[0].institution || !education[0].degree) {
        alert("Please add at least one recent academic qualification.");
        return false;
      }
    }
    return true;
  };

  const nextStep = async () => {
    if (!validateStep()) return;
    await saveCurrentStepData(step);
    setStep(s => Math.min(s + 1, 6));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const progress = (step / 6) * 100;

  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!user) return;
    if (!validateStep()) return;
    setLoading(true);

    try {
      await saveCurrentStepData(step);
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Error completing onboarding:", error);
      alert("Error saving profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#061a12] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#c1ff72] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-[#061a12] flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full glass p-8 md:p-12 rounded-[40px] text-center border-white/5">
          <img src="/logo.svg" alt="Pathway Logo" className="h-10 mx-auto mb-8" />
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to the Exodus.</h1>
          <p className="text-white/40 mb-8 font-jakarta text-sm">Join the 10,000+ students navigating their global future.</p>
          
          <div className="space-y-4">

            {/* Email/Pass Auth */}
            <form className="space-y-4 text-left" onSubmit={async (e) => {
              e.preventDefault();
              setAuthError(null);
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email') as string;
              const password = formData.get('password') as string;
              
              if (authMode === 'signin') {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                  if (error.message.includes("Invalid login credentials")) {
                    setAuthError("Wrong password or account not found. Are you new? Try Signing Up.");
                  } else if (error.message.includes("Email not confirmed")) {
                    setAuthError("Please check your email and click the confirmation link before signing in.");
                  } else {
                    setAuthError(error.message);
                  }
                }
              } else if (authMode === 'signup') {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) setAuthError(error.message);
                else alert("Check your email for confirmation!");
              } else if (authMode === 'forgot') {
                const { error } = await supabase.auth.resetPasswordForEmail(email);
                if (error) setAuthError(error.message);
                else {
                  alert("Password reset link sent to your email!");
                  setAuthMode('signin');
                }
              }
            }}>
              {authMode !== 'forgot' ? (
                <div className="flex bg-white/5 p-1 rounded-xl mb-4">
                  <button 
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${authMode === 'signin' ? 'bg-[#c1ff72] text-[#061a12]' : 'text-white/40'}`}
                  >
                    Sign In
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${authMode === 'signup' ? 'bg-[#c1ff72] text-[#061a12]' : 'text-white/40'}`}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2">Reset Password</h3>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">We'll send a link to your inbox</p>
                </div>
              )}

              <div className="space-y-4">
                <input 
                  name="email"
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white outline-none focus:bg-white/10 transition-all font-jakarta text-sm"
                  required
                />
                {authMode !== 'forgot' && (
                  <div className="space-y-2">
                    <input 
                      name="password"
                      type="password" 
                      placeholder="Password" 
                      className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white outline-none focus:bg-white/10 transition-all font-jakarta text-sm"
                      required
                    />
                    {authMode === 'signin' && (
                      <button 
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[10px] font-bold text-white/20 hover:text-[#c1ff72] transition-colors uppercase tracking-widest ml-1"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                )}
              </div>

              {authError && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-2">{authError}</p>}

              <button className="w-full bg-[#c1ff72] text-[#061a12] py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all">
                {authMode === 'signin' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>

              {authMode === 'forgot' && (
                <button 
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="w-full text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest mt-6 text-center"
                >
                  <ArrowLeft className="w-3 h-3 inline mr-2" /> Back to Sign In
                </button>
              )}
            </form>
          </div>

          <p className="mt-8 text-[10px] text-white/20 uppercase tracking-widest font-bold">Secure Institutional Auth</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061a12] text-white font-outfit overflow-x-hidden">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#061a12]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <img src="/logo.svg" alt="Pathway Logo" className="h-8 md:h-10" />
          </Link>
          <div className="flex-1 max-w-md">
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-[#c1ff72]"
              />
            </div>
            <p className="text-[10px] font-bold text-[#c1ff72] uppercase tracking-widest mt-2">Step {step} of 6 — {Math.round(progress)}% Complete</p>
          </div>
          <button onClick={() => supabase.auth.signOut()} className="text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest">Sign Out</button>
        </div>
      </header>

      <main className="pt-24 md:pt-32 pb-32 md:pb-40 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <StepPersonal data={personal} setData={setPersonal} onNext={nextStep} />}
              {step === 2 && <StepAcademicExperience 
                edu={education} setEdu={setEducation} 
                exp={experience} setExp={setExperience} 
                onNext={nextStep} onPrev={prevStep} 
              />}
              {step === 3 && <StepSkills skills={skills} setSkills={setSkills} onNext={nextStep} onPrev={prevStep} />}
              {step === 4 && <StepCertificates certs={certs} setCerts={setCerts} onNext={nextStep} onPrev={prevStep} />}
              {step === 5 && <StepAchievements achievements={achievements} setAchievements={setAchievements} onNext={nextStep} onPrev={prevStep} />}
              {step === 6 && <StepResume resume={resume} setResume={setResume} onSubmit={handleSubmit} onPrev={prevStep} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Controls */}
      <footer className="fixed bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-[#061a12] via-[#061a12] to-transparent z-40">
        <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white/60 font-bold hover:text-white hover:border-white/20 transition-all uppercase tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          <div className="flex-1" />
          {step < 6 ? (
            <button 
              onClick={nextStep}
              className="bg-[#c1ff72] text-[#061a12] px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center gap-2 md:gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(193,255,114,0.2)] uppercase tracking-widest text-[10px] md:text-xs"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="bg-[#ffe44d] text-[#061a12] px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center gap-2 md:gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,228,77,0.2)] uppercase tracking-widest text-[10px] md:text-xs"
            >
              Complete <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

// STEP COMPONENTS (Placeholders for now, will implement details next)

function StepPersonal({ data, setData, onNext }: any) {
  return (
    <div className="space-y-10">
      <div className="text-center md:text-left">
        <span className="bg-[#c1ff72]/10 text-[#c1ff72] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block border border-[#c1ff72]/20">Identification</span>
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight">Tell us who <br className="hidden md:block" /> you are.</h2>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-4">Full Legal Name</label>
          <div className="relative group">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#c1ff72] transition-colors" />
            <input 
              type="text"
              value={data.fullName}
              onChange={e => setData({...data, fullName: e.target.value})}
              placeholder="e.g. Ahmed Raza"
              className="w-full bg-white/5 border border-white/5 p-6 pl-16 rounded-3xl text-white placeholder:text-white/10 focus:bg-white/10 focus:border-[#c1ff72]/30 outline-none transition-all font-jakarta"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-4">Phone Number</label>
            <div className="relative group">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#c1ff72] transition-colors" />
              <input 
                type="tel"
                value={data.phone}
                onChange={e => setData({...data, phone: e.target.value})}
                placeholder="+92 3XX XXXXXXX"
                className="w-full bg-white/5 border border-white/5 p-6 pl-16 rounded-3xl text-white placeholder:text-white/10 focus:bg-white/10 focus:border-[#c1ff72]/30 outline-none transition-all font-jakarta"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-4">Current City</label>
            <div className="relative group">
              <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#c1ff72] transition-colors" />
              <input 
                type="text"
                value={data.location}
                onChange={e => setData({...data, location: e.target.value})}
                placeholder="Lahore, Pakistan"
                className="w-full bg-white/5 border border-white/5 p-6 pl-16 rounded-3xl text-white placeholder:text-white/10 focus:bg-white/10 focus:border-[#c1ff72]/30 outline-none transition-all font-jakarta"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepAcademicExperience({ edu, setEdu, exp, setExp }: any) {
  return (
    <div className="space-y-16">
      {/* Education Section */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#c1ff72] text-[10px] font-bold uppercase tracking-widest mb-2 block">Foundations</span>
            <h2 className="text-3xl font-bold">Academic Background</h2>
          </div>
          <button 
            onClick={() => setEdu([...edu, { institution: "", degree: "", start_date: "", end_date: "", description: "" }])}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#c1ff72]/10 border border-[#c1ff72]/20 text-[#c1ff72] font-bold text-xs uppercase tracking-widest hover:bg-[#c1ff72]/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>
        </div>

        <div className="space-y-6">
          {edu.length === 0 && (
            <div className="p-12 rounded-[40px] border-2 border-dashed border-white/5 text-center text-white/20 font-jakarta italic">
              No education added yet.
            </div>
          )}
          {edu.map((item: any, i: number) => (
            <div key={i} className="glass p-8 rounded-[40px] border-white/5 relative group">
              <button 
                onClick={() => setEdu(edu.filter((_: any, index: number) => index !== i))}
                className="absolute top-8 right-8 text-white/10 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="grid gap-6">
                <input 
                  placeholder="Institution (e.g. LUMS)" 
                  className="bg-transparent text-xl font-bold border-none outline-none placeholder:text-white/10"
                  value={item.institution}
                  onChange={e => {
                    const next = [...edu];
                    next[i].institution = e.target.value;
                    setEdu(next);
                  }}
                />
                <input 
                  placeholder="Degree (e.g. B.Sc Computer Science)" 
                  className="bg-transparent text-white/60 border-none outline-none placeholder:text-white/5"
                  value={item.degree}
                  onChange={e => {
                    const next = [...edu];
                    next[i].degree = e.target.value;
                    setEdu(next);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#ffe44d] text-[10px] font-bold uppercase tracking-widest mb-2 block">Career Journey</span>
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>
          <button 
            onClick={() => setExp([...exp, { company: "", position: "", start_date: "", end_date: "", description: "" }])}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#ffe44d]/10 border border-[#ffe44d]/20 text-[#ffe44d] font-bold text-xs uppercase tracking-widest hover:bg-[#ffe44d]/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Career
          </button>
        </div>

        <div className="space-y-6">
          {exp.length === 0 && (
            <div className="p-12 rounded-[40px] border-2 border-dashed border-white/5 text-center text-white/20 font-jakarta italic">
              No professional experience added yet.
            </div>
          )}
          {exp.map((item: any, i: number) => (
            <div key={i} className="glass p-8 rounded-[40px] border-white/5 relative group">
              <button 
                onClick={() => setExp(exp.filter((_: any, index: number) => index !== i))}
                className="absolute top-8 right-8 text-white/10 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="grid gap-6">
                <input 
                  placeholder="Company (e.g. Systems Ltd)" 
                  className="bg-transparent text-xl font-bold border-none outline-none placeholder:text-white/10"
                  value={item.company}
                  onChange={e => {
                    const next = [...exp];
                    next[i].company = e.target.value;
                    setExp(next);
                  }}
                />
                <input 
                  placeholder="Position (e.g. Software Engineer Intern)" 
                  className="bg-transparent text-white/60 border-none outline-none placeholder:text-white/5"
                  value={item.position}
                  onChange={e => {
                    const next = [...exp];
                    next[i].position = e.target.value;
                    setExp(next);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StepSkills({ skills, setSkills }: any) {
  const [input, setInput] = useState("");
  const quickSkills = ["Python", "Machine Learning", "Strategic Planning", "Data Analysis", "React.js", "Financial Modeling"];

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInput("");
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center md:text-left">
        <span className="bg-[#c1ff72]/10 text-[#c1ff72] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block border border-[#c1ff72]/20">Competencies</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Your Skills.</h2>
      </div>

      <div className="space-y-8">
        <div className="flex gap-4">
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addSkill(input)}
            placeholder="Search or add skills..."
            className="flex-1 bg-white/5 border border-white/5 p-6 rounded-3xl text-white outline-none focus:bg-white/10 transition-all font-jakarta"
          />
          <button 
            onClick={() => addSkill(input)}
            className="bg-[#c1ff72] text-[#061a12] px-6 md:px-8 rounded-3xl font-bold flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <Plus className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4 ml-4">Quick Add</p>
          <div className="flex flex-wrap gap-3">
            {quickSkills.map(s => (
              <button 
                key={s}
                onClick={() => addSkill(s)}
                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold hover:bg-[#c1ff72] hover:text-[#061a12] hover:border-[#c1ff72] transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-white/5">
          <div className="flex flex-wrap gap-4">
            {skills.map((s: string) => (
              <div key={s} className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#c1ff72] text-[#061a12] font-bold text-sm">
                {s}
                <button onClick={() => setSkills(skills.filter((skill: string) => skill !== s))}>
                  <Trash2 className="w-4 h-4 opacity-50 hover:opacity-100 transition-opacity" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCertificates({ certs, setCerts }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({ name: "", issuer: "", id: "", date: "" });

  const addCert = () => {
    if (newCert.name && newCert.issuer) {
      setCerts([...certs, newCert]);
      setNewCert({ name: "", issuer: "", id: "", date: "" });
      setModalOpen(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <span className="bg-[#c1ff72]/10 text-[#c1ff72] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block border border-[#c1ff72]/20">Verification</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Certificates.</h2>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-[#c1ff72] text-[#061a12] px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="grid gap-6">
        {certs.map((c: any, i: number) => (
          <div key={i} className="glass p-8 rounded-[40px] border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                <FileBadge className="w-6 h-6 text-[#c1ff72]" />
              </div>
              <div>
                <h4 className="text-xl font-bold">{c.name}</h4>
                <p className="text-white/40 text-sm">{c.issuer} • {c.id}</p>
              </div>
            </div>
            <button onClick={() => setCerts(certs.filter((_: any, idx: number) => idx !== i))}>
              <Trash2 className="w-5 h-5 text-white/10 hover:text-red-500 transition-colors" />
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#061a12]/90 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-lg glass p-10 rounded-[50px] border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-8">Add Certificate</h3>
            <div className="space-y-6">
              <input 
                placeholder="Certificate Name"
                className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl outline-none focus:bg-white/10 transition-all font-jakarta"
                value={newCert.name}
                onChange={e => setNewCert({...newCert, name: e.target.value})}
              />
              <input 
                placeholder="Issuer"
                className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl outline-none focus:bg-white/10 transition-all font-jakarta"
                value={newCert.issuer}
                onChange={e => setNewCert({...newCert, issuer: e.target.value})}
              />
              <input 
                placeholder="Certificate ID"
                className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl outline-none focus:bg-white/10 transition-all font-jakarta"
                value={newCert.id}
                onChange={e => setNewCert({...newCert, id: e.target.value})}
              />
              <button 
                onClick={addCert}
                className="w-full bg-[#c1ff72] text-[#061a12] py-4 rounded-2xl font-bold uppercase tracking-widest text-sm"
              >
                Save Certificate
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function StepAchievements({ achievements, setAchievements }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newAch, setNewAch] = useState({ title: "", issuer: "", description: "", date: "" });

  const addAch = () => {
    if (newAch.title) {
      setAchievements([...achievements, newAch]);
      setNewAch({ title: "", issuer: "", description: "", date: "" });
      setModalOpen(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <span className="bg-[#ffe44d]/10 text-[#ffe44d] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block border border-[#ffe44d]/20">Legacy</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Achievements.</h2>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-[#ffe44d] text-[#061a12] px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> 
          <span className="md:hidden">Add New</span>
          <span className="hidden md:inline">Add Recognition</span>
        </button>
      </div>

      <div className="grid gap-6">
        {achievements.map((a: any, i: number) => (
          <div key={i} className="glass p-8 rounded-[40px] border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#ffe44d]" />
              </div>
              <div>
                <h4 className="text-xl font-bold">{a.title}</h4>
                <p className="text-white/40 text-sm">{a.issuer}</p>
              </div>
            </div>
            <button onClick={() => setAchievements(achievements.filter((_: any, idx: number) => idx !== i))}>
              <Trash2 className="w-5 h-5 text-white/10 hover:text-red-500 transition-colors" />
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#061a12]/90 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-lg glass p-10 rounded-[50px] border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-8">Add Achievement</h3>
            <div className="space-y-6">
              <input 
                placeholder="Title (e.g. Dean's List)"
                className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl outline-none focus:bg-white/10 transition-all font-jakarta"
                value={newAch.title}
                onChange={e => setNewAch({...newAch, title: e.target.value})}
              />
              <input 
                placeholder="Issuer"
                className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl outline-none focus:bg-white/10 transition-all font-jakarta"
                value={newAch.issuer}
                onChange={e => setNewAch({...newAch, issuer: e.target.value})}
              />
              <textarea 
                placeholder="Description"
                className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl outline-none focus:bg-white/10 transition-all font-jakarta h-32 resize-none"
                value={newAch.description}
                onChange={e => setNewAch({...newAch, description: e.target.value})}
              />
              <button 
                onClick={addAch}
                className="w-full bg-[#ffe44d] text-[#061a12] py-4 rounded-2xl font-bold uppercase tracking-widest text-sm"
              >
                Save Recognition
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function StepResume({ resume, setResume, onSubmit }: any) {
  return (
    <div className="space-y-10">
      <div className="text-center md:text-left">
        <span className="bg-[#c1ff72]/10 text-[#c1ff72] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block border border-[#c1ff72]/20">Documentation</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Final Step.</h2>
      </div>

      <div className="relative">
        <input 
          type="file" 
          id="resume"
          className="hidden"
          onChange={e => setResume(e.target.files?.[0] || null)}
          accept=".pdf,.doc,.docx"
        />
        <label 
          htmlFor="resume"
          className="block p-10 md:p-20 rounded-[40px] md:rounded-[60px] border-2 border-dashed border-white/10 hover:border-[#c1ff72]/50 hover:bg-[#c1ff72]/5 transition-all cursor-pointer text-center group"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-[#c1ff72]/10 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform">
            <CloudUpload className="w-8 h-8 md:w-10 md:h-10 text-[#c1ff72]" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-4">{resume ? resume.name : "Upload your Resume"}</h3>
          <p className="text-white/30 text-xs md:text-sm font-jakarta">Support for PDF, DOCX (Max 5MB)</p>
        </label>
      </div>

      <div className="p-8 rounded-3xl bg-white/5 border border-white/5 flex items-start gap-6">
        <div className="w-10 h-10 rounded-full bg-[#c1ff72]/20 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-[#c1ff72]" />
        </div>
        <p className="text-white/40 text-sm leading-relaxed font-jakarta">
          Your resume will be parsed by our RAG engine to automatically refine your career alignment and SOP strategies.
        </p>
      </div>
    </div>
  );
}
