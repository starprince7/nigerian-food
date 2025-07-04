'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import { TRIBES, TRIBE_COLORS } from '@/utils/constants';

const TribalFilter = ({ 
  selectedTribe = 'All Tribes',
  onTribeChange,
  layout = 'horizontal', // 'horizontal' or 'vertical'
  showAllOption = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const tribes = showAllOption ? ['All Tribes', ...TRIBES] : TRIBES;

  const handleTribeSelect = (tribe) => {
    if (onTribeChange) {
      onTribeChange(tribe);
    }
    setIsOpen(false);
  };

  const getTribeColorClass = (tribe) => {
    if (tribe === 'All Tribes') {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
    return TRIBE_COLORS[tribe] || 'bg-gray-100 text-gray-800';
  };

  if (layout === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <span className="flex items-center">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
              selectedTribe === 'All Tribes' ? 'bg-gray-400' : 'bg-current'
            }`}></span>
            {selectedTribe}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
            {tribes.map((tribe) => (
              <button
                key={tribe}
                onClick={() => handleTribeSelect(tribe)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                  selectedTribe === tribe ? 'bg-green-50 text-green-800' : 'text-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                    tribe === 'All Tribes' ? 'bg-gray-400' : TRIBE_COLORS[tribe]?.includes('bg-') ? 
                    TRIBE_COLORS[tribe].split(' ')[0] : 'bg-gray-400'
                  }`}></span>
                  {tribe}
                  {tribe !== 'All Tribes' && (
                    <span className="ml-auto text-xs text-gray-500">
                      {tribe === 'Yoruba' ? 'Southwest' :
                       tribe === 'Igbo' ? 'Southeast' :
                       tribe === 'Hausa' || tribe === 'Fulani' ? 'North' :
                       tribe === 'Efik' || tribe === 'Edo' ? 'South-South' :
                       tribe === 'Tiv' ? 'Middle Belt' : 'All Regions'}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (layout === 'vertical') {
    return (
      <div className={`space-y-2 items-center flex flex-col ${className}`}>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Tribe</h3>
        {tribes.map((tribe) => (
          <button
            key={tribe}
            onClick={() => handleTribeSelect(tribe)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTribe === tribe
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'text-gray-700 hover:bg-gray-50 border border-transparent'
            }`}
          >
            <span className="flex items-center">
              <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${
                tribe === 'All Tribes' ? 'bg-gray-400' : 
                TRIBE_COLORS[tribe]?.includes('bg-') ? 
                TRIBE_COLORS[tribe].split(' ')[0] : 'bg-gray-400'
              }`}></span>
              {tribe}
            </span>
          </button>
        ))}
      </div>
    );
  }

  // Horizontal layout (default)
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex flex-wrap gap-2 space-x-2 justify-center">
        {tribes.map((tribe) => (
          <button
            key={tribe}
            onClick={() => handleTribeSelect(tribe)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              selectedTribe === tribe
                ? `${getTribeColorClass(tribe)} border-current shadow-sm`
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                tribe === 'All Tribes' ? 'bg-gray-400' : 
                selectedTribe === tribe ? 'bg-current opacity-60' :
                TRIBE_COLORS[tribe]?.includes('bg-') ? 
                TRIBE_COLORS[tribe].split(' ')[0] : 'bg-gray-400'
              }`}></span>
              {tribe}
            </span>
          </button>
        ))}
      </div>
      
      {selectedTribe !== 'All Tribes' && (
        <div className="mt-3 text-xs text-gray-500">
          <span className="font-medium">Region:</span> {
            selectedTribe === 'Yoruba' ? 'Southwest Nigeria' :
            selectedTribe === 'Igbo' ? 'Southeast Nigeria' :
            selectedTribe === 'Hausa' || selectedTribe === 'Fulani' ? 'Northern Nigeria' :
            selectedTribe === 'Efik' || selectedTribe === 'Edo' ? 'South-South Nigeria' :
            selectedTribe === 'Tiv' ? 'Middle Belt Nigeria' : 'All Regions'
          }
        </div>
      )}
    </div>
  );
};

export default TribalFilter; 