import { useEffect } from 'react';
import { useLocalStorageValue } from '@react-hookz/web';

export type Theme = 'light' | 'dark' | null;
type ThemeHandler = (newTheme: Theme) => void;

const useTheme = (): [theme: Theme, setTheme: ThemeHandler] => {
  const { value, set, remove } = useLocalStorageValue<Theme>('theme', {
    defaultValue: null,
    initializeWithValue: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (
      value === 'dark' ||
      (!value && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.documentElement.classList.add('[&_*]:!transition-none');
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none');
    }, 0);
  }, [value]);

  const handleSetTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (newTheme) {
      set(newTheme);
    } else {
      remove();
    }
  };

  return [value ?? null, handleSetTheme];
};

export default useTheme;
