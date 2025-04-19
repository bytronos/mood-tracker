import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { useDatabase } from '../hooks/useDatabase';
import { UserSettings } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../lib/utils';

export function SettingsPage() {
  const { getUserSettings, updateUserSettings, exportAllData, deleteAllData } = useDatabase();
  const { language, setLanguage, t } = useLanguage();
  
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userSettings = await getUserSettings();
        setSettings(userSettings || {
          offlineOnly: true,
          theme: 'dark', // always dark theme
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
      // Always ensure theme is set to dark
      const settingsWithDarkTheme = {
        ...settings, 
        theme: 'dark'
      };
      await updateUserSettings(settingsWithDarkTheme);
      showNotification('Settings saved successfully', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('Failed to save settings', 'error');
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
  
  const handleExportData = async () => {
    try {
      // Show loading notification
      showNotification('Preparing data export...', 'success');
      
      // Get all data from the database
      console.log('Calling exportAllData...');
      const data = await exportAllData();
      console.log('Data received:', data);
      
      // Convert data to a JSON string with pretty formatting
      const dataStr = JSON.stringify(data, null, 2);
      
      // Create a blob from the JSON string
      const blob = new Blob([dataStr], { type: 'application/json' });
      
      // Create a download URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary download link
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = `mood-tracker-export-${new Date().toISOString().slice(0, 10)}.json`;
      
      // Add link to the document, click it, then remove it
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showNotification('Data exported successfully', 'success');
      }, 100);
      
    } catch (error) {
      console.error('Error exporting data:', error);
      showNotification('Failed to export data: ' + (error instanceof Error ? error.message : 'Unknown error'), 'error');
    }
  };
  
  const handleDeleteData = async () => {
    try {
      console.log('Attempting to delete all data...');
      showNotification('Deleting data...', 'success');
      
      // Call database method to delete data
      const result = await deleteAllData();
      console.log('Delete operation result:', result);
      
      // Close the confirmation dialog
      setDeleteConfirmOpen(false);
      
      // Show success notification
      showNotification(t('data_deleted'), 'success');
      
    } catch (error) {
      console.error('Error deleting data:', error);
      showNotification('Failed to delete data: ' + (error instanceof Error ? error.message : 'Unknown error'), 'error');
    }
  };
  
  const showNotification = (message: string, type: 'success' | 'error') => {
    // Clear any existing notification first
    setNotification(null);
    
    // Set the new notification after a brief delay to ensure UI updates
    setTimeout(() => {
      setNotification({ message, type });
      // Clear notification after display time
      setTimeout(() => setNotification(null), 3000);
    }, 100);
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

        {/* Theme selection removed - app is dark mode only */}
        
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
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={handleExportData}
            >
              {t('export_all_data')}
            </Button>
            <Button 
              variant="outline" 
              className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              onClick={() => setDeleteConfirmOpen(true)}
            >
              {t('delete_all_data')}
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t('data_management_notice')}
          </p>
          
          {/* Delete confirmation dialog */}
          {deleteConfirmOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">{t('confirm_delete')}</h3>
                <p className="mb-6">{t('delete_confirm_text')}</p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setDeleteConfirmOpen(false)}
                  >
                    {t('cancel')}
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={handleDeleteData}
                  >
                    {t('delete')}
                  </Button>
                </div>
              </div>
            </div>
          )}
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
      
      {/* Notification Toast */}
      {notification && (
        <div 
          className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } animate-fade-in-out z-50`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}