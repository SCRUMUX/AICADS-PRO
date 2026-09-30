import React from 'react';

/**
 * @UI/SidebarNav
 * Вертикальная навигация дашборда: бренд, пункты, слот футера.
 * Активный пункт — `--gradient-brand`, не локальный CSS потребителя.
 */

export interface SidebarNavItem {
  href: string;
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  brandHref?: string;
  brandMark?: React.ReactNode;
  brandName?: string;
  brandSub?: string;
  items?: SidebarNavItem[];
  footer?: React.ReactNode;
}
