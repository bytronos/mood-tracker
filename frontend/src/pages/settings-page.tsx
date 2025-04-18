import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { useDatabase } from '../hooks/useDatabase';
import { UserSettings } from '../types';
import { useTheme } from '../components/ui/theme-provider';

export function SettingsPage() {
  const { getUserSettings, updateUserSettings } = useDatabase();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userSettings = await getUserSettings();
        setSettings(userSettings || {
          offlineOnly: true,
          theme: 'system',
          metrics: {
            showSleep: true,
            showStress: true,
            showEnergy: true,
            showMedications: true,
            showMeals: true
          }
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, [getUserSettings]);
  
  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      await updateUserSettings(settings);
      setTheme(settings.theme);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };
  
  const handleToggleMetric = (metricName: keyof UserSettings['metrics']) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      metrics: {
        ...settings.metrics,
        [metricName]: !settings.metrics[metricName]
      }
    });
  };
  
  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }
  
  if (!settings) {
    return <div className="text-center py-8">Error loading settings</div>;
  }
  
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-3">Theme</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => setSettings({ ...settings, theme: 'light' })}
              variant={settings.theme === 'light' ? 'default' : 'outline'}
              size="sm"
            >
              Light
            </Button>
            <Button
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
              variant={settings.theme === 'dark' ? 'default' : 'outline'}
              size="sm"
            >
              Dark
            </Button>
            <Button
              onClick={() => setSettings({ ...settings, theme: 'system' })}
              variant={settings.theme === 'system' ? 'default' : 'outline'}
              size="sm"
            >
              System
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">Data Storage</h2>
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={settings.offlineOnly}
                  onChange={() => setSettings({ ...settings, offlineOnly: !settings.offlineOnly })}
                />
                <div className={`block w-10 h-6 rounded-full ${settings.offlineOnly ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${settings.offlineOnly ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium">Offline-only mode</span>
            </label>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {settings.offlineOnly 
              ? "Your data stays on your device only."
              : "Enable cloud backup when available (not yet implemented)."}
          </p>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">Metrics to Display</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showSleep}
                onChange={() => handleToggleMetric('showSleep')}
                className="rounded border-muted h-4 w-4"
              />
              <span>Sleep Quality</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showStress}
                onChange={() => handleToggleMetric('showStress')}
                className="rounded border-muted h-4 w-4"
              />
              <span>Stress Level</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showEnergy}
                onChange={() => handleToggleMetric('showEnergy')}
                className="rounded border-muted h-4 w-4"
              />
              <span>Energy Level</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showMedications}
                onChange={() => handleToggleMetric('showMedications')}
                className="rounded border-muted h-4 w-4"
              />
              <span>Medications</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showMeals}
                onChange={() => handleToggleMetric('showMeals')}
                className="rounded border-muted h-4 w-4"
              />
              <span>Meals</span>
            </label>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">Data Management</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="text-sm">
              Export All Data
            </Button>
            <Button variant="outline" className="text-sm text-destructive hover:text-destructive">
              Delete All Data
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Export creates a backup of all your entries. Delete permanently removes all data.
          </p>
        </div>
      </div>
      
      <Button
        onClick={handleSaveSettings}
        className="w-full mt-8"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
}