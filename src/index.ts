import { useEffect } from 'react';
import { useLocalStorageValue } from '@react-hookz/web';

export type Theme = 'light' | 'dark' | null;
type ThemeHandler = (newTheme: Theme) => void;

const useTheme = (): [theme: Theme, setTheme: ThemeHandler] => {
  const [theme, setTheme, removeTheme] = useLocalStorageValue<Theme>(
    'theme',
    undefined,
    {
      initializeWithStorageValue: false,
    }
  );

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
      setTheme(newTheme);
    } else {
      removeTheme();
    }
  };

  return [theme, handleSetTheme];
};

export default useTheme;
