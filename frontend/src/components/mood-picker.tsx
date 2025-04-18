import React, { useState } from 'react';
import { MoodLevel } from '../types';
import { cn } from '../lib/utils';

interface MoodPickerProps {
  value: MoodLevel;
  onChange: (value: MoodLevel) => void;
}

const moods = [
  { level: 1, emoji: '😞', label: 'Very Bad', color: 'bg-red-500' },
  { level: 2, emoji: '😔', label: 'Bad', color: 'bg-orange-500' },
  { level: 3, emoji: '😐', label: 'Neutral', color: 'bg-yellow-500' },
  { level: 4, emoji: '🙂', label: 'Good', color: 'bg-lime-500' },
  { level: 5, emoji: '😄', label: 'Very Good', color: 'bg-green-500' },
];

export function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div className="w-full py-4">
      <h2 className="text-lg font-medium mb-3">How are you feeling?</h2>
      <div className="flex justify-between gap-2">
        {moods.map((mood) => (
          <button
            key={mood.level}
            onClick={() => onChange(mood.level as MoodLevel)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg transition-all",
              value === mood.level
                ? `${mood.color} text-white scale-110`
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs mt-1">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}