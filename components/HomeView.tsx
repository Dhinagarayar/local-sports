import React, { useState } from 'react';
import { MapPin, PlayCircle, UserPlus, ChevronRight, Calendar } from 'lucide-react';
import { District, Game, GameStatus } from '../types';
import { Button } from './Button';

interface HomeViewProps {
  // State is implicitly Tamil Nadu
  districts: District[];
  games: Game[];
  onNavigate: (screen: any) => void;
  onJoinClick: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  districts,
  games,
  onNavigate,
  onJoinClick
}) => {
  // Location Logic
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const todaysGames = games.filter(g => {
    const gameDate = new Date(g.scheduledTime).toDateString();
    const today = new Date().toDateString();
    return gameDate === today;
  });

  const liveGamesCount = games.filter(g => g.status === GameStatus.LIVE).length;

  return (
    <div className="space-y-8 pb-20 pt-4">
      
      {/* Hero Text */}
      <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">
            Local Sports.<br/>
            <span className="text-blue-400">Live Scores.</span> One Place.
        </h1>
        <p className="text-blue-100/80 text-sm font-medium">Join the biggest community of local athletes.</p>
      </div>

      {/* Glass Location Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-500/20 rounded-lg">
            <MapPin className="text-blue-300" size={18} />
          </div>
          <h2 className="text-lg font-bold">Find Local Sports</h2>
        </div>
        
        <div className="space-y-3">
          <div className="relative group">
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full appearance-none bg-slate-900/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:bg-slate-900/60"
            >
              <option value="" className="text-slate-400">Select District (Tamil Nadu)</option>
              {districts.map(d => <option key={d.id} value={d.id} className="text-slate-900">{d.name}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 group-hover:text-white transition-colors">
                <ChevronRight size={16} className="rotate-90" />
            </div>
          </div>
        </div>

        {selectedDistrict && (
           <div className="mt-4 pt-4 border-t border-white/10 flex items-center text-xs text-blue-200 animate-in fade-in">
             <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
             <span className="font-semibold mr-1 text-white/70">Location set to:</span> 
             <span className="font-bold text-white">{districts.find(d => d.id === selectedDistrict)?.name}</span>
           </div>
        )}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
        <button 
          onClick={onJoinClick}
          className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-blue-600/90 hover:border-blue-500 p-5 rounded-2xl shadow-lg flex flex-col items-start gap-3 transition-all active:scale-95"
        >
          <div className="p-2.5 bg-white/10 rounded-full group-hover:bg-white/20 text-white transition-colors">
            <UserPlus size={22} />
          </div>
          <div className="text-left text-white">
            <h3 className="font-bold text-lg leading-tight">Join<br/>League</h3>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('LIVE')}
          className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-emerald-600/90 hover:border-emerald-500 p-5 rounded-2xl shadow-lg flex flex-col items-start gap-3 transition-all active:scale-95"
        >
           <div className="p-2.5 bg-white/10 rounded-full group-hover:bg-white/20 text-white transition-colors">
            <PlayCircle size={22} />
          </div>
          <div className="text-left text-white">
            <h3 className="font-bold text-lg leading-tight">Watch<br/>Live</h3>
            {liveGamesCount > 0 && (
                <span className="absolute top-4 right-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            )}
          </div>
        </button>
      </div>

      {/* Today's Matches (Glass Card) */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Calendar size={18} className="text-blue-300" /> Today's Matches
          </h3>
          <button onClick={() => onNavigate('LEAGUES')} className="text-xs font-bold text-blue-300 hover:text-white flex items-center transition-colors">
            View All <ChevronRight size={14} />
          </button>
        </div>

        {todaysGames.length > 0 ? (
          <div className="space-y-3">
             {todaysGames.map(game => (
               <div key={game.id} className="bg-slate-900/40 hover:bg-slate-900/60 transition-colors p-3 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex flex-col items-center w-14">
                     <span className="text-[10px] font-bold text-white/60">{new Date(game.scheduledTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                     {game.status === GameStatus.LIVE && <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold mt-1 shadow-sm shadow-red-500/50">LIVE</span>}
                  </div>
                  <div className="flex-1 px-3 border-l border-white/10 ml-3">
                     <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-white">{game.homeTeam.name}</span>
                        <span className="font-bold text-sm text-white">{game.homeScore}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-white/60">{game.awayTeam.name}</span>
                        <span className="font-bold text-sm text-white/60">{game.awayScore}</span>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-white/50 text-sm">No matches scheduled for today.</p>
            <Button size="sm" variant="ghost" className="mt-2 text-blue-300 hover:text-white hover:bg-white/10" onClick={() => onNavigate('LEAGUES')}>Check Schedule</Button>
          </div>
        )}
      </div>
    </div>
  );
};