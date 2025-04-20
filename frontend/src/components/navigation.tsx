import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const tabs = [
    { path: '/', label: t('entry'), icon: '📝' },
    { path: '/history', label: t('history'), icon: '📊' },
    { path: '/settings', label: t('settings'), icon: '⚙️' }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
      <div className="max-w-md mx-auto flex h-16">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300'
              }`}
            >
              <span className={`text-2xl mb-1 ${isActive ? 'scale-110' : ''} transition-transform`}>
                {tab.icon}
              </span>
              <span className="text-xs">{tab.label}</span>
              {isActive && (
                <div className="absolute top-0 h-1 w-10 bg-indigo-600 dark:bg-indigo-400 rounded-b-full transition-colors" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}