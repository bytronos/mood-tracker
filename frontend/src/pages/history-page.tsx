import { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { useLanguage } from '../hooks/useLanguage';
import { MoodEntry, DateRange } from '../types';
import { formatDate, timeAgo, downloadAsCSV } from '../lib/utils';
import { Button } from '../components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export function HistoryPage() {
  const { getMoodEntriesByDateRange, getUserSettings } = useDatabase();
  const [userMetrics, setUserMetrics] = useState({
    showSleep: true,
    showStress: true,
    showEnergy: true,
    showMedications: true,
    showMeals: true
  });
  const { t } = useLanguage();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date()
  });
  
  // Load user settings
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

  // Fetch entries based on date range
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const data = await getMoodEntriesByDateRange(dateRange);
        setEntries(data.sort((a, b) => b.timestamp - a.timestamp));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching entries:', error);
        setLoading(false);
      }
    };
    
    fetchEntries();
  }, [getMoodEntriesByDateRange, dateRange]);
  
  const handleExportCSV = () => {
    if (entries.length === 0) return;
    
    // Transform entries for export with translated column headers
    const exportData = entries.map(entry => ({
      [t('date')]: formatDate(new Date(entry.timestamp)),
      [t('mood')]: entry.mood,
      [t('sleep')]: entry.sleep || t('not_available'),
      [t('stress')]: entry.stress || t('not_available'),
      [t('energy')]: entry.energy || t('not_available'),
      [t('notes')]: entry.note || ''
    }));
    
    // Create filename with localized text
    const filename = `${t('mood')}-${t('tracker')}-${t('export')}-${new Date().toISOString().slice(0, 10)}.csv`;
    downloadAsCSV(exportData, filename);
  };
  
  const handleDateRangeChange = (days: number) => {
    setDateRange({
      startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
  };
  
  // Prepare chart data
  const chartData = entries.map(entry => ({
    date: formatDate(new Date(entry.timestamp)),
    mood: entry.mood,
    sleep: entry.sleep,
    stress: entry.stress,
    energy: entry.energy
  })).reverse(); // Chronological order for charts
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('your_history')}</h1>
        <Button onClick={handleExportCSV} variant="outline" disabled={entries.length === 0}>
          {t('export_csv')}
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">{t('time_range')}</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => handleDateRangeChange(7)} 
            variant={dateRange.startDate.getTime() === Date.now() - 7 * 24 * 60 * 60 * 1000 ? 'primary' : 'outline'}
            size="sm"
          >
            {t('week')}
          </Button>
          <Button 
            onClick={() => handleDateRangeChange(30)} 
            variant={dateRange.startDate.getTime() === Date.now() - 30 * 24 * 60 * 60 * 1000 ? 'primary' : 'outline'}
            size="sm"
          >
            {t('month')}
          </Button>
          <Button 
            onClick={() => handleDateRangeChange(90)} 
            variant={dateRange.startDate.getTime() === Date.now() - 90 * 24 * 60 * 60 * 1000 ? 'primary' : 'outline'}
            size="sm"
          >
            {t('3_months')}
          </Button>
          <Button 
            onClick={() => handleDateRangeChange(365)} 
            variant={dateRange.startDate.getTime() === Date.now() - 365 * 24 * 60 * 60 * 1000 ? 'primary' : 'outline'}
            size="sm"
          >
            {t('year')}
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">{t('loading_data')}</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-8">{t('no_entries_found')}</div>
      ) : (
        <div className="space-y-8">
          {/* Mood Trends Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">{t('mood_trends')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' }}
                  axisLine={{ stroke: 'rgba(107, 114, 128, 0.2)' }}
                />
                <YAxis 
                  domain={[1, 5]} 
                  tick={{ fill: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' }}
                  axisLine={{ stroke: 'rgba(107, 114, 128, 0.2)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
                    border: document.documentElement.classList.contains('dark') ? '1px solid #4b5563' : '1px solid #e5e7eb'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#4f46e5" 
                  name={t('mood')}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Multiple Metrics Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">{t('metrics_comparison')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' }}
                  axisLine={{ stroke: 'rgba(107, 114, 128, 0.2)' }}
                />
                <YAxis 
                  domain={[1, 5]} 
                  tick={{ fill: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' }}
                  axisLine={{ stroke: 'rgba(107, 114, 128, 0.2)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
                    border: document.documentElement.classList.contains('dark') ? '1px solid #4b5563' : '1px solid #e5e7eb'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#4f46e5" 
                  name={t('mood')}
                />
                {userMetrics.showSleep && (
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#06b6d4" 
                    name={t('sleep')}
                  />
                )}
                {userMetrics.showStress && (
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#ef4444" 
                    name={t('stress')}
                  />
                )}
                {userMetrics.showEnergy && (
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#eab308" 
                    name={t('energy')}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Entry List */}
          <div>
            <h2 className="text-lg font-medium mb-4">{t('your_entries')}</h2>
            <div className="space-y-3">
              {entries.map(entry => (
                <div 
                  key={entry.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {entry.mood === 1 && '😞'}
                          {entry.mood === 2 && '😔'}
                          {entry.mood === 3 && '😐'}
                          {entry.mood === 4 && '🙂'}
                          {entry.mood === 5 && '😄'}
                        </span>
                        <h3 className="font-medium">
                          {formatDate(new Date(entry.timestamp))}
                        </h3>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                          {entry.note}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {timeAgo(new Date(entry.timestamp))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Entry Detail Modal (simple implementation) */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {formatDate(new Date(selectedEntry.timestamp))}
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg mb-1">{t('mood')}</h3>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(level => (
                    <span 
                      key={level}
                      className={`text-2xl ${level === selectedEntry.mood ? 'opacity-100' : 'opacity-30'}`}
                    >
                      {level === 1 && '😞'}
                      {level === 2 && '😔'}
                      {level === 3 && '😐'}
                      {level === 4 && '🙂'}
                      {level === 5 && '😄'}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedEntry.sleep && userMetrics.showSleep && (
                <div>
                  <h3 className="text-lg mb-1">{t('sleep_quality')}</h3>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-colors" 
                      style={{ width: `${(selectedEntry.sleep / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {selectedEntry.stress && userMetrics.showStress && (
                <div>
                  <h3 className="text-lg mb-1">{t('stress_level')}</h3>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-red-500 dark:bg-red-400 rounded-full transition-colors" 
                      style={{ width: `${(selectedEntry.stress / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {selectedEntry.energy && userMetrics.showEnergy && (
                <div>
                  <h3 className="text-lg mb-1">{t('energy_level')}</h3>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-yellow-500 dark:bg-yellow-400 rounded-full transition-colors" 
                      style={{ width: `${(selectedEntry.energy / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {selectedEntry.medications && selectedEntry.medications.length > 0 && userMetrics.showMedications && (
                <div>
                  <h3 className="text-lg mb-1">{t('medications')}</h3>
                  <ul className="pl-5 list-disc">
                    {selectedEntry.medications.map((med, i) => (
                      <li key={i} className={med.taken ? '' : 'text-gray-500 dark:text-gray-400'}>
                        {med.name} {med.dosage && `(${med.dosage})`} 
                        {med.taken ? ` ${t('taken')}` : ` ${t('not_taken')}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedEntry.meals && selectedEntry.meals.length > 0 && userMetrics.showMeals && (
                <div>
                  <h3 className="text-lg mb-1">{t('meals')}</h3>
                  <ul className="pl-5 list-disc">
                    {selectedEntry.meals.map((meal, i) => (
                      <li key={i}>
                        {meal.name} ({t(meal.category)})
                        {meal.rating && (
                          <span className="ml-2 text-yellow-600 dark:text-yellow-500 transition-colors" title={`${meal.rating} ${t('stars')}`}>
                            {Array(meal.rating).fill('★').join('')}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedEntry.customMetrics && selectedEntry.customMetrics.length > 0 && (
                <div>
                  <h3 className="text-lg mb-1">{t('custom_metrics')}</h3>
                  <ul className="pl-5 list-disc">
                    {selectedEntry.customMetrics.map((metric, i) => (
                      <li key={i}>
                        {metric.name}: {metric.value} {metric.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedEntry.note && (
                <div>
                  <h3 className="text-lg mb-1">{t('notes')}</h3>
                  <p className="text-sm whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    {selectedEntry.note}
                  </p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={() => setSelectedEntry(null)}
              className="w-full mt-6"
              variant="primary"
            >
              {t('close')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}