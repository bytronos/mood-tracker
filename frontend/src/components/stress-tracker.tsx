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
    <div className="w-full py-4">
      <h2 className="text-lg font-medium mb-3">Stress Level</h2>
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
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>Relaxed</span>
        <span>Calm</span>
        <span>Neutral</span>
        <span>Stressed</span>
        <span>Overwhelmed</span>
      </div>
    </div>
  );
}