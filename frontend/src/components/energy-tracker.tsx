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
    <div className="w-full py-4">
      <h2 className="text-lg font-medium mb-3">Energy Level</h2>
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
        <span>Exhausted</span>
        <span>Tired</span>
        <span>Neutral</span>
        <span>Energetic</span>
        <span>Very Energetic</span>
      </div>
    </div>
  );
}