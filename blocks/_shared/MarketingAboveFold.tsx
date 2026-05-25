import React from 'react';
import { cn } from '../../components/primitives/_shared';
import { useParallaxOffset } from '../../hooks/useParallaxOffset';
import { ParallaxBrandScene } from './ParallaxBrandScene';

export interface MarketingAboveFoldProps {
  children: React.ReactNode;
  className?: string;
  /** Pull brand background under fixed overlay navbar (uses --navbar-above-fold-band-height). */
  underFixedNavbar?: boolean;
}

/**
 * Brand above-the-fold shell — unified parallax background for overlay enterprise navbar + hero.
 * Navbar band MUST stack above this shell (`--z-header`); do not raise MAF z-index above header.
 * First screen (hero + optional events band) should use min-h-[100svh] on this wrapper.
 */
export const MarketingAboveFold: React.FC<MarketingAboveFoldProps> = ({
  children,
  className,
  underFixedNavbar = false,
}) => {
  const parallaxRef = useParallaxOffset(0.1, true);

  return (
    <div
      ref={parallaxRef as React.RefObject<HTMLDivElement>}
      className={cn(
        'relative z-0 flex w-full flex-col overflow-x-hidden bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)]',
        underFixedNavbar &&
          '-mt-[var(--navbar-above-fold-band-height,var(--navbar-chrome-height,calc(var(--space-56)+var(--space-4)*2)))]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <ParallaxBrandScene variant="hero" />
      </div>
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
};

MarketingAboveFold.displayName = 'MarketingAboveFold';
