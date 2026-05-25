import React from 'react';
import { cn } from '../../../components/primitives/_shared';

export function BlogChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('h-[var(--space-24)] w-[var(--space-24)]', className)} aria-hidden="true">
      <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function BlogChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('h-[var(--space-24)] w-[var(--space-24)]', className)} aria-hidden="true">
      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function BlogArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('h-[var(--space-20)] w-[var(--space-20)]', className)} aria-hidden="true">
      <path
        d="M7.714 5.143V12.248C7.714 13.905 9.057 15.248 10.714 15.248H16.286M16.286 15.248L12.714 11.639M16.286 15.248L12.714 18.857"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function BlogViewAllIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('h-[var(--space-16)] w-[var(--space-16)] min-[1024px]:h-[var(--space-22)] min-[1024px]:w-[var(--space-22)]', className)} aria-hidden="true">
      <path
        d="M7.714 5.143V12.248C7.714 13.905 9.057 15.248 10.714 15.248H16.286M16.286 15.248L12.714 11.639M16.286 15.248L12.714 18.857"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
