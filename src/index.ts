import { useEffect } from 'react';

export type Theme = 'light' | 'dark' | null;
type ThemeHandler = (newTheme: Theme) => void;

const useTheme = (): [theme: Theme, setTheme: ThemeHandler] => {
  const theme: Theme =
    typeof window === 'undefined'
      ? null
      : (localStorage.getItem('theme') as Theme);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (newTheme) {
      localStorage.setItem('theme', newTheme);
    } else {
      localStorage.removeItem('theme');
    }
  };

  return [theme, handleSetTheme];
};

export default useTheme;
