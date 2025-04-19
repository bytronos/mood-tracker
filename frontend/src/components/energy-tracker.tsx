import React from 'react';
import { EnergyLevel } from '../types';
import { Slider } from './ui/slider';
import { useLanguage } from '../hooks/useLanguage';

interface EnergyTrackerProps {
  value: EnergyLevel;
  onChange: (value: EnergyLevel) => void;
}

export function EnergyTracker({ value, onChange }: EnergyTrackerProps) {
  const { t } = useLanguage();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) as EnergyLevel);
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('energy_level')}</h2>
      <Slider
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={handleChange}
        minLabel={t('low')}
        maxLabel={t('high')}
        fillColor="#f59e0b"    /* amber-500 */
        emptyColor={document.documentElement.classList.contains('dark') ? "#92400e" : "#fde68a"}  /* dark: amber-800, light: amber-200 */
        className="w-full"
      />
      <div className="grid grid-cols-5 mt-2 text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 px-1 text-center">
        <span>{t('exhausted')}</span>
        <span>{t('tired')}</span>
        <span>{t('neutral')}</span>
        <span>{t('energetic')}</span>
        <span>{t('very_high')}</span>
      </div>
    </div>
  );
}