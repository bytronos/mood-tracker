import React from 'react';
import { StressLevel } from '../types';
import { Slider } from './ui/slider';
import { useLanguage } from '../hooks/useLanguage';

interface StressTrackerProps {
  value: StressLevel;
  onChange: (value: StressLevel) => void;
}

export function StressTracker({ value, onChange }: StressTrackerProps) {
  const { t } = useLanguage();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) as StressLevel);
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('stress_level')}</h2>
      <Slider
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={handleChange}
        minLabel={t('low')}
        maxLabel={t('high')}
        className="w-full"
      />
      <div className="grid grid-cols-5 mt-2 text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 px-1 text-center">
        <span>{t('relaxed')}</span>
        <span>{t('calm')}</span>
        <span>{t('neutral')}</span>
        <span>{t('stressed')}</span>
        <span>{t('overwhelmed')}</span>
      </div>
    </div>
  );
}