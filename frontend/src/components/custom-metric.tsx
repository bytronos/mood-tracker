import { useState } from 'react';
import { CustomMetric } from '../types';
import { Button } from './ui/button';
import { useLanguage } from '../hooks/useLanguage';

interface CustomMetricProps {
  metrics: CustomMetric[];
  onChange: (metrics: CustomMetric[]) => void;
}

export function CustomMetricTracker({ metrics, onChange }: CustomMetricProps) {
  const { t } = useLanguage();
  const [newMetricName, setNewMetricName] = useState('');
  const [newMetricValue, setNewMetricValue] = useState('');
  const [newMetricUnit, setNewMetricUnit] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addMetric = () => {
    if (newMetricName.trim() === '') return;
    
    // Determine the type of value (number, boolean, or string)
    let parsedValue: number | string | boolean = newMetricValue;
    if (!isNaN(Number(newMetricValue))) {
      parsedValue = Number(newMetricValue);
    } else if (newMetricValue.toLowerCase() === 'true') {
      parsedValue = true;
    } else if (newMetricValue.toLowerCase() === 'false') {
      parsedValue = false;
    }
    
    const newMetric: CustomMetric = {
      name: newMetricName,
      value: parsedValue,
      unit: newMetricUnit || undefined
    };
    
    onChange([...metrics, newMetric]);
    setNewMetricName('');
    setNewMetricValue('');
    setNewMetricUnit('');
    setIsAdding(false);
  };

  const removeMetric = (index: number) => {
    const updatedMetrics = metrics.filter((_, i) => i !== index);
    onChange(updatedMetrics);
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('custom_metrics')}</h2>
        {!isAdding && (
          <Button 
            onClick={() => setIsAdding(true)} 
            variant="outline" 
            size="sm"
          >
            {t('add_metric')}
          </Button>
        )}
      </div>
      
      {isAdding && (
        <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-lg mb-5 space-y-4">
          <input
            type="text"
            value={newMetricName}
            onChange={(e) => setNewMetricName(e.target.value)}
            placeholder={t('metric_name')}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          
          <div className="flex gap-3">
            <input
              type="text"
              value={newMetricValue}
              onChange={(e) => setNewMetricValue(e.target.value)}
              placeholder={t('metric_value')}
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
            
            <input
              type="text"
              value={newMetricUnit}
              onChange={(e) => setNewMetricUnit(e.target.value)}
              placeholder={t('unit')}
              className="w-1/3 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>
              {t('cancel')}
            </Button>
            <Button variant="primary" onClick={addMetric}>
              {t('add')}
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {metrics.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center py-4">
            {t('no_custom_metrics')}
          </p>
        )}
        
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{metric.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {String(metric.value)} {metric.unit && <span>{metric.unit}</span>}
              </p>
            </div>
            <button 
              onClick={() => removeMetric(index)}
              className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1"
              aria-label="Remove metric"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}