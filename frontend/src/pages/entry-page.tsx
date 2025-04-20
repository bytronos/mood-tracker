import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { MoodPicker } from '../components/mood-picker';
import { SleepTracker } from '../components/sleep-tracker';
import { StressTracker } from '../components/stress-tracker';
import { EnergyTracker } from '../components/energy-tracker';
import { MedicationTracker } from '../components/medication-tracker';
import { MealTracker } from '../components/meal-tracker';
import { CustomMetricTracker } from '../components/custom-metric';
import { NoteEditor } from '../components/note-editor';
import { useDatabase } from '../hooks/useDatabase';
import { useLanguage } from '../hooks/useLanguage';
import { MoodEntry, MoodLevel, SleepQuality, StressLevel, EnergyLevel, Medication, Meal, CustomMetric } from '../types';

export function EntryPage() {
  const { addMoodEntry, getUserSettings } = useDatabase();
  const { t } = useLanguage();
  const [userMetrics, setUserMetrics] = useState({
    showSleep: true,
    showStress: true,
    showEnergy: true,
    showMedications: true,
    showMeals: true
  });
  
  const [mood, setMood] = useState<MoodLevel>(3);
  const [sleep, setSleep] = useState<SleepQuality>(3);
  const [stress, setStress] = useState<StressLevel>(3);
  const [energy, setEnergy] = useState<EnergyLevel>(3);
  const [note, setNote] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load user settings on component mount
  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        const settings = await getUserSettings();
        if (settings && settings.metrics) {
          setUserMetrics(settings.metrics);
        }
      } catch (error) {
        console.error("Error loading user settings:", error);
      }
    };
    
    loadUserSettings();
  }, [getUserSettings]);
  
  const handleSubmit = async () => {
    setIsSaving(true);
    
    const entry: MoodEntry = {
      timestamp: Date.now(),
      mood,
      sleep,
      stress,
      energy,
      note: note.trim() || undefined,
      medications: medications.length > 0 ? medications : undefined,
      meals: meals.length > 0 ? meals : undefined,
      customMetrics: customMetrics.length > 0 ? customMetrics : undefined
    };
    
    try {
      await addMoodEntry(entry);
      resetForm();
    } catch (error) {
      console.error('Error saving mood entry:', error);
      // Would add error handling/notification here
    } finally {
      setIsSaving(false);
    }
  };
  
  const resetForm = () => {
    setMood(3);
    setSleep(3);
    setStress(3);
    setEnergy(3);
    setNote('');
    setMedications([]);
    setMeals([]);
    setCustomMetrics([]);
  };
  
  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-32">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-400 transition-colors">
        {t('how_are_you_today')}
      </h1>
      
      <div className="space-y-4">
        <MoodPicker value={mood} onChange={setMood} />
        
        {userMetrics.showSleep && (
          <SleepTracker value={sleep} onChange={setSleep} />
        )}
        
        {userMetrics.showStress && (
          <StressTracker value={stress} onChange={setStress} />
        )}
        
        {userMetrics.showEnergy && (
          <EnergyTracker value={energy} onChange={setEnergy} />
        )}
        
        {userMetrics.showMedications && (
          <MedicationTracker 
            medications={medications} 
            onChange={setMedications} 
          />
        )}
        
        {userMetrics.showMeals && (
          <MealTracker 
            meals={meals} 
            onChange={setMeals} 
          />
        )}
        
        <CustomMetricTracker
          metrics={customMetrics}
          onChange={setCustomMetrics}
        />
        
        <NoteEditor value={note} onChange={setNote} />
      </div>
      
      <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 shadow-lg z-40 transition-colors">
        <div className="max-w-md mx-auto flex gap-4">
          <Button
            onClick={resetForm}
            variant="outline"
            className="flex-1 h-12"
          >
            {t('reset')}
          </Button>
          
          <Button
            onClick={handleSubmit}
            variant="primary"
            className="flex-1 h-12 text-base"
            disabled={isSaving}
          >
            {isSaving ? t('saving') : t('save_entry')}
          </Button>
        </div>
      </div>
    </div>
  );
}