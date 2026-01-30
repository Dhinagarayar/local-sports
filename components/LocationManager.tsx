import React from 'react';
import { MapPin, Lock, Info } from 'lucide-react';
import { District, UserRole } from '../types';

interface LocationManagerProps {
  role: UserRole;
  districts: District[];
}

export const LocationManager: React.FC<LocationManagerProps> = ({
  role,
  districts,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="text-blue-600" /> Location Registry
          </h2>
          <div className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
             <Info size={14} /> Tamil Nadu
          </div>
        </div>
        <p className="text-sm text-slate-500">
          Showing all {districts.length} active districts. Locations are standardized for the platform.
        </p>
      </div>

      <div className="flex-1 p-6 overflow-y-auto max-h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {districts.map((item) => (
            <div 
              key={item.id}
              className="relative p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">{item.name}</h4>
                <span className="text-xs text-slate-400">District</span>
              </div>
              
              <div className="absolute top-3 right-3 text-slate-300" title="System Defined">
                  <Lock size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};