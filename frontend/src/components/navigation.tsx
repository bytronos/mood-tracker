import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabs = [
    { path: '/', label: 'Entry', icon: '📝' },
    { path: '/history', label: 'History', icon: '📊' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="max-w-md mx-auto flex">
        {tabs.map(tab => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center flex-1 py-3 ${
              location.pathname === tab.path
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            }`}
          >
            <span className="text-xl mb-1">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}