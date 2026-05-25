import React from 'react';
import { cn } from '../../components/primitives/_shared';
import type { SolutionsBlockProps } from './SolutionsBlock/SolutionsBlock.types';

const SOLUTION_COVER_TONES = [
  'from-[var(--color-brand-primary)]/90 to-[var(--color-brand-hover)]',
  'from-[var(--color-brand-hover)] to-[var(--color-brand-primary)]',
  'from-[var(--color-brand-primary)] to-[var(--color-text-primary)]/80',
  'from-[var(--color-text-primary)]/70 to-[var(--color-brand-primary)]',
  'from-[var(--color-brand-primary)]/80 to-[var(--color-brand-hover)]',
  'from-[var(--color-brand-hover)]/90 to-[var(--color-brand-primary)]',
] as const;

function SolutionCoverPattern() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0 h-[55%] w-[45%] opacity-[0.18]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(-35deg, transparent, transparent 10px, var(--color-text-on-brand) 10px, var(--color-text-on-brand) 11px)',
      }}
      aria-hidden="true"
    />
  );
}

export function solutionCoverPlaceholder(index: number) {
  const tone = SOLUTION_COVER_TONES[index % SOLUTION_COVER_TONES.length];

  return (
    <div className={cn('absolute inset-0 bg-gradient-to-br', tone)} aria-hidden="true">
      <SolutionCoverPattern />
    </div>
  );
}

/** Attach demo cover layers for Storybook render() — keep out of CSF args. */
export function withSolutionCardCovers(props: SolutionsBlockProps): SolutionsBlockProps {
  let coverIndex = 0;

  return {
    ...props,
    solutions: props.solutions.map((item) => ({
      ...item,
      cover: item.cover ?? (item.imageSrc ? undefined : solutionCoverPlaceholder(coverIndex++)),
    })),
  };
}
