import React from 'react';
import { MoodLevel } from '../types';

interface MoodPickerProps {
  value: MoodLevel;
  onChange: (value: MoodLevel) => void;
}

const moods = [
  { level: 1, emoji: '😞', label: 'Very Bad', shortLabel: 'Very Bad', color: 'bg-red-500 hover:bg-red-600' },
  { level: 2, emoji: '😔', label: 'Bad', shortLabel: 'Bad', color: 'bg-orange-500 hover:bg-orange-600' },
  { level: 3, emoji: '😐', label: 'Neutral', shortLabel: 'OK', color: 'bg-yellow-500 hover:bg-yellow-600' },
  { level: 4, emoji: '🙂', label: 'Good', shortLabel: 'Good', color: 'bg-lime-500 hover:bg-lime-600' },
  { level: 5, emoji: '😄', label: 'Very Good', shortLabel: 'Very Good', color: 'bg-green-500 hover:bg-green-600' },
];

export function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">How are you feeling?</h2>
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {moods.map((mood) => {
          const isSelected = value === mood.level;
          const baseClasses = "flex flex-col items-center justify-center p-1 sm:p-3 rounded-lg transition-all duration-200";
          const selectedClasses = isSelected 
            ? `${mood.color} text-white scale-105 sm:scale-110 shadow-md` 
            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200";
          
          return (
            <button
              key={mood.level}
              onClick={() => onChange(mood.level as MoodLevel)}
              className={`${baseClasses} ${selectedClasses}`}
            >
              <span className="text-xl sm:text-3xl mb-1">{mood.emoji}</span>
              {/* Show full label on larger screens */}
              <span className="hidden sm:inline text-xs font-medium">
                {mood.label}
              </span>
              {/* Show short label on small screens */}
              <span className="inline sm:hidden text-[10px] font-medium">
                {mood.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}