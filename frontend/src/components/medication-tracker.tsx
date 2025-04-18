import React, { useState } from 'react';
import { Medication } from '../types';
import { Button } from './ui/button';
import { useLanguage } from '../hooks/useLanguage';

interface MedicationTrackerProps {
  medications: Medication[];
  onChange: (medications: Medication[]) => void;
}

export function MedicationTracker({ medications, onChange }: MedicationTrackerProps) {
  const { t } = useLanguage();
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');

  const addMedication = () => {
    if (newMedName.trim() === '') return;
    
    const newMed: Medication = {
      name: newMedName,
      dosage: newMedDosage,
      taken: false,
      time: Date.now()
    };
    
    onChange([...medications, newMed]);
    setNewMedName('');
    setNewMedDosage('');
  };

  const toggleMedication = (index: number) => {
    const updatedMeds = [...medications];
    updatedMeds[index] = {
      ...updatedMeds[index],
      taken: !updatedMeds[index].taken,
      time: updatedMeds[index].taken ? undefined : Date.now()
    };
    onChange(updatedMeds);
  };

  const removeMedication = (index: number) => {
    const updatedMeds = medications.filter((_, i) => i !== index);
    onChange(updatedMeds);
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('medications')}</h2>
      
      <div className="space-y-3 mb-5">
        {medications.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center py-2">
            {t('no_medications')}
          </p>
        )}
        
        {medications.map((med, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-center">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    id={`med-${index}`}
                    checked={med.taken}
                    onChange={() => toggleMedication(index)}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-indigo-600 dark:focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label 
                    htmlFor={`med-${index}`} 
                    className={`font-medium ${med.taken ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"}`}
                  >
                    {med.name}
                  </label>
                  {med.dosage && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{med.dosage}</p>
                  )}
                </div>
              </div>
            </div>
            <button 
              onClick={() => removeMedication(index)}
              className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1"
              aria-label="Remove medication"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newMedName}
            onChange={(e) => setNewMedName(e.target.value)}
            placeholder={t('medication_name')}
            className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={newMedDosage}
              onChange={(e) => setNewMedDosage(e.target.value)}
              placeholder={t('dosage')}
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
            <Button onClick={addMedication} variant="primary">
              {t('add')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}