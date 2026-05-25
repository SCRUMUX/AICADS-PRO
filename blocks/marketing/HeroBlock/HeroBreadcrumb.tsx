import React from 'react';
import { ChevronRightIcon } from '../../../components/icons';
import { cn } from '../../../components/primitives/_shared';

export interface HeroBreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeroBreadcrumbProps {
  items: HeroBreadcrumbItem[];
  onBrand?: boolean;
  className?: string;
}

/** Compact breadcrumb trail for inner-page hero (Cortel case study header). */
export function HeroBreadcrumb({ items, onBrand = false, className }: HeroBreadcrumbProps) {
  if (items.length === 0) return null;

  const linkClass = cn(
    'text-style-caption no-underline transition-opacity hover:opacity-100',
    onBrand ? 'text-[var(--color-text-on-brand)]/70' : 'text-[var(--color-text-secondary)]',
  );

  const currentClass = cn(
    'text-style-caption',
    onBrand ? 'text-[var(--color-text-on-brand)]' : 'text-[var(--color-text-primary)]',
  );

  return (
    <nav
      aria-label="breadcrumb"
      className={cn('flex w-full min-w-0 flex-wrap items-center', className)}
      style={{ gap: 'var(--space-1)' }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 ? (
              <ChevronRightIcon
                size={12}
                className={cn(
                  'shrink-0',
                  onBrand ? 'text-[var(--color-text-on-brand)]/50' : 'text-[var(--color-text-muted)]',
                )}
                aria-hidden="true"
              />
            ) : null}

            {item.href && !isLast ? (
              <a href={item.href} className={linkClass}>
                {item.label}
              </a>
            ) : (
              <span className={currentClass} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
