import React from 'react';

/**
 * Card (@UI/Card, Figma node 160:75500)
 *
 * Контейнер для контента с заголовком, описанием, слотами header/footer/media.
 * 5 вариантов, 4 размера, 4 состояния.
 *
 * Размеры (из Figma API):
 *   sm: padding=6px,  gap=4px, Title 12px/500/lh16, Content 10px/400/lh12
 *   md: padding=9px,  gap=6px, Title 14px/600/lh20, Content 12px/400/lh16
 *   lg: padding=12px, gap=8px, Title 16px/600/lh24, Content 14px/400/lh20
 *   fluid: как md, без max-width контейнера — для сеток дашборда
 *
 * Варианты (fill | border):
 *   base     — surface-2  | border-base
 *   outlined — surface-1  | border-strong
 *   elevated — surface-1  | нет border + drop-shadow
 *   filled   — surface-3  | border-base
 *   panel    — gradient-surface | border-base + radius-panel
 *
 * Состояния:
 *   base     — стандартные цвета по варианту
 *   hover    — fill: surface-3
 *   focus    — fill: surface-2 + border-strong + focus ring
 *   disabled — opacity-disabled
 */
export type CardVariant = 'base' | 'outlined' | 'elevated' | 'filled' | 'panel';

export type CardSize = 'sm' | 'md' | 'lg' | 'fluid';

export type CardState = 'base' | 'hover' | 'focus' | 'disabled';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Внешний вид (base/outlined/elevated/filled) */
  variant?: CardVariant;
  /** Размер (sm/md/lg) */
  size?: CardSize;
  /**
   * Визуальное состояние (override).
   * Если не задан — управляется автоматически hover/focus/disabled.
   */
  state?: CardState;
  /** Заголовок карточки */
  title?: React.ReactNode;
  /** Описание (content text) */
  description?: React.ReactNode;
  /** Слот для header (изображение, медиа и т.д.) */
  header?: React.ReactNode;
  /** Слот для footer (actions и т.д.) */
  footer?: React.ReactNode;
  /** Disabled */
  disabled?: boolean;
}
