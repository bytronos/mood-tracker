import React from 'react';
import { SleepQuality } from '../types';
import { Slider } from './ui/slider';

interface SleepTrackerProps {
  value: SleepQuality;
  onChange: (value: SleepQuality) => void;
}

export function SleepTracker({ value, onChange }: SleepTrackerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) as SleepQuality);
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Sleep Quality</h2>
      <Slider
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={handleChange}
        minLabel="Poor"
        maxLabel="Excellent"
        className="w-full"
      />
      <div className="grid grid-cols-5 mt-2 text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 px-1 text-center">
        <span>Restless</span>
        <span>Interrupted</span>
        <span>Average</span>
        <span>Good</span>
        <span>Refreshed</span>
      </div>
    </div>
  );
}