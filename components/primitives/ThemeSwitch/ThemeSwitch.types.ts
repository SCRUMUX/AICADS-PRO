import React from 'react';
import type { SwitchSize } from '../Switch/Switch.types';

/**
 * @UI/ThemeSwitch
 * Переключатель `data-theme` light/dark. Значение пишется в localStorage.
 * Визуально — тот же Switch, без локальных цветов потребителя.
 */

export interface ThemeSwitchProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SwitchSize;
  storageKey?: string;
  label?: string;
}
