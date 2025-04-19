import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// This function directly applies theme styles to override anything else
function applyThemeStyles(isDark: boolean) {
  // Set CSS custom properties
  document.documentElement.style.setProperty('--tw-bg-color', isDark ? '#111827' : '#f3f4f6');
  document.documentElement.style.setProperty('--tw-text-color', isDark ? '#f3f4f6' : '#111827');
  
  // Set data attribute on body
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  // Force direct styles on body
  document.body.style.backgroundColor = isDark ? '#111827' : '#f3f4f6';
  document.body.style.color = isDark ? '#f3f4f6' : '#111827';
  
  // Force direct styles on app container
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    appContainer.style.backgroundColor = isDark ? '#111827' : '#f3f4f6';
    appContainer.style.color = isDark ? '#f3f4f6' : '#111827';
  }
  
  // Update theme meta tag
  const metaThemeColor = document.getElementById('theme-color-meta');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#111827' : '#f3f4f6');
  }
  
  // Log the change
  console.log('Applied theme styles:', isDark ? 'dark' : 'light', 'to body and app container');
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme-preference",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    // Get the root HTML element
    const root = window.document.documentElement;
    
    // First, remove all theme classes
    root.classList.remove("light", "dark");
    
    // Determine if we should use dark mode
    let isDark = false;
    
    if (theme === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(isDark ? "dark" : "light");
    } else {
      isDark = theme === "dark";
      root.classList.add(theme);
    }
    
    // Apply the theme directly with inline styles to override anything else
    applyThemeStyles(isDark);
    
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      console.log("Setting theme to:", newTheme);
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
      
      // Apply theme immediately without waiting for effect
      const isDark = newTheme === "dark" || 
        (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      
      applyThemeStyles(isDark);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};