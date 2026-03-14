import React from 'react';
import { X, Search as SearchIcon } from 'lucide-react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Search({ value, onChange, placeholder }: SearchProps) {
  return (
<div className="relative w-full">
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder || 'Search products...'}
    className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm text-gray-700 text-base sm:text-lg transition-all"
  />
  {value && (
    <button
      onClick={() => onChange('')}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
    >
      <X className="w-5 h-5" />
    </button>
  )}
</div>
  );
}