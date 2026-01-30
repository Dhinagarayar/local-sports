import React from 'react';
import { LayoutDashboard, Users, Trophy, MapPin, Plus } from 'lucide-react';
import { Game, GameStatus } from '../types';
import { StatsChart } from './StatsChart';
import { LocationManager } from './LocationManager';
import { Button } from './Button';

interface OrganizerDashboardProps {
  games: Game[];
  locationProps: any; // Passing down all location props
  onCreateGame: () => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ games, locationProps, onCreateGame }) => {
  const totalGames = games.length;
  const liveGames = games.filter(g => g.status === GameStatus.LIVE).length;
  const completedGames = games.filter(g => g.status === GameStatus.FINAL).length;

  return (
    <div className="space-y-8 pb-20 pt-4">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
            <p className="text-sm text-slate-500">Manage your league activities</p>
         </div>
         <Button onClick={onCreateGame} size="sm" className="shadow-lg shadow-blue-500/20 rounded-full px-4">
           <Plus size={16} className="mr-1" /> New Game
         </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
         <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm text-center">
            <div className="text-3xl font-black text-slate-800 mb-1">{totalGames}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</div>
         </div>
         <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm text-center relative overflow-hidden">
            {liveGames > 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping -mr-1 -mt-1"></div>}
            <div className="text-3xl font-black text-red-500 mb-1">{liveGames}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Live</div>
         </div>
         <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm text-center">
            <div className="text-3xl font-black text-emerald-500 mb-1">{completedGames}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Done</div>
         </div>
      </div>

      {/* Analytics */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-1 border border-white/40 shadow-sm">
        <div className="p-4 pb-0">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Trophy size={18} className="text-slate-500" /> League Performance
            </h3>
        </div>
        <div className="p-2">
            <StatsChart games={games} />
        </div>
      </div>

      {/* Location Management */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2 px-2">
            <MapPin size={18} className="text-slate-500" /> Location Registry
        </h3>
        <LocationManager {...locationProps} />
      </div>
    </div>
  );
};