import { useCallback } from 'react';
import { db } from '../lib/db/db';
import { MoodEntry, DateRange } from '../types';

export function useDatabase() {
  const addMoodEntry = useCallback(async (entry: MoodEntry) => {
    return await db.moodEntries.add(entry);
  }, []);

  const updateMoodEntry = useCallback(async (id: number, entry: Partial<MoodEntry>) => {
    return await db.moodEntries.update(id, entry);
  }, []);

  const deleteMoodEntry = useCallback(async (id: number) => {
    return await db.moodEntries.delete(id);
  }, []);

  const getMoodEntries = useCallback(async () => {
    return await db.moodEntries.toArray();
  }, []);

  const getMoodEntriesByDateRange = useCallback(async ({ startDate, endDate }: DateRange) => {
    return await db.getMoodEntriesByDateRange(startDate, endDate);
  }, []);

  const getUserSettings = useCallback(async () => {
    const user = await db.getCurrentUser();
    return user?.settings;
  }, []);

  const updateUserSettings = useCallback(async (settings: any) => {
    const user = await db.getCurrentUser();
    if (user && user.id) {
      return await db.users.update(user.id, { settings });
    }
  }, []);

  return {
    addMoodEntry,
    updateMoodEntry,
    deleteMoodEntry,
    getMoodEntries,
    getMoodEntriesByDateRange,
    getUserSettings,
    updateUserSettings
  };
}