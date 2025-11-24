
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

type Language = 'bn' | 'en';
type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: typeof translations.bn;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>('light');

  // Load settings from local storage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    const savedTheme = localStorage.getItem('app_theme') as Theme;
    
    if (savedLang) setLanguage(savedLang);
    
    // Check system preference if no saved theme
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = translations[language];

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
