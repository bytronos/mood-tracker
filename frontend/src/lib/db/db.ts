import Dexie, { Table } from 'dexie';
import { MoodEntry, Medication, Meal, CustomMetric, User } from '../../types';

export class WellnessDatabase extends Dexie {
  moodEntries!: Table<MoodEntry, number>;
  medications!: Table<Medication, number>;
  meals!: Table<Meal, number>;
  customMetrics!: Table<CustomMetric, number>;
  users!: Table<User, number>;

  constructor() {
    super('wellnessTracker');
    
    this.version(1).stores({
      moodEntries: '++id, timestamp',
      medications: '++id, name',
      meals: '++id, time, category',
      customMetrics: '++id, name',
      users: '++id'
    });
  }

  async getCurrentUser() {
    const user = await this.users.toArray();
    if (user.length === 0) {
      const defaultSettings = {
        offlineOnly: true,
        theme: 'system',
        metrics: {
          showSleep: true,
          showStress: true,
          showEnergy: true,
          showMedications: true,
          showMeals: true
        }
      };
      
      const userId = await this.users.add({ settings: defaultSettings });
      return this.users.get(userId);
    }
    
    return user[0];
  }

  async getMoodEntriesByDateRange(startDate: Date, endDate: Date) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    
    return this.moodEntries
      .where('timestamp')
      .between(startTimestamp, endTimestamp, true, true)
      .toArray();
  }

  async getMedicationsByDateRange(startDate: Date, endDate: Date) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    
    const entries = await this.moodEntries
      .where('timestamp')
      .between(startTimestamp, endTimestamp, true, true)
      .toArray();
    
    return entries.flatMap(entry => entry.medications || []);
  }

  async getMealsByDateRange(startDate: Date, endDate: Date) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    
    const entries = await this.moodEntries
      .where('timestamp')
      .between(startTimestamp, endTimestamp, true, true)
      .toArray();
    
    return entries.flatMap(entry => entry.meals || []);
  }
}

export const db = new WellnessDatabase();