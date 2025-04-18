import React, { useState } from 'react';
import { CustomMetric } from '../types';
import { Button } from './ui/button';

interface CustomMetricProps {
  metrics: CustomMetric[];
  onChange: (metrics: CustomMetric[]) => void;
}

export function CustomMetricTracker({ metrics, onChange }: CustomMetricProps) {
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
    <div className="w-full py-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Custom Metrics</h2>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} variant="outline" size="sm">
            Add Metric
          </Button>
        )}
      </div>
      
      {isAdding && (
        <div className="p-4 bg-secondary/50 rounded-lg mb-4 space-y-3">
          <input
            type="text"
            value={newMetricName}
            onChange={(e) => setNewMetricName(e.target.value)}
            placeholder="Metric name (e.g., Steps, Water intake)"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newMetricValue}
              onChange={(e) => setNewMetricValue(e.target.value)}
              placeholder="Value (e.g., 10000, true, good)"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            
            <input
              type="text"
              value={newMetricUnit}
              onChange={(e) => setNewMetricUnit(e.target.value)}
              placeholder="Unit (optional)"
              className="flex h-9 w-1/3 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button onClick={addMetric}>
              Add
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-secondary rounded-lg"
          >
            <div>
              <p className="font-medium">{metric.name}</p>
              <p className="text-sm text-muted-foreground">
                {String(metric.value)} {metric.unit && <span>{metric.unit}</span>}
              </p>
            </div>
            <button 
              onClick={() => removeMetric(index)}
              className="text-muted-foreground hover:text-destructive"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}