import React from 'react';
import { SleepQuality } from '../types';
import { Slider } from './ui/slider';
import { useLanguage } from '../hooks/useLanguage';

interface SleepTrackerProps {
  value: SleepQuality;
  onChange: (value: SleepQuality) => void;
}

export function SleepTracker({ value, onChange }: SleepTrackerProps) {
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) as SleepQuality);
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('sleep_quality')}</h2>
      <Slider
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={handleChange}
        minLabel={t('poor')}
        maxLabel={t('excellent')}
        className="w-full"
      />
      <div className="grid grid-cols-5 mt-2 text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 px-1 text-center">
        <span>{t('restless')}</span>
        <span>{t('interrupted')}</span>
        <span>{t('average')}</span>
        <span>{t('good')}</span>
        <span>{t('refreshed')}</span>
      </div>
    </div>
  );
}