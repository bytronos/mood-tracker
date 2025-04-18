export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type SleepQuality = 1 | 2 | 3 | 4 | 5;
export type StressLevel = 1 | 2 | 3 | 4 | 5;
export type EnergyLevel = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
  id?: number;
  timestamp: number;
  mood: MoodLevel;
  note?: string;
  sleep?: SleepQuality;
  stress?: StressLevel;
  energy?: EnergyLevel;
  medications?: Medication[];
  meals?: Meal[];
  customMetrics?: CustomMetric[];
}

export interface Medication {
  id?: number;
  name: string;
  dosage: string;
  taken: boolean;
  time?: number;
}

export interface Meal {
  id?: number;
  name: string;
  time: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface CustomMetric {
  id?: number;
  name: string;
  value: number | string | boolean;
  unit?: string;
}

export interface User {
  id?: number;
  settings: UserSettings;
}

export interface UserSettings {
  offlineOnly: boolean;
  theme: 'light' | 'dark' | 'system';
  reminderTime?: string;
  metrics: {
    showSleep: boolean;
    showStress: boolean;
    showEnergy: boolean;
    showMedications: boolean;
    showMeals: boolean;
  };
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}