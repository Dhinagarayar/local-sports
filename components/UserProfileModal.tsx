import React, { useState } from 'react';
import { X, User, Mail, Shield, LogOut } from 'lucide-react';
import { Button } from './Button';
import { UserProfile, UserRole } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, profile, onUpdate, onLogout }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ name, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="relative bg-slate-900 h-24">
           <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
            <X size={20} />
          </button>
          <div className="absolute -bottom-10 left-6">
             <div className="w-20 h-20 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {name.charAt(0)}
             </div>
          </div>
        </div>
        
        <div className="pt-12 px-6 pb-6">
          <div className="mb-6">
             <h2 className="text-xl font-bold text-slate-900">{name}</h2>
             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 mt-1">
               <Shield size={10} /> {profile.role}
             </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Profile Details</label>
              
              <div className="relative mb-3">
                 <User size={16} className="absolute left-3 top-2.5 text-slate-400" />
                 <input 
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 />
              </div>

               <div className="relative">
                 <Mail size={16} className="absolute left-3 top-2.5 text-slate-400" />
                 <input 
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onLogout} 
                size="sm" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2"
              >
                <LogOut size={16} className="mr-1.5" /> Logout
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={onClose} size="sm">Cancel</Button>
                <Button type="submit" size="sm">Save Changes</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};