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
    <div className="w-full py-4">
      <h2 className="text-lg font-medium mb-3">Sleep Quality</h2>
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
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>Restless</span>
        <span>Interrupted</span>
        <span>Average</span>
        <span>Good</span>
        <span>Refreshed</span>
      </div>
    </div>
  );
}