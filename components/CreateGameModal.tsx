import React, { useState } from 'react';
import { X, Calendar, Image as ImageIcon, MapPin } from 'lucide-react';
import { Button } from './Button';
import { TEAM_COLORS } from '../constants';
import { Game } from '../types';

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (gameData: Partial<Game>) => void;
}

export const CreateGameModal: React.FC<CreateGameModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [homeName, setHomeName] = useState('');
  const [homeColor, setHomeColor] = useState('blue');
  const [awayName, setAwayName] = useState('');
  const [awayColor, setAwayColor] = useState('red');
  const [sport, setSport] = useState('Basketball');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scheduledTime = date && time ? new Date(`${date}T${time}`).toISOString() : new Date().toISOString();
    
    // Default images based on sport if URL is empty
    let finalImageUrl = imageUrl;
    if (!finalImageUrl) {
        switch(sport) {
            case 'Basketball': finalImageUrl = 'https://images.unsplash.com/photo-1546519638-68e109498ee3?auto=format&fit=crop&q=80&w=1000'; break;
            case 'Soccer': finalImageUrl = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000'; break;
            case 'Football': finalImageUrl = 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=1000'; break;
            case 'Hockey': finalImageUrl = 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&q=80&w=1000'; break;
            case 'Volleyball': finalImageUrl = 'https://images.unsplash.com/photo-1612872087720-48ca556cd077?auto=format&fit=crop&q=80&w=1000'; break;
            case 'Cricket': finalImageUrl = 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000'; break;
            case 'Chess': finalImageUrl = 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&q=80&w=1000'; break;
            case 'Kabaddi': finalImageUrl = 'https://images.unsplash.com/photo-1628779238951-be2c9f25b227?auto=format&fit=crop&q=80&w=1000'; break; 
            default: finalImageUrl = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000';
        }
    }

    onCreate({
      homeTeam: { id: crypto.randomUUID(), name: homeName, color: homeColor },
      awayTeam: { id: crypto.randomUUID(), name: awayName, color: awayColor },
      sport,
      venue: venue || 'Main Stadium',
      scheduledTime,
      imageUrl: finalImageUrl
    });
    
    // Reset form
    setHomeName('');
    setAwayName('');
    setImageUrl('');
    setVenue('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Schedule New Game</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          
          {/* Sport Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sport Category</label>
              <select 
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full rounded-xl border-slate-300 border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 hover:bg-white transition-colors"
              >
                <option>Basketball</option>
                <option>Soccer</option>
                <option>Football</option>
                <option>Volleyball</option>
                <option>Hockey</option>
                <option>Kabaddi</option>
                <option>Cricket</option>
                <option>Chess</option>
              </select>
            </div>
             <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Venue</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text"
                  placeholder="e.g. City Arena"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full rounded-xl border-slate-300 border pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
              <input 
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border-slate-300 border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Time</label>
              <input 
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border-slate-300 border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                <ImageIcon size={16} /> Cover Image URL <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input 
                type="url" 
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-xl border-slate-300 border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-slate-500 mt-1">Leave blank to use a default image for the selected sport.</p>
          </div>

          <div className="border-t border-slate-100 my-2"></div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Home Team */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Home Team</label>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Team Name"
                    required
                    value={homeName}
                    onChange={(e) => setHomeName(e.target.value)}
                    className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Color</label>
                    <select 
                        value={homeColor}
                        onChange={(e) => setHomeColor(e.target.value)}
                        className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm"
                    >
                        {TEAM_COLORS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Away Team */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Away Team</label>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Team Name"
                    required
                    value={awayName}
                    onChange={(e) => setAwayName(e.target.value)}
                    className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Color</label>
                    <select 
                        value={awayColor}
                        onChange={(e) => setAwayColor(e.target.value)}
                        className="w-full rounded-lg border-slate-300 border px-3 py-2 text-sm"
                    >
                        {TEAM_COLORS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose} size="lg">Cancel</Button>
            <Button type="submit" size="lg" className="px-8 shadow-blue-500/20 shadow-lg">Schedule Game</Button>
          </div>
        </form>
      </div>
    </div>
  );
};