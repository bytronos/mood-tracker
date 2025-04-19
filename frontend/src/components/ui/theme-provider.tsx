import { createContext, useContext, useEffect } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

// Create a dummy context for backwards compatibility
type ThemeProviderState = {
  theme: "dark";
  setTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// This function applies dark theme styles
function applyDarkTheme() {
  // Set CSS custom properties
  document.documentElement.style.setProperty('--tw-bg-color', '#111827');
  document.documentElement.style.setProperty('--tw-text-color', '#f3f4f6');
  
  // Set data attribute on body
  document.body.setAttribute('data-theme', 'dark');
  
  // Force direct styles on body
  document.body.style.backgroundColor = '#111827';
  document.body.style.color = '#f3f4f6';
  
  // Force direct styles on app container
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    appContainer.style.backgroundColor = '#111827';
    appContainer.style.color = '#f3f4f6';
  }
  
  // Update theme meta tag
  const metaThemeColor = document.getElementById('theme-color-meta');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', '#111827');
  }
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  useEffect(() => {
    // Get the root HTML element
    const root = window.document.documentElement;
    
    // Remove any other classes and add dark
    root.classList.remove("light", "system");
    root.classList.add("dark");
    
    // Apply dark theme
    applyDarkTheme();
  }, []);

  // Create dummy value for backwards compatibility
  const value = {
    theme: "dark" as const,
    setTheme: () => {
      // Do nothing - theme can't be changed
      console.log("Theme switching disabled - using dark theme only");
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