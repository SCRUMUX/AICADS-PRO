import React from 'react';
import { cn } from '../../components/primitives/_shared';

export interface MarketingAboveFoldProps {
  children: React.ReactNode;
  className?: string;
  /** Pull brand background under fixed overlay navbar (uses --navbar-chrome-height). */
  underFixedNavbar?: boolean;
}

/**
 * Brand above-the-fold shell — unified background for overlay enterprise navbar + hero.
 */
export const MarketingAboveFold: React.FC<MarketingAboveFoldProps> = ({
  children,
  className,
  underFixedNavbar = false,
}) => (
  <div
    className={cn(
      'relative w-full bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)]',
      underFixedNavbar &&
        '-mt-[var(--navbar-chrome-height,calc(var(--space-56)+var(--space-4)*2))]',
      className,
    )}
  >
    {children}
  </div>
);

MarketingAboveFold.displayName = 'MarketingAboveFold';
