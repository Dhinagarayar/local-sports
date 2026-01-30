import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Game, GameStatus } from '../types';

interface StatsChartProps {
  games: Game[];
}

export const StatsChart: React.FC<StatsChartProps> = ({ games }) => {
  const completedGames = games.filter(g => g.status === GameStatus.FINAL);

  if (completedGames.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center text-slate-500">
        No completed games yet to show statistics.
      </div>
    );
  }

  // Calculate total points per team
  const teamStats = new Map<string, { name: string, points: number, color: string }>();

  completedGames.forEach(game => {
    // Home
    const home = teamStats.get(game.homeTeam.id) || { name: game.homeTeam.name, points: 0, color: game.homeTeam.color };
    home.points += game.homeScore;
    teamStats.set(game.homeTeam.id, home);

    // Away
    const away = teamStats.get(game.awayTeam.id) || { name: game.awayTeam.name, points: 0, color: game.awayTeam.color };
    away.points += game.awayScore;
    teamStats.set(game.awayTeam.id, away);
  });

  const data = Array.from(teamStats.values()).sort((a, b) => b.points - a.points).slice(0, 5); // Top 5

  const getColorHex = (colorName: string) => {
     const map: Record<string, string> = {
      red: '#ef4444',
      blue: '#3b82f6',
      green: '#22c55e',
      yellow: '#eab308',
      purple: '#a855f7',
      orange: '#f97316',
      gray: '#64748b',
      black: '#0f172a',
    };
    return map[colorName] || '#64748b';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4">League Top Scorers (Total Points)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="points" radius={[0, 4, 4, 0]} barSize={32}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorHex(entry.color)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};