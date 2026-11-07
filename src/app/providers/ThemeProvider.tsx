import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { MEDIA, STORAGE_KEYS } from '@/config/constants';
import { ThemeContext, type Theme } from '@/hooks/useTheme';

function readInitialTheme(): Theme {
  const fromDom = document.documentElement.dataset.theme;
  if (fromDom === 'light' || fromDom === 'dark') return fromDom;
  return window.matchMedia(MEDIA.prefersDark).matches ? 'dark' : 'light';
}

function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

/** Owns the light/dark theme, mirrors it to <html data-theme> and persists the choice. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    persistTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      persistTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
