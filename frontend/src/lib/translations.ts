import { Translations, Language } from './utils';

// Function to get the current language
export function getLanguage(): Language {
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
    return savedLanguage;
  }
  return navigator.language.startsWith('de') ? 'de' : 'en';
}

export const translations: Translations = {
  // Navigation
  "entry": {
    en: "Entry",
    de: "Eintrag"
  },
  "history": {
    en: "History",
    de: "Verlauf"
  },
  "settings": {
    en: "Settings",
    de: "Einstellungen"
  },

  // Entry Page
  "how_are_you_today": {
    en: "How are you today?",
    de: "Wie geht es dir heute?"
  },
  "reset": {
    en: "Reset",
    de: "Zurücksetzen"
  },
  "save_entry": {
    en: "Save Entry",
    de: "Eintrag speichern"
  },
  "saving": {
    en: "Saving...",
    de: "Speichern..."
  },

  // Mood Picker
  "how_are_you_feeling": {
    en: "How are you feeling?",
    de: "Wie fühlst du dich?"
  },
  "very_bad": {
    en: "Very Bad",
    de: "Sehr schlecht"
  },
  "bad": {
    en: "Bad",
    de: "Schlecht"
  },
  "neutral": {
    en: "Neutral",
    de: "Neutral"
  },
  "good": {
    en: "Good",
    de: "Gut"
  },
  "very_good": {
    en: "Very Good",
    de: "Sehr gut"
  },

  // Sleep Tracker
  "sleep_quality": {
    en: "Sleep Quality",
    de: "Schlafqualität"
  },
  "poor": {
    en: "Poor",
    de: "Schlecht"
  },
  "excellent": {
    en: "Excellent",
    de: "Ausgezeichnet"
  },
  "restless": {
    en: "Restless",
    de: "Unruhig"
  },
  "interrupted": {
    en: "Interrupted",
    de: "Unterbrochen"
  },
  "average": {
    en: "Average",
    de: "Durchschnitt"
  },
  "refreshed": {
    en: "Refreshed",
    de: "Erfrischt"
  },

  // Stress Tracker
  "stress_level": {
    en: "Stress Level",
    de: "Stresslevel"
  },
  "low": {
    en: "Low",
    de: "Niedrig"
  },
  "high": {
    en: "High",
    de: "Hoch"
  },
  "relaxed": {
    en: "Relaxed",
    de: "Entspannt"
  },
  "calm": {
    en: "Calm",
    de: "Ruhig"
  },
  "stressed": {
    en: "Stressed",
    de: "Gestresst"
  },
  "overwhelmed": {
    en: "Overwhelmed",
    de: "Überfordert"
  },

  // Energy Tracker
  "energy_level": {
    en: "Energy Level",
    de: "Energielevel"
  },
  "exhausted": {
    en: "Exhausted",
    de: "Erschöpft"
  },
  "tired": {
    en: "Tired",
    de: "Müde"
  },
  "energetic": {
    en: "Energetic",
    de: "Energiegeladen"
  },
  "very_high": {
    en: "Very High",
    de: "Sehr hoch"
  },

  // Medications
  "medications": {
    en: "Medications",
    de: "Medikamente"
  },
  "no_medications": {
    en: "No medications added. Track your medications here.",
    de: "Keine Medikamente hinzugefügt. Verfolge deine Medikamente hier."
  },
  "medication_name": {
    en: "Medication name",
    de: "Medikamentenname"
  },
  "dosage": {
    en: "Dosage",
    de: "Dosierung"
  },
  "add": {
    en: "Add",
    de: "Hinzufügen"
  },

  // Meals
  "meals": {
    en: "Meals",
    de: "Mahlzeiten"
  },
  "no_meals": {
    en: "No meals recorded today. Add your first one!",
    de: "Heute keine Mahlzeiten erfasst. Füge deine erste hinzu!"
  },
  "what_did_you_eat": {
    en: "What did you eat?",
    de: "Was hast du gegessen?"
  },
  "breakfast": {
    en: "Breakfast",
    de: "Frühstück"
  },
  "lunch": {
    en: "Lunch",
    de: "Mittagessen"
  },
  "dinner": {
    en: "Dinner",
    de: "Abendessen"
  },
  "snack": {
    en: "Snack",
    de: "Snack"
  },
  "rating": {
    en: "Rating",
    de: "Bewertung"
  },
  "add_meal": {
    en: "Add Meal",
    de: "Mahlzeit hinzufügen"
  },

  // Custom Metrics
  "custom_metrics": {
    en: "Custom Metrics",
    de: "Benutzerdefinierte Messwerte"
  },
  "no_custom_metrics": {
    en: "No custom metrics added yet. Add your first one!",
    de: "Noch keine benutzerdefinierten Messwerte hinzugefügt. Füge deinen ersten hinzu!"
  },
  "add_metric": {
    en: "Add Metric",
    de: "Messwert hinzufügen"
  },
  "metric_name": {
    en: "Metric name (e.g., Steps, Water intake)",
    de: "Messwertname (z.B. Schritte, Wasseraufnahme)"
  },
  "metric_value": {
    en: "Value (e.g., 10000, true, good)",
    de: "Wert (z.B. 10000, wahr, gut)"
  },
  "unit": {
    en: "Unit (optional)",
    de: "Einheit (optional)"
  },
  "cancel": {
    en: "Cancel",
    de: "Abbrechen"
  },

  // Notes
  "notes": {
    en: "Notes",
    de: "Notizen"
  },
  "notes_placeholder": {
    en: "How are you feeling today? Any notable events?",
    de: "Wie fühlst du dich heute? Irgendwelche bemerkenswerten Ereignisse?"
  },

  // History Page
  "your_history": {
    en: "Your History",
    de: "Dein Verlauf"
  },
  "export_csv": {
    en: "Export CSV",
    de: "CSV exportieren"
  },
  "time_range": {
    en: "Time Range",
    de: "Zeitraum"
  },
  "week": {
    en: "Week",
    de: "Woche"
  },
  "month": {
    en: "Month",
    de: "Monat"
  },
  "3_months": {
    en: "3 Months",
    de: "3 Monate"
  },
  "year": {
    en: "Year",
    de: "Jahr"
  },
  "loading_data": {
    en: "Loading data...",
    de: "Daten werden geladen..."
  },
  "no_entries_found": {
    en: "No entries found in this time range.",
    de: "Keine Einträge in diesem Zeitraum gefunden."
  },
  "mood_trends": {
    en: "Mood Trends",
    de: "Stimmungstrends"
  },
  "metrics_comparison": {
    en: "Metrics Comparison",
    de: "Messwertvergleich"
  },
  "your_entries": {
    en: "Your Entries",
    de: "Deine Einträge"
  },
  "close": {
    en: "Close",
    de: "Schließen"
  },
  "mood": {
    en: "Mood",
    de: "Stimmung"
  },
  "sleep": {
    en: "Sleep",
    de: "Schlaf"
  },
  "stress": {
    en: "Stress",
    de: "Stress"
  },
  "energy": {
    en: "Energy",
    de: "Energie"
  },

  // Settings Page
  "language": {
    en: "Language",
    de: "Sprache"
  },
  "theme": {
    en: "Theme",
    de: "Design"
  },
  "light": {
    en: "Light",
    de: "Hell"
  },
  "dark": {
    en: "Dark", 
    de: "Dunkel"
  },
  "system": {
    en: "System",
    de: "System"
  },
  "data_storage": {
    en: "Data Storage",
    de: "Datenspeicherung"
  },
  "offline_only_mode": {
    en: "Offline-only mode",
    de: "Nur-Offline-Modus"
  },
  "data_stays_local": {
    en: "Your data stays on your device only.",
    de: "Deine Daten bleiben nur auf deinem Gerät."
  },
  "cloud_backup_notice": {
    en: "Enable cloud backup when available (not yet implemented).",
    de: "Aktiviere Cloud-Backup, wenn verfügbar (noch nicht implementiert)."
  },
  "metrics_to_display": {
    en: "Metrics to Display",
    de: "Anzuzeigende Messwerte"
  },
  "data_management": {
    en: "Data Management",
    de: "Datenverwaltung"
  },
  "export_all_data": {
    en: "Export All Data",
    de: "Alle Daten exportieren"
  },
  "delete_all_data": {
    en: "Delete All Data",
    de: "Alle Daten löschen"
  },
  "data_management_notice": {
    en: "Export creates a backup of all your entries. Delete permanently removes all data.",
    de: "Export erstellt ein Backup aller deiner Einträge. Löschen entfernt alle Daten dauerhaft."
  },
  "save_settings": {
    en: "Save Settings",
    de: "Einstellungen speichern"
  },
  
  // Common
  "ok": {
    en: "OK",
    de: "OK"
  },
  "loading": {
    en: "Loading...",
    de: "Wird geladen..."
  },
  "error_loading_settings": {
    en: "Error loading settings",
    de: "Fehler beim Laden der Einstellungen"
  },
  "confirm_delete": {
    en: "Confirm Deletion",
    de: "Löschvorgang bestätigen"
  },
  "delete_confirm_text": {
    en: "Are you sure you want to delete all your mood entries? This action cannot be undone.",
    de: "Bist du sicher, dass du alle deine Stimmungseinträge löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden."
  },
  "delete": {
    en: "Delete",
    de: "Löschen"
  },
  "data_deleted": {
    en: "All data has been deleted",
    de: "Alle Daten wurden gelöscht"
  },
  
  // Export related
  "date": {
    en: "Date",
    de: "Datum"
  },
  "not_available": {
    en: "N/A",
    de: "N/V"
  },
  "tracker": {
    en: "tracker",
    de: "tracker"
  },
  "export": {
    en: "export",
    de: "export"
  },
  "taken": {
    en: "✓ Taken",
    de: "✓ Eingenommen"
  },
  "not_taken": {
    en: "✗ Not taken",
    de: "✗ Nicht eingenommen" 
  },
  "stars": {
    en: "stars",
    de: "Sterne"
  }
};