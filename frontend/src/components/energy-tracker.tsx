import React from 'react';
import { EnergyLevel } from '../types';
import { Slider } from './ui/slider';

interface EnergyTrackerProps {
  value: EnergyLevel;
  onChange: (value: EnergyLevel) => void;
}

export function EnergyTracker({ value, onChange }: EnergyTrackerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) as EnergyLevel);
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Energy Level</h2>
      <Slider
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={handleChange}
        minLabel="Low"
        maxLabel="High"
        className="w-full"
      />
      <div className="grid grid-cols-5 mt-2 text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 px-1 text-center">
        <span>Exhausted</span>
        <span>Tired</span>
        <span>Neutral</span>
        <span>Energetic</span>
        <span>Very High</span>
      </div>
    </div>
  );
}