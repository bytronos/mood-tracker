import React, { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { MoodEntry, DateRange } from '../types';
import { formatDate, timeAgo, downloadAsCSV } from '../lib/utils';
import { Button } from '../components/ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export function HistoryPage() {
  const { getMoodEntriesByDateRange } = useDatabase();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date()
  });
  
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
    
    // Transform entries for export
    const exportData = entries.map(entry => ({
      Date: formatDate(new Date(entry.timestamp)),
      Mood: entry.mood,
      Sleep: entry.sleep || 'N/A',
      Stress: entry.stress || 'N/A',
      Energy: entry.energy || 'N/A',
      Notes: entry.note || ''
    }));
    
    downloadAsCSV(exportData, `mood-tracker-export-${new Date().toISOString().slice(0, 10)}.csv`);
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
        <h1 className="text-2xl font-bold">Your History</h1>
        <Button onClick={handleExportCSV} variant="outline" disabled={entries.length === 0}>
          Export CSV
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Time Range</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => handleDateRangeChange(7)} 
            variant={dateRange.startDate.getTime() === Date.now() - 7 * 24 * 60 * 60 * 1000 ? 'default' : 'outline'}
            size="sm"
          >
            Week
          </Button>
          <Button 
            onClick={() => handleDateRangeChange(30)} 
            variant={dateRange.startDate.getTime() === Date.now() - 30 * 24 * 60 * 60 * 1000 ? 'default' : 'outline'}
            size="sm"
          >
            Month
          </Button>
          <Button 
            onClick={() => handleDateRangeChange(90)} 
            variant={dateRange.startDate.getTime() === Date.now() - 90 * 24 * 60 * 60 * 1000 ? 'default' : 'outline'}
            size="sm"
          >
            3 Months
          </Button>
          <Button 
            onClick={() => handleDateRangeChange(365)} 
            variant={dateRange.startDate.getTime() === Date.now() - 365 * 24 * 60 * 60 * 1000 ? 'default' : 'outline'}
            size="sm"
          >
            Year
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading data...</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-8">No entries found in this time range.</div>
      ) : (
        <div className="space-y-8">
          {/* Mood Trends Chart */}
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Mood Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#4f46e5" 
                  name="Mood"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Multiple Metrics Chart */}
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Metrics Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#4f46e5" 
                  name="Mood"
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#06b6d4" 
                  name="Sleep"
                />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="#ef4444" 
                  name="Stress"
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#eab308" 
                  name="Energy"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Entry List */}
          <div>
            <h2 className="text-lg font-medium mb-4">Your Entries</h2>
            <div className="space-y-3">
              {entries.map(entry => (
                <div 
                  key={entry.id}
                  className="p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
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
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {entry.note}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
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
          <div className="bg-background p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {formatDate(new Date(selectedEntry.timestamp))}
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg mb-1">Mood</h3>
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
              
              {selectedEntry.sleep && (
                <div>
                  <h3 className="text-lg mb-1">Sleep Quality</h3>
                  <div className="h-2 bg-secondary rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${(selectedEntry.sleep / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {selectedEntry.stress && (
                <div>
                  <h3 className="text-lg mb-1">Stress Level</h3>
                  <div className="h-2 bg-secondary rounded-full">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${(selectedEntry.stress / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {selectedEntry.energy && (
                <div>
                  <h3 className="text-lg mb-1">Energy Level</h3>
                  <div className="h-2 bg-secondary rounded-full">
                    <div 
                      className="h-full bg-yellow-500 rounded-full" 
                      style={{ width: `${(selectedEntry.energy / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {selectedEntry.medications && selectedEntry.medications.length > 0 && (
                <div>
                  <h3 className="text-lg mb-1">Medications</h3>
                  <ul className="pl-5 list-disc">
                    {selectedEntry.medications.map((med, i) => (
                      <li key={i} className={med.taken ? '' : 'text-muted-foreground'}>
                        {med.name} {med.dosage && `(${med.dosage})`} 
                        {med.taken ? ' ✓' : ' ✗'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedEntry.meals && selectedEntry.meals.length > 0 && (
                <div>
                  <h3 className="text-lg mb-1">Meals</h3>
                  <ul className="pl-5 list-disc">
                    {selectedEntry.meals.map((meal, i) => (
                      <li key={i}>
                        {meal.name} ({meal.category})
                        {meal.rating && (
                          <span className="ml-2">
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
                  <h3 className="text-lg mb-1">Custom Metrics</h3>
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
                  <h3 className="text-lg mb-1">Notes</h3>
                  <p className="text-sm whitespace-pre-wrap bg-secondary/50 p-3 rounded">
                    {selectedEntry.note}
                  </p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={() => setSelectedEntry(null)}
              className="w-full mt-6"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}