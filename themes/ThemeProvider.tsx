import React, { createContext, useContext, ReactNode } from 'react';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { layout } from '@/styles/layout';

interface Theme {
  colors: typeof colors;
  typography: typeof typography;
  layout: typeof layout;
}

const theme: Theme = {
  colors,
  typography,
  layout,
};

const ThemeContext = createContext<Theme>(theme);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}