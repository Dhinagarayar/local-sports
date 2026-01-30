import React from 'react';
import { Play, Square, CalendarDays, MapPin, Clock } from 'lucide-react';
import { Game, GameStatus, UserRole } from '../types';
import { Button } from './Button';

interface GameCardProps {
  game: Game;
  role: UserRole;
  onUpdateScore: (gameId: string, team: 'home' | 'away', delta: number) => void;
  onStatusChange: (gameId: string, status: GameStatus) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  role, 
  onUpdateScore, 
  onStatusChange 
}) => {
  const isOrganizer = role === 'ORGANIZER';
  const isLive = game.status === GameStatus.LIVE;
  const isFinal = game.status === GameStatus.FINAL;

  const getTeamColorClass = (color: string) => {
    const map: Record<string, string> = {
      red: 'bg-red-500',
      blue: 'bg-blue-600',
      green: 'bg-emerald-500',
      yellow: 'bg-yellow-400',
      purple: 'bg-purple-600',
      orange: 'bg-orange-500',
      gray: 'bg-slate-500',
      black: 'bg-slate-900',
    };
    return map[color] || 'bg-slate-500';
  };

  const getStatusColor = () => {
      if (isLive) return 'bg-red-500';
      if (isFinal) return 'bg-slate-400';
      return 'bg-blue-500';
  };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-white shadow-md border border-slate-100 transition-all hover:shadow-lg group ${isLive ? 'ring-2 ring-red-100 shadow-red-100' : ''}`}>
      
      {/* Status Strip */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getStatusColor()}`}></div>

      <div className="pl-5 p-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                {isLive && (
                    <span className="flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                )}
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isLive ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                    {isLive ? 'Live Now' : isFinal ? 'Finished' : 'Upcoming'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 px-2 border-l border-slate-200">{game.sport}</span>
            </div>
            <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                <CalendarDays size={10} />
                {new Date(game.scheduledTime).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
            </div>
        </div>

        {/* Matchup */}
        <div className="flex items-center justify-between">
            {/* Home */}
            <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-2xl ${getTeamColorClass(game.homeTeam.color)} flex items-center justify-center text-white font-black text-xl shadow-sm mb-2`}>
                    {game.homeTeam.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-slate-700 text-center leading-tight max-w-[80px] line-clamp-2 min-h-[32px] flex items-center justify-center">{game.homeTeam.name}</span>
            </div>

            {/* Score Center */}
            <div className="flex flex-col items-center px-2">
                {game.status === GameStatus.UPCOMING ? (
                    <div className="text-center">
                        <span className="text-xl font-black text-slate-300 italic">VS</span>
                        <div className="flex items-center justify-center gap-1 mt-1 text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                            <Clock size={10} />
                            {new Date(game.scheduledTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className={`text-3xl font-black tracking-tighter ${isLive ? 'text-slate-900' : 'text-slate-500'}`}>{game.homeScore}</span>
                        <span className="text-sm font-medium text-slate-300">-</span>
                        <span className={`text-3xl font-black tracking-tighter ${isLive ? 'text-slate-900' : 'text-slate-500'}`}>{game.awayScore}</span>
                    </div>
                )}
            </div>

             {/* Away */}
             <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-2xl ${getTeamColorClass(game.awayTeam.color)} flex items-center justify-center text-white font-black text-xl shadow-sm mb-2`}>
                    {game.awayTeam.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-slate-700 text-center leading-tight max-w-[80px] line-clamp-2 min-h-[32px] flex items-center justify-center">{game.awayTeam.name}</span>
            </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center text-[10px] text-slate-400">
            <MapPin size={10} className="mr-1" />
            <span className="truncate max-w-[200px]">{game.venue}</span>
        </div>

        {/* Organizer Controls */}
        {isOrganizer && (
          <div className="mt-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
            {game.status === GameStatus.UPCOMING && (
              <Button onClick={() => onStatusChange(game.id, GameStatus.LIVE)} size="sm" className="w-full justify-center text-xs">
                <Play size={14} className="mr-2 fill-current" /> Start Match
              </Button>
            )}

            {isLive && (
              <div className="space-y-3">
                 <div className="grid grid-cols-2 gap-3">
                    <div className="flex gap-1">
                       <button onClick={() => onUpdateScore(game.id, 'home', 1)} className="flex-1 h-8 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm hover:bg-blue-200">+1</button>
                       <button onClick={() => onUpdateScore(game.id, 'home', -1)} className="w-8 h-8 bg-white border border-slate-200 text-slate-400 rounded-lg font-bold text-sm hover:bg-slate-50">-</button>
                    </div>
                    <div className="flex gap-1">
                       <button onClick={() => onUpdateScore(game.id, 'away', 1)} className="flex-1 h-8 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm hover:bg-blue-200">+1</button>
                        <button onClick={() => onUpdateScore(game.id, 'away', -1)} className="w-8 h-8 bg-white border border-slate-200 text-slate-400 rounded-lg font-bold text-sm hover:bg-slate-50">-</button>
                    </div>
                 </div>
                 
                 <Button variant="danger" size="sm" onClick={() => {
                   if (window.confirm("End match? Scores will be final.")) onStatusChange(game.id, GameStatus.FINAL);
                 }} className="w-full justify-center text-xs h-8">
                   <Square size={12} className="mr-2 fill-current" /> End Match
                 </Button>
              </div>
            )}
             
            {isFinal && (
               <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 Match Finalized
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};