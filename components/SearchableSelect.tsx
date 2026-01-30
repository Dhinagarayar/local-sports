import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';

interface Option {
  id: string;
  name: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Find selected option name
  const selectedOption = options.find(opt => opt.id === value);

  // Sync search term with selected value on mount/change, 
  // but only if we are NOT currently searching (isOpen check)
  useEffect(() => {
    if (value && !isOpen) {
      const opt = options.find(o => o.id === value);
      if (opt) setSearchTerm(opt.name);
    } else if (!value && !isOpen) {
      setSearchTerm('');
    }
  }, [value, options, isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset search term to selected value if closed without selection
        if (selectedOption) {
            setSearchTerm(selectedOption.name);
        } else {
            setSearchTerm('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedOption]);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    // If user is typing, we clear the actual value until they select something
    if (value) onChange(''); 
  };

  const handleSelect = (option: Option) => {
    onChange(option.id);
    setSearchTerm(option.name);
    setIsOpen(false);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}`}
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {value && !disabled && (
                <button 
                    type="button" 
                    onClick={clearSelection} 
                    className="text-white/40 hover:text-white p-1 rounded-full"
                >
                    <X size={14} />
                </button>
            )}
            <ChevronDown size={16} className={`text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
          {filteredOptions.length > 0 ? (
            <ul className="py-1">
              {filteredOptions.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-3 cursor-pointer flex items-center justify-between text-sm ${value === option.id ? 'bg-blue-600/20 text-blue-200' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                >
                  <span>{option.name}</span>
                  {value === option.id && <Check size={14} className="text-blue-400" />}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-center text-sm text-slate-500">
               {searchTerm ? 'Village not found in this district' : 'Type to search...'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};