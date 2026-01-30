import React from 'react';
import { Home, Trophy, Activity, User, Settings } from 'lucide-react';
import { UserRole } from '../types';

export type Screen = 'HOME' | 'LEAGUES' | 'LIVE' | 'DASHBOARD' | 'PROFILE';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  role: UserRole;
  glass?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate, role, glass = false }) => {
  const navItems = [
    { id: 'HOME', icon: Home, label: 'Home' },
    { id: 'LEAGUES', icon: Trophy, label: 'Leagues' },
    { id: 'LIVE', icon: Activity, label: 'Live' },
    { id: 'PROFILE', icon: User, label: 'Profile' },
  ];

  // Insert Dashboard for organizers
  if (role === 'ORGANIZER') {
    navItems.splice(3, 0, { id: 'DASHBOARD', icon: Settings, label: 'Manage' });
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 px-4 py-2 pb-safe z-50 md:hidden transition-all duration-300 ${
      glass 
        ? 'bg-slate-900/80 backdrop-blur-lg border-t border-white/10 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.3)]' 
        : 'bg-white border-t border-slate-200 text-slate-600 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'
    }`}>
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-all duration-200 ${
                isActive 
                    ? (glass ? 'text-blue-400 scale-105' : 'text-blue-600 scale-105') 
                    : (glass ? 'text-white/40 hover:text-white/80' : 'text-slate-400 hover:text-slate-600')
              }`}
            >
              <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};