import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, MapPin, User, Mail, Lock, Phone, 
  ShieldCheck, Check, Eye, EyeOff, Loader2 
} from 'lucide-react';
import { Button } from './Button';
import { SearchableSelect } from './SearchableSelect';
import { INITIAL_DISTRICTS, INITIAL_VILLAGES } from '../constants';
import { UserRole } from '../types';

// --- Shared Layout for Auth ---
const AuthLayout = ({ children, bgImage }: { children?: React.ReactNode, bgImage?: string }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 overflow-hidden">
    {/* Dynamic Background */}
    <div 
      className="absolute inset-0 z-0 transition-opacity duration-1000"
      style={{
        backgroundImage: `url("${bgImage || 'https://images.unsplash.com/photo-1546519638-68e109498ee3?auto=format&fit=crop&q=80&w=1000'}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    {/* Dark Overlay */}
    <div className="absolute inset-0 z-0 bg-slate-900/60 backdrop-blur-[2px]" />

    {/* Content Card */}
    <div className="relative z-10 w-full max-w-md px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {children}
    </div>
  </div>
);

// --- 1. Splash Screen ---
export const SplashScreen = ({ onLogin, onRegister }: { onLogin: () => void, onRegister: () => void }) => (
  <AuthLayout bgImage="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop">
    <div className="flex flex-col items-center text-center text-white space-y-8">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
        <span className="text-3xl font-black italic">LH</span>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">LeagueHub</h1>
        <p className="text-blue-200 text-lg font-medium">Play Local. Score Live.</p>
      </div>

      <div className="w-full space-y-4 pt-8">
        <Button 
          onClick={onLogin} 
          className="w-full h-14 text-lg font-bold bg-white text-slate-900 hover:bg-blue-50"
        >
          Login
        </Button>
        <Button 
          onClick={onRegister} 
          className="w-full h-14 text-lg font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
        >
          Create Account
        </Button>
      </div>
    </div>
  </AuthLayout>
);

// --- 2. Login Page ---
export const LoginScreen = ({ onLoginSuccess, onBack }: { onLoginSuccess: () => void, onBack: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        onLoginSuccess();
    }, 1500);
  };

  return (
    <AuthLayout bgImage="https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=2070&auto=format&fit=crop">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-blue-200 text-sm mt-1">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
             <label className="text-xs font-bold text-white/70 uppercase">Mobile or Email</label>
             <div className="relative">
                <User className="absolute left-4 top-3.5 text-white/50" size={18} />
                <input required type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="user@example.com" />
             </div>
          </div>
          
          <div className="space-y-1">
             <label className="text-xs font-bold text-white/70 uppercase">Password</label>
             <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-white/50" size={18} />
                <input required type="password" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
             </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-blue-300 hover:text-white">Forgot Password?</button>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-900/20 mt-4">
            {loading ? <Loader2 className="animate-spin" /> : 'Login'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
             <div className="flex items-center gap-4 my-4">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-xs text-white/30 uppercase">Or</span>
                <div className="h-px bg-white/10 flex-1"></div>
             </div>
             <button type="button" onClick={onBack} className="text-sm text-white/60 hover:text-white">
                Don't have an account? <span className="text-blue-300 font-bold">Register</span>
             </button>
        </div>
      </div>
    </AuthLayout>
  );
};

// --- 3. Register Screen ---
export const RegisterScreen = ({ onNext, onBack }: { onNext: (data: any) => void, onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>('VIEWER');
  const [name, setName] = useState('');
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && name) setStep(2);
    else if (step === 2) onNext({ name, role });
  };

  return (
    <AuthLayout bgImage="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop">
       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <div className="flex gap-1">
                <div className={`h-1.5 w-6 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-white/10'}`} />
                <div className={`h-1.5 w-6 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-white/10'}`} />
            </div>
         </div>

         <form onSubmit={handleNext} className="space-y-5">
            {step === 1 ? (
                <div className="space-y-4 animate-in slide-in-from-right">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/70 uppercase">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-white/50" size={18} />
                            <input autoFocus required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                        </div>
                    </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-white/70 uppercase">Mobile Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-3.5 text-white/50" size={18} />
                            <input required type="tel" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 98765 43210" />
                        </div>
                    </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-white/70 uppercase">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-white/50" size={18} />
                            <input required type="password" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Minimum 8 chars" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 animate-in slide-in-from-right">
                    <p className="text-white/80 text-sm">Select how you want to use LeagueHub:</p>
                    
                    <button 
                        type="button"
                        onClick={() => setRole('VIEWER')}
                        className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${role === 'VIEWER' ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500' : 'bg-slate-900/40 border-white/10 hover:bg-slate-900/60'}`}
                    >
                        <div className={`p-3 rounded-full ${role === 'VIEWER' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                            <User size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-white">Player / Viewer</h3>
                            <p className="text-xs text-white/60">Join teams, view scores, follow leagues.</p>
                        </div>
                    </button>

                    <button 
                        type="button"
                        onClick={() => setRole('ORGANIZER')}
                        className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${role === 'ORGANIZER' ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500' : 'bg-slate-900/40 border-white/10 hover:bg-slate-900/60'}`}
                    >
                         <div className={`p-3 rounded-full ${role === 'ORGANIZER' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                            <ShieldCheck size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-white">Game Organizer</h3>
                            <p className="text-xs text-white/60">Create matches, update scores, manage leagues.</p>
                        </div>
                    </button>

                    {role === 'ORGANIZER' && (
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-xs">
                            ⚠️ Organizer accounts require admin approval before you can create games.
                        </div>
                    )}
                </div>
            )}

            <div className="pt-2 flex gap-3">
                 {step === 2 && (
                     <Button type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
                         Back
                     </Button>
                 )}
                 <Button type="submit" className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white border-none">
                     {step === 1 ? 'Next Step' : 'Continue'} <ArrowRight size={16} className="ml-2" />
                 </Button>
            </div>
         </form>
         
         {step === 1 && (
             <div className="mt-6 text-center">
                <button type="button" onClick={onBack} className="text-sm text-white/60 hover:text-white">
                    Already have an account? <span className="text-blue-300 font-bold">Login</span>
                </button>
             </div>
         )}
       </div>
    </AuthLayout>
  );
};

// --- 4. Location Selection Screen ---
export const LocationSelectScreen = ({ onComplete }: { onComplete: (loc: any) => void }) => {
    const [district, setDistrict] = useState('');
    const [village, setVillage] = useState('');
    const [area, setArea] = useState('');

    const filteredVillages = INITIAL_VILLAGES.filter(v => v.districtId === district);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({ district, village, area });
    };

    return (
        <AuthLayout bgImage="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop">
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <MapPin className="text-blue-400" /> Set Location
                    </h2>
                    <p className="text-white/60 text-sm mt-1">We'll show you matches in this area.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                     {/* District */}
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-white/70 uppercase">District (Tamil Nadu)</label>
                        <select 
                            required 
                            value={district}
                            onChange={e => { setDistrict(e.target.value); setVillage(''); }}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" className="bg-slate-800">Select District</option>
                            {INITIAL_DISTRICTS.map(d => (
                                <option key={d.id} value={d.id} className="bg-slate-800">{d.name}</option>
                            ))}
                        </select>
                     </div>

                      {/* Village - Searchable Dropdown */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-white/70 uppercase">Village / Town</label>
                        <SearchableSelect 
                            options={filteredVillages}
                            value={village}
                            onChange={(val) => setVillage(val)}
                            disabled={!district}
                            placeholder={district ? "Search Village..." : "Select District first"}
                        />
                     </div>

                     {/* Area - Free Text */}
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-white/70 uppercase">Local Area / Street</label>
                        <input 
                            required 
                            value={area}
                            onChange={e => setArea(e.target.value)}
                            type="text" 
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="e.g. Near Bus Stand" 
                        />
                     </div>

                     <Button type="submit" disabled={!district || !village} className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg">
                         Confirm Location
                     </Button>
                </form>
             </div>
        </AuthLayout>
    );
};

// --- 5. OTP Verification Screen ---
export const OTPScreen = ({ onVerify }: { onVerify: () => void }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [verifying, setVerifying] = useState(false);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Auto-focus next input
        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleVerify = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            onVerify();
        }, 1500);
    };

    return (
        <AuthLayout bgImage="https://images.unsplash.com/photo-1546519638-68e109498ee3?auto=format&fit=crop&q=80&w=1000">
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
                 <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-300">
                     <ShieldCheck size={32} />
                 </div>
                 
                 <h2 className="text-2xl font-bold text-white mb-2">Verify Mobile</h2>
                 <p className="text-white/60 text-sm mb-6">Enter the 4-digit code sent to your number.</p>

                 <div className="flex justify-center gap-3 mb-8">
                     {otp.map((digit, idx) => (
                         <input
                            key={idx}
                            id={`otp-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            className="w-12 h-14 bg-slate-900/50 border border-white/10 rounded-xl text-center text-2xl font-bold text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                         />
                     ))}
                 </div>

                 <Button 
                    onClick={handleVerify} 
                    disabled={otp.some(d => !d) || verifying}
                    className="w-full h-12 bg-green-600 hover:bg-green-500 text-white border-none shadow-lg"
                 >
                     {verifying ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                 </Button>

                 <p className="mt-6 text-xs text-white/40">
                     Didn't receive code? <button className="text-white hover:underline">Resend in 30s</button>
                 </p>
             </div>
        </AuthLayout>
    );
};

// --- 6. Pending Approval Screen ---
export const PendingApprovalScreen = ({ onLogout }: { onLogout: () => void }) => (
    <AuthLayout bgImage="https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
             <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-400 border border-amber-500/30">
                 <Lock size={40} />
             </div>
             
             <h2 className="text-2xl font-bold text-white mb-3">Account Under Review</h2>
             <p className="text-white/70 text-sm leading-relaxed mb-8">
                 Thanks for registering as an Organizer. Your account is currently pending administrative approval. 
                 <br/><br/>
                 We will notify you via SMS once your account is activated.
             </p>

             <Button onClick={onLogout} className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                 Logout & Return Home
             </Button>
        </div>
    </AuthLayout>
);
