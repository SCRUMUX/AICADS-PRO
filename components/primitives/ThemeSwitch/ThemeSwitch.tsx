import React, { useCallback, useEffect, useState } from 'react';
import type { ThemeSwitchProps } from './ThemeSwitch.types';
import { cn } from '../_shared';
import { Switch } from '../Switch/Switch';

function readTheme(storageKey: string): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(storageKey);
  if (stored === 'light' || stored === 'dark') return stored;
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: 'light' | 'dark', storageKey: string) {
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem(storageKey, theme);
}

export const ThemeSwitch = React.forwardRef<HTMLSpanElement, ThemeSwitchProps>((props, ref) => {
  const { size = 'sm', storageKey = 'aicads-theme', label = 'Тема', className, ...rest } = props;
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setTheme(readTheme(storageKey));
  }, [storageKey]);

  const onToggle = useCallback(
    (checked: boolean) => {
      const next = checked ? 'dark' : 'light';
      applyTheme(next, storageKey);
      setTheme(next);
    },
    [storageKey],
  );

  return (
    <span
      ref={ref}
      className={cn('inline-flex items-center gap-[var(--space-content-s)]', className)}
      {...rest}
    >
      <Switch
        size={size}
        state={theme === 'dark' ? 'on' : 'off'}
        onToggle={onToggle}
        aria-label={label}
      />
    </span>
  );
});

ThemeSwitch.displayName = 'ThemeSwitch';
