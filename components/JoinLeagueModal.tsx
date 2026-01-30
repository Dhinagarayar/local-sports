import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, MapPin } from 'lucide-react';
import { Button } from './Button';
import { District, State } from '../types';

interface JoinLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (data: { name: string; email: string; team: string }) => void;
  states: State[]; // Kept for compatibility
  districts: District[];
}

export const JoinLeagueModal: React.FC<JoinLeagueModalProps> = ({ 
  isOpen, 
  onClose, 
  onJoin,
  districts
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('Free Agent');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoin({ name, email, team });
    // Reset
    setStep(1);
    setName('');
    setEmail('');
    setSelectedDistrict('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Join League</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`h-1.5 w-8 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
              <div className={`h-1.5 w-8 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 text-sm">
                👋 Let's start with your basic information to get your profile ready.
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border-slate-300 border px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Jordan Smith"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-slate-300 border px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. jordan@example.com"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="button" 
                  onClick={() => name && email && setStep(2)} 
                  className="w-full h-12 justify-center text-lg"
                  disabled={!name || !email}
                >
                  Next Step <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in slide-in-from-right duration-300">
               <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <MapPin size={16} /> Select Your Location (Tamil Nadu)
                </label>
                
                {/* District Only */}
                <div className="space-y-3">
                  <select 
                    value={selectedDistrict} 
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full rounded-xl border-slate-300 border px-4 py-3 text-sm bg-slate-50 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Join a Team</label>
                <select 
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full rounded-xl border-slate-300 border px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Free Agent">Register as Free Agent (No Team)</option>
                  <option value="Thunderbolts">Thunderbolts</option>
                  <option value="Crimson Tide">Crimson Tide</option>
                  <option value="Emerald Eagles">Emerald Eagles</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => setStep(1)} 
                  className="flex-1 h-12 justify-center"
                >
                  <ArrowLeft size={18} className="mr-2" /> Back
                </Button>
                <Button 
                  type="submit" 
                  className="flex-[2] h-12 justify-center text-lg bg-green-600 hover:bg-green-700 focus:ring-green-500"
                >
                  Complete Registration <Check size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};