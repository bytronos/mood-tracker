import React from 'react';
import { StressLevel } from '../types';
import { Slider } from './ui/slider';

interface StressTrackerProps {
  value: StressLevel;
  onChange: (value: StressLevel) => void;
}

export function StressTracker({ value, onChange }: StressTrackerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) as StressLevel);
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Stress Level</h2>
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
      <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400 px-1">
        <span>Relaxed</span>
        <span>Calm</span>
        <span>Neutral</span>
        <span>Stressed</span>
        <span>Overwhelmed</span>
      </div>
    </div>
  );
}