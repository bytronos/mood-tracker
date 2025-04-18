import { getLanguage } from './translations';

export function formatDate(date: Date): string {
  // Get the language from localStorage
  const language = getLanguage();
  
  // Format date according to the user's language
  return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function timeAgo(date: Date): string {
  const language = getLanguage();
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  // Return time in the selected language
  if (language === 'de') {
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? 'vor 1 Jahr' : `vor ${interval} Jahren`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? 'vor 1 Monat' : `vor ${interval} Monaten`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? 'vor 1 Tag' : `vor ${interval} Tagen`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? 'vor 1 Stunde' : `vor ${interval} Stunden`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? 'vor 1 Minute' : `vor ${interval} Minuten`;
    }
    
    return seconds < 10 ? 'gerade eben' : `vor ${Math.floor(seconds)} Sekunden`;
  } else {
    // English (default)
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return seconds < 10 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
  }
}

export function downloadAsCSV(data: any[], filename: string): void {
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return `"${value?.toString().replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }
  
  // Create blob and download
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadAsPDF(elementId: string, filename: string): void {
  // Note: This function would require a PDF library like jspdf
  // Implementation would depend on the chosen library
  console.log(`Downloading ${elementId} as PDF with filename ${filename}`);
}

export type Language = 'en' | 'de';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}