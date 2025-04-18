import React, { useState } from 'react';
import { Medication } from '../types';
import { Button } from './ui/button';

interface MedicationTrackerProps {
  medications: Medication[];
  onChange: (medications: Medication[]) => void;
}

export function MedicationTracker({ medications, onChange }: MedicationTrackerProps) {
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
    <div className="w-full py-4">
      <h2 className="text-lg font-medium mb-3">Medications</h2>
      
      <div className="space-y-2 mb-4">
        {medications.map((med, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-secondary rounded-lg"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={med.taken}
                onChange={() => toggleMedication(index)}
                className="mr-3 h-5 w-5"
              />
              <div>
                <p className={med.taken ? "line-through text-muted-foreground" : ""}>
                  {med.name}
                </p>
                {med.dosage && (
                  <p className="text-xs text-muted-foreground">{med.dosage}</p>
                )}
              </div>
            </div>
            <button 
              onClick={() => removeMedication(index)}
              className="text-muted-foreground hover:text-destructive"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMedName}
          onChange={(e) => setNewMedName(e.target.value)}
          placeholder="Medication name"
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <input
          type="text"
          value={newMedDosage}
          onChange={(e) => setNewMedDosage(e.target.value)}
          placeholder="Dosage"
          className="flex h-9 w-1/3 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <Button onClick={addMedication} variant="outline">
          Add
        </Button>
      </div>
    </div>
  );
}