import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { useDatabase } from '../hooks/useDatabase';
import { UserSettings } from '../types';
import { useTheme } from '../components/ui/theme-provider';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../lib/utils';

export function SettingsPage() {
  const { getUserSettings, updateUserSettings } = useDatabase();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
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

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };
  
  if (loading) {
    return <div className="text-center py-8">{t('loading')}</div>;
  }
  
  if (!settings) {
    return <div className="text-center py-8">{t('error_loading_settings')}</div>;
  }
  
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t('settings')}</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-3">{t('language')}</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => handleLanguageChange('en')}
              variant={language === 'en' ? 'primary' : 'outline'}
              size="sm"
            >
              English
            </Button>
            <Button
              onClick={() => handleLanguageChange('de')}
              variant={language === 'de' ? 'primary' : 'outline'}
              size="sm"
            >
              Deutsch
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">{t('theme')}</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => setSettings({ ...settings, theme: 'light' })}
              variant={settings.theme === 'light' ? 'primary' : 'outline'}
              size="sm"
            >
              {t('light')}
            </Button>
            <Button
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
              variant={settings.theme === 'dark' ? 'primary' : 'outline'}
              size="sm"
            >
              {t('dark')}
            </Button>
            <Button
              onClick={() => setSettings({ ...settings, theme: 'system' })}
              variant={settings.theme === 'system' ? 'primary' : 'outline'}
              size="sm"
            >
              {t('system')}
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">{t('data_storage')}</h2>
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={settings.offlineOnly}
                  onChange={() => setSettings({ ...settings, offlineOnly: !settings.offlineOnly })}
                />
                <div className={`block w-10 h-6 rounded-full ${settings.offlineOnly ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${settings.offlineOnly ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium">{t('offline_only_mode')}</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {settings.offlineOnly 
              ? t('data_stays_local')
              : t('cloud_backup_notice')}
          </p>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">{t('metrics_to_display')}</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showSleep}
                onChange={() => handleToggleMetric('showSleep')}
                className="rounded border-gray-300 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('sleep_quality')}</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showStress}
                onChange={() => handleToggleMetric('showStress')}
                className="rounded border-gray-300 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('stress_level')}</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showEnergy}
                onChange={() => handleToggleMetric('showEnergy')}
                className="rounded border-gray-300 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('energy_level')}</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showMedications}
                onChange={() => handleToggleMetric('showMedications')}
                className="rounded border-gray-300 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('medications')}</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.metrics.showMeals}
                onChange={() => handleToggleMetric('showMeals')}
                className="rounded border-gray-300 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('meals')}</span>
            </label>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">{t('data_management')}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="text-sm">
              {t('export_all_data')}
            </Button>
            <Button variant="outline" className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
              {t('delete_all_data')}
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t('data_management_notice')}
          </p>
        </div>
      </div>
      
      <Button
        onClick={handleSaveSettings}
        className="w-full mt-8"
        variant="primary"
        disabled={saving}
      >
        {saving ? t('saving') : t('save_settings')}
      </Button>
    </div>
  );
}