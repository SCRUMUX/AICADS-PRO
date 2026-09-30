import React from 'react';

/**
 * @UI/AppShell
 * Каркас приложения: сайдбар + основная колонка.
 * Ширина сайдбара — `--space-sidebar`. На tablet+ две колонки, на mobile — столбик.
 */

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Левая колонка (обычно `SidebarNav`) */
  sidebar?: React.ReactNode;
}
