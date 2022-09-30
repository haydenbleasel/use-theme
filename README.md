# useTheme

`useTheme` is a tiny, zero-dependency hook for handling themes with system preference detection. It's designed to work with Tailwind's `darkMode: 'class'` by adding a `dark` or `light` class to the `html` element when the user's system preference is set. It also persists to `localStorage` so that the user's preference is remembered.

## Installation

```bash
yarn add @haydenbleasel/use-theme
```

## Usage

```jsx
import { useTheme } from '@haydenbleasel/use-theme';

const App = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div>
      <h1>Current theme: {theme}</h1>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme(undefined)}>System Default</button>
    </div>
  );
};
```
